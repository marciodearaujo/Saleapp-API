import {router, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Button, Modal, Pressable, Alert} from 'react-native';
import { useEffect, useState, useContext } from 'react';
import GlobalAppContext from '@/contexts/globalAppContext';
import { SearchBar } from '@rneui/themed';
import {url} from "@/app/(tabs)/sales/index"
import Product from '@/models/Product';
import {url as productUrl} from "@/app/(tabs)/products/index"
import ShoppingCartContext from '@/contexts/shoppingCartContext';
import ProductForm from '@/components/ProductForm';
import { postProduct } from '@/backednAPIRequests/productRequests';

export default function selectSaleProducts() {
  const {refreshProductList,refreshSaleListNow}=useContext(GlobalAppContext)
  const{updateClientCart,selectedClient}=useContext(ShoppingCartContext)
  const[selectedProduct,setSelectedProduct]=useState<Product | null>(null)
  const[products,setProducts]=useState<Array<Product>>([])
  const[search,setSearch]=useState('')
  const[amountFormVisible,setAmountFormVisible]=useState(false)
  const[newProductVisible,setNewProductVisible]=useState(false)
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
    setAmountFormVisible(false)
  }

  function addProdcutToCart(product:Product){
    if(product&&selectedClient){
      updateClientCart(selectedClient,{...product,amount:amountSelectedProduct})
      setAmountSelectedProduct(1)
      Alert.alert("Carrinho","produto "+product?.description+"adicionado ao carrinho")
      setAmountFormVisible(false)
    }
    else
      Alert.alert("Produto não selecinado","Selecione ao menos um produto")
  }

  async function save(product:Product){
    const savedproduct= await postProduct(product)
    addProdcutToCart(savedproduct)
    setNewProductVisible(false)
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
            <Pressable onPress={()=>{
                  setSelectedProduct(item)
                  setAmountFormVisible(true)
                  }} style={styles.viewText}
            >
                <Text  style={styles.itemText}>{item.description}</Text>
                <Text style={styles.amountText}>Estoque:{item.amount}</Text>
            </Pressable>
            <View>
            </View>   
          </View>}
      /> 
      <Button title="novo produto" onPress={()=>setNewProductVisible(true)}/>
      <Modal visible={newProductVisible} transparent={true}>
        <Pressable onPress={()=>setNewProductVisible(false)} style={styles.backArea}/>
        <ProductForm getFormData={save} submitButtonText='salvar'/>
      </Modal>
      <Modal visible={amountFormVisible} animationType='slide' transparent={true}>
          <Pressable onPress={()=>cancelAndCloseModal()} style={styles.backArea}/>
            <View style={styles.amountData}>
              <Pressable style={styles.changeAmountButton} onPress={()=>amountSelectedProduct > 1?setAmountSelectedProduct((prev)=>prev-1):setAmountSelectedProduct(1)}>
                <Text style={styles.changeAmountButtonText}>-</Text>
              </Pressable>
                <Text style={styles.changeAmountButtonText}>{amountSelectedProduct}</Text>
              <Pressable style={styles.changeAmountButton} onPress={()=>{setAmountSelectedProduct((prev)=>prev+1)}}>
                <Text>+</Text>
              </Pressable>
            </View>
            <Button title='adicionar no carrinho' onPress={()=>{
              if(selectedProduct)
                addProdcutToCart(selectedProduct)}}/>
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
    width:"100%"
  },
  changeAmountButton:{

  },
  changeAmountButtonText:{

  }
})