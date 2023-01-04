import React, { useState } from 'react'
import { View,Text,StyleSheet,Image, Button, Dimensions } from 'react-native';
import * as DocumentPicker from "expo-document-picker";
import firebase from '../database/firebase';
export default function({route,navigation}) {
    const storage = firebase.firebase.storage();
    const {item}=route.params;
    const [file,setFile] = useState('');
    const [progress,setProgress]=useState(0);
    const [mostrarListo,setMostrarListo]=useState('none');
    const selectFile = async()=>{
        try{
            const res = await DocumentPicker.getDocumentAsync({
                type:'*/*'
            });
            if(res.type=='cancel'){console.log('cancelado');}
            console.log(res.uri,res.type,res.name,res.size);
            if(res!=null){
                setFile(res);
                setMostrarListo('flex');
            }
        }catch(error){
            console.log(error);
        }
    }
    const uploadFile=async()=>{
        var storageRef = storage.ref('Documentos/'+file.name);
        let archivo = await fetch(file.uri).then(r => r.blob());
        let uploadTask = storageRef.put(archivo);
        // uploadTask.on('state_changed', function(snapshot){
        //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     setProgress(progress);
        // }, function(error){
        //     console.log("Se ha producido un error:, ", error);
        //   }, function() {
        //     console.log("Carga del archivo completada");
        //   });
        // storageRef.put(archivo).on(firebase.firebase.storage.TaskEvent.STATE_CHANGED,(snapshot)=>{
        //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     setProgress(progress);
        // },(error)=>{
        //     console.log(error.code,error.message);
        // },(snapshot)=>{
        //     storageRef.getDownloadURL().then((downloadURL) => {
        //         console.log('File available at', downloadURL);
        //     });
        // });

        //FUNCIONA ESTO MUESRA SOLO CUANDO LLEGA AL 100%
        storageRef.put(archivo).then(async(snapshot) => {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            await snapshot.ref.getDownloadURL().then((result)=>{
                console.log('Link:  ',result);
            });
        },(error)=>{
            console.log(error.code,error.message);
        });


        // // Listen for state changes, errors, and completion of the upload.
        // uploadTask.on(firebase.firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        // (snapshot) => {
        //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //     setProgress(progress);
        //     console.log('Upload is ' + progress + '% done');
        //     switch (snapshot.state) {
        //         case firebase.firebase.storage.TaskState.PAUSED: // or 'paused'
        //         console.log('Upload is paused');
        //         break;
        //         case firebase.firebase.storage.TaskState.RUNNING: // or 'running'
        //         console.log('Upload is running');
        //         break;
        //     }
        // }, 
        // (error) => {
        //     // A full list of error codes is available at
        //     // https://firebase.google.com/docs/storage/web/handle-errors
        //     switch (error.code) {
        //         case 'storage/unauthorized':
        //         // User doesn't have permission to access the object
        //         break;
        //         case 'storage/canceled':
        //         // User canceled the upload
        //         break;

        //         // ...

        //         case 'storage/unknown':
        //         // Unknown error occurred, inspect error.serverResponse
        //         break;
        //     }
        // },() => {
        //     // Upload completed successfully, now we can get the download URL
        //     uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
        //         console.log('File available at', downloadURL);
        //     });
        //     }
        // );
    }
  return (
    <View style={styles.fondo}>
        <Image source={{uri:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'}} style={styles.img_user}/>
        <Text style={styles.text_details}>{item.name}</Text>
        <Button title='Cargar archivo' style={styles.btn_files} onPress={()=>selectFile()}/>
        <Text style={{display:mostrarListo,color:'green',fontSize:40}}>Listo</Text>
        <Button title='Enviar archivo' style={styles.btn_files} onPress={()=>uploadFile()}/>
        <View style={styles.containerBar}>
            <View style={{backgroundColor:'green',
        width:(Dimensions.get('screen').width*progress)/100,
        height:30}}>
                <Text>{progress} %</Text>
            </View>
        </View>
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
    },
    containerBar:{
        flexDirection:'row',
        width:'100%',
        backgroundColor:'white',
        height:15
    }
});
