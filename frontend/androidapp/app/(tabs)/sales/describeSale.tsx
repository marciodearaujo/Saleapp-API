import { router, useLocalSearchParams} from "expo-router";
import { View, Button, StyleSheet, Alert} from "react-native";
import RefreshListsContext from "@/contexts/refreshListsContext";
import { useContext, useEffect, useLayoutEffect, useState } from "react";
import SaleDetails from "@/components/SaleDetails"
import Item from "@/models/Item";
import Product from "@/models/Product";
import { getProducts } from "@/backednAPIRequests/productRequests";
import { getSaleItems } from "@/backednAPIRequests/saleRequests";
import { narrowingToString } from "@/utils/utilsFunctions";


export default function DescribeSale(){
    const {refreshSaleList,refreshProductList}=useContext(RefreshListsContext)
    const [saleItems,setSaleItems]=useState<Array<Item> | null>(null)
    const [products,setProducts]=useState<Array<Product> | null>(null)

    
    const saleId=narrowingToString(useLocalSearchParams().id)
    const saleDate=narrowingToString(useLocalSearchParams().saleDate)
    const clientName=narrowingToString(useLocalSearchParams().clientName)

    
  

    useEffect(()=>{
        setProductsList()
        setSaleItemsList()
    },[refreshSaleList,refreshProductList])


    async function setProductsList(){
      const products= await getProducts()
      setProducts(products)
    }


    async function setSaleItemsList(){
      const saleItems= await getSaleItems(parseInt(saleId))
      setSaleItems(saleItems)
    }
    
  
   
  
    return(
        <View style={styles.container}>
            <SaleDetails saleDate={saleDate} clientName={clientName} saleItems={saleItems} products={products}/>
            <View style={styles.actionBar}>
                <Button onPress={()=>router.back()} title="voltar"/>
            </View>    
        </View>
    )

}

const styles=StyleSheet.create({
    container: {
        padding:10,
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection:"column",
        paddingBottom:30
      },
    text:{
        fontSize: 18,
        height: 44,
        margin:10
    },
    actionBar:{
        flexDirection:"row",
        justifyContent:"space-evenly",
    },
})