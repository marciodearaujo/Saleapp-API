
import Ionicons from '@expo/vector-icons/Ionicons'
import { router, Stack, useLocalSearchParams} from 'expo-router';
import { View, Text } from 'react-native';


export default function roductsPLayout() {
  console.log(useLocalSearchParams().name)

  
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
              title:"Selecione os Produtos",
              headerRight:()=><View><Ionicons onPress={()=>router.navigate("")} name="cart" size={24} color="black" /><Text>21</Text></View>,
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
          name="confirmSaleinformation"
          options={
              {
              headerShown:true,
              title:"Confirme as informações da venda",
              presentation:"modal",
              animation:"slide_from_bottom"
              }
              }
        />
      </Stack>

  );
}