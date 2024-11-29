import { Link, router } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Alert, Button, Pressable} from 'react-native';
import { useEffect, useState, useContext } from 'react';
import GlobalAppContext from '@/context/globalAppContext';
import { SearchBar } from '@rneui/themed';
import {url} from "@/app/(tabs)/clients/index"
import Client from "@/models/Client"
import ShoppingCartContext from '@/context/shoppingCartContext';


  
export default function saleSelectClient() {
  const {refreshClientList}=useContext(GlobalAppContext)
  const {setSelectedClient}=useContext(ShoppingCartContext)
  const[clients,setClients]=useState<Array<Client>>([])
  const[search,setSearch]=useState('')

  const filteredItens=clients.filter((client)=>client.name.includes(search)||client.name.toLowerCase().includes(search))

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
      setClients(data)
    })
    .catch((error)=>console.log(error))
  }

  function updateSearch(text:string){
    setSearch(text)
  }

  function nextPage(client:Client){
    setSelectedClient(client)
    router.navigate("./selectSaleProducts")
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
              <Pressable onPress={()=>nextPage(item)}>
                <Text style={styles.itemText}>{item.name}</Text>
              </Pressable>
            </View>
            <View>
            </View>   
          </View>}
      />
       <Button title="Novo Cliente"/>
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
itens:{
  flex:1,
  flexDirection:'row',
  justifyContent:'center',
  width:"100%",
  margin:20,
  borderBottomWidth:1
},
viewText:{
  width:"100%"
}
});