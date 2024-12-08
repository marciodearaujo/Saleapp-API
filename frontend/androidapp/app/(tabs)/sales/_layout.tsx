
import { Stack } from 'expo-router';
import { ShoppingCartProvider } from '@/contexts/shoppingCartContext';


export default function roductsPLayout() {

  
  return (
    <ShoppingCartProvider>
      <Stack>
        <Stack.Screen 
          name="index"
          options={
              {
              headerShown:true,
              title:"Lista de vendas",
              presentation:"modal",
              animation:"slide_from_bottom"
              }
              }
        />
        <Stack.Screen 
          name="(registerSale)"
          options={
              {
              headerShown:false,
              presentation:"modal",
              animation:"slide_from_right"
              }
              }
        />
        <Stack.Screen 
          name="describeSale"
          options={
              {
              headerShown:false,
              presentation:"modal",
              animation:"fade"
              }
              }
        />
      </Stack>
    </ShoppingCartProvider>
  );
}