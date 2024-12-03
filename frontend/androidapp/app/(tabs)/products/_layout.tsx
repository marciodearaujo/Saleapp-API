import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Stack } from 'expo-router';

export default function roductsPLayout() {
  return (
    <Stack>
      <Stack.Screen name="index"
        options={
        {
          headerShown: false
        }
        }
      />
      <Stack.Screen 
        name="registerProduct" 
        options={
            {
            headerShown: false,
            presentation:"modal",
            animation:"slide_from_bottom"
            }
            }
      />
      <Stack.Screen 
        name="describeProduct" 
        options={
            {
            headerShown: false,
            presentation:"modal",
            animation:'simple_push'
            }
            }
      />
      <Stack.Screen 
        name="editProduct" 
        options={
            {
            headerShown: false,
            presentation:"modal",
            animation:"slide_from_right"
            }
            }
      />
    </Stack>
  );
}