import { Link, router } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Alert, Button} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useState, useContext } from 'react';
import RefreshListsContext from '@/contexts/refreshListsContext';
import { SearchBar } from '@rneui/themed';
import Client from '@/models/Client';
import { getClients, removeClientById } from '@/backednAPIRequests/clientRequests';
import  ToastManager from "toastify-react-native";


const confirmRemoveAlert = (client:Client)=>{
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


  
export default function clientsScreenList() {
  const {refreshClientList,refreshClientListNow}=useContext(RefreshListsContext)
  
  const[clients,setClients]=useState<Array<Client>>([])
  const[search,setSearch]=useState('')

  const filteredItens=clients.filter((client)=>client.name.includes(search)||client.name.toLowerCase().includes(search))

  useEffect(()=>{
    setList()
    setSearch("")
  },[refreshClientList])

  async function setList(){
      const clients=await getClients()
      setClients(clients)
  }


  async function removeClient(client:Client){
    if(await confirmRemoveAlert(client)&&client.id){
      await removeClientById(client.id)
      refreshClientListNow()    
  }
}


  function updateSearch(text:string){
    setSearch(text)
  }

  return (
    <View style={styles.container}>
      <ToastManager duration={2000}/>
      <SearchBar
        platform="android"
        placeholder="Buscar..."
        onChangeText={updateSearch}
        value={search}
         />  
      <FlatList style={styles.flatList}
        data={filteredItens.sort((a,b)=>{
          if(a.name>b.name)
            return 1
          else if(a.name==b.name)
            return 0
          else
            return -1
          })}
        renderItem={({item}) =>
          <View key={item.id} style={styles.itens}>
            <View style={styles.viewText}>
              <Link href={{
                pathname:`/(tabs)/clients/describeClient`,
                params:{
                  id:item.id,
                  name:item.name,
                  phone:item.phone
                }
              } 
              }>
                <Text style={styles.itemText}>{item.name}</Text>
              </Link>
            </View>
            <View style={styles.icons}>
              <Link href={
                {
                  pathname:"/(tabs)/clients/editClient",
                  params:{
                    id:item.id,
                    name:item.name,
                    phone:item.phone
                  }
              }}   
              >
                <Ionicons name="pencil" size={24} color="black" />
              </Link>
              <Ionicons onPress={()=>removeClient(item)} name="trash" size={24} color="black" />
            </View>    
      </View>}
      />
      <Button title="Novo Cliente" onPress={()=>router.navigate("/(tabs)/clients/registerClient")}/>
    </View>
  );
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