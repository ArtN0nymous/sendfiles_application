import React from 'react'
import { View,Text,TouchableOpacity,StyleSheet,Image, Button } from 'react-native'
export default function({route,navigation}) {
    const {item}=route.params;
    console.log(item);
  return (
    <View style={styles.fondo}>
        <Image source={{uri:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'}} style={styles.img_user}/>
        <Text style={styles.text_details}>{item.name}</Text>
        <Button title='Enviar solicitud'/>
        <Button title='Enviar archivo' style={styles.btn_files}/>
    </View>
  )
}
const styles = StyleSheet.create({
    fondo:{
        backgroundColor:'black',
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'space-evenly'
    },
    img_user:{
        width:200,
        height:200
    },
    text_details:{
        color:'white',
        fontSize:20
    },
    btn_files:{
        display:'flex'
    }
});
