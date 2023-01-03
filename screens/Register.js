import React,{useState} from 'react';
import firebase from '../database/firebase';
import { View, Button, Text, StyleSheet,TextInput,Dimensions } from 'react-native';
export default function ({navigation}){
    const db = firebase.db;
    const auth = firebase.auth;
    const [email,setEmail]=useState('');
    const [name,setName]=useState('');
    const [accessCode,setAccessCode]=useState('');
    function validarDatos(){
        if(email.length>=5){
            if(name.length>=5){
                if(accessCode.length>=8){
                    registrar();
                }else{
                    alert('The password must have a minimum 8 of characters');
                }
            }else{
                alert('El nombre debe tener almenos 5 caracteres');
            }
        }else{
            alert('Debe ser un email valido');
        }
    }
    const registrar= async()=>{
        await auth.createUserWithEmailAndPassword(email,accessCode).then((userCredentials)=>{
            guardar();
        }).catch((error)=>{
            console.log(error.code+' '+error.message);
            if(error.code=='auth/invalid-email'){
                alert('Email no valido');
            }
        });
    }
    const guardar=()=>{
        db.collection('users').add({
            name:name,
            email:email
        }).then((result)=>{
            navigation.goBack();
        }).catch((error)=>{
            console.log(error.code+' '+error.message);
        });
    }
    return(
        <View style={styles.container}>
            <TextInput style={styles.inputs} placeholder='Correo electronico' maxLength={20} onChangeText={(value)=>setEmail(value)}/>
            <TextInput style={styles.inputs} placeholder='Nombre de usuario' maxLength={20} onChangeText={(value)=>setName(value)}/>
            <TextInput secureTextEntry={true} placeholder='Contraseña' style={styles.inputs} maxLength={20} onChangeText={(value)=>setAccessCode(value)}/>
            <Button title='Guardar' onPress={()=>validarDatos()}/>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'gray',
        justifyContent:'center',
        alignItems:'center'
    },
    inputs:{
        fontSize:14,
        width:300,
        backgroundColor:'white',
        borderRadius:3,
        marginBottom:3
    }
});