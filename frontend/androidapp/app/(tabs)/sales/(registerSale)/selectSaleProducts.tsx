import {router, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Button, Modal, Pressable, Alert} from 'react-native';
import { useEffect, useState, useContext } from 'react';
import GlobalAppContext from '@/contexts/refreshListsContext';
import { SearchBar } from '@rneui/themed';
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
      updateClientCart(selectedClient,product)
      setAmountSelectedProduct(1)
      Alert.alert("Carrinho","Produto "+product?.description+" adicionado ao carrinho",[
        {
          text: 'ir para o carrinho', onPress:()=> router.navigate("/(tabs)/sales/(registerSale)/shoppingCart")
        },
        {
          text: 'adicionar mais produtos',
          style:"cancel"
        },
      ])
      setAmountFormVisible(false)
    }
    else
      Alert.alert("Produto não selecinado","Selecione ao menos um produto")
  }

  async function save(product:Product){
    const savedProduct= await postProduct(product)
    addProdcutToCart(savedProduct)
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

      {/* Modal to register a new Product during the sale register */}
      <Modal style={styles.backArea} visible={newProductVisible} transparent={true}>
        <Pressable onPress={()=>setNewProductVisible(false)} style={styles.backArea}/>
        <ProductForm getFormData={save} submitButtonText='salvar'/>
      </Modal>

      {/* Modal to define the product amaunt */}
      <Modal visible={amountFormVisible} animationType='slide' transparent={true}>
          <Pressable onPress={()=>cancelAndCloseModal()} style={styles.backArea}/>
            <View style={styles.amountData}>
              <Pressable style={styles.changeAmountButton} onPress={()=>amountSelectedProduct > 1?setAmountSelectedProduct((prev)=>prev-1):setAmountSelectedProduct(1)}>
                <Text style={styles.changeAmountButtonText}>-</Text>
              </Pressable>
                <Text style={{fontSize:20,padding:20}}>{amountSelectedProduct}</Text>
              <Pressable style={styles.changeAmountButton} onPress={()=>{setAmountSelectedProduct((prev)=>prev+1)}}>
                <Text style={styles.changeAmountButtonText}>+</Text>
              </Pressable>
            </View>
            <Button title='adicionar no carrinho' onPress={()=>{
              if(selectedProduct)
                addProdcutToCart({...selectedProduct,amount:amountSelectedProduct})}}/>
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
    height:"40%",
    backgroundColor:"rgba(24,24,24,0.6)",
  },
  amountData:{
    flex:1,
    flexDirection:"row",
    alignItems:"center",
    justifyContent:"center",
    height:"30%",
    width:"100%",
    backgroundColor:"#ddd"
  },
  changeAmountButton:{
    padding:20,
    fontSize:10,
    borderRadius:10,
    backgroundColor:"#1E90FF",
    color:"#fff"
  },
  changeAmountButtonText:{
    fontSize:20,
    padding:20,
    fontWeight:"bold"
  }
})