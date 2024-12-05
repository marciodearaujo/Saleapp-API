import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Tabs } from 'expo-router';
import {GlobalAppProvider} from '@/contexts/refreshListsContext';



export default function TabsLayout() {
  return (
    <GlobalAppProvider>
      <Tabs>
        <Tabs.Screen 
        name="index"
        options={
          {
            title:"Alertas",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'notifications' : 'notifications-outline'} color={color} />
            ),
          }
        } />
        <Tabs.Screen 
        name="sales"
        options={
          {
            title:"Vendas",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'storefront' : 'storefront-outline'} color={color} />
            ),
          }
        } />
        <Tabs.Screen 
        name="clients"
        options={
          {
            title:"Clientes",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
            ),
          }
        } />
        <Tabs.Screen 
        name="products"
        options={
          {
            title:"Produtos",
            tabBarIcon: ({ color, focused }) => (
              <TabBarIcon name={focused ? 'bag' : 'bag-outline'} color={color} />
            ),
          }
        } />
        
  </Tabs>
  </GlobalAppProvider>
  );
}