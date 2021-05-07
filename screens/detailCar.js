import React, {useState,useEffect, useRef} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,ScrollView,TextInput, Alert, Platform ,TouchableOpacity, LogBox , FlatList
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
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useScrollToTop } from '@react-navigation/native';
import Geocoder from 'react-native-geocoding';
const detailCar = ({navigation,route})=> {
    Geocoder.init("AIzaSyBHRMxpBKc25CMHY51h1jrnCCm6PjNs62s");
    const refDetail = useRef(null)

   const [dataDetailCar , setDataDetailCar] = React.useState([])
    const [selected , setSelected] = React.useState('')
    const [name , setName] = React.useState('')
    const [email , setEmail] = React.useState('')
    const [img , setImg] = React.useState('')
    const [dataReview, setDataReview] = React.useState([])
    const [dataRelate, setDataRelate] = React.useState([])
    const [idHost, setIdHost] = React.useState('')
  

  

    // console.log(route.params.e);
    // console.log(route.params.s);
    // console.log(route.params.n);


    const [gallery, setgallery] = useState([
        {image: {uri: "https://www.mioto.vn/static/media/features-2.f7d40f43.jpg"},
        },
        {image: {uri: "https://www.mioto.vn/static/media/features-5.5e0a5832.jpg"},
        },
        {image: {uri: "https://www.mioto.vn/static/media/features-6.e7932d18.jpg"},
        },
        {image: {uri: "https://www.mioto.vn/static/media/features-3.faaf0570.jpg"},
        },
        {image: {uri: "https://www.mioto.vn/static/media/features-4.df19c5f2.jpg"},
        },
       
    ]);
    
   
    const detailCars = async () => {
        
        const idCar = route.params.ids;
        // console.log(idCar);

        await axios.get(`${host}/detailCar/`+idCar)
        .then(async(res)=>{
            
            const { address, _id } = res.data[0]
            let datas = res.data;
            // console.log(datas);
            let a = []
            for (var b of datas){
                const {latitude, longitude} =b.location.coords
                const gg = await Geocoder.from({
                    latitude,
                    longitude
                });

                b['address'] = gg.results[0].formatted_address
                a.push(b)
            }
            
            setDataDetailCar(a)
            getDataReview(res.data[0].idUser)
            relateCar(address, _id)
            setIdHost(res.data[0].idUser)
        })
       
        
            // setDataDetailCar(previous=>[...previous, val])
                //    console.log(dataDetailCar);
    }
    // console.log(dataDetailCar);

    const addFavorite = async (id) => {
        const value = await AsyncStorage.getItem('id');
        const idCar = id;
       if(!value) {
        Alert.alert(
            "",
            "Bạn chưa đăng nhập",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
              },
              { text: "OK", onPress: () => navigation.navigate('SigninScreen') }
            ]
          );
       }else {
            await axios.post(`${host}/addFavorites`, {idCar , value})
            .then(()=>{
        
            })
            selectedHeart()
       }
     
        
    }
    const selectedHeart = async () =>{
        const values = await AsyncStorage.getItem('id');
        await axios.post(`${host}/selected`, {values}).then((res)=>{
            // console.log(res.data);
            setSelected(res.data)
        })
    }

    const getName  = async () => {
       
        const value = route.params.ids;
        await axios.post(`${host}/isName`, {value}).then((res)=>{
            setName(res.data.name)
            setEmail(res.data.email)
            setImg(res.data.img)
        })
    }
    

    const checkOut = async () => {
        const value = await AsyncStorage.getItem('id');
        // console.log(value);
        if(!value) {
            Alert.alert("Vui lòng đăng nhập để tiếp tục")
            navigation.navigate("SigninScreen")
        }else {
           
            const  p = dataDetailCar.map((k)=>(
                ((Number(k.price) + (Number(route.params.km?route.params.km:0) * Number(10000)) - Number(route.params.data?route.params.data:0)) * Number(route.params.n?route.params.n:''))   
    
            ))
           const ps =  dataDetailCar.map((tt)=>(
                (Number(tt.price) + (Number(route.params.km?route.params.km:0) * Number(10000)) - Number(route.params.data?route.params.data:0)) * Number(route.params.n?route.params.n:'')  - (Number(tt.price) + (Number(route.params.km?route.params.km:0) * Number(10000))
                - Number(route.params.data?route.params.data:0)) * Number(route.params.n?route.params.n:'') *Number(0.3)
            ));
            // console.log(p);
            
            const i = dataDetailCar.map((id)=>(id.idUser))
            // console.log(i);
            // await axios(`${host}/getToken`, i)
                
            const j = route.params.km ? (Number(route.params.km) * Number(10000)) : 0

            var date = new Date().getDate(); //Current Date
            var month = new Date().getMonth() + 1; //Current Month
            var year = new Date().getFullYear(); //Current Year
            
            const respone = {
                arrDates : route.params.arrDate,
                dateStart : route.params.s, 
                dateEnd : route.params.e,
                DateNumber : route.params.n,
                idCar : route.params.ids,
                idUser: value,
                idH : i,
                price : p,
                resp : 0,
                fee : j,
                location: route.params.locationUser,
                dateCurr : date + '/' + month + '/' + year,
                prices : ps
    
            }
            // console.log(respone);
            if(respone.dateStart == undefined || respone.dateEnd == undefined || respone.arrDates == undefined){
                Alert.alert("Vui lòng chọn ngày thuê")
            }else {
                await axios.post(`${host}/checkout`,respone).then(()=>{
                    Alert.alert(
                        "Đặt xe thành công",
                        "Vui lòng đợi chủ xe xác nhận ",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress: () => {
                                getIdToken() , navigation.navigate('Home')  
                            }
                            }
                        ]
                        
                      );    
                                
                     
                })
            }
          
        }
       
    }
    const getDataReview =  async (id) => {
        // console.log(id);
        await axios.post(`${host}/reviewAPI`, {id})
        .then(dt=>{
            setDataReview(dt.data)
            
            
        })
    } 
    // console.log(dataReview);


    const relateCar  =  async (ad, i) => {
        // console.log(ad,i);
     await axios.post(`${host}/relatedCar`,{ad: ad}).then(dt=>{
            // console.log(dt.data[0]._id);
         const a = dt.data.filter(dl=>(dl._id) != i)
            // console.log(a);
         setDataRelate(a)
        })
        
        
    } 

    const naviDetailCar = async (id) => {
        await axios.get(`${host}/detailCar/`+id).then(async(res)=>{

            let datas = res.data;
            const { address, _id } = res.data[0]
            let a = []
                for (var b of datas){
                    const {latitude, longitude} =b.location.coords
                    const gg = await Geocoder.from({
                        latitude,
                        longitude
                    });

                    b['address'] = gg.results[0].formatted_address
                    a.push(b)
                }

                setDataDetailCar(a)
                relateCar(address, _id)
            })
        
        refDetail.current?.scrollTo({
            y : 0,
            animated : true
        })
      
    }
    const getIdToken =  async () => {
        const id = idHost 
        await axios.post(`${host}/getToken`, {id})
        .then(dt=>{
            
           console.log(dt.data.tokenDevices);
            for(var i of dt.data.tokenDevices){
                sendPushNotification(i.value)
            }
            
            
        })
    } 

    React.useEffect(  ()=>{
        detailCars() , selectedHeart() , getName()
    },[])

    // console.log(dataToken.tokenDevices);

    async function sendPushNotification(expoPushToken) {
        const message = {
          to: expoPushToken,
          sound: 'default',
          title: 'BookingCar Application',
          body: 'Xe đã có khách đặt. Hãy xác nhận với khách!',
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

   
    
    return(
        
        <View style={{ flex: 1 , backgroundColor: '#d6d9dc', justifyContent:'center',alignContent:'center'}}>
          
        <ScrollView ref= {refDetail}>

        <View style={{ flexDirection: 'row', backgroundColor:'black',alignItems:"center", marginTop: 30, padding: 20}}>
                    <TouchableOpacity
                       onPress={ () => navigation.goBack()}
                    >
                        <FontAwesome name="times" size={25} color="white"/>
                    </TouchableOpacity>

                    <View style={{flex: 1 }}>
                        <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>CHI TIẾT XE</Text>    
                    </View> 
                 {
                        dataDetailCar.map((k)=>(
                            
                            <TouchableOpacity key ={Math.random()} onPress={()=>addFavorite(k._id)}>
                                  
                                   {selected.indexOf(k._id) != -1 ? <MaterialIcons name="favorite" size={24} color="red" /> : <MaterialIcons name="favorite-border" size={24} color="white" />}
                                   
                            </TouchableOpacity> 
                       
                        ))
                    }
                   
                     {/* <TouchableOpacity key ={Math.random()} onPress={()=>{}}>
                                <MaterialIcons name="favorite" size={24} color="red"/>
                                <MaterialIcons name="favorite-border" size={24} color="white" />
                                
                            </TouchableOpacity>  */}
                
            </View>
         <View style={{justifyContent:'center', alignItems:'center',marginTop: 0}}>
         {
                        dataDetailCar.map((b)=>(
                        <View key={Math.random()} style={{width:"100%", height:200}}>
             
                            <Image
                            source={{uri: host + '/' + b.imagesCar}}
                            style={{width: "100%", height: 200}}
                            
                            />
                        </View>
                        
                        ))
                        
                        
        }   
       
           
        
            <View style={{width:"100%", height:120, backgroundColor:"#ffffff",borderBottomEndRadius:5,borderBottomLeftRadius: 5}}>
                        {dataDetailCar.map((a)=>(
                            <Text key={Math.random()} style={{marginTop: 10,marginLeft: 10,fontSize: 15,fontWeight:'bold'}}>{a.carModel} {a.carName}</Text>
                        ))}
                
                <View style={{flexDirection:'row'}}>
                     <Text style={{marginTop: 5,marginLeft: 10}}>5.0 <Ionicons name="star-outline" style={{color:'green', fontSize: 14}}></Ionicons> </Text>
                     <Text style={{marginTop: 7,marginLeft: 10,fontSize: 12,width:165}}>22 chuyến</Text>
                     <View style={{flexDirection:'row'}}>
                     
                        {dataDetailCar.map((i)=>(
                            <Text key={Math.random()} style={{color:'#00a550',fontSize:18,fontWeight:'bold'}}>{Number(i.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                        ))}
                        
              
                       
                        <Text style={{fontSize:12,marginTop:5}}>/ngày</Text>
                    </View>
                    
                </View>
                <View style={{flexDirection:'row',marginTop:7}}>
                    {
                        dataDetailCar.map((c)=>(
                            
                            <Text key={Math.random()} style={{paddingTop: 2,marginLeft: 10, fontSize: 11,backgroundColor:'#e4e6e8', width: 80 , textAlign:'center',borderRadius:5,height:20}}>{c.transmission}</Text>     
                            
                        ))
                    }
                      {
                        dataDetailCar.map((d)=>(
                            
                            <Text key={Math.random()} style={{paddingTop: 2,marginLeft: 10, fontSize: 11,backgroundColor:'#e4e6e8', width: 80 , textAlign:'center',borderRadius:5,height:20}}>{d.fuel}</Text>     
                            
                        ))
                    }
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop: 10,marginLeft: 10}}><Ionicons name="location-outline" style={{ fontSize: 14}}></Ionicons></Text>
                    {
                        dataDetailCar.map((e)=>(
                            
                            <Text key={Math.random()} style={{marginTop: 9,marginLeft: 5, fontSize:12,width:350}}>{e.address}</Text>
                            
                        ))
                    }
                   
                </View>
                
            </View>

                </View> 

          <View style={{marginTop:5,height:300,width:"100%", backgroundColor:'white'}}>
              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>THỜI GIAN</Text>
              <View style={{flexDirection:'row'}}>
                
                <Ionicons name="calendar-outline" size={20} color="black"  style={{justifyContent:'center',alignContent:'center', marginVertical:10,paddingHorizontal:10}}/>
                <View style={{flexDirection:'column', justifyContent:'center',alignContent:'center' ,marginLeft:10,width:240}}>
                    <Text style={{fontSize:12, width:80}}>{route.params.s ? route.params.s : 'Ngày bắt đầu'}</Text>
                    
                    <Text style={{fontSize:12,marginVertical:2, width:80}}>{route.params.e ? route.params.e : 'Ngày kết thúc'}</Text>
                </View>
                <TouchableOpacity style={{width:50,height:25,backgroundColor:'white',marginTop:10,borderColor:'#00a550',borderWidth:1}} onPress={()=>navigation.navigate("calendarSave",{idc : route.params.ids})}>
                            <Text style={{textAlign:'center',color:'#00a550',paddingTop:5,fontSize:10,fontWeight:'bold'}}>CHỌN</Text>   
                        </TouchableOpacity> 
       
              </View>

              <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>

            <Text style={{fontSize:12,fontWeight:'bold',paddingHorizontal:10}}>ĐỊA ĐIỂM GIAO NHẬN XE</Text>
              <View style={{flexDirection:'row',paddingTop:10}}>
                
                <Ionicons name="navigate-circle-outline" size={25} color="black"  style={{justifyContent:'center',alignContent:'center', marginVertical:10,paddingHorizontal:10}}/>
                <View style={{flexDirection:'column', justifyContent:'center',alignContent:'center'}}>
                {
                        dataDetailCar.map((r)=>(
                            
                            <Text key={Math.random()} style={{fontSize:12,width:300}}>{r.address}</Text>
                            
                        ))
                    }
                    
                
                    <Text style={{fontSize:12,marginVertical:2,opacity:0.5}}>Chi phí giao xe 10.000đ/1km (nếu có)</Text>
                </View>
               
              </View>


              <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 5, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{paddingHorizontal:20}}> 
            {
                dataDetailCar.map((p)=>(
                    <TouchableOpacity key={Math.random()}onPress={()=>navigation.navigate("map", {id :p._id })}>
                        <Text style={{fontSize:10, color:"#00a550", fontWeight:'bold'}}>Chọn địa điểm giao nhận xe</Text>
                     </TouchableOpacity>
                ))
            }
          
                
            </View>
                <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                            <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                </View>

           

          </View>
            
          <View style={{marginTop:5,height:290,width:"100%", backgroundColor:'white'}}>

              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>CHI TIẾT GIÁ</Text>
              <View style={{flexDirection:'row'  , width: 500}}>
                
               
                <View style={{flexDirection:'column', justifyContent:'center',alignContent:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:200}}>Đơn giá thuê</Text>
                        {
                        dataDetailCar.map((t)=>(
                            
                            <Text key={Math.random()} style={{fontSize:12,paddingHorizontal:10,textAlign:'right',width:150}}>{Number(t.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}/ ngày</Text>
                        ))
                    }
                       
                    </View>
                   
                    {/* <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,marginTop:10,width:100}}>Phí dịch vụ</Text>
                        <Text style={{fontSize:12,paddingHorizontal:10,paddingLeft:155,marginTop:10,opacity:0.5}}>{Number(servicePrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                    </View> */}
                     
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,marginTop:10,width:200}}>Phí giao xe</Text>
                        <Text style={{fontSize:12,paddingHorizontal:10,marginTop:10,opacity:0.5,textAlign:'right',width:150}}> {route.params.km ? (Number(route.params.km) * Number(10000)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '0'}đ</Text>
                    </View>
                     <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,marginTop:10,width:200}}>Giảm giá</Text>
                        <Text style={{fontSize:12,paddingHorizontal:10,marginTop:10,opacity:0.5,textAlign:'right',width:150}}>-{route.params.data ? Number(route.params.data).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'): '0.00'}</Text>
                    </View>
                    
                </View>
                
              </View>

              <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:200}}>Tổng phí thuê xe</Text>
                        {
                            dataDetailCar.map((l)=>(
                                <Text key={Math.random()} style={{fontSize:12,paddingHorizontal:10,textAlign:'right',width:150}}>{(Number(l.price) + (Number(route.params.km?route.params.km:0) * Number(10000)) - Number(route.params.data?route.params.data:0)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')} x {route.params.n ? route.params.n : 1 } ngày</Text>
                            ))
                        }
                      
                    </View>
            <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:200,marginTop:15,opacity:0.5}}>Mã khuyến mãi</Text>
                        {
                            dataDetailCar.map((o)=>(
                                <TouchableOpacity key={Math.random()} onPress={()=>navigation.navigate("discount",{city:o.address})}style={{width: 120, textAlign:'right',width:150 }}>
                        
                                    <Text style={{paddingTop: 2, fontSize: 10,backgroundColor:'#e4e6e8', textAlign:'center',borderRadius:5,height:20,marginTop:15,opacity:0.5}}>Nhập mã khuyến mãi</Text>
                                </TouchableOpacity>
                            ))
                        }
                       
                        
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:200}}>Trả trước</Text>
                        {
                            dataDetailCar.map((k)=>(
                                <Text key={Math.random()} style={{fontSize:12,paddingHorizontal:10,textAlign:'right',width:150}}>
                                {((Number(k.price) + (Number(route.params.km?route.params.km:0) * Number(10000)) - Number(route.params.data?route.params.data:0)) * Number(route.params.n?route.params.n:'') *Number(0.3) ).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}    
                                    
                                đ</Text>
               
                            ))
                        }
                         
            </View>
            
            <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:200,fontWeight:'bold',marginTop:10}}>Còn lại</Text>
                        {
                            dataDetailCar.map((k)=>(
                                <Text key={Math.random()} style={{fontSize:12,paddingHorizontal:10,textAlign:'right',width:150,fontWeight:'bold',marginTop:10}}>
                                {((Number(k.price) + (Number(route.params.km?route.params.km:0) * Number(10000)) - Number(route.params.data?route.params.data:0)) * Number(route.params.n?route.params.n:'')  - (Number(k.price) + (Number(route.params.km?route.params.km:0) * Number(10000)) - Number(route.params.data?route.params.data:0)) * Number(route.params.n?route.params.n:'') *Number(0.3)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}    
                                    
                                đ</Text>
               
                            ))
                        }
                         
            </View>

          </View>
         
         <View style={{marginTop:5,height:350,width:"100%", backgroundColor:'white'}}>
              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>ĐẶC ĐIỂM</Text>
              <View style={{flexDirection:'row',justifyContent:'center',marginVertical:10,marginLeft:40}}>
             
                    <MaterialCommunityIcons name="car-child-seat" size={30} color="#cccccc" style={{justifyContent:'center',alignContent:'center', width:"25%"}}/>
                    <FontAwesome name="cogs" size={25} color="#cccccc" style={{justifyContent:'center',alignContent:'center', width:"25%"}}/>
                    <MaterialCommunityIcons name="gas-station" size={30} color="#cccccc" style={{justifyContent:'center',alignContent:'center', width:"25%"}}/>
                    <MaterialCommunityIcons name="fuel" size={30} color="#cccccc" style={{justifyContent:'center',alignContent:'center', width:"25%"}}/>
                </View>
                {
                    dataDetailCar.map((z)=>(
                    <View  key={Math.random()} style={{flexDirection:'row',justifyContent:'center'}}>
                        <Text key={Math.random()} style={{justifyContent:'center', alignContent:'center',fontSize:12,textAlign:'center',width:"27%"}}>{z.seats} ghế</Text>
                        <Text key={Math.random()}  style={{justifyContent:'center', alignContent:'center',fontSize:12,textAlign:'center',width:"23%"}}>{z.transmission}</Text>
                        <Text key={Math.random()} style={{justifyContent:'center', alignContent:'center',fontSize:12,textAlign:'center',width:"20%"}}>{z.fuel}</Text>
                        <Text key={Math.random()} style={{justifyContent:'center', alignContent:'center',fontSize:12,textAlign:'center',width:"30%"}}>{z.fueled} lít/100km</Text>
                     </View>
                    ))
                }
               
                <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                </View>
                <Text style={{fontSize:12,fontWeight:'bold',paddingHorizontal:10}}>MÔ TẢ</Text>
                <View style={{paddingHorizontal:10,marginTop:10}}>
                    {
                        dataDetailCar.map((n)=>(
                            <Text key={Math.random()} style={{fontSize:12}}>{n.note}.</Text>
                        ))
                    }
                    
                </View>
                
                <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                </View>
                <Text style={{fontSize:12,fontWeight:'bold',paddingHorizontal:10}}>TÍNH NĂNG</Text>
                <View style={{flexDirection:'row', justifyContent:'center',alignContent:'center', marginTop:10}}>
                    {/* {dataDetailCar.map((i)=>(
                        <Text>{i.sunroof}</Text>
                    ))} */}
                    <Ionicons name="car-outline" size={25} color="black" />
                    {
                        dataDetailCar.map((j)=>(
                            j.sunroof == true ?  <Text key={Math.random()} style={{paddingHorizontal:10,fontSize: 12, paddingTop: 5,justifyContent:'center',alignContent:'center'}}>Cửa sổ trời</Text> : <Text  key={Math.random()} style={{fontSize: 12, paddingTop: 5,paddingHorizontal:10,color:'#dc3545'}}>Chưa có</Text>
                        ))
                    }
                    <Ionicons name="bluetooth-outline" size={25} color="black"  style={{marginLeft:40}}/>
                    {
                        dataDetailCar.map((l)=>(
                            l.bluetooth == true ?  <Text key={Math.random()} style={{paddingHorizontal:10,fontSize: 12, paddingTop: 5,justifyContent:'center',alignContent:'center'}}>Bluetooth</Text> : <Text  key={Math.random()} style={{fontSize: 12, paddingTop: 5,paddingHorizontal:10,color:'#dc3545'}}>Chưa có</Text>
                        ))
                    }
                </View>
                <View style={{flexDirection:'row', justifyContent:'center',alignContent:'center', marginVertical:20}}>
                    <Ionicons name="navigate-outline" size={25} color="black" />
                    {
                        dataDetailCar.map((g)=>(
                            g.gps == true ?  <Text key={Math.random()} style={{paddingHorizontal:10,fontSize: 12, paddingTop: 5,justifyContent:'center',alignContent:'center'}}>GPS</Text> : <Text  key={Math.random()} style={{fontSize: 12, paddingTop: 5,paddingHorizontal:10,color:'#dc3545'}}>Chưa có</Text>
                        ))
                    }
                    <Ionicons name="camera-reverse-outline" size={25} color="black" style={{marginLeft:20}}/>
                    {
                        dataDetailCar.map((c)=>(
                            c.cameraback == true ?  <Text key={Math.random()} style={{paddingHorizontal:10,fontSize: 12, paddingTop: 5,justifyContent:'center',alignContent:'center'}}>Camera lùi</Text> : <Text  key={Math.random()} style={{fontSize: 12, paddingTop: 5,paddingHorizontal:10,color:'#dc3545'}}>Chưa có</Text>
                        ))
                    }
                    <Ionicons name="map-outline" size={25} color="black" style={{marginLeft:20}}/>
                    {
                        dataDetailCar.map((m)=>(
                            m.map == true ?  <Text key={Math.random()} style={{paddingHorizontal:10,fontSize: 12, paddingTop: 5,justifyContent:'center',alignContent:'center'}}>Bản đồ</Text> : <Text  key={Math.random()} style={{fontSize: 12, paddingTop: 5,paddingHorizontal:10,color:'#dc3545'}}>Chưa có</Text>
                        ))
                    }
                </View>
          </View>
          
          <View style={{marginTop:5,height:120,width:"100%", backgroundColor:'white'}}>
              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>GIẤY TỜ THUÊ XE</Text>
                <View style={{flexDirection:'row',paddingHorizontal:10}}>
                    <Ionicons size={25} color="black" name="card-outline"></Ionicons>
                    <Text style={{paddingTop:5, fontSize:12, marginLeft:10}}>CMND và GPLX </Text>       
                </View>
                <View style={{flexDirection:'row',paddingHorizontal:10,marginTop:20}}>
                    <Ionicons size={25} color="black" name="newspaper-outline"></Ionicons>
                    <Text style={{paddingTop:5, fontSize:12, marginLeft:10}}>Hộ khẩu hoặc KT3 hoặc Passport </Text>       
                </View>
          </View>
          <View style={{marginTop:5,height:120,width:"100%", backgroundColor:'white'}}>
              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>CHỦ XE </Text>
                <View style={{flexDirection:'row',paddingHorizontal:10}}>
                    <View style={{flexDirection:'column' , width: 180}}>
                        <Text style={{paddingTop:5, fontSize:14, marginLeft:10, color:'#00a550'}}>{name ? name :  email } </Text> 
                        {/* {
                            dataDetailCar.map((u)=>(
                                
                              
                            ))
                        }  */}
                        <View style={{flexDirection:'row'}}>
                            <Text style={{paddingTop:5, fontSize:18, marginLeft:10}}>5.0  </Text>    
                            {/* <Ionicons size={20} color="#00a550" name="star-outline" style={{paddingTop:5}}></Ionicons> */}
                            <FontAwesome name="star" size={20} color="#ffa500" style={{paddingTop:7}}/>
                        </View>
                       
                    </View>
                    
                    <TouchableOpacity style={{left:90}}  >
                        {
                            img?  <Avatar.Image
                              source={{uri: host+'/'+ img }}
                              size={70}
                              /> :<Avatar.Image
                              source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vO2n-_DpXS1ZSm8d4Tn743V5FTuU2tYhEw&usqp=CAU"}}
                              size={70}
                              />
                             
                        }  
                       
                    </TouchableOpacity>     
                    
                </View>
               
          </View>
          

            <View style={{marginTop:5,height:120,width:"100%", backgroundColor:'white'}}>
              
                <View style={{flexDirection:'row',paddingHorizontal:10,justifyContent:'center', alignItems:'center'}}>
                    <View style={{flexDirection:'column' }}>
                       <TouchableOpacity style={{width:300,height:35,backgroundColor:'#00a550',marginTop:15}} onPress={checkOut}>
                            <Text style={{textAlign:'center',color:'white', paddingTop:8,fontSize:14,fontWeight:'bold'}}>ĐẶT XE</Text>   
                        </TouchableOpacity>                       
                        <TouchableOpacity style={{width:300,height:35,backgroundColor:'white',marginTop:10,borderColor:'#00a550',borderWidth:1}}>
                            <Text style={{textAlign:'center',color:'#00a550', paddingTop:8,fontSize:14,fontWeight:'bold'}}>BÁO XẤU</Text>   
                        </TouchableOpacity>  
                    </View>
                        
                    
                </View>
               
          </View>
          
          <View style={{marginTop:5,height:300,width:"100%", backgroundColor:'white'}}>
            
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10,width:200}}>ĐÁNH GIÁ </Text>
                 <Text style={{fontSize:12,paddingHorizontal:10, marginVertical:10,width:150,textAlign:'right'}}>{dataReview.length} nhận xét</Text>
              </View>
            
            
            {
                dataReview.map((dt,index)=>(
                    <View key={index}>
                        <View style={{flexDirection:'row',paddingHorizontal:10}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:12, left: 270}}>{dataReview.date}</Text>
                    
                        </View>
                            
                        
                    </View>
                    
                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                                <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                        </View>
                        <View style={{flexDirection:'row'}}>
                                <View style={{paddingHorizontal: 10}}>
                                    
                                    <Avatar.Image
                                    source={{uri: host+"/"+dt?.idRating.images}}
                                    size={50}
                                    />
                                    
                                
                                </View>
                                <View style={{flexDirection:'column'}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize: 14 , fontWeight:'bold', paddingHorizontal: 5,width:220}}>{dt?.idRating.name}</Text>
                                        <Text style={{fontSize:12 ,textAlign:'right'}}>{dt.date}</Text>
                                    </View>
                                    
                                  
                                        {
                                            dt.rating == 1 ?<FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/> : <View></View>
                                        }
                                        {
                                            dt.rating == 2 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                               < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                              < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                                </View> : <View></View>
                                        }
                                        
                                        {
                                             dt.rating == 3 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                         {
                                             dt.rating == 4 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                         {
                                             dt.rating == 5 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                   
                                    <View style={{paddingHorizontal: 5, marginTop: 10 , width:"100%"}}>
                                        <Text style={{fontSize:12, textAlign:'justify'}}>{dt.comment}</Text>
                                    </View>
                                </View>
                                
                        </View>
                        
                    </View>
                ))
            }
            
                {/* <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                    <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                </View> */}
        
        </View>
        <ScrollView style={{backgroundColor:'#fff',marginTop:5}}>
            <View >
                <Text style={{marginLeft:10,marginTop:10,fontWeight:'bold'}}>XE LIÊN QUAN</Text>
            </View>
            <View>
                <FlatList horizontal={true} keyExtractor={(item, index) => index.toString()} data= {dataRelate} renderItem={({item}) => {
                    
                    return(
                        <View style= {{paddingVertical: 20, paddingLeft: 8, paddingRight: 8}}>
                            
                            <TouchableOpacity  onPress={()=>naviDetailCar(item._id)}>
                                <Image source={{uri : host + '/' +item.imagesCar }} style={{width: 250, height: 150, borderRadius: 15}}></Image>
                            
                            </TouchableOpacity>
                        </View>
                    )
                    
                }}>

                </FlatList>
            </View>
      </ScrollView>
      </ScrollView> 
</View>
    )
}



export default detailCar;