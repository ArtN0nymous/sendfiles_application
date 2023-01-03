import React from 'react'
import { View,Text,StyleSheet,Image, Button } from 'react-native';
import * as DocumentPicker from "expo-document-picker";
import firebase from '../database/firebase';
export default function({route,navigation}) {
    const storage = firebase.firebase.storage();
    const {item}=route.params;
    const selectFile = async()=>{
        try{
            const res = await DocumentPicker.getDocumentAsync({
                type:'*/*'
            });
            if(res.type=='cancel'){console.log('cancelado');}
            console.log(res.uri,res.type,res.name,res.size);
        }catch(error){
            console.log(error);
        }
    }
  return (
    <View style={styles.fondo}>
        <Image source={{uri:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'}} style={styles.img_user}/>
        <Text style={styles.text_details}>{item.name}</Text>
        <Button title='Cargar archivo' style={styles.btn_files} onPress={()=>selectFile()}/>
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
