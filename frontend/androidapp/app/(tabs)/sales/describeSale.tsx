import { router, useLocalSearchParams} from "expo-router";
import { View, Button, StyleSheet, Alert} from "react-native";
import RefreshListsContext from "@/contexts/refreshListsContext";
import { useContext, useEffect, useState } from "react";
import {url} from "./index"
import {url as productUrl} from "../products/index"
import SaleDetails from "@/components/SaleDetails"
import Item from "@/models/Item";
import Product from "@/models/Product";

const confirmRemoveAlert = async ()=>{

    return new Promise<boolean>((resolve,reject)=>{
      Alert.alert('Remover registro de venda', 'Deseja remover o registro de venda?', [
        {
          text: 'Não',
          style: 'cancel', onPress:()=> reject(false)
        },
        {text: 'SIM', onPress: () =>resolve(true)},
      ])
    })
  }


export default function DescribeSale(){
    const {refreshSaleList,refreshProductList,refreshSaleListNow}=useContext(RefreshListsContext)
    const [saleItems,setSaleItems]=useState<Array<Item>>([])
    const [products,setProducts]=useState<Array<Product>>([])

    function narrowingToString(data:string|string[]){
      if(typeof data==="string"){
          return data
      }
      return data[0]
    }
    
    const saleId=narrowingToString(useLocalSearchParams().id)
    const saleDate=narrowingToString(useLocalSearchParams().saleDate)
    const clientName=narrowingToString(useLocalSearchParams().clientName)

    
  

    useEffect(()=>{
        getProducts()
        getSaleItems()
    },[refreshSaleList,refreshProductList])


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
        console.log("porducts ok")
      })
      .catch((error)=>console.log(error))
    }


    function getSaleItems(){
      fetch(url+"/"+saleId+"/items",{
        method:"get"
      })
      .then((response)=>{
        return response.json()
      }
      )
      .then((data)=>{
        setSaleItems(data)
        console.log("items ok")
      })
      .catch((error)=>console.log(error))
    }
    
    async function removeSale(saleId:string){
    
        if(await confirmRemoveAlert()){
          fetch(url+"/"+saleId,{
            method:"delete"
          })
          .then(()=>{
            refreshSaleListNow()
            router.back()
          }
          )
          .catch((error)=>console.log(error))
        }       
      }
   
    

    return(
        <View style={styles.container}>
            <SaleDetails saleDate={saleDate} clientName={clientName} saleItems={saleItems} products={products}/>
            <View style={styles.actionBar}>
                <Button onPress={()=>router.navigate("/(tabs)/sales/editSale")} title="editar"/>
                <Button onPress={()=>removeSale(saleId)}title="apagar"/>
            </View>    
        </View>
    )

}

const styles=StyleSheet.create({
    container: {
        padding:10,
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection:"column",
        paddingBottom:30
      },
    text:{
        fontSize: 18,
        height: 44,
        margin:10
    },
    actionBar:{
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
})