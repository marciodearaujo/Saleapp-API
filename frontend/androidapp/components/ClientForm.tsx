import { View, Text, TextInput, Button} from "react-native";
import { StatusBar } from 'expo-status-bar';
import PhoneInput from "./PhoneInput";
import formStyles from "@/styles/formStyles";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useRef, useState } from "react";
import { FieldErrors, SubmitErrorHandler, SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {number, object, string} from 'yup'
import Client from "@/models/Client";

const clientSchema = object().shape({
    id:number(),
    name: string().required("O nome do cliente deve ser informado").max(100,"O nome do cliente deve ter no máximo 100 caracteres"),
    phone: string().required("O telefone do cliente deve ser informado").min(14,"O número de telefone deve ter no mínimo 11 dígitos")
  });


interface Props{
    getFormData:(data:Client)=>void,
    submitButtonText:string,
    defValues?:Partial<Client>
}
export default function ClientForm({getFormData,submitButtonText,defValues}:Props){
    const[fieldsValidationStatus,setfieldsValidationStatus]=useState({
        name:true,
        phone:true
      })
      const { register, setValue, handleSubmit,setFocus, watch, getValues } = useForm<Client>({
        resolver: yupResolver(clientSchema),
        defaultValues:defValues
        })

        const isPresented = router.canGoBack();

        const nameFieldRef=useRef<TextInput>(null)
      
        nameFieldRef.current?.isFocused()
      
         function invalidData(errors:FieldErrors<Client>){
          console.log(errors)
          if(errors.name?.message && errors.phone?.message){
            alert(errors.phone?.message)
            alert(errors.name?.message)
            setfieldsValidationStatus({
              phone:false,
              name:false
            })
            setFocus("name")
          }
          else if(errors.name?.message){
            alert(errors.name?.message)
            setfieldsValidationStatus({
              phone:true,
              name:false
            })
            setFocus("name")   
          }
          else if(errors.phone?.message){
            alert(errors.phone?.message)
            setfieldsValidationStatus({
              name:true,
              phone:false
            })
            setFocus("phone")
          } 
        }

    return(
        <View style={formStyles.container}>
          <Text>Nome</Text>
          <TextInput
            {...register("name")}
            ref={nameFieldRef}
            onEndEditing={()=>setFocus("phone")}
            enterKeyHint='next'
            autoFocus={true}
            style={fieldsValidationStatus.name===true?formStyles.textInput:{...formStyles.textInput,borderColor:"red" }}
            placeholder='Insira o nome do Cliente'
            onChangeText={(text)=>setValue("name",text)}
            value={watch("name")}
            />
          <Text>Telefone</Text>
          <PhoneInput
            defaultValue={getValues("phone")}
            register={{...register("phone")}}
            style={fieldsValidationStatus.phone===true?formStyles.textInput:{...formStyles.textInput,borderColor:"red" }}
            onChangeText={(text)=>setValue("phone",text)}/>
           <Button  title={submitButtonText} onPress={handleSubmit(getFormData,invalidData)}></Button>
          {!isPresented && <Link href="../">Go Back</Link>}
          <StatusBar style="light" />
        </View>
      );
}