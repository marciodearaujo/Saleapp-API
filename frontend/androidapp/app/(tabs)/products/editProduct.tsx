import { View, StyleSheet, Button, Text, TextInput} from 'react-native';
import { Link, router,useLocalSearchParams } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {object,string,number, boolean} from 'yup'
import { FieldErrors, useForm } from 'react-hook-form';
import { useEffect, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import formStyles from '@/styles/formStyles';
import { CheckBox } from 'react-native-elements'
import GlobalAppContext from '@/contexts/globalAppContext';
import MonetaryInput from '@/components/MonetaryInput';
import {url} from "./index"

type Inputs = {
  description: string,
  price: string,
  amount?:string,
  sex:string
}

const productSchema = object({
  description: string().required("A descrição do produto deve ser informada"),
  price: string().required("O preço do produto deve ser informado"),
  amount:string(),
  sex:string().required()
});



export default function productEditForm() {
  const [descriptionIsValid,setDescriptionIsValid]=useState(true)
  const {id}=useLocalSearchParams()
  const {refreshProductListNow}=useContext(GlobalAppContext)
  const {register, setValue, handleSubmit, watch, getValues,setFocus} = useForm<Inputs>({
          resolver: yupResolver(productSchema),
          defaultValues:{...useLocalSearchParams()}
        })

 
 const initialPrice=useLocalSearchParams().price
  
  useEffect(()=>{
    register("description")
    register("amount")
    register('sex')
  },[])

  function handleValidData(data:Inputs){
    
    fetch(url+"/"+id,{
      method:"patch",
      body: JSON.stringify({
        description:data.description,
        price:parseFloat(data.price),
        amount:data.amount?parseInt(data.amount):0,
        sex:data.sex
      }),
      headers:{
        'Content-Type':"application/json"
      }
    }
  )
  .then(()=>{
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
        autoFocus={true}
        placeholder='Descrição do produto'
        style={descriptionIsValid===true?formStyles.textInput:{...formStyles.textInput,borderColor:"red"}} 
        value={watch("description")}
        onChangeText={(text)=>setValue("description",text)}/>
      <Text>Preço</Text>
      <MonetaryInput
        register={{...register("price")}}
        style={formStyles.textInput}
        placeholder='Ex: 9999'
        initialValue={getValues("price")}
        onChangeText={(text)=>setValue('price',text)}
        />
      <Text>Quantidade</Text>
      <TextInput 
        placeholder='Ex: 10'
        keyboardType='numeric'
        style={formStyles.textInput} 
        value={watch("amount")}
        onChangeText={(text)=>setValue("amount",text)}/>
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
       <Button  title="Atualizar" onPress={handleSubmit(handleValidData,handleInvalidData)}></Button>
      {!isPresented && <Link href="../">Go Back</Link>}
      <StatusBar style="light" />
    </View>
  );
}

const styles=StyleSheet.create({
  checkBoxArea:{
   flexDirection:'row',
   justifyContent:'space-between',
   marginBottom:30
}})