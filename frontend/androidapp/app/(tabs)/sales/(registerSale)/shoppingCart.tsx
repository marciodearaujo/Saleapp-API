import ShoppingCartContext from "@/context/shoppingCartContext";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { SearchBar } from '@rneui/themed';
import Product from "@/models/Product";
import {url} from "../index"
import Item from "@/models/Item";

interface SaleJsonInput{
  saleDate:string,
  clientId:number,
  products:Item[]
}

  export default function confirmSaleInformation(){
    const {cartClients,selectedClient}=useContext(ShoppingCartContext)
    const[search,setSearch]=useState("")

    const filteredItens=getClientCartProducts().products.filter((product)=>product.description.includes(search)|| product.description.toLowerCase().includes(search))

    function getClientCartProducts(){
      let amount=0
      if(selectedClient)
        return cartClients.filter((cart)=>cart.client.id===selectedClient.id)[0]
      else
        return {
         client:null,
        products:[]}
    }

    function updateSearch(text:string){
      setSearch(text)
    }

    function removeProduct(item:Product){
      
    }

    function save(){
      fetch(url+"/items",{
        method:"post",
        body: JSON.stringify({
          saleDate:new Date().toISOString(),
          clientId:selectedClient?.id,
          products:getClientCartProducts().products
        }),
        headers:{
          'Content-Type':"application/json"
        }
      })

    }

    return(
      <View style={styles.container}>
      <SearchBar
      platform='android'
      placeholder="Buscar..."
      onChangeText={updateSearch}
      value={search}/>
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
    <Button title="concluir venda" onPress={()=>save()}></Button>
    </View>
    )
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