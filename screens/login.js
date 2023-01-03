import react,{useState} from "react";
import { StyleSheet,View,TextInput,Button } from "react-native";
import firebase from "../database/firebase";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function({navigation}){
    const auth = firebase.auth;
    const [email,setEmail]=useState('');
    const [accessCode,setAccessCode]=useState('');
    var localstorage=new Storage({
        size:1000,
        storageBackend:AsyncStorage,
        defaultExpires:null,
        enableCache:false
    });
    global.localStorage=localstorage;
    const loginIn=async()=>{
        auth.signInWithEmailAndPassword(email,accessCode).then((result)=>{
            localstorage.save({
                key:'user',
                data:result
            }).then((result)=>{
                navigation.push('Usuarios');
            }).catch((error)=>{
                console.log(error.code+' '+error.message);
            });
        }).catch((error)=>{
            console.log(error.code+' '+error.message);
        });
    }
    return(
        <View style={styles.container}>
            <TextInput onChangeText={(value)=>setEmail(value)} style={styles.inputs} placeholder='Email'/>
            <TextInput onChangeText={(value)=>setAccessCode(value)} style={styles.inputs} placeholder='Password' secureTextEntry={true}/>
            <Button title="Inicias Sesion" onPress={()=>loginIn()}/>
        </View>
    );
}
const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'green',
        flexDirection:'column',
        alignItems:'center',
        justifyContent:'center'
    },
    inputs:{
        fontSize:14,
        width:300,
        backgroundColor:'white',
        borderRadius:3,
        marginBottom:3
    }
});