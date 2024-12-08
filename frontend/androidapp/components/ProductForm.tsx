
    
import { View, StyleSheet, Button, Text, TextInput} from 'react-native';
import { Link, router} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {object,string,number} from 'yup'
import { FieldErrors, useForm } from 'react-hook-form';
import { useEffect, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import formStyles from '@/styles/formStyles';
import { CheckBox } from 'react-native-elements'
import MonetaryInput from '@/components/MonetaryInput';
import Product from '@/models/Product';


const productSchema = object({
  id:number(),
  description: string().required("A descrição do produto deve ser informada"),
  price: number(),
  amount:number(),
  sex:string()
});

interface Props{
    getFormData:(data:Product)=>void,
    submitButtonText:string,
    defValues?:Partial<Product>
}
export default function ProductForm({getFormData,submitButtonText,defValues}:Props) {

  // const [descriptionIsValid,setDescriptionIsValid]=useState(true)
  const[fieldsValidationStatus,setfieldsValidationStatus]=useState({
    description:true,
    price:true
  })
  const { register, setValue, handleSubmit, watch, setFocus, getValues} = useForm<Product>({
          resolver: yupResolver(productSchema),
        defaultValues:defValues})

  
  
  useEffect(()=>{
    register('sex')
   !getValues("sex")&&setValue('sex','both')
   !getValues("amount")&&setValue('amount',0)
  },[])

 
   async function handleInvalidData(errors:FieldErrors<Product>){
    if(errors.description?.message && errors.price?.message){
      alert(errors.price?.message)
      alert(errors.description?.message)
      setfieldsValidationStatus({
        price:false,
        description:false
      })
      setFocus("description")
    }
    else if(errors.description?.message){
      alert(errors.description?.message)
      setfieldsValidationStatus({
        price:true,
        description:false
      })
      setFocus("description")   
    }
    else if(errors.price?.message){
      alert(errors.price?.message)
      setfieldsValidationStatus({
        description:true,
        price:false
      })
      setFocus("price")
    }
    
   }
  
  const isPresented = router.canGoBack();
 
  return (
    <View style={formStyles.container}>
      <Text>Descrição</Text>
      <TextInput
        value={watch("description")}
        {...register("description")}
        onEndEditing={()=>setFocus("amount")}
        enterKeyHint='next'
        autoFocus={true}
        style={fieldsValidationStatus.description===true?formStyles.textInput:{...formStyles.textInput,borderColor:"red"}} 
        placeholder='Descrição do produto'
        onChangeText={(text)=>setValue("description",text)}/>
      <Text>Quantidade</Text>
      <TextInput
        value={watch("amount")?.toString()}
        onEndEditing={()=>setFocus("price")}
        {...register("amount")}
        enterKeyHint='next'
        keyboardType='numeric'
        style={formStyles.textInput} 
        onChangeText={(text)=>setValue("amount",parseInt(text))}/>
      <Text>Preço (unidade)</Text>
      <MonetaryInput
        initialValue={getValues("price")?.toString()}
        enterKeyHint='enter'
        register={{...register("price")}}
        style={formStyles.textInput} 
        onChangeText={(text)=>setValue('price',parseInt(text))}
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
       <Button  title={submitButtonText} onPress={handleSubmit(getFormData,handleInvalidData)}></Button>
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