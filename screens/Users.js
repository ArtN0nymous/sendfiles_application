import React,{useEffect,useState} from "react";
import firebase from "../database/firebase";
import { View, StyleSheet,Text,Button,Dimensions,FlatList,Image, TouchableOpacity } from "react-native";
import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function({navigation}){
    const db= firebase.db;
    const auth=firebase.auth;
    const numColumns = 2;
    const [datos,setDatos]=useState([]);
    var localstorage=new Storage({
        size:1000,
        storageBackend:AsyncStorage,
        defaultExpires:null,
        enableCache:false
    });
    global.localStorage=localstorage;
    //const data = [{name:'usuario1',url_img:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'},{name:'usuario2',url_img:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'}];
    const formatData = (data,numColumns)=>{
        const n_filas = Math.floor(data.length/numColumns);
        let n_element_lastrow = data.length-(n_filas);
        return data;
    }
    const [btnRegistro,setBtnRegistro]=useState('flex');
    const [btnLogin,setBetnLogin]=useState('none');
    const [btnLogout,setBtnLogout]=useState('none');
    const header = (
        <>
            <View style={styles.contenedor_head}>
                <View style={{display:btnRegistro}}>
                    <Button style={styles.register_button} title='Registrarme' onPress={()=>navigation.navigate('Registro')} />
                </View>
                <View style={{display:btnLogin}}>
                    <Button style={styles.register_button} title='Login' onPress={()=>navigation.navigate('Login')} />
                </View>
                <View style={{display:btnLogout}}>
                    <Button style={styles.register_button} title='Cerrar Sesión' onPress={()=>logout()} />
                </View>
            </View>
        </>
    );
    useEffect(()=>{
        loadData();
    },[])
    function loadData(){
        try{
            localstorage.load({key:'user'}).then((result)=>{
                let data = [];
                db.collection('users').onSnapshot((result)=>{
                    result.forEach((doc)=>{
                        data.push(doc);
                    });
                    setDatos(data);
                });
                setBtnRegistro('none');
                setBtnLogout('flex');
            }).catch((error)=>{
                setBetnLogin('flex');
            });
        }catch(error){
            console.log(error.code+' '+error.message);
        }
    }
    const logout=async()=>{
        await auth.signOut().then((result)=>{
            localstorage.remove({key:'user'});
            loadData();
            setBtnLogout('none');
            setBtnRegistro('flex');
        }).catch((error)=>{
            console.log(error.code+' '+error.message);
        });
    }
    const footer = (
        <>
        <View>
            <Text>Footer</Text>
        </View>
        </>
    );
    const renderItem = ({item,index})=>{
        return(
            <>
                <TouchableOpacity onPress={()=>navigation.navigate('Detalles',{item:item.data()})} activeOpacity={0.6}>
                    <View style={styles.contenedor_tarjeta}>
                        <View style={styles.row}>
                            <Image source={{uri:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'}} style={styles.img_profile_tarjet}/>
                            <Text>{item.data().name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                
            </>
        );
    }
    return(
        <View style={styles.fondo}>
            <FlatList ListHeaderComponent={header}  ListFooterComponent={footer} data={formatData(datos,numColumns)} renderItem={renderItem} numColumns={numColumns}/>
        </View>
    );
}
const styles = StyleSheet.create({
    fondo:{
        flex: 1,
        backgroundColor: 'blue',
        alignItems: 'center',
        flexDirection:'column',
    },
    register_button:{
        alignSelf:'flex-end',
        right:10
    },
    contenedor_head:{
        flexDirection:'row',
        justifyContent:'flex-end',
        width:(Dimensions.get('screen').width*80)/100,
    },
    contenedor_tarjeta:{
        backgroundColor:'gray',
        borderRadius:5,
        margin:1,
        padding:2
    },
    row:{
        flexDirection:'row'
    },
    img_profile_tarjet:{
        width:20,
        height:25,
        margin:1
    }
});