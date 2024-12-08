
import {router, useLocalSearchParams } from 'expo-router';
import { useContext} from 'react';
import RefreshListsContext from '@/contexts/refreshListsContext';
import Client from '@/models/Client';
import ClientForm from '@/components/ClientForm';
import { Toast } from "toastify-react-native";
import { updateClient } from '@/backednAPIRequests/clientRequests';
import { narrowingToString } from '@/utils/utilsFunctions';

const showToasts = () => {
  Toast.success(`Cliente atualizado!`);
};

export default function editClient() {
 const {refreshClientListNow}=useContext(RefreshListsContext)
 console.log(useLocalSearchParams().id)
 const {id}=useLocalSearchParams()
 const clientId=narrowingToString(id)

 async function update(client:Client){
    await updateClient({id:parseInt(clientId),...client})
    refreshClientListNow()
    showToasts()
    router.back()
 }

  

  return (
    <ClientForm 
    getFormData={update} 
    submitButtonText='atualizar' 
    defValues={{...useLocalSearchParams()}}/>
  );
}
