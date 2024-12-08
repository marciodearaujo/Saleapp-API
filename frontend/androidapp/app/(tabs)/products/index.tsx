import { Link, router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import RefreshListsContext from '@/contexts/refreshListsContext';
import { Alert } from 'react-native';
import { SearchBar } from '@rneui/themed';
import Product from "@/models/Product"
import { getProducts, removeProductById } from '@/backednAPIRequests/productRequests';
import ToastManager from 'toastify-react-native';



const confirmRemoveAlert = (product:Product)=>{

  return new Promise<boolean>((resolve,reject)=>{
    Alert.alert('Remover produto', 'Deseja remover o produto '+product.description, [
      {
        text: 'Não',
        style: 'cancel', onPress:()=> reject(false)
      },
      {text: 'SIM', onPress: () =>resolve(true)},
    ])
  })
}


export default function productsScreenList() {

  const {refreshProductList,refreshProductListNow}=useContext(RefreshListsContext)
  const [products,setProducts]= useState<Product[]>([])
  const[search,setSearch]=useState("")

  const filteredItens=products.filter((product)=>product.description.includes(search)|| product.description.toLowerCase().includes(search))
  
  useEffect(()=>{
    setList()
    setSearch("")
  },[refreshProductList])

  async function setList(){
    const products= await getProducts()
    setProducts(products)
  }

  async function remove(product:Product){
    if(await confirmRemoveAlert(product) && product.id){
        await removeProductById(product.id)
      refreshProductListNow()
    }       
  }

  function updateSearch(text:string){
    setSearch(text)
  }

  return (
    <View style={styles.container}>
      <ToastManager duration={2000}/>
      <SearchBar
      platform='android'
      placeholder="Buscar..."
      onChangeText={updateSearch}
      value={search}
    />
      <FlatList style={styles.flatList}
        data={filteredItens.sort((a,b)=>{
          if(a.description>b.description)
            return 1
          else if(a.description==b.description)
            return 0
          else
            return -1
          })}
        renderItem={({item}) => 
        <View  key={item.id} style={styles.itens}>
          <View style={styles.viewText}>
            <Link href={{
              pathname:"/(tabs)/products/describeProduct",
              params:{
                id:item.id,
                description:item.description,
                price:item.price,
                amount:item.amount,
                sex:item.sex
              }
            }}>
              <Text style={styles.itemText}>{item.description}</Text>
            </Link>
            <Text>Quantidade: {item.amount}</Text>   
          </View>
          <View style={styles.icons}>
          <Link href={{
              pathname:"/(tabs)/products/editProduct",
              params:{
                id:item.id,
                description:item.description,
                price:item.price,
                amount:item.amount,
                sex:item.sex
              }
            }}><Ionicons name="pencil" size={24} color="black" /></Link>
            <Ionicons onPress={()=>remove(item)} name="trash" size={24} color="black" />
          </View>
          
        </View>}
      />
       <Button title="Novo Produto" onPress={()=>router.navigate("/(tabs)/products/registerProduct")}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:"column",
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom:20
  },
  flatList:{
    alignSelf:"flex-start"
  },
  itemText: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  textInput:{
    borderWidth:1,
    width:"90%",
    margin:10,
    padding:10,
},
itens:{
  flex:1,
  flexDirection:'row',
  justifyContent:'space-between',
  width:"90%",
  margin:20,
  borderBottomWidth:1
},
icons:{
  flex:1,
  flexDirection:'row',
  justifyContent:'space-around',
  alignSelf:'flex-end',
  width:"40%"
},
viewText:{
  width:"60%",
  flex:1,
  flexDirection:"column"
}
});