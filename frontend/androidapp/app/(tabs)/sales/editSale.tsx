import { View, Text, Button, TextInput} from 'react-native';
import { Link, router, useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {object, string} from 'yup'
import { yupResolver } from "@hookform/resolvers/yup"
import { FieldErrors, useForm } from 'react-hook-form';
import { useContext, useEffect, useRef, useState } from 'react';
import formStyles from '@/styles/formStyles'
import GlobalAppContext from '@/contexts/globalAppContext';
import PhoneInput from '@/components/PhoneInput';



const saleSchema = object().shape({
  name: string().required("O nome do salee deve ser informado").max(100,"O nome do salee deve ter no máximo 100 caracteres"),
  phone: string().required("O telefone do salee deve ser informado").min(14,"O número de telefone deve ter no mínimo 11 dígitos")
});

type Inputs = {
  name: string
  phone: string
}


export default function saleEditForm() {
  const[fieldsValidationStatus,setfieldsValidationStatus]=useState({
    name:true,
    phone:true
  })
  const {refreshSaleList,refreshSaleListNow}=useContext(GlobalAppContext)
  const { register, setValue, handleSubmit, watch, getValues, setFocus } = useForm<Inputs>({
    resolver: yupResolver(saleSchema),
    defaultValues:useLocalSearchParams<Inputs>()
    })

  const id =useLocalSearchParams().id
  
  const phoneRef=useRef<TextInput | null>(null)

  // async function validData(data:Inputs){
  //   //fetch(url+"/"+id,{
  //     method:"patch",
  //     body: JSON.stringify({
  //       name:data.name,
  //       phone:data.phone
  //     }),
  //     headers:{
  //       'Content-Type':"application/json"
  //     }
  //   })
  //   .then((response)=>{
  //     refreshSaleListNow()
  //     router.back()
  //   }
  //   )
  //  }

function invalidData(errors:FieldErrors<Inputs>){
    if(errors.name?.message && errors.phone?.message){
      alert(errors.name.message)
      alert(errors.phone.message)
      setfieldsValidationStatus({
        name:false,
        phone:false
    })
    setFocus("name")
  }
  else if(errors.name?.message){
      alert(errors.name.message)
        setfieldsValidationStatus({
          name:false,
          phone:true
      })
      setFocus("name")
  }
  else if(errors.phone?.message){
      alert(errors.phone.message)
      setfieldsValidationStatus({
        name:true,
        phone:false
    })
    setFocus("phone")
  }
}
  
  
  const isPresented = router.canGoBack();
  

  return (
    <View style={formStyles.container}>
      <Text>Nome</Text>
      <TextInput 
        {...register("name")}
        returnKeyType='next'
        onEndEditing={()=>setFocus("phone")}
        autoFocus={true}
        style={fieldsValidationStatus.name?formStyles.textInput:{...formStyles.textInput,borderColor:"red"}}
        onChangeText={(text)=>setValue("name",text)}
        value={watch("name")}
        multiline={false}
        />
      <Text>Telefone</Text>
      <PhoneInput 
        register={{...register("phone")}}
        style={fieldsValidationStatus.phone?formStyles.textInput:{...formStyles.textInput,borderColor:"red"}}
        defaultValue={getValues("phone")}
        onChangeText={(text)=>setValue("phone",text)}/>
       <Button  title="Atualizar"></Button>
      {!isPresented && <Link href="../">Go Back</Link>}
      <StatusBar style="light" />
    </View>
  );
}
