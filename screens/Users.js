import React from "react";
import { View, StyleSheet,Text,Button,Dimensions,FlatList,Image, TouchableOpacity } from "react-native";
export default function({navigation}){
    const numColumns = 2;
    const data = [{name:'usuario1',url_img:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'},{name:'usuario2',url_img:'https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png'}];
    const formatData = (data,numColumns)=>{
        const n_filas = Math.floor(data.length/numColumns);
        let n_element_lastrow = data.length-(n_filas);
        return data;
    }
    const header = (
        <>
            <View style={styles.contenedor_head}>
                <Button style={styles.register_button} title='Registro' onPress={()=>navigation.navigate('Registro')} />
            </View>
        </>
    );
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
                <TouchableOpacity onPress={()=>navigation.navigate('Detalles',{item:item})} activeOpacity={0.6}>
                    <View style={styles.contenedor_tarjeta}>
                        <View style={styles.row}>
                            <Image source={{uri:item.url_img}} style={styles.img_profile_tarjet}/>
                            <Text>{item.name}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </>
        );
    }
    return(
        <View style={styles.fondo}>
            <FlatList ListHeaderComponent={header}  ListFooterComponent={footer} data={formatData(data,numColumns)} renderItem={renderItem} numColumns={numColumns}/>
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