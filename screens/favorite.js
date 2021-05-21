import React, {useState,useEffect} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,ScrollView,TextInput, Alert, Platform ,TouchableOpacity, LogBox ,Dimensions
} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    Switch

} from 'react-native-paper';

import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import host from '../port/index';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import RNPickerSelect from 'react-native-picker-select'; 
import * as ImagePicker from 'expo-image-picker';
import Textarea from 'react-native-textarea';
import { Feather } from '@expo/vector-icons'; 
import imgCar from '../images/imgCar.jpg';
const favorites = ({navigation,route})=> {

    const [data , setData]  = React.useState([])

    const getFavoriteCars = async () => {
        const idu = route.params.id;
       
        await axios.post(`${host}/getfavoriteCar`,{idu})
        .then(res=>{
            setData(res.data)
            // setData(pre=>[...pre, res.data])
            

        })
    }
    const detailCars = async (id) => {
        const ids = id;
        navigation.navigate("detailCar",{ids})
     
        
    }
    const reloadPage = async () => {
        // window.location.reload(false);
        getFavoriteCars()
        // navigation.replace("notification"\)
    }

//    console.log(data);
    React.useEffect(()=>{getFavoriteCars()},[])



    
    return(
        
        <View style={{flex: 1 }}>
        <StatusBar  backgroundColor="black" barStyle="light-content"/>
        <ScrollView style={{height: "100%",backgroundColor: '#d6d9dc'}}>
        <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                <TouchableOpacity
                   onPress={ () => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={25} color="white" />
                </TouchableOpacity>

                <View style={{flex: 1 }}>
                   
                    <Text key={Math.random()} style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>XE YÊU THÍCH</Text>   
                </View> 
                
                <TouchableOpacity onPress={reloadPage}>
                    <Ionicons name="reload-outline" size={24} color="white" />
                </TouchableOpacity>
            
         </View>
         {
             data.length ? 
             <View>

{
            data.map((item,index)=>(
                <View key={index}>
                     <TouchableOpacity 
                
                onPress={()=>detailCars(item._id)}
            >  

                <View style={{justifyContent:'center', alignItems:'center',marginTop: 10}}>
                <View style={{width:"90%", height:200}}>
                <Image
                    source={{uri: host + '/' + item.imagesCar}}
                    style={{width:"100%", height: "100%"}}
                />
            </View>
            <View style={{width:"90%", height:120, backgroundColor:"#ffffff",borderBottomEndRadius:5,borderBottomLeftRadius: 5, shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,}}>
                <Text  style={{marginTop: 10,marginLeft: 10,fontSize: 15,fontWeight:'bold'}}>{item.carModel} {item.carName}</Text>
                <View style={{flexDirection:'row'}}>
                     <Text style={{marginTop: 5,marginLeft: 10}}>5.0 <Ionicons name="star-outline" style={{color:'green', fontSize: 14}}></Ionicons> </Text>
                     <Text style={{marginTop: 7,marginLeft: 10,fontSize: 12}}>22 chuyến</Text>
                    
                    
                </View>
                <View style={{flexDirection:'row',marginTop:7}}>
                     <Text style={{paddingTop: 2,marginLeft: 10, fontSize: 11,backgroundColor:'#e4e6e8', width: 80 , textAlign:'center',borderRadius:5,height:20}}>{item.transmission}</Text>
                     <Text style={{paddingTop: 2,marginLeft: 10, fontSize: 11,backgroundColor:'#e4e6e8', width: 80 , textAlign:'center',borderRadius:5,height:20}}>{item.fuel}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop: 10,marginLeft: 10}}><Ionicons name="location-outline" style={{ fontSize: 14}}></Ionicons></Text>
                    <Text style={{marginTop: 9,marginLeft: 5, fontSize:12}}>{item.ward} , {item.district} , {item.address}</Text>
                </View>
                
            </View>

                </View> 
                <View style={{marginTop:10}}></View>
           </TouchableOpacity>     
                </View>
           
           
                ))
            }
            

             </View>
             :
         <View style={{backgroundColor:'white' ,height: Dimensions.get("screen").height }}> 
            <View style={{justifyContent:'center',alignItems:'center',marginTop:100}}>
                    <Text style={{fontSize:12,color:"#73777b"}}>Hiện tại bạn chưa có xe yêu thích.</Text>
                </View>
            <View style={{justifyContent:'center',alignItems:'center',marginTop:20,backgroundColor:'#fff'}}>
                
                <Image  style={{width:"100%" , height:250}} source={imgCar}/>
                    
                </View>
         </View>
         }
    
       
        
          

      </ScrollView>
</View>
    )
}



export default favorites;