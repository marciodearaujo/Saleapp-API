
import { Stack } from 'expo-router';




export default function roductsPLayout() {

  
  return (

      <Stack>
        <Stack.Screen name="index"
          options={
          {
            headerShown: false,
            }
          }
        />
        <Stack.Screen 
          name="registerClient"
          options={
              {
              headerShown:false,
              presentation:"modal",
              animation:"slide_from_bottom"
              }
              }
        />
        <Stack.Screen 
          name="editClient"
          options={
              {
              headerShown:false,
              presentation:"modal",
              animation:"slide_from_right"
              }
              }
        />
        <Stack.Screen 
          name="describeClient"
          options={
              {
              headerShown:false,
              presentation:"modal",
              animation:"fade"
              }
              }
        />
      </Stack>

  );
}