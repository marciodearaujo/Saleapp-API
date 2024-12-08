import { View, StyleSheet, EnterKeyHintTypeOptions } from "react-native";
import { TextInput } from "react-native";
import { useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";



interface props  {
        register:UseFormRegisterReturn<"price">
        style:{},
        placeholder?:string,
        onChangeText:(text:string)=>void
        initialValue?:string
        enterKeyHint?:EnterKeyHintTypeOptions | undefined
}
export default function MonetaryInput({placeholder,onChangeText,initialValue,style,register,enterKeyHint}:props){
    const [localValue,setlocalValue]=useState<number>(initialValue?parseFloat(initialValue):0)
    
   

    onChangeText(localValue.toString())


    function handleChangeText(text:string){
        const textNumberPart=text.split(" ")[1].replace(",",".")
            if(text.length<8 && localValue===0){
                setlocalValue(0)
            }else if(text.endsWith(",")||text.endsWith(".")||text.endsWith("-")||text.endsWith(" ")){
                setlocalValue(parseFloat(textNumberPart))
            }else if(localValue.toFixed(2).length>textNumberPart.length){
                setlocalValue(parseFloat(textNumberPart)/10)
            }else{
                setlocalValue(parseFloat(textNumberPart)*10)
            }
    }

    return(
        <View style={styles.container}>
            <TextInput
            enterKeyHint={enterKeyHint}
            {...register}
            selection={{start:("R$:  "+localValue.toFixed(2)).length,end:("R$:  "+localValue.toFixed(2)).length}}
            maxLength={15}
            value={"R$: "+localValue.toFixed(2).replace(".",",")}
            style={style}
            placeholder={placeholder}
            keyboardType="numeric"
            onChangeText={handleChangeText}/>
        </View>
    )
}

const styles= StyleSheet.create({
    container:{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center"
    },
})