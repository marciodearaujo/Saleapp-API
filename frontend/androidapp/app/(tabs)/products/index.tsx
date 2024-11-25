import { Link, router } from 'expo-router';
import React, { useContext, useEffect, useState } from 'react';
import { View, StyleSheet, Text, FlatList, TextInput, Button } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import GlobalAppContext from '@/context/globalAppContext';
import { Alert } from 'react-native';
import { SearchBar } from '@rneui/themed';
import Product from "@/models/Product"



export const url="http://34.232.74.209:3001//products"

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

  const {refreshProductList,refreshProductListNow}=useContext(GlobalAppContext)
  const [itens,setItens]= useState<Product[]>([])
  const[search,setSearch]=useState("")

  const filteredItens=itens.filter((product)=>product.description.includes(search)|| product.description.toLowerCase().includes(search))
  
  useEffect(()=>{
    getProducts()
    setSearch("")
  },[refreshProductList])

  function getProducts(){
    fetch(url,{
      method:"get"
    })
    .then((response)=>{
      return response.json()
    }
    )
    .then((data)=>{
      setItens(data)
    })
    .catch((error)=>console.log(error))
  }

  function registerProduct(){
    router.navigate("/(tabs)/products/productRegisterForm")
  }

  async function removeProduct(product:Product){
    if(await confirmRemoveAlert(product)){
      fetch(url+"/"+product.id,{
        method:"delete"
      })
      .then(()=>{
        refreshProductListNow()
      }
      )
      .catch((error)=>console.log(error))

    }       
  }

  function updateSearch(text:string){
    setSearch(text)
  }

  return (
    <View style={styles.container}>
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
              pathname:"/(tabs)/products/productDetails",
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
            
          </View>
          <View style={styles.icons}>
          <Link href={{
              pathname:"/(tabs)/products/productEditForm",
              params:{
                id:item.id,
                description:item.description,
                price:item.price,
                amount:item.amount,
                sex:item.sex
              }
            }}><Ionicons name="pencil" size={24} color="black" /></Link>
            <Ionicons onPress={()=>removeProduct(item)} name="trash" size={24} color="black" />
          </View>
          
        </View>}
      />
       <Button title="Novo Produto" onPress={()=>registerProduct()}/>
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
  width:"60%"
}
});