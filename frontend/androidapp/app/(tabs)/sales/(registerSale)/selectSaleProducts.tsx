import {router, useLocalSearchParams } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Button, Modal, Pressable} from 'react-native';
import { useEffect, useState, useContext } from 'react';
import GlobalAppContext from '@/context/globalAppContext';
import { SearchBar } from '@rneui/themed';
import {url} from "@/app/(tabs)/sales/index"
import Product from "@/models/Product"
import Item from '@/models/Item';
import {url as productUrl} from "@/app/(tabs)/products/index"

const itemUrl="http://34.232.74.209:3001/items"

  
export default function selectSaleProducts() {
  const {refreshProductList,refreshSaleList,refreshClientList,refreshProductListNow,refreshSaleListNow,refreshClientListNow}=useContext(GlobalAppContext)
  const[selectedItems, setSelectedItems]=useState<Array<Item>>([])
  const[selectedProductId,setSelectedProductId]=useState(0)
  const[products,setProducts]=useState<Array<Product>>([])
  const[search,setSearch]=useState('')
  const[visible,setVisible]=useState(false)
  const[amountItem,setAmountItem]=useState(0)

  const filteredproducts=products.filter((product)=>product.description.includes(search)||product.description.toLowerCase().includes(search))
  const clientId=useLocalSearchParams().id
  


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

  async function save(items:Item[]){
    const response= await fetch(url,{
      method:"post",
      body: JSON.stringify({
        saleDate: new Date().toISOString(),
        clientId: typeof clientId=="string"?parseInt(clientId):0
      }),
      headers:{
        'Content-Type':"application/json"
      }
      }
    )
    const savedSale= await response.json().catch((error)=>{
      console.log(error)
    })
    if(savedSale.id){
    new Promise((resolve)=>
      selectedItems.map(({productId,amount},index)=>{
      fetch(itemUrl,{
        method:"post",
        body: JSON.stringify({
          saleId:savedSale.id,
          productId,
          amount
        }),
        headers:{
          'Content-Type':"application/json"
        }
        }
      )
      if(index===selectedItems.length-1)
        resolve("Items saved!")
      }))
      .then((result)=>{
        console.log(result)
        refreshSaleListNow()
        router.navigate("/(tabs)/sales")
      })
    }
  }
  

  function setSelectedItemAndCloseModal(item:Item){
    setSelectedItems(prev=>[...prev,item])
    setVisible(false)
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
                  setVisible(true)
                  setSelectedProductId(item.id)}} style={styles.itemText}>{item.description}</Text>
            </View>
            <View>
            </View>   
          </View>}
      /> 
      <Modal visible={visible} animationType='slide' transparent={true}>
          <Pressable onPress={()=>setSelectedItemAndCloseModal({productId:selectedProductId,amount:amountItem})} style={styles.backArea}>
          </Pressable>
            <View style={styles.amountData}>
              <Button onPress={()=>amountItem > 0?setAmountItem((prev)=>prev-1):setAmountItem(0)} title='-'/>
                <Text >{amountItem}</Text>
              <Button onPress={()=>setAmountItem((prev)=>prev+1)} title='+'/> 
            </View>
      </Modal> 
      <Button title="concluir" onPress={()=>save(selectedItems)}/>
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
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  textInput:{
    borderWidth:1,
    width:"100%",
    margin:10,
    padding:10,
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
  height:"50%",
  width:"80%"
}
})