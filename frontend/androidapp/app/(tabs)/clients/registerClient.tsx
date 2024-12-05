
import { router} from 'expo-router';
import {object, string} from 'yup'
import { useContext} from 'react';
import GlobalAppContext from '@/contexts/refreshListsContext';
import ClientForm from "@/components/ClientForm"
import Client from '@/models/Client';
import { postClient } from '@/backednAPIRequests/clientRequests';
import  { Toast } from "toastify-react-native";

const clientSchema = object().shape({
  name: string().max(100,"Onome do cliente deve ter no m´ximo 100 caracteres").required("O nome do cliente deve ser informado"),
  phone: string().required("O telefone do cliente deve ser informado").min(14,"O número de telefone deve ter no mínimo 11 dígitos")
});

const showToasts = (client:Client) => {
  Toast.success(`Cliente ${client.name} cadastrado!`);
};

export default function registerClient() {
 
  const {refreshClientListNow}=useContext(GlobalAppContext)
  

  async function save(client:Client){
    const savedClient=await postClient(client)
    refreshClientListNow()
    showToasts(savedClient)
    router.back()
  }
  
 
  return (
    <ClientForm getFormData={save} submitButtonText='salvar'/>
  );
}


