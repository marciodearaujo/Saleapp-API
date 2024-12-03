import {router, useLocalSearchParams} from "expo-router";
import { View, Text, Button, StyleSheet, Alert} from "react-native";
import GlobalAppContext from "@/contexts/globalAppContext";
import { useContext, useEffect, useState } from "react";
import {url} from "./index"
import Product from "@/models/Product";
import ProductDetails from "@/components/ProductDetais";
import { getProductById } from "@/backednAPIRequests/productRequests";


const confirmRemoveAlert = async (product:Product)=>{

    return new Promise<boolean>((resolve,reject)=>{
      Alert.alert('Remover usuário', 'Deseja remover o produto '+product.description, [
        {
          text: 'Não',
          style: 'cancel', onPress:()=> reject(false)
        },
        {text: 'SIM', onPress: () =>resolve(true)},
      ])
    })
  }


export default function productDetails(){
    const {refreshProductList,refreshProductListNow}=useContext(GlobalAppContext)
    const selectedProduct=useLocalSearchParams()
    const [productDetails,setproductDetails]=useState<Product>(selectedProduct as unknown as Product)

    useEffect(()=>{
        setProduct()
    },[refreshProductList])

    async function setProduct(){
      if(typeof selectedProduct.id==="string"){
        const product =await getProductById(parseInt(selectedProduct.id))
        setproductDetails(product)
      }
      
    }
    
    async function removeproduct(product:Product){
        if(await confirmRemoveAlert(product)){
          fetch(url+"/"+product.id,{
            method:"delete"
          })
          .then(()=>{
            refreshProductListNow()
            router.back()
          }
          )
          .catch((error)=>console.log(error))
    
        }       
      }
   
    

    return(
        <View style={styles.container}>
            <ProductDetails product={productDetails}/>
            <View style={styles.actionBar}>
                <Button onPress={ 
                    ()=>router.navigate({
                    pathname:"/(tabs)/products/editProduct",
                    params:{
                        id:productDetails.id,
                        description:productDetails.description,
                        price:productDetails.price,
                        amount:productDetails.amount,
                        sex:productDetails.sex,
                    }
                })} title="editar"/>
                <Button onPress={()=>removeproduct(productDetails)}title="apagar"/>
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
    actionBar:{
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
})