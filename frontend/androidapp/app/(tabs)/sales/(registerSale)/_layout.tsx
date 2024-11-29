
import Ionicons from '@expo/vector-icons/Ionicons'
import { router, Stack, useLocalSearchParams} from 'expo-router';
import { View, Text } from 'react-native';
import { ShoppingCartProvider } from '@/context/shoppingCartContext';
import ShoppingCartContext from '@/context/shoppingCartContext';
import { useContext } from 'react';




export default function ProductsPLayout() {
  const {cartClients,selectedClient}=useContext(ShoppingCartContext)

 
  function showAmountCLientCart(){
    let amount=0
    if(selectedClient){
      const selClientCart=cartClients.filter((cart)=>cart.client.id===selectedClient.id)[0]
      if(selClientCart){
        amount =selClientCart.products?selClientCart.products.length:0
      }
    }    
    return amount
  }

  return (
      <Stack>
        <Stack.Screen 
          name="selectSaleClient"
          options={
              {
              headerShown:true,
              title:"Selecione um Cliente",
              presentation:"modal",
              animation:"slide_from_bottom"
              }
              }
        />
        <Stack.Screen 
          name="selectSaleProducts"
          options={
              {
              headerShown:true,
              title:`Cliente: ${selectedClient?selectedClient.name:""}`,
              headerRight:()=><View><Ionicons onPress={()=>router.navigate("./shoppingCart")} name="cart" size={24} color="black" /><Text>{showAmountCLientCart()}</Text></View>,
              presentation:"modal",
              animation:"slide_from_bottom"
              }
              }
        />
        <Stack.Screen 
          name="selectAmountItem"
          options={
              {
              headerShown:false,
              presentation:"modal",
              animation:"slide_from_bottom"
              }
              }
        />
        <Stack.Screen 
          name="showShoppingCart"
          options={
              {
              headerShown:true,
              title:`Cliente: ${selectedClient?selectedClient.name:""}`,
              presentation:"modal",
              animation:"slide_from_bottom"
              }
              }
        />
      </Stack>
  );
}