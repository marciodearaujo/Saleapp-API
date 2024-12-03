
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
              headerShown:false,
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
          name="editSale"
          options={
              {
              headerShown:false,
              presentation:"modal",
              animation:"fade"
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