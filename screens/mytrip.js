import React, {useState,useEffect} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,ScrollView,TextInput, Alert, Platform ,TouchableOpacity, LogBox,Modal, Pressable,Dimensions
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
import Geocoder from 'react-native-geocoding';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import host from '../port/index';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import RNPickerSelect from 'react-native-picker-select'; 
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons'; 

import imgCar from '../images/imgCar.jpg';

const myTrip = ({navigation,route})=> {
    Geocoder.init("AIzaSyBHRMxpBKc25CMHY51h1jrnCCm6PjNs62s");
    const [data , getData] = React.useState([])
    

    const  getDataAPI = async () => {
        // console.log(route.params.id);
        const idUser = route.params.id;
        await axios.post(`${host}/getDataMyTrip` , {idUser})
        .then(async(res)=>{
            
            
            let datas = res.data
            // console.log(res.data);
            let a = []
            for (var b of datas){
                const {latitude, longitude} =b.idCar.location.coords
                const gg = await Geocoder.from({
                    latitude,
                    longitude
                });

                b['address'] = gg.results[0].formatted_address
                a.push(b)
            }
            // console.log(a);
            getData(a)
        })
       
    
    }
   
    const completed = (com , number) => {
        // console.log(com , number);
        const respone = {
            id: com,
            number : number
        }
        // console.log(respone);
        axios.post(`${host}/Completed`,respone).then(dt=>{
            // console.log(dt.data);
            Alert.alert(
                "Bạn đã thanh toán số tiền trả trước",
                "",
                [ {
                    text: "Chưa thanh toán",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "Đã thanh toán" , onPress: () => getDataAPI()}
                ]
              );
        })
        
    }
    
    React.useEffect(()=>{getDataAPI()},[])
    return(
        
        <View style={{flex:1}}>
             <StatusBar  backgroundColor="black" barStyle="light-content"/>
            <ScrollView style={{height: "100%",backgroundColor: '#d6d9dc'}}>
               
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
            <View key={index} style={{width:"95%",borderRadius:10}}>
                    
                    <View style={{width:"100%", height:200,justifyContent:'center',alignItems:'center',marginTop:5}}>
                    
                        <Image
                        source={{uri: host + '/' + it.idCar.imagesCar}}
                        style={{width: 325, height: 200,borderTopLeftRadius:5, borderTopRightRadius:5}}
                        
                        />
                     </View>
                <View style={{borderWidth:1 ,borderBottomRightRadius:10, borderBottomLeftRadius:10,borderColor:'#00a550',marginTop:5}}>
                    <View style={{backgroundColor:'#fff' ,height:120}}>
                        <Text style={{fontWeight:'bold' , fontSize:12, paddingHorizontal:10 , paddingTop:10,textAlign:'center'}}>THÔNG TIN XE</Text>
                        <View style={{flexDirection:'row' ,marginTop:10}}>
                            <Text style={{paddingHorizontal:15 , width:120 , marginTop: 5 ,fontWeight:'bold',fontSize:12}}>Mẫu xe</Text>
                            <Text style={{marginTop: 5,width:220}}>{it.idCar.carModel} {it.idCar.carName}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{paddingHorizontal:15 , width:120 , marginTop: 5 ,fontWeight:'bold' ,fontSize:12 }}>Năm sản xuất</Text>
                            <Text style={{marginTop: 5,width:220}}>{it.idCar.year}</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                            <Text style={{paddingHorizontal:15 , width:120 , marginTop: 5 ,fontWeight:'bold' ,fontSize:12 }}>Số chỗ ngồi</Text>
                            <Text style={{marginTop: 5,width:220}}>{it.idCar.seats} chỗ</Text>
                        </View>
                       
                    </View>

                    <View style={{marginTop:5,backgroundColor:'#fff' ,height:400,borderBottomLeftRadius:10,borderBottomRightRadius:10}}>
                        <Text style={{fontWeight:'bold' , fontSize:12, paddingHorizontal:10 , paddingTop:10,textAlign:'center'}}>THÔNG TIN CHUYẾN</Text>
                       
                         <View style={{flexDirection:'row',marginTop:10 , justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:18}}>{it.dateStart}</Text>
                        <Entypo name="arrow-long-right" size={30} color="#00a550" style={{marginHorizontal:20}} />
                        <Text style={{fontSize:18}}>{it.dateEnd}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                            <Text style={{paddingHorizontal:15 , width:100 , marginTop: 10 ,fontWeight:'bold' ,fontSize:12}}>Mã chuyến</Text>
                            <Text style={{marginTop: 10,fontWeight:'bold',textAlign:'left',width:240}}>#{it._id.slice(0,6)}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{paddingHorizontal:15 , width:100 , marginTop: 10 ,fontWeight:'bold' ,fontSize:12 }}>Địa chỉ</Text>
                            {/* <Text style={{marginTop: 5,width:180}}>{it.idCar.ward} , {it.idCar.district} {it.idCar.address}</Text> */}
                            <Text style={{marginTop: 10,width:240,textAlign:'left'}}>{it.address}</Text>

                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{paddingHorizontal:15 , width:100 , marginTop: 10 ,fontWeight:'bold' ,fontSize:12 }}>Giao xe</Text>
                            
                             {
                                it.feeExpress != 0 ? <Text  style={{marginTop: 10,textAlign:'left',width:240}}>Có hỗ trợ giao xe</Text> : <Text  style={{marginTop:10,textAlign:'left',width:240}}>Không hỗ trợ</Text>
                             }
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{paddingHorizontal:15 , width:100 , marginTop: 10 ,fontWeight:'bold' ,fontSize:12 }}>Trả trước</Text>
                            <Text style={{marginTop: 10,textAlign:'left',width:240}}>{(Number(it.price) - Number(it.moneyPaid)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{paddingHorizontal:15 , width:100 , marginTop: 10 ,fontWeight:'bold' ,fontSize:12 }}>Còn lại</Text>
                            <Text style={{fontWeight:'bold',marginTop: 10,textAlign:'left',width:240}}>{(Number(it.moneyPaid)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{paddingHorizontal:15 , width:100 , marginTop: 10 ,fontWeight:'bold' ,fontSize:12 }}>Trạng thái</Text>
                          
                            {
                                it.status == 1 ? <Text style={{marginTop: 10,color:'#00a550',textAlign:'left',width:240}}>Đã được xác nhận</Text> : <Text style={{marginTop: 10,color:'red',textAlign:'left',width:240}}>Chưa xác nhận</Text>
                            }
                        </View>
                        
                        <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 10 }}>
                            <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                        </View>
                   

                        <View style={{flexDirection:'row',marginTop:5}}>
                            <Text style={{paddingHorizontal:15 , width:100 , marginTop: 5 ,fontWeight:'bold',fontSize:12 }}>Tên chủ xe</Text>
                            <Text style={{marginTop: 5,width:240}}>{it.idHost.name}</Text>
                        </View>
                        
                        <View style={{flexDirection:'row',marginTop:5}}>
                            <Text style={{paddingHorizontal:15 , width:100 , marginTop: 5 ,fontWeight:'bold',fontSize:12 }}>Liên lạc</Text>
                            <Text style={{marginTop: 5,width:240}}>{it.idHost.phone}</Text>
                        </View>
                        {/* <View style={{flexDirection:'row',marginTop:5}}>
                            <Text style={{paddingHorizontal:15 , width:150 , marginTop: 5 ,fontWeight:'bold',fontSize:12 }}>Địa chỉ</Text>
                            <Text style={{marginTop: 5}}>{it.idCar.district} , {it.idCar.address}</Text>
                        </View> */}

                        {
                            it.status == 1 ? 
                            <View style={{flexDirection:'row',marginTop:10}}>
                                <Text style={{paddingHorizontal:15 , width:100 , marginTop: 5 ,fontWeight:'bold',fontSize:12 }}>Hoàn thành</Text>

                                {
                                    it.checkCompleted == 1 ? <Text style={{marginTop:3,fontSize:12,color:'#00a550',width:240}}>Giao dịch đã hoàn thành</Text> 
                                    :
                                <TouchableOpacity style={{borderWidth:1, width:170 , borderRadius:5,borderColor:'#00a550',marginTop:5}} onPress={()=>completed(it._id,1)}>
                                    <Text style={{textAlign:'center',fontSize:12,color:'#00a550'}}>Nhấn vào khi đã nhận xe</Text>
                                </TouchableOpacity>
                            }
                           
                            
                            </View>
                            : <></>
                        }
                            
                            
                         
                        
                    
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


  