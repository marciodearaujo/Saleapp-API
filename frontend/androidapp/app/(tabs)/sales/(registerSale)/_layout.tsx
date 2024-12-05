
import Ionicons from '@expo/vector-icons/Ionicons'
import { router, Stack} from 'expo-router';
import { View, Text} from 'react-native';
import { ShoppingCartProvider } from '@/contexts/shoppingCartContext';
import ShoppingCartContext from '@/contexts/shoppingCartContext';
import { useContext } from 'react';




export default function SalesPLayout() {
  const {clientsCart,selectedClient}=useContext(ShoppingCartContext)

 
  function showAmountCLientCart(){
    let amount=0
    if(selectedClient){
      const selClientCart=clientsCart.filter((cart)=>cart.client.id===selectedClient.id)[0]
      if(selClientCart)
        amount = selClientCart.products.reduce((amount,current)=>amount+current.amount,0)
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
              headerRight:()=><View><Ionicons style={showAmountCLientCart()>0?{color:"green"}:{color:"black"}} onPress={()=>router.navigate("./shoppingCart")} name="cart" size={35} color="black" /><Text>{showAmountCLientCart()}</Text></View>,
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
          name="shoppingCart"
          options={
              {
              headerShown:true,
              title:`Carrinho do cliente: ${selectedClient?selectedClient.name:""}`,
              presentation:"modal",
              animation:"slide_from_bottom"
              }
              }
        />
      </Stack>
  );
}

