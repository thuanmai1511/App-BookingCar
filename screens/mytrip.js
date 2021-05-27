import React, {useState,useEffect} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,ScrollView,TextInput, Alert, Platform ,TouchableOpacity, LogBox,Modal, Pressable,Dimensions ,Linking
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
// import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import host from '../port/index';
import { Ionicons } from '@expo/vector-icons';  

import { Entypo } from '@expo/vector-icons'; 

import imgCar from '../images/imgCar.jpg';

const myTrip = ({navigation,route})=> {
    // Geocoder.init("AIzaSyBHRMxpBKc25CMHY51h1jrnCCm6PjNs62s");
    const [data , getData] = React.useState([])
    

    const  getDataAPI = async () => {
        const idUser = route.params.id;
        await axios.post(`${host}/getDataMyTrip` , {idUser})
        .then(async(res)=>{
            
            getData(res.data)
        
        })
       
    
    }
  
//    console.log(data);
    React.useEffect(()=>{getDataAPI()},[])
    return(
        
        <View style={{flex:1}}>
             <StatusBar  backgroundColor="black" barStyle="light-content"/>
            <ScrollView style={{height: "100%",backgroundColor: '#efefef'}}>
               
            <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20,justifyContent:'center',alignContent:'center'}}>
               

               <View style={{right:40}}>
                   <TouchableOpacity
                   onPress={ () => navigation.goBack()}
                   >
                       <Ionicons name="arrow-back" size={25} color="white" />
                   </TouchableOpacity> 
               </View>
               <TouchableOpacity>
                   <Text key={Math.random()} style={{color: 'white', fontWeight:'bold',fontSize: 14, textAlign:'center'}}>CHUYẾN CỦA TÔI</Text>  
               </TouchableOpacity>
              
               <Text style={{marginHorizontal:30}}></Text> 
               <TouchableOpacity onPress={()=>navigation.navigate("history", {dataNavi : data})}>
                   <Text key={Math.random()} style={{color: 'white', fontWeight:'bold',fontSize: 14, textAlign:'center' }}>LỊCH SỬ</Text> 
               </TouchableOpacity>
             
                 
            
               
              

       </View>
        {
            data.length  ?  <View style={{justifyContent:'center', alignItems:'center'}}>
                
            {
                data.map((it,index)=>(
            <View key={index} style={{width:"100%"}}>
                
                
                    
                <View style={{justifyContent:'center', alignItems:'center',marginTop:20}}>
                            <View style={{borderWidth:1 , width:"90%" , height: 220,borderRadius:5,borderColor:'#e8eaef',backgroundColor: '#f6f6f6'}}>

                                <View style={{flexDirection:'column'}}>
                                    <View style={{justifyContent: 'center' , alignItems:"center"}}>
                                        <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>  
                                            <View style={{marginTop:5,width:100}}>
                                
                                                <Image
                                                source={{uri: host + '/' + it.idCar.imagesCar}}
                                                style={{width: 120, height: 60,borderTopLeftRadius:5, borderTopRightRadius:5}}
                                                
                                                />
                                            </View>
                                            <View style={{justifyContent:'center', alignItems:'center',flexDirection:'row'}}>
                                                <TouchableOpacity onPress={()=>navigation.navigate("detailMyTrip", {id: it._id})}style={{borderWidth:1 , width:80,height:30,marginLeft:40,justifyContent:'center',alignItems:'center',borderColor:'#00a550',borderRadius:5}}>
                                                    <Text style={{fontSize:12 , textAlign:'center',color:'#00a550'}}>Xem chi tiết</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={()=>navigation.navigate("chat",{idH : it.idHost._id ,type: 1})} style={{borderWidth:1 , width:80,height:30,justifyContent:'center',alignItems:'center',borderColor:'#00a550',borderRadius:5,marginLeft:5}}>
                                                    <Text style={{fontSize:12 , textAlign:'center',color:'#00a550'}}>Nhắn tin</Text>
                                                </TouchableOpacity>
                                            </View>
                                           
                                        </View>
                                    </View>
                                <View style={{marginTop:5}}> 
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{paddingHorizontal:15  ,color:'#86929e' ,marginTop:5,width:100,fontSize:12}}>Mẫu xe</Text>
                                        <Text style={{marginTop:5,textAlign:'right',width:200}}>{it.idCar.carModel} {it.idCar.carName}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{paddingHorizontal:15 , color:'#86929e' ,width:100,marginTop:5,fontSize:12}}>Chủ xe</Text>
                                        <Text style={{marginTop:5,width:200,textAlign:'right'}}>{it.idHost.name}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{paddingHorizontal:15 , color:'#86929e' ,width:100,marginTop:5,fontSize:12}}>Ngày</Text>
                                        <Text style={{marginTop:5,width:200,textAlign:'right'}}>{it.currDate}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{paddingHorizontal:15 , width:100 , marginTop: 5 ,color:'#86929e' ,fontSize:12}}>Trạng thái</Text>
                                        
                                            {
                                                it.status == 1 ? <Text style={{marginTop: 5,color:'#00a550',textAlign:'right',width:200}}>Đã được xác nhận</Text> : <Text style={{marginTop: 2,color:'red',textAlign:'right',width:200}}>Chưa xác nhận</Text>
                                            }
                                    </View>
                                    <View style={{justifyContent:'center', alignItems:'center',paddingVertical:15}}>
                                        <View style={{borderWidth:1 , width:"90%" , height: 50,borderRadius:5,borderColor:'#e8eaef',backgroundColor: '#f6f6f6', justifyContent:'center',alignItems:'center'}}>
                                            <View style={{flexDirection:'row'}}>
                                                <Text style={{paddingHorizontal:15 , color:'#86929e' ,width:100,fontSize:12}}>Tổng cộng</Text>
                                                <Text style={{fontWeight:'bold',width:170,textAlign:'right'}}>{Number(it.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
                                            </View>
                                        </View>
                                    </View>
                                    
                                   
                                </View>
                            </View>
                        </View>
                </View>
                <View style={{marginTop:20}}></View>
            </View>
                ))
            }
        </View>
               
     
       :  <View style={{backgroundColor:'white' ,height: Dimensions.get("screen").height }}> 
            <View style={{justifyContent:'center',alignItems:'center',marginTop:100}}>
                    <Text style={{fontSize:12,color:"#73777b"}}>Hiện tại bạn không có chuyến nào.</Text>
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



export default myTrip;


  