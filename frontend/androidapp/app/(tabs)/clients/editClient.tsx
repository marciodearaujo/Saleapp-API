
import {router, useLocalSearchParams } from 'expo-router';
import { useContext} from 'react';
import GlobalAppContext from '@/context/globalAppContext';
import {url} from "./index"
import Client from '@/models/Client';
import ClientForm from '@/components/ClientForm';



export default function editClient() {
 const {refreshClientListNow}=useContext(GlobalAppContext)
 console.log(useLocalSearchParams().phone)
 const {id}=useLocalSearchParams()

  function save({name,phone}:Client){
    fetch(url+"/"+id,{
      method:"patch",
      body: JSON.stringify({
        name,
        phone
      }),
      headers:{
        'Content-Type':"application/json"
      }
    })
    .then(()=>{
      refreshClientListNow()
      router.back()
    }
    )
   }

  const isPresented = router.canGoBack();
  

  return (
    <ClientForm 
    getFormData={save} 
    submitButtonText='atualizar' 
    defValues={{...useLocalSearchParams()}}/>
  );
}
