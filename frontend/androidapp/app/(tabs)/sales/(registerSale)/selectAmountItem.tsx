import {Text, View, StyleSheet} from "react-native"



export default function SelectAmountitem(){
    return(
        <View style={styles.container} >
            <View style={styles.backArea}>

            </View>
            <View>
                <Text>Quantidade</Text>
            </View>
            
        </View>
        
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        position:"absolute",
        zIndex:1,
        flexDirection:"column",
        
    },
    backArea:{
        height:"80%",
        backgroundColor:"red",
        
    }
})