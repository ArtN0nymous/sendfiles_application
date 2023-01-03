import React from 'react';
import { View, Button, Text, StyleSheet,TextInput,Dimensions } from 'react-native';
export default function (){
    const guardar=()=>{
        //guardar usuario
    }
    return(
        <View style={styles.container}>
            <TextInput style={styles.inputs} placeholder='Nombre de usuario' maxLength={50}/>
            <TextInput secureTextEntry={true} placeholder='Contraseña' style={styles.inputs} maxLength={20}/>
            <Button title='Guardar' onPress={()=>guardar()}/>
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