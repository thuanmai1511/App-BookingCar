import React, {useState,useEffect} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,ScrollView,TextInput, Alert, Platform ,TouchableOpacity, LogBox , Dimensions
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

import axios from 'axios';
import host from '../port/index';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import { FontAwesome } from '@expo/vector-icons'; 
import imgCar from '../images/imgCar.jpg';

const notification = ({navigation,route})=> {
   
    const [data , setData] = React.useState([])
    
    const getData  = async ()  =>{
        const value = await AsyncStorage.getItem('id');

        await axios.post(`${host}/dataNoti`, {value}).then(res=>{
            setData(res.data)
        })
        
    }
    const reloadPage = async () => {
        // window.location.reload(false);
        getData()
        // navigation.replace("notification"\)
    }

    React.useEffect(()=>{ getData() } , [])

// console.log(data);

    
    return(
        
        <View style={{  backgroundColor: '#ffffff',height:"100%"}}>
       
       <ScrollView> 
       <View style={{ flexDirection: 'row', backgroundColor:'black',alignItems:"center", marginTop: 30, padding: 20}}>
                    <TouchableOpacity
                       onPress={ () => navigation.goBack()}
                    >
                        <FontAwesome name="times" size={25} color="white"/>
                    </TouchableOpacity>

                    <View style={{flex: 1 }}>
                        <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>THÔNG BÁO</Text>    
                    </View> 
                    <TouchableOpacity onPress={reloadPage}>
                        <Ionicons name="reload-outline" size={24} color="white"/>
                    </TouchableOpacity>
                
            </View>

            {
                data.length ? 
                <View>
                {
                   data.map((dt , index)=>(
                       <View key={index}>
                           <TouchableOpacity >
                            <View style={{width: '100%' , height:100,backgroundColor:'#e1f5fe',borderBottomColor:'#e8eaef',borderBottomWidth:1}}>
                                    <View style={{flexDirection:'row'}}>
                                        {
                                            dt.car ?  <Avatar.Image
                                            source={{uri: host + '/' + dt.car.imagesCar}}
                                            size={70}
                                            style={{marginTop:10,marginLeft:10}}           
                                        /> : <Avatar.Image
                                            source={{uri:"https://cdn.dribbble.com/users/158698/screenshots/3278965/170209___.png?compress=1&resize=400x300"}}
                                            size={70}
                                            style={{marginTop:10,marginLeft:10}}           
                                    /> 
                                        }
                                       
                                        <View style={{flexDirection:'column'}}>
                                            <Text style={{fontWeight:'bold',marginTop:10,marginLeft:10,fontSize:15}}>{dt.title}</Text>
                                            <Text style={{width:260,marginLeft:10,marginTop:5,fontSize:12,textAlign:'left',height:35}}>{dt.idHost ? dt.idHost.name : '' } ơi!! {dt.text}.</Text>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{marginLeft:10 , marginTop:5 , fontSize:11,color:'gray'}}>{dt.date}</Text>
                                                <Text style={{marginLeft:5 , marginTop:5 , fontSize:11,color:'gray'}}>{dt.time}</Text>
                                            </View>
                                   
                                        </View>
                        
                                    </View>
                    
                                </View>

                           
                           </TouchableOpacity>
                           
                        </View>
                   ))
                }
                <View style={{marginTop:5}}></View>
            </View>
            : 
            <View style={{backgroundColor:'white' ,height: Dimensions.get("screen").height }}> 
            <View style={{justifyContent:'center',alignItems:'center',marginTop:100}}>
                    <Text style={{fontSize:12,color:"#73777b"}}>Hiện tại bạn chưa có thông báo nào.</Text>
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



export default notification;