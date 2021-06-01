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

import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import host from '../port/index';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import { Entypo } from '@expo/vector-icons'; 
import imgCar from '../images/imgCar.jpg';
import Geocoder from 'react-native-geocoding';

const myCar = ({navigation,route})=> {
    // Geocoder.init("AIzaSyBHRMxpBKc25CMHY51h1jrnCCm6PjNs62s");
    const [data ,setData] = React.useState([])
//    console.log(route.params.id);

    const myOrder = async () => {
        await axios.post(`${host}/myOrders`,{id: route.params.id}).then(async(res)=>{
            setData(res.data)
            // setData([]);
            // res.data.map(dt=>{
            //     if(dt.locationCheckOut.length > 0) {
            //         dt.locationCheckOut.map( async (dtt)=>{
            //             var a = []
            //              const {latitude, longitude} =dtt.coords
            //             //  console.log(latitude , longitude);
            //             const gg = await Geocoder.from({latitude , longitude});
                        
            //             setData(pre => [...pre , {...dt, location : gg.results[0].formatted_address} ])
            //           });
            //     }
            //     else {
            //         setData(pre => [...pre, dt ])
                    
            //     }
             
              
            //   })
      
            
        })
    }
  
    async function sendPushNotification(expoPushToken) {
        const message = {
          to: expoPushToken,
          sound: 'default',
          title: 'BookingCar Application',
          body: 'Yêu cầu duyệt xe của bạn đã được chủ xe xác nhận!',
          data: { someData: 'goes here' },
        };
      
        await fetch('https://exp.host/--/api/v2/push/send', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Accept-encoding': 'gzip, deflate',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        });
      }

 
    const reloadData = () => {
        myOrder()
    }
    React.useEffect(()=>{myOrder()},[])



    // console.log(data);
    return(
        
        <View style={{ flex: 1 , backgroundColor: '#efefef'}}>
        <StatusBar  backgroundColor="black" barStyle="light-content"/>
        <ScrollView>
        <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                    <TouchableOpacity
                       onPress={ () => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>

                    <View style={{flex: 1 }}>
                        <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>DUYỆT XE</Text>    
                    </View> 
                    
                    <TouchableOpacity onPress={reloadData}>
                        <Ionicons name="reload-outline" size={24} color="white"/>
                    </TouchableOpacity>
                
            </View>

           

            
        {
            data.length  ?  <View style={{justifyContent:'center', alignItems:'center'}}>
                
            {
                data.map((it,index)=>(
            <View key={index} style={{width:"100%"}}>
                
                
                    
                <View style={{justifyContent:'center', alignItems:'center',marginTop:20}}>
                            <View style={{borderWidth:1 , width:"90%" , height: 190,borderRadius:5,borderColor:'#e8eaef',backgroundColor: '#f6f6f6'}}>

                                <View style={{flexDirection:'column'}}>
                                    <View style={{justifyContent: 'center' , alignItems:"center"}}>
                                        <View style={{flexDirection:'row'}}>  
                                            <View style={{marginTop:5,width:120}}>
                                                <Avatar.Image
                                                    style={{marginTop: 5}}
                                                    source={{uri: host+"/"+it.idUserCheckOut.images}}
                                                    size={50}
                                                />
                                    
                                            </View>
                                            <View style={{justifyContent:'center', alignItems:'center',flexDirection:'row'}}>
                                                <TouchableOpacity onPress={()=>navigation.navigate("detailMyCar", {id: it._id})}style={{borderWidth:1 , width:80,height:30,justifyContent:'center',alignItems:'center',borderColor:'#00a550',borderRadius:5}}>
                                                    <Text style={{fontSize:12 , textAlign:'center',color:'#00a550'}}>Xem chi tiết</Text>
                                                </TouchableOpacity>
                                                <TouchableOpacity onPress={()=>navigation.navigate("chat" , {idH: it.idUserCheckOut._id, type: 0 })} style={{borderWidth:1 , width:80,height:30,justifyContent:'center',alignItems:'center',borderColor:'#00a550',borderRadius:5,marginLeft:5}}>
                                                    <Text style={{fontSize:12 , textAlign:'center',color:'#00a550'}}>Nhắn tin</Text>
                                                </TouchableOpacity>
                                            </View>
                                            
                                           
                                        </View>
                                    </View>
                                <View style={{marginTop:5}}> 
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{paddingHorizontal:15  ,color:'#86929e' ,marginTop:5,width:100,fontSize:12}}>Khách</Text>
                                        <Text style={{marginTop:5,textAlign:'right',width:200}}>{it.idUserCheckOut.name}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{paddingHorizontal:15 , color:'#86929e' ,width:100,marginTop:5,fontSize:12}}>Ngày</Text>
                                        <Text style={{marginTop:5,width:200,textAlign:'right'}}>{it.dateStart} đến {it.dateEnd}</Text>
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{paddingHorizontal:15 , width:100 , marginTop: 5 ,color:'#86929e' ,fontSize:12}}>Trạng thái</Text>
                                        
                                        {
                                            it.status == 1 ? <View style={{justifyContent:'center',alignItems:'center'}}><Text style={{width:200,textAlign:'right',marginTop:5,color:'#00a550'}}>Đã xác nhận</Text></View> 
                                            :  <View style={{justifyContent:'center',alignItems:'center'}}><Text style={{width:200,textAlign:'right',marginTop:5,color:'red'}}>Chưa xác nhận</Text></View> 
                                       
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


export default myCar;