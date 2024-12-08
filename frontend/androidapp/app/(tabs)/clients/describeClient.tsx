import { router, useLocalSearchParams} from "expo-router";
import { View, Button, StyleSheet, Alert} from "react-native";
import RefreshListsContext from "@/contexts/refreshListsContext";
import { useContext, useEffect, useState } from "react";
import Client from "@/models/Client";
import ClientDetails from "@/components/ClientDetails";
import  ToastManager from "toastify-react-native";
import { findClientById, removeClientById } from "@/backednAPIRequests/clientRequests";

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
    const {refreshClientList,refreshClientListNow}=useContext(RefreshListsContext)
    const selectedClient=useLocalSearchParams()
    const id=useLocalSearchParams().id
    const [clientDetails,setClientDetails]=useState<Client>(selectedClient as unknown as Client)
    

    useEffect(()=>{
      setClient()
    },[refreshClientList])

    async function setClient(){
      if(typeof selectedClient.id==="string"){
        const clientDetails= await findClientById(parseInt(selectedClient.id))
        setClientDetails(clientDetails)
      }
    }
    
    async function removeClient(client:Client){
        if(await confirmRemoveAlert(client)&&client.id){
          await removeClientById(client.id)     
          refreshClientListNow()
        }    
    }

    return(
        <View style={styles.container}>
          <ToastManager duration={2000}/>
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