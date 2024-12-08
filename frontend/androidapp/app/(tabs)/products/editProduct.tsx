
import { router,useLocalSearchParams } from 'expo-router';
import { useContext,} from 'react';
import RefreshListsContext from '@/contexts/refreshListsContext';
import { updateProduct } from '@/backednAPIRequests/productRequests';
import Product from '@/models/Product';
import ProductForm from '@/components/ProductForm';
import { narrowingToString } from '@/utils/utilsFunctions';




export default function productEditForm() {
  const selectedProduct=useLocalSearchParams()
  const {refreshProductListNow}=useContext(RefreshListsContext)
  const initialPrice=useLocalSearchParams().price
  const productId=narrowingToString(selectedProduct.id)
  

  async function update(data:Product){
    await updateProduct({id:parseInt(productId),...data})
    refreshProductListNow()
    router.back()
  
   }

  const isPresented = router.canGoBack();
 
  return <ProductForm getFormData={update} submitButtonText='aualizar' defValues={selectedProduct}/>
}

