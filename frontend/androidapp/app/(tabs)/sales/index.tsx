import { Link, router } from 'expo-router';
import { View, Text, StyleSheet, FlatList, Alert, Button} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'
import { useEffect, useState, useContext } from 'react';
import RefreshListsContext from '@/contexts/refreshListsContext';
import { SearchBar } from '@rneui/themed';
import ToastManager from 'toastify-react-native';
import SaleClient from '@/models/SaleClient';
import { getSaleClient, removeSale } from '@/backednAPIRequests/saleRequests';




//This variable define basic url to sales resources
export const  url="http://34.232.74.209:3001/sales"

const confirmRemoveAlert = ()=>{
  return new Promise<boolean>((resolve,reject)=>{
    Alert.alert('Remover o regsitro de venda', 'Deseja remover esse registro de venda?', [
      {
        text: 'Não',
        style: 'cancel', onPress:()=> reject(false)
      },
      {text: 'SIM', onPress: () =>resolve(true)},
    ])
  })
}


export default function salesScreenList() {
  const {refreshSaleList,refreshClientList,refreshSaleListNow}=useContext(RefreshListsContext)
  const[salesClient,setSalesClient]=useState<Array<SaleClient>>([])
  const[search,setSearch]=useState('')

  const filteredSales=salesClient.filter((sale)=>new Date(sale.saleDate).toLocaleDateString("pt-br").includes(search)||
                                          sale.client.name.includes(search)||
                                          sale.client.name.toLowerCase().includes(search))
                            

  useEffect(()=>{
    setSalesClientList()
    setSearch("")
  },[refreshSaleList])

  useEffect(()=>{
    setSalesClientList()
  },[refreshClientList])

  
  async function setSalesClientList(){
    const saleClient= await getSaleClient()
    setSalesClient(saleClient)
  }



  async function remove(saleClient:SaleClient){
    if(await confirmRemoveAlert()){
      await removeSale(saleClient.id)
      refreshSaleListNow()
     
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
        data={filteredSales.sort((a,b)=>{
          const aDate= new Date(a.saleDate)
          const bDate= new Date(b.saleDate)
          if(aDate>bDate)
            return 1
          else if(aDate>bDate)
            return 0
          else
            return -1
          })}
        renderItem={({item}) =>{
          return <View key={item.id} style={styles.items}>
            <View style={styles.viewText}>
              <Link href={{
                pathname:"/(tabs)/sales/describeSale",
                params:{
                  id:item.id,
                  saleDate:item.saleDate,
                  clientName:item.client.name
                }
              } 
              }>
                <View style={styles.item}>
                  <Text style={styles.dateText}>Data: {new Date(item.saleDate).toLocaleDateString("pt-br")}</Text> 
                  <Text style={styles.clientText}>{item.client.name}</Text>   
                </View>
                
              </Link>
            </View>
            <View style={styles.icons}>
              <Ionicons onPress={()=>remove(item)} name="trash" size={24} color="black" />
            </View>    
      </View>}}
      />
      <Button title="Registrar venda" onPress={()=>router.navigate("/(tabs)/sales/(registerSale)/selectSaleClient")}/>
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
  viewText:{
    width:"60%"
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
items:{
  flex:1,
  flexDirection:'row',
  justifyContent:'space-between',
  width:"90%",
  margin:20,
  borderBottomWidth:1
},
item:{
  width:"60%"
},
clientText:{
  fontSize:15,
},
dateText:{
  fontSize:20,
  fontWeight:"bold"
},
icons:{
  flex:1,
  flexDirection:'row',
  justifyContent:'space-around',
  alignSelf:'flex-end',
  width:"40%"
},

});