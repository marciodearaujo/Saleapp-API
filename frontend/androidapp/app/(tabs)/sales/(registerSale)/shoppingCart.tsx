import ShoppingCartContext from "@/contexts/shoppingCartContext";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { useContext, useState } from "react";
import { View, Text, FlatList, StyleSheet, Button } from "react-native";
import { SearchBar } from '@rneui/themed';
import Product from "@/models/Product";
import { postSale } from "@/backednAPIRequests/saleRequests";
import Client from "@/models/Client";
import { Toast } from "toastify-react-native";
import RefreshListsContext from "@/contexts/refreshListsContext";

const showToasts = (client:Client) => {
  Toast.success(`Registrada venda para o cliente ${client.name}`);
};

  export default function ShoppingCartScreen(){
    const {clientsCart,selectedClient,setSelectedClient,setClientsCart}=useContext(ShoppingCartContext)
    const {refreshSaleListNow}=useContext(RefreshListsContext)
    const[search,setSearch]=useState("")

    const filteredItens=getSelectedClientCart().products.filter((product)=>product.description.includes(search)|| product.description.toLowerCase().includes(search))

    function getSelectedClientCart(){
      if(selectedClient){
        return clientsCart.filter((cart)=>cart.client.id===selectedClient.id)[0]
      }
      else{
        return {
         client:{
          name:"",
          phone:""
         },
        products:[]}
      }
    }

    function updateSearch(text:string){
      setSearch(text)
    }

    function removeProductOfCart(product:Product){
      const selectedClientCart=getSelectedClientCart()
      setClientsCart(prev=>{
        if(selectedClient){
          const cartsWhithoutSelectedClientCart=prev.filter((cart)=>cart.client.id!==selectedClient.id)
          return [
            ...cartsWhithoutSelectedClientCart,
            {
              client:selectedClient,
              products:selectedClientCart.products.filter(prod=>prod.id!==product.id)
            }]
        }  
        return prev 
      })
    }

    async function save(){
      if(selectedClient && selectedClient.id){
        await postSale(selectedClient.id,getSelectedClientCart().products)
        refreshSaleListNow()
        showToasts(selectedClient)
        setSelectedClient(null)
        setClientsCart([])
        router.navigate("/(tabs)/sales")
      }
    }

    return(
      <View style={styles.container}>
      <SearchBar
      platform='android'
      placeholder="Buscar..."
      onChangeText={updateSearch}
      value={search}/>
      <FlatList style={styles.flatList}
      data={filteredItens.sort((a,b)=>{
        if(a.description>b.description)
          return 1
        else if(a.description==b.description)
          return 0
        else
          return -1
        })}
      renderItem={({item}) => 
      <View  key={item.id} style={styles.itens}>
        <View style={styles.viewText}>
          <Link href={{
            pathname:"/(tabs)/products/describeProduct",
            params:{
              id:item.id,
              description:item.description,
              price:item.price,
              amount:item.amount,
              sex:item.sex
            }
          }}>
            <Text style={styles.itemText}>{item.description}</Text>
          </Link>
          <View>
            <Text>{item.amount}</Text>
          </View>  
        </View>
        <View style={styles.icons}>
          <Ionicons onPress={()=>removeProductOfCart(item)} name="trash" size={24} color="black" />
        </View>
        
      </View>}
    />
    <Button title="concluir venda" onPress={()=>save()}></Button>
    </View>
    )
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
    justifyContent:'flex-end',
    alignSelf:'flex-end',
    width:"20%"
  },
  viewText:{
    width:"80%",
    flex:1,
    flexDirection:"row",
    justifyContent:"space-between"
  }
  });