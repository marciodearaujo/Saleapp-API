import { View, StyleSheet, Button, Text, TextInput} from 'react-native';
import { Link, router} from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import {object,string,number} from 'yup'
import { FieldErrors, useForm } from 'react-hook-form';
import { useEffect, useContext, useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import formStyles from '@/styles/formStyles';
import { CheckBox } from 'react-native-elements'
import GlobalAppContext from '@/contexts/globalAppContext';
import MonetaryInput from '@/components/MonetaryInput';
import {url} from "./index"
import Product from '@/models/Product';
import ToastManager, { Toast } from 'toastify-react-native';
import ProductForm from '@/components/ProductForm';
import { postProduct } from '@/backednAPIRequests/productRequests';


const showToasts = (product:Product) => {
  Toast.success(`Produto ${product.description} cadastrado!`);
};


export default function productRegisterForm() {

  const {refreshProductListNow}=useContext(GlobalAppContext)
 

  async function save(product:Product){
    const registredProduct=await postProduct(product)
    refreshProductListNow()
    showToasts(registredProduct)
    router.back()
   }

  const isPresented = router.canGoBack();
  
  return  <ProductForm getFormData={save} submitButtonText='salvar'/>
}




