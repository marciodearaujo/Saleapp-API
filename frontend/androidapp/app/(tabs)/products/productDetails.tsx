import {router, useLocalSearchParams} from "expo-router";
import { View, Text, Button, StyleSheet, Alert} from "react-native";
import GlobalAppContext from "@/context/globalAppContext";
import { useContext, useEffect, useState } from "react";
import { Product } from ".";
import {url} from "./index"


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
    const selectedproduct=useLocalSearchParams()
    const [productDetails,setproductDetails]=useState<Product>(selectedproduct as unknown as Product)

    useEffect(()=>{
        async function getproduct(id:number){
            const response= await fetch(url+"/"+selectedproduct.id,{
                method:"get"
            })
            setproductDetails(await response.json())
        }
        getproduct(productDetails.id)
    },[refreshProductList])
    
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
            <View style={styles.detailArea}>
                <Text style={styles.text}>Descrição: {productDetails.description}</Text>
                <Text style={styles.text}>Preço: {("R$ "+productDetails.price).replace(".",",")}</Text>
                <Text style={styles.text}>Quantidade: {productDetails.amount}</Text>
                <Text style={styles.text}>Sexo: {productDetails?.sex==="both"?"Unissex":productDetails?.sex==="female"?"Feminino":"Masculino"}</Text>
            </View>
            <View style={styles.actionBar}>
                <Button onPress={ 
                    ()=>router.navigate({
                    pathname:"/(tabs)/products/productEditForm",
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
    detailArea:{
        flex:1,
        justifyContent:"flex-start",
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