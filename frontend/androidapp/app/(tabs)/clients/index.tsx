import { Link, router } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Alert, Button} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useState, useContext } from 'react';
import GlobalAppContext from '@/context/globalAppContext';
import { SearchBar } from '@rneui/themed';
import Client from '@/models/Client';

//This variable define basic url to clients resources
export const  url="http://34.232.74.209:3001/clients"

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
  const {refreshClientList,refreshClientListNow}=useContext(GlobalAppContext)
  
  const[itens,setItens]=useState<Array<Client>>([])
  const[search,setSearch]=useState('')

  const filteredItens=itens.filter((client)=>client.name.includes(search)||client.name.toLowerCase().includes(search))

  useEffect(()=>{
    getClients()
    setSearch("")
  },[refreshClientList])

  
  function getClients(){
    fetch(url,{
      method:"get"
    })
    .then((response)=>{
      return response.json()
    }
    )
    .then((data)=>{
      setItens(data)
    })
    .catch((error)=>console.log(error))
  }

  async function removeClient(client:Client){
    if(await confirmRemoveAlert(client)){
      fetch(url+"/"+client.id,{
        method:"delete"
      })
      .then(()=>{
        refreshClientListNow()
      }
      )
      .catch((error)=>console.log(error))
    }       
  }


  function updateSearch(text:string){
    setSearch(text)
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
                pathname:"/(tabs)/clients/describeClient",
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