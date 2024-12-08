
import { router} from 'expo-router';
import {  useContext,  } from 'react';
import RefreshListsContext from '@/contexts/refreshListsContext';
import Product from '@/models/Product';
import { Toast } from 'toastify-react-native';
import ProductForm from '@/components/ProductForm';
import { postProduct } from '@/backednAPIRequests/productRequests';


const showToasts = (product:Product) => {
  Toast.success(`Produto ${product.description} cadastrado!`);
};


export default function productRegisterForm() {

  const {refreshProductListNow}=useContext(RefreshListsContext)
 

  async function save(product:Product){
    console.log(product)
    const registredProduct=await postProduct(product)
    refreshProductListNow()
    showToasts(registredProduct)
    router.back()
   }

  const isPresented = router.canGoBack();
  
  return  <ProductForm getFormData={save} submitButtonText='salvar'/>
}




