
import { router,useLocalSearchParams } from 'expo-router';
import { useContext,} from 'react';
import RefreshListsContext from '@/contexts/refreshListsContext';
import { updateProduct } from '@/backednAPIRequests/productRequests';
import Product from '@/models/Product';
import ProductForm from '@/components/ProductForm';




export default function productEditForm() {
  const selectedProduct=useLocalSearchParams()
  const {refreshProductListNow}=useContext(RefreshListsContext)
  
 
 const initialPrice=useLocalSearchParams().price
  

  async function update(data:Product){
    if(typeof selectedProduct.id==="string")
    await updateProduct({id:parseInt(selectedProduct.id),...data})
    refreshProductListNow()
    router.back()
  
   }

  const isPresented = router.canGoBack();
 
  return <ProductForm getFormData={update} submitButtonText='aualizar' defValues={selectedProduct}/>
}

