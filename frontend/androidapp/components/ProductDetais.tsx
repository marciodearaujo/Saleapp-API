import Product from "@/models/Product"
import { View, Text, StyleSheet} from "react-native"

interface Props{
    product:Product
}

export default function ProductDetails({product}:Props){
    return(
        <View style={styles.detailArea}>
                <Text style={styles.text}>Descrição: {product.description}</Text>
                <Text style={styles.text}>Preço: {("R$ "+product.price).replace(".",",")}</Text>
                <Text style={styles.text}>Quantidade: {product.amount}</Text>
                <Text style={styles.text}>Sexo: {product?.sex==="both"?"Unissex":product?.sex==="female"?"Feminino":"Masculino"}</Text>
        </View>
    )
}

const styles=StyleSheet.create({
    detailArea:{
        flex:1,
        justifyContent:"flex-start",
    },
    text:{
        fontSize: 18,
        height: 44,
        margin:10
    },
})