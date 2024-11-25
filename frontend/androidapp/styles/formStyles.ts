import {StyleSheet} from "react-native"

const formStyles= StyleSheet.create({
    container:{
      backgroundColor:"#fff",
      flex: 1, 
      alignItems: 'center', 
      justifyContent: 'flex-start',
      borderRadius:20,
    },
    textInput:{
      borderWidth:1,
      width:"80%",
      margin:10,
      padding:10
  },
  label:{
      margin:10,
      fontSize: 18,
      height: 44,
  }
  })

  export default formStyles;