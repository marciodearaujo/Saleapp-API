import Item from "@/models/Item"
import Product from "@/models/Product"
import {View, Text, StyleSheet, FlatList } from "react-native"


interface props{
    saleDate:string,
    clientName:string,
    saleItems:Item[],
    products:Product[]
}

export default function SaleDetails({saleDate,clientName,saleItems,products}:props){
    return(
            <View style={styles.container}>
                <View>
                    <Text >Data: {saleDate}</Text>
                    <Text >Cliente: {clientName}</Text>   
                </View>
                <View style={styles.productsArea}>
                    <Text>Produtos:</Text>
                    <FlatList style={styles.flatList}
                        data={saleItems}
                        renderItem={({item}) =>{
                          const product=products.filter((product)=>product.id===item.productId)[0]
                        return <View  key={item.id} style={styles.itens}>
                            <Text style={styles.itemText}>{product.description}</Text>
                            <Text style={styles.itemText}>Quantidade:{item.amount}</Text>
                        </View>}}
                    />
                </View>          
            </View>   
    )

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection:"column",
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingBottom:20
    },
    flatList:{
      alignSelf:"flex-start"
    },
    itemText: {
      padding: 10,
      fontSize: 18,
      height: 44,
    },
    textInput:{
      borderWidth:1,
      width:"90%",
      margin:10,
      padding:10,
  },
  itens:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-between',
    width:"90%",
    margin:20,
    borderBottomWidth:1
  },
  icons:{
    flex:1,
    flexDirection:'row',
    justifyContent:'space-around',
    alignSelf:'flex-end',
    width:"40%"
  },
  viewText:{
    width:"60%"
  },
  productsArea:{
    flex:1,
    flexDirection:"column",
    justifyContent:"center"
  }
  });