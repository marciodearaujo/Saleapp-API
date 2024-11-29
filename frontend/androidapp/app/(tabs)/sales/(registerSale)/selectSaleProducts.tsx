import {router, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Button, Modal, Pressable, Alert} from 'react-native';
import { useEffect, useState, useContext } from 'react';
import GlobalAppContext from '@/context/globalAppContext';
import { SearchBar } from '@rneui/themed';
import {url} from "@/app/(tabs)/sales/index"
import Product from '@/models/Product';
import {url as productUrl} from "@/app/(tabs)/products/index"
import ShoppingCartContext from '@/context/shoppingCartContext';

export default function selectSaleProducts() {
  const {refreshProductList,refreshSaleListNow}=useContext(GlobalAppContext)
  const{updateClientCart,selectedClient}=useContext(ShoppingCartContext)
  const[selectedProduct,setSelectedProduct]=useState<Product | null>(null)
  const[products,setProducts]=useState<Array<Product>>([])
  const[search,setSearch]=useState('')
  const[visible,setVisible]=useState(false)
  const[amountSelectedProduct,setAmountSelectedProduct]=useState(1)
 
  const filteredproducts=products.filter((product)=>product.description.includes(search)||product.description.toLowerCase().includes(search))
  const clientId=useLocalSearchParams().id

  // console.log(cartProducts)
  
  useEffect(()=>{
    getProducts()
    setSearch("")
  },[refreshProductList])

  
  function getProducts(){
    fetch(productUrl,{
      method:"get"
    })
    .then((response)=>{
      return response.json()
    }
    )
    .then((data)=>{
      setProducts(data)
    })
    .catch((error)=>console.log(error))
  }

  function updateSearch(text:string){
    setSearch(text)
  }
 
  function cancelAndCloseModal(){
    setAmountSelectedProduct(1)
    setVisible(false)
  }

  function addProdcutToCart(){
    if(selectedProduct&&selectedClient){
      updateClientCart(selectedClient,{...selectedProduct,amount:amountSelectedProduct})
      setAmountSelectedProduct(1)
      Alert.alert("Carrinho","produto "+selectedProduct?.description+"adicionado ao carrinho")
      setVisible(false)
    }
    else
      Alert.alert("Produto não selecinado","Selecione ao menos um produto")
  }

  return (
    <View style={styles.container}> 
    <SearchBar
        platform="android"
        placeholder="Buscar..."
        onChangeText={updateSearch}
        value={search}
         /> 
      <FlatList style={styles.flatList}
        data={filteredproducts.sort((a,b)=>{
          if(a.description>b.description)
            return 1
          else if(a.description==b.description)
            return 0
          else
            return -1
          })}
        renderItem={({item}) =>
          <View key={item.id} style={styles.products}>
            <View style={styles.viewText}>
                <Text onPress={()=>{
                  setSelectedProduct(item)
                  setVisible(true)
                  }} style={styles.itemText}>{item.description}</Text>
                <Text onPress={()=>{
                setSelectedProduct(item)
                setVisible(true)
                }} style={styles.amountText}>Estoque:{item.amount}</Text>
            </View>
            <View>
            </View>   
          </View>}
      /> 
      <Modal visible={visible} animationType='slide' transparent={true}>
          <Pressable onPress={()=>cancelAndCloseModal()} style={styles.backArea}>
          </Pressable>
            <View style={styles.amountData}>
              <Button onPress={()=>amountSelectedProduct > 1?setAmountSelectedProduct((prev)=>prev-1):setAmountSelectedProduct(1)} title='-'/>
                <Text >{amountSelectedProduct}</Text>
              <Button onPress={()=>{
                if(selectedProduct)
                  amountSelectedProduct<selectedProduct.amount?setAmountSelectedProduct((prev)=>prev+1):selectedProduct.amount}}
                      title='+'/>
            </View>
            <Button title='adicionar no carrinho' onPress={()=>addProdcutToCart()}></Button>
           
      </Modal> 
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    flexDirection:"column",
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom:20,
  },
  flatList:{
    alignSelf:'flex-start'
  },
  itemText: {
    fontWeight:"bold",
    padding: 10,
    fontSize: 20,
    height: 44,
  },
  textInput:{
    borderWidth:1,
    width:"100%",
    margin:10,
    padding:10,
  },
  amountText:{
    padding: 10,
    fontSize: 16,
    height: 44,
  },
  products:{
    flex:1,
    flexDirection:'row',
    justifyContent:'center',
    width:"100%",
    margin:20,
    borderBottomWidth:1
  },
  viewText:{
    width:"100%"
  },
  backArea:{
    height:"50%",
    backgroundColor:"rgba(24,24,24,0.6)",
  },
  amountData:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    height:"50%",
    width:"80%"
  }
})