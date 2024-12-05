
    
import { View, StyleSheet, Button, Text, TextInput} from 'react-native';
import { Link, router} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {object,string,number} from 'yup'
import { FieldErrors, useForm } from 'react-hook-form';
import { useEffect, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import formStyles from '@/styles/formStyles';
import { CheckBox } from 'react-native-elements'
import GlobalAppContext from '@/contexts/refreshListsContext';
import MonetaryInput from '@/components/MonetaryInput';
import Product from '@/models/Product';


const productSchema = object({
  id:number(),
  description: string().required("A descrição do produto deve ser informada"),
  price: number().required("O preço do produto deve ser informado"),
  amount:number().required(),
  sex:string()
});

interface Props{
    getFormData:(data:Product)=>void,
    submitButtonText:string,
    defValues?:Partial<Product>
}
export default function ProductForm({getFormData,submitButtonText,defValues}:Props) {

  const [descriptionIsValid,setDescriptionIsValid]=useState(true)
  const { register, setValue, handleSubmit, watch, setFocus, getValues} = useForm<Product>({
          resolver: yupResolver(productSchema),
        defaultValues:defValues})

  
  
  useEffect(()=>{
    register('sex')
   !getValues("sex")&&setValue('sex','both')
  },[])

 
   async function handleInvalidData(errors:FieldErrors<Product>){
    type erro={
      field:keyof Product,
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
        value={watch("description")}
        {...register("description")}
        onEndEditing={()=>setFocus("amount")}
        enterKeyHint='next'
        autoFocus={true}
        style={descriptionIsValid===true?formStyles.textInput:{...formStyles.textInput,borderColor:"red"}} 
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
        placeholder='Ex: 10'
        onChangeText={(text)=>setValue("amount",parseInt(text))}/>
      <Text>Preço (unidade)</Text>
      <MonetaryInput
        initialValue={getValues("price")?.toString()}
        enterKeyHint='enter'
        register={{...register("price")}}
        style={formStyles.textInput}
        placeholder='Ex: 9999'
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