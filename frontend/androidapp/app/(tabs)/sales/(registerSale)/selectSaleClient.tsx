import { Link, router } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Alert, Button,Modal, Pressable} from 'react-native';
import { useEffect, useState, useContext } from 'react';
import GlobalAppContext from '@/contexts/refreshListsContext';
import { SearchBar } from '@rneui/themed';
import Client from "@/models/Client"
import ShoppingCartContext from '@/contexts/shoppingCartContext';
import ClientForm from '@/components/ClientForm';
import { getClients, postClient } from '@/backednAPIRequests/clientRequests';



  
export default function saleSelectClient() {
  const {refreshClientList,refreshClientListNow}=useContext(GlobalAppContext)
  const {setSelectedClient,createSelectedClientCart}=useContext(ShoppingCartContext)
  const[clients,setClients]=useState<Array<Client>>([])
  const[search,setSearch]=useState('')
  const [isVisible,setIsVisible]= useState(false)

  const filteredItens=clients.filter((client)=>client.name.includes(search)||client.name.toLowerCase().includes(search))

  useEffect(()=>{
    setClientsList()
    setSearch("")
  },[refreshClientList])

  
  async function setClientsList(){
    const clients= await getClients()
    setClients(clients)
  }

  function updateSearch(text:string){
    setSearch(text)
  }

  function nextPage(client:Client){
    createSelectedClientCart(client)
    router.navigate("./selectSaleProducts")
  }

  async function save(client:Client){
    const savedClient=await postClient(client)
    refreshClientListNow()
    setSelectedClient(savedClient)
    router.navigate("/(tabs)/sales/(registerSale)/selectSaleProducts")
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
       <Button title="Novo Cliente" onPress={()=>setIsVisible(true)}/>
       <Modal visible={isVisible} transparent={true}>
        <Pressable style={{backgroundColor:"rgba(24,24,24,0.6)", height:"50%"}} onPress={()=>setIsVisible(false)}></Pressable>
        <ClientForm getFormData={save} submitButtonText='salvar'/>
       </Modal>
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