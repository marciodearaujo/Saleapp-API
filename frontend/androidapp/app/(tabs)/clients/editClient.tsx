
import {router, useLocalSearchParams } from 'expo-router';
import { useContext} from 'react';
import RefreshListsContext from '@/contexts/refreshListsContext';
import Client from '@/models/Client';
import ClientForm from '@/components/ClientForm';
import { Toast } from "toastify-react-native";
import { updateClient } from '@/backednAPIRequests/clientRequests';

const showToasts = () => {
  Toast.success(`Cliente atualizado!`);
};

export default function editClient() {
 const {refreshClientListNow}=useContext(RefreshListsContext)
 console.log(useLocalSearchParams().phone)
 const {id}=useLocalSearchParams()

 if(typeof id==="string"){
  var idNumber=parseInt(id)
 }

 async function update(client:Client){
    await updateClient({id:idNumber,...client})
    refreshClientListNow()
    showToasts()
    router.back()
 }

  const isPresented = router.canGoBack();
  

  return (
    <ClientForm 
    getFormData={update} 
    submitButtonText='atualizar' 
    defValues={{...useLocalSearchParams()}}/>
  );
}
