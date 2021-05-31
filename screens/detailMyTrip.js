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
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import host from '../port/index';
import { Ionicons } from '@expo/vector-icons';  

import { Entypo } from '@expo/vector-icons'; 

import imgCar from '../images/imgCar.jpg';

const detailMyTrip = ({navigation,route})=> {
    // Geocoder.init("AIzaSyBHRMxpBKc25CMHY51h1jrnCCm6PjNs62s");

    const [data , getData] = React.useState([])
    

    const  getDataAPIs = async () => {
        // console.log(route.params.id);
            let a = []
            const idDetail = route.params.id;
            await axios.post(`${host}/getDataMyTrips` , {idDetail}).then(async(dt)=>{
                
                getData(dt.data)
               
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
                  { text: "Đã thanh toán" , onPress: () => getDataAPIs()}
                ]
              );
        })
        
    }
    const reloadPage = () => {
        getDataAPIs()
    }
   React.useEffect(()=>{getDataAPIs()}, [])

    return(
        
        <View style={{flex:1}}>
             <StatusBar  backgroundColor="black" barStyle="light-content"/>
            <ScrollView style={{height: "100%",backgroundColor: '#efefef'}}>
               
                <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                    <TouchableOpacity
                       onPress={ () => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>

                    <View style={{flex: 1 }}>
                        <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>CHI TIẾT</Text>    
                    </View> 
                    
                    <TouchableOpacity onPress={reloadPage}>
                        <Ionicons name="reload" size={24} color="white" />
                    </TouchableOpacity>
                
            </View>
        
        
        {
            data.length  ?  <View style={{justifyContent:'center', alignItems:'center'}}>
                
            {
                data.map((it,index)=>(
            <View key={index} style={{width:"100%"}}>
                    
                <View style={{}}>
                    <View style={{backgroundColor:'#fff' ,height:120}}>
                        <Text style={{fontWeight:'bold' , fontSize:15, paddingHorizontal:10 , paddingTop:10,textAlign:'left'}}>THÔNG TIN CHỦ XE</Text>
                        <View style={{flexDirection:'row' ,marginTop:10}}>
                            <Text style={{paddingHorizontal:15 , width:"40%" , marginTop: 5,color:'#86929e',fontSize:14}}>Họ và tên</Text>
                            <Text style={{marginTop: 5,width:"55%",textAlign:'right'}}>{it.idHost.name}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{paddingHorizontal:15 , width:"40%" , marginTop: 5,color:'#86929e',fontSize:14}}>Số điện thoại</Text>
                            <Text style={{marginTop: 5,width:"55%",textAlign:'right'}}>{it.idHost.phone}</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                        <Text style={{paddingHorizontal:15 , width:"40%" , marginTop: 5,color:'#86929e',fontSize:14}}>Địa chỉ email</Text>
                            <Text style={{marginTop: 5,width:"55%",textAlign:'right'}}>{it.idHost.email}</Text>
                        </View>
                       
                    </View>
                    <View style={{backgroundColor:'#fff' ,height:120,marginTop:10}}>
                        <Text style={{fontWeight:'bold' , fontSize:15, paddingHorizontal:10 , paddingTop:10,textAlign:'left'}}>THÔNG TIN XE</Text>
                        <View style={{flexDirection:'row' ,marginTop:10}}>
                            <Text style={{paddingHorizontal:15 , width:"40%" , marginTop: 5,color:'#86929e',fontSize:14}}>Mẫu xe</Text>
                            <Text style={{marginTop: 5,width:"55%",textAlign:'right'}}>{it.idCar.carModel} {it.idCar.carName}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{paddingHorizontal:15 , width:"40%" , marginTop: 5,color:'#86929e',fontSize:14}}>Năm sản xuất</Text>
                            <Text style={{marginTop: 5,width:"55%",textAlign:'right'}}>{it.idCar.year}</Text>
                        </View>

                        <View style={{flexDirection:'row'}}>
                        <Text style={{paddingHorizontal:15 , width:"40%" , marginTop: 5,color:'#86929e',fontSize:14}}>Số chỗ ngồi</Text>
                            <Text style={{marginTop: 5,width:"55%",textAlign:'right'}}>{it.idCar.seats} chỗ</Text>
                        </View>
                       
                    </View>

                    <View style={{marginTop:10,backgroundColor:'#fff' ,height:380}}>
                        <Text style={{fontWeight:'bold' , fontSize:15, paddingHorizontal:10 , paddingTop:10,textAlign:'left'}}>THÔNG TIN CHUYẾN</Text>
                       
                         <View style={{flexDirection:'row',marginTop:10 , justifyContent:'center',alignItems:'center'}}>
                        <Text style={{fontSize:18}}>{it.dateStart}</Text>
                        <Entypo name="arrow-long-right" size={30} color="#00a550" style={{marginHorizontal:20}} />
                        <Text style={{fontSize:18}}>{it.dateEnd}</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                            <Text style={{paddingHorizontal:15 , width:"40%" , marginTop: 10 ,color:'#86929e' ,fontSize:14}}>Mã chuyến</Text>
                            <Text style={{marginTop: 10,fontWeight:'bold',textAlign:'right',width:'55%'}}>#{it._id.slice(0,6)}</Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{paddingHorizontal:15 , width:'40%', marginTop: 10,color:'#86929e' ,fontSize:14}}>Địa chỉ</Text>
                            <Text style={{marginTop: 10,width:'55%',textAlign:'right'}}>{it.locationCheckOut}</Text>

                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{paddingHorizontal:15 , width:'40%' , marginTop: 10 ,color:'#86929e' ,fontSize:14}}>Giao xe</Text>
                            
                             {
                                it.feeExpress != 0 ? <Text  style={{marginTop: 10,textAlign:'right',width:"55%"}}>Có hỗ trợ giao xe</Text> : <Text  style={{marginTop:10,textAlign:'right',width:"55%"}}>Không hỗ trợ</Text>
                             }
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{paddingHorizontal:15 , width:'40%' , marginTop: 10 ,color:'#86929e' ,fontSize:14}}>Trạng thái</Text>
                          
                            {
                                it.status == 1 ? <Text style={{marginTop: 10,color:'#00a550',textAlign:'right',width:'55%'}}>Đã được xác nhận</Text> : <Text style={{marginTop: 10,color:'red',textAlign:'right',width:'55%'}}>Chưa xác nhận</Text>
                            }
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center',marginTop:20}}>
                            <View style={{borderWidth:1 , width:"90%" , height: 110,borderRadius:5,borderColor:'#e8eaef',backgroundColor: '#f6f6f6'}}>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{paddingHorizontal:15 , width:'40%' , marginTop: 10 ,color:'#86929e' ,fontSize:14}}>Trả trước</Text>
                                    <Text style={{marginTop: 10,textAlign:'right',width:'55%'}}>{(Number(it.price) - Number(it.moneyPaid)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
                                </View>
                                <View style={{flexDirection:'row'}}>
                                    <Text style={{paddingHorizontal:15 , width:'40%' , marginTop: 10 ,color:'#86929e' ,fontSize:14}}>Còn lại</Text>
                                    <Text style={{fontWeight:'bold',marginTop: 10,textAlign:'right',width:'55%',fontSize:16}}>{(Number(it.moneyPaid)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
                                </View>
                                <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#f6f6f6', paddingVertical: 5}}>
                                    <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                                </View>
                                {
                                    it.status == 1 ? 
                                    <View style={{flexDirection:'row'}}>
                                      <Text style={{paddingHorizontal:15 , width:'40%',color:'#86929e' ,fontSize:14,marginTop:5}}>Hoàn thành</Text>

                                        {
                                            it.checkCompleted == 1 ? <Text style={{textAlign:'right',width:'55%',marginTop:5,fontSize:12,color:'#00a550'}}>Giao dịch đã hoàn thành</Text> 
                                            :
                                        <TouchableOpacity style={{borderWidth:1, width:'55%' , borderRadius:5,borderColor:'#00a550',marginTop:5}} onPress={()=>completed(it._id,1)}>
                                            <Text style={{textAlign:'center',fontSize:12,color:'#00a550'}}>Nhấn vào khi đã nhận xe</Text>
                                        </TouchableOpacity>
                                    }
                                
                                    
                                    </View>
                                    : <></>
                        }
                            </View>
                        </View>
                       
                    </View>
                    
                </View>
                    <View style={{marginTop:10}}></View>

                    
                


          


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
    export default detailMyTrip;