import Client from "@/models/Client"
import {View, Text, StyleSheet } from "react-native"

interface props{
    clientData:Client
}

export default function ClientDetails({clientData}:props){
    return(
            <View style={styles.container}>
                <Text style={styles.text}>Nome: {clientData.name}</Text>
                <Text style={styles.text}>Telefone: {clientData?.phone}</Text>          
            </View>   
    )

}

const styles=StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"flex-start",
    },
    text:{
        fontSize: 18,
        height: 44,
        margin:10
    },
})
