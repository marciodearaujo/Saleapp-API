
import { router} from 'expo-router';
import {object, string} from 'yup'
import { useContext} from 'react';
import GlobalAppContext from '@/context/globalAppContext';
import ClientForm from "@/components/ClientForm"
import {url} from "./index"
import Client from '@/models/Client';


const clientSchema = object().shape({
  name: string().max(100,"Onome do cliente deve ter no m´ximo 100 caracteres").required("O nome do cliente deve ser informado"),
  phone: string().required("O telefone do cliente deve ser informado").min(14,"O número de telefone deve ter no mínimo 11 dígitos")
});


export default function registerClient() {
 
  const {refreshClientListNow}=useContext(GlobalAppContext)
  
  async function save(data:Client){
    fetch(url,{
      method:"post",
      body: JSON.stringify({...data}),
      headers:{
        'Content-Type':"application/json"
      }
    }
  )
  .then(()=>{
    refreshClientListNow()
    router.back()
  })
  .catch(error=>console.log(error))
  
  }
 
  return (
    <ClientForm getFormData={save} submitButtonText='salvar'/>
  );
}


