import {  useRef, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { TextInput, View, StyleSheet} from "react-native";

interface PhoneInputProps{
    style:{},
    defaultValue?:string,
    onChangeText:(text:string)=>void,
    register:UseFormRegisterReturn<"phone">
}

export default function PhoneInput({defaultValue,onChangeText,style,register}:PhoneInputProps){
    const [value,setValue]=useState<string>(defaultValue?defaultValue:"")
    const regex= new RegExp(/[^0-9]/)
    onChangeText(value)

    const textInputRef=useRef<TextInput | null>(null)

    function handleEspecialCharacter(text:string):string{
        if(text.endsWith(",")||text.endsWith(".")|| text.endsWith(" "))
            return text.slice(0,text.length-1)
        return text
    }


    function handleChangeText(text:string){
        console.log(text)
        const handledText=handleEspecialCharacter(text)
        if(handledText.length===2 && handledText.length>=value.length) 
            setValue("("+handledText+")")   
        else if(handledText.length===9 && handledText.length>=value.length)
            setValue(handledText+"-")      
        else if(handledText.length<value.length&&value.endsWith("-"))
           setValue(handledText.slice(0,handledText.length-1))
        else if(handledText.length<value.length&&value.endsWith(")"))
            setValue("")
        else
           setValue(handledText)
            
    }
    return(
        <View style={styles.container}>
            <TextInput
                {...register}
                style={style}
                selection={{start:value.length,end:value.length}}
                maxLength={14}
                placeholder='Ex: 21999999999'
                keyboardType="numeric"
                onChangeText={handleChangeText}
                value={value}   
            />
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