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
        name="productRegisterForm" 
        options={
            {
            headerShown: false,
            presentation:"modal",
            animation:"slide_from_bottom"
            }
            }
      />
      <Stack.Screen 
        name="productDetails" 
        options={
            {
            headerShown: false,
            presentation:"modal",
            animation:'simple_push'
            }
            }
      />
      <Stack.Screen 
        name="productEditForm" 
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