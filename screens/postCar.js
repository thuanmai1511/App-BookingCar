import React, {useState,useEffect} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,ScrollView,TextInput, Alert, Platform ,TouchableOpacity, LogBox
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

const postCar = ({navigation,route})=> {

    const [dataCar , setDataCar] = React.useState([])

    const detailCar = async (id) => {
        const ids = id;
        navigation.navigate("detailCar",{ids})
     
        
    }
    const getDataCarType = async () => {
        const title = route.params.title;
        // console.log(title);
        await axios.get(`${host}/getDetailCar/type=`+title).then((res)=>{
            console.log(res.data);
            res.data.map((val)=>{
         
                if(val.status == true){
                    setDataCar(previous=>[...previous, val])
                }else {
    
                }              
           })
        })
    }
    React.useEffect(()=>{getDataCarType()},[])



    
    return(
        
        <View style={{ flex: 1 , backgroundColor: '#d6d9dc'}}>
        <StatusBar  backgroundColor="black" barStyle="light-content"/>
        <ScrollView>
        <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                <TouchableOpacity
                   onPress={ () => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={25} color="white" />
                </TouchableOpacity>

                <View style={{flex: 1 }}>
                   
                    <Text key={Math.random()} style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>{route.params.title}</Text>   
                </View> 
                
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="black" style={{opacity: 0}}/>
                </TouchableOpacity>
            
        </View>
        <View style={{flexDirection:'row', marginTop: 15,justifyContent:'center', alignItems:'center'}}>
            
            <TouchableOpacity style={{ height: 25, width: 100, borderRadius:15, backgroundColor:'#ffffff', marginHorizontal: 10}}>
                <Text style={{textAlign:'center', paddingTop: 4, fontSize: 12}}><Ionicons name="car-sport-outline" style={{fontSize: 14}}></Ionicons>Loại xe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 25, width: 100, borderRadius:15, backgroundColor:'#ffffff',marginHorizontal: 10}}>
                <Text style={{textAlign:'center',paddingTop: 4, fontSize: 12}}><Ionicons name="car-sport-outline" style={{fontSize: 14}}></Ionicons>Loại xe</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{ height: 25, width: 100, borderRadius:15, backgroundColor:'#ffffff', marginHorizontal: 10}}>
                <Text style={{textAlign:'center',paddingTop: 4, fontSize: 12}}><Ionicons name="car-sport-outline" style={{fontSize: 14}}></Ionicons>Loại xe</Text>
            </TouchableOpacity>
        </View>

            {
                dataCar.map((item,index)=>(
            <TouchableOpacity 
                key={index}
                onPress={()=>detailCar(item._id)}
            >  

                <View style={{justifyContent:'center', alignItems:'center',marginTop: 10}}>
                <View style={{width:"90%", height:200}}>
                <Image
                    source={{uri: host + '/' + item.imagesCar}}
                    style={{width:"100%", height: "100%"}}
                />
            </View>
            <View style={{width:"90%", height:120, backgroundColor:"#ffffff",borderBottomEndRadius:5,borderBottomLeftRadius: 5,shadowColor: "#000",
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
                     <View style={{flexDirection:'row'}}>
                        <Text style={{left:70,color:'#00a550',fontSize:18,fontWeight:'bold'}}>
                        {Number(item.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                        </Text>
                        <Text style={{left:70,fontSize:12,marginTop:5}}>/ngày</Text>
                    </View>
                    
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
           
                ))
            }
            
        
          

      </ScrollView>
</View>
    )
}



export default postCar;