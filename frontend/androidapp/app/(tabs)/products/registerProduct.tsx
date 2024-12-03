import { View, StyleSheet, Button, Text, TextInput} from 'react-native';
import { Link, router} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {object,string} from 'yup'
import { FieldErrors, useForm } from 'react-hook-form';
import { useEffect, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import formStyles from '@/styles/formStyles';
import { CheckBox } from 'react-native-elements'
import GlobalAppContext from '@/contexts/globalAppContext';
import MonetaryInput from '@/components/MonetaryInput';
import {url} from "./index"



type Inputs={
  description:string,
  price:string,
  amount?:string,
  sex:string
}

const productSchema = object({
  description: string().required("A descrição do produto deve ser informada"),
  price: string().required("O preço do produto deve ser informado"),
  amount:string(),
  sex:string().required()
});

export default function productRegisterForm() {
  const [descriptionIsValid,setDescriptionIsValid]=useState(true)
  const {refreshProductListNow}=useContext(GlobalAppContext)
  const { register, setValue, handleSubmit, watch, setFocus} = useForm<Inputs>({
          resolver: yupResolver(productSchema)})

  
  
  useEffect(()=>{
    register('sex')
    setValue('sex','both')
  },[])

  async function handleValidData(data:Inputs){
    fetch(url,{
      method:"post",
      body: JSON.stringify({
        ...data,
        amount:data.amount?parseInt(data.amount):0,
        price:parseFloat(data.price)
    }),
      headers:{
        'Content-Type':"application/json"
      }
    }
  )
  .then((response)=>{
    return response
  }).then(data=>{
    console.log(data)
    refreshProductListNow()
    router.back()
  })
  .catch(error=>console.log(error))
   }

   async function handleInvalidData(errors:FieldErrors<Inputs>){
    type erro={
      field:keyof Inputs,
      message:string
    } 
    let errorsAlert:Array<erro>=[]
    if(errors.description?.message){
      errorsAlert.push({
        field:"description",
        message:errors.description.message
      })
      setDescriptionIsValid(false)
    }
    if(errors.amount?.message)
      errorsAlert.push({
        field:"amount",
        message:errors.amount.message
      })
    if(errors.price?.message)
      errorsAlert.push({
        field:"price",
        message:errors.price.message
      })

      errorsAlert.map((errors)=>{
        alert(errors.message)
      })

      setFocus(errorsAlert[0].field)
    
   }
  
  const isPresented = router.canGoBack();
 
  return (
    <View style={formStyles.container}>
      <Text>Descrição</Text>
      <TextInput 
        {...register("description")}
        onEndEditing={()=>setFocus("amount")}
        enterKeyHint='next'
        autoFocus={true}
        style={descriptionIsValid===true?formStyles.textInput:{...formStyles.textInput,borderColor:"red"}} 
        placeholder='Descrição do produto'
        onChangeText={(text)=>setValue("description",text)}/>
      <Text>Quantidade</Text>
      <TextInput
        onEndEditing={()=>setFocus("price")}
        {...register("amount")}
        enterKeyHint='next'
        keyboardType='numeric'
        style={formStyles.textInput} 
        placeholder='Ex: 10'
        onChangeText={(text)=>setValue("amount",text)}/>
      <Text>Preço</Text>
      <MonetaryInput
        enterKeyHint='enter'
        register={{...register("price")}}
        style={formStyles.textInput}
        placeholder='Ex: 9999'
        onChangeText={(text)=>setValue('price',text)}
        />
      <Text>Sexo</Text> 
      <View style={styles.checkBoxArea}>
        <CheckBox
          title='F'
          checked={watch('sex')==='female'?true:false}
          onPress={()=>setValue('sex','female')}
        />
        <CheckBox
          title='M/F'
          checked={watch('sex')==='both'?true:false}
          onPress={()=>setValue('sex','both')}
        />
        <CheckBox
          title='M'
          checked={watch('sex')==='male'?true:false}
          onPress={()=>setValue('sex','male')}
        />
        
       </View>
       <Button  title="salvar" onPress={handleSubmit(handleValidData,handleInvalidData)}></Button>
      {!isPresented && <Link href="../">Go Back</Link>}
      <StatusBar style="light" />
    </View>
  );
}

const styles=StyleSheet.create({
  checkBoxArea:{
   flexDirection:'row',
   justifyContent:'space-between',
   marginBottom:30,
}})