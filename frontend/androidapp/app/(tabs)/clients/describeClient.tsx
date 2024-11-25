import { Link, router, useLocalSearchParams} from "expo-router";
import { View, Text, Button, StyleSheet, Alert} from "react-native";
import GlobalAppContext from "@/context/globalAppContext";
import { useContext, useEffect, useState } from "react";
import Client from "@/models/Client";
import {url} from "./index"
import ClientDetails from "@/components/ClientDetails";

const confirmRemoveAlert = async (client:Client)=>{

    return new Promise<boolean>((resolve,reject)=>{
      Alert.alert('Remover usuário', 'Deseja remover o cliente '+client.name, [
        {
          text: 'Não',
          style: 'cancel', onPress:()=> reject(false)
        },
        {text: 'SIM', onPress: () =>resolve(true)},
      ])
    })
  }


export default function clientDetails(){
    const {refreshClientList,refreshClientListNow}=useContext(GlobalAppContext)
    const selectedClient=useLocalSearchParams()
    const [clientDetails,setClientDetails]=useState<Client>(selectedClient as unknown as Client)
    

    useEffect(()=>{
        async function getClient(id:number | undefined){
            const response= await fetch(url+"/"+id,{
                method:"get"
            })
            setClientDetails(await response.json())
        }
        getClient(clientDetails.id)
    },[refreshClientList])
    
    async function removeClient(client:Client){
    
        if(await confirmRemoveAlert(client)){
          fetch(url+"/"+client.id,{
            method:"delete"
          })
          .then(()=>{
            refreshClientListNow()
            router.back()
          }
          )
          .catch((error)=>console.log(error))
    
        }       
      }
   
    

    return(
        <View style={styles.container}>
            <ClientDetails clientData={clientDetails}/>
            <View style={styles.actionBar}>
                <Button onPress={ 
                    ()=>router.navigate({
                    pathname:"/(tabs)/clients/editClient",
                    params:{
                        id:clientDetails.id,
                        name:clientDetails.name,
                        phone:clientDetails.phone
                    }
                })} title="editar"/>
                <Button onPress={()=>removeClient(clientDetails)}title="apagar"/>
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