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
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { set } from 'react-native-reanimated';
const detailCar = ({navigation,route})=> {

   const [dataDetailCar , setDataDetailCar] = React.useState([])
    const [selected , setSelected] = React.useState('')
    const [name , setName] = React.useState('')
    const [email , setEmail] = React.useState('')
    const [img , setImg] = React.useState('')
    const [dataReview, setDataReview] = React.useState([])
   

    // console.log(route.params.e);
    // console.log(route.params.s);
    // console.log(route.params.n);
    const detailCars = async () => {
        
        const idCar = route.params.ids;
        // console.log(idCar);

        const detailMap = await axios.get(`${host}/detailCar/`+idCar)
        setDataDetailCar(detailMap.data)
        getDataReview(detailMap.data[0].idUser)
            // setDataDetailCar(previous=>[...previous, val])
                //    console.log(dataDetailCar);
    }
    // console.log(dataDetailCar);

    const addFavorite = async (id) => {
        const value = await AsyncStorage.getItem('id');
        const idCar = id;
       
        // console.log(id,value);
        await axios.post(`${host}/addFavorites`, {idCar , value})
       .then(()=>{
            // navigation.replace("detailCar")
       })
       selectedHeart()
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
                route.params.data ? (Number(k.price) + Number(servicePrice) - Number(route.params.data))
                : (Number(k.price) + Number(servicePrice))
    
            ))
            const i = dataDetailCar.map((id)=>(id.idUser))
            // console.log(p);
            const respone = {
                dateStart : route.params.s, 
                dateEnd : route.params.e,
                DateNumber : route.params.n,
                idCar : route.params.ids,
                idUser: value,
                idH : i,
                price : p,
                resp : 0
    
            }
            // console.log(respone);
            if(respone.dateStart == undefined || respone.dateEnd == undefined ){
                Alert.alert("Vui lòng chọn ngày thuê")
            }else {
                await axios.post(`${host}/checkout`,respone).then(()=>{
                    Alert.alert("Đặt xe thành công. Vui lòng đợi chủ xe phản hồi")
                })
            }
          
        }
       
    }
    const getDataReview =  async (id) => {
        // console.log(id);
        await axios.post(`${host}/reviewAPI`, {id})
        .then(dt=>{
            setDataReview(dt.data)
            // console.log(dt.data);
            
        })
    } 
    // console.log(dataReview);
    React.useEffect(  ()=>{
        detailCars() , selectedHeart() , getName() 
    },[])

    // console.log(dataDetailCar);
    

    const servicePrice = Number(200000)

   
    
    return(
        
        <View style={{ flex: 1 , backgroundColor: '#d6d9dc', justifyContent:'center',alignContent:'center'}}>
          
        <ScrollView>

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
                     <Text style={{marginTop: 7,marginLeft: 10,fontSize: 12}}>22 chuyến</Text>
                     <View style={{flexDirection:'row'}}>
                     
                        {dataDetailCar.map((i)=>(
                            <Text key={Math.random()} style={{left:100,color:'#00a550',fontSize:18,fontWeight:'bold'}}>{Number(i.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                        ))}
                        
              
                       
                        <Text style={{left:100,fontSize:12,marginTop:5}}>/ngày</Text>
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
                            
                            <Text key={Math.random()} style={{marginTop: 9,marginLeft: 5, fontSize:12}}>{e.ward}, {e.district}, {e.address}</Text>
                            
                        ))
                    }
                   
                </View>
                
            </View>

                </View> 

          <View style={{marginTop:5,height:300,width:"100%", backgroundColor:'white'}}>
              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>THỜI GIAN</Text>
              <View style={{flexDirection:'row'}}>
                
                <Ionicons name="calendar-outline" size={20} color="black"  style={{justifyContent:'center',alignContent:'center', marginVertical:10,paddingHorizontal:10}}/>
                <View style={{flexDirection:'column', justifyContent:'center',alignContent:'center' ,marginLeft:10}}>
                    <Text style={{fontSize:12, width:80}}>{route.params.s ? route.params.s : 'Ngày bắt đầu'}</Text>
                    
                    <Text style={{fontSize:12,marginVertical:2, width:80}}>{route.params.e ? route.params.e : 'Ngày kết thúc'}</Text>
                </View>
                <TouchableOpacity style={{width:50,height:25,backgroundColor:'white',marginTop:10,borderColor:'#00a550',borderWidth:1,left:160}} onPress={()=>navigation.navigate("calendarSave")}>
                            <Text style={{textAlign:'center',color:'#00a550',paddingTop:5,fontSize:10,fontWeight:'bold'}}>THAY ĐỔI</Text>   
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
                            
                            <Text key={Math.random()} style={{fontSize:12}}>{r.district}, {r.address}</Text>
                            
                        ))
                    }
                    
                
                    <Text style={{fontSize:12,marginVertical:2,opacity:0.5}}>Địa chỉ cụ thể sẽ được hiển thị sau khi đặt cọc.</Text>
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
            
          <View style={{marginTop:5,height:280,width:"100%", backgroundColor:'white'}}>

              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>CHI TIẾT GIÁ</Text>
              <View style={{flexDirection:'row'  , width: 500}}>
                
               
                <View style={{flexDirection:'column', justifyContent:'center',alignContent:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:100}}>Đơn giá thuê</Text>
                        {
                        dataDetailCar.map((t)=>(
                            
                            <Text key={Math.random()} style={{fontSize:12,paddingHorizontal:10,paddingLeft:155 }}>{Number(t.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}/ ngày</Text>
                        ))
                    }
                       
                    </View>
                   
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,marginTop:10,width:100}}>Phí dịch vụ</Text>
                        <Text style={{fontSize:12,paddingHorizontal:10,paddingLeft:155,marginTop:10,opacity:0.5}}>{Number(servicePrice).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                    </View>
                     <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,marginTop:10,width:100}}>Giảm giá</Text>
                        <Text style={{fontSize:12,paddingHorizontal:10,paddingLeft:155,marginTop:10,opacity:0.5}}>-{route.params.data ? Number(route.params.data).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,'): '0.00'}</Text>
                    </View>
                    
                </View>
                
              </View>

              <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:120}}>Tổng phí thuê xe</Text>
                        {
                            dataDetailCar.map((l)=>(
                                <Text key={Math.random()} style={{fontSize:12,paddingHorizontal:10,paddingLeft:110}}>{ route.params.data ? (Number(l.price) + Number(servicePrice) - Number(route.params.data)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') 
                                : (Number(l.price) + Number(servicePrice)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') } x 1 ngày</Text>
                            ))
                        }
                      
                    </View>
            <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:120,marginTop:15,opacity:0.5}}>Mã khuyến mãi</Text>
                        {
                            dataDetailCar.map((o)=>(
                                <TouchableOpacity key={Math.random()} onPress={()=>navigation.navigate("discount",{city:o.address})}style={{width: 120, marginLeft: 110 }}>
                        
                                    <Text style={{paddingTop: 2, fontSize: 10,backgroundColor:'#e4e6e8', textAlign:'center',borderRadius:5,height:20,marginTop:15,opacity:0.5}}>Nhập mã khuyến mãi</Text>
                                </TouchableOpacity>
                            ))
                        }
                       
                        
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:120,fontWeight:'bold'}}>Tổng cộng</Text>
                        {
                            dataDetailCar.map((k)=>(
                                <Text key={Math.random()} style={{fontSize:12,paddingHorizontal:10,paddingLeft:130,fontWeight:'bold'}}>{ route.params.data ? (Number(k.price) + Number(servicePrice) - Number(route.params.data)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') 
                                : (Number(k.price) + Number(servicePrice)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,') }đ</Text>
               
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
                            <FontAwesome name="star" size={20} color="#00a550" style={{paddingTop:7}}/>
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
                <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>ĐÁNH GIÁ </Text>
                 <Text style={{fontSize:12, left: 200,paddingHorizontal:10, marginVertical:10}}>{dataReview.length} nhận xét</Text>
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
                                    source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vO2n-_DpXS1ZSm8d4Tn743V5FTuU2tYhEw&usqp=CAU"}}
                                    size={50}
                                    />
                                    
                                
                                </View>
                                <View style={{flexDirection:'column'}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize: 14 , fontWeight:'bold', paddingHorizontal: 5}}>Mai Khánh Thuận</Text>
                                        <Text style={{fontSize:12 , left:90}}>{dt.date}</Text>
                                    </View>
                                    
                                  
                                        {
                                            dt.rating == 1 ?<FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7}}/> : <View></View>
                                        }
                                        {
                                            dt.rating == 2 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                               < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7}}/>
                                              < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7,marginLeft:2}}/>
                                                </View> : <View></View>
                                        }
                                        
                                        {
                                             dt.rating == 3 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                         {
                                             dt.rating == 4 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                         {
                                             dt.rating == 5 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#00a550" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                   
                                    <View style={{paddingHorizontal: 5, marginTop: 20 , width:"70%"}}>
                                        {/* <Text style={{fontSize:12, textAlign:'justify'}}>{dt.comment}</Text> */}
                                    </View>
                                </View>
                                
                        </View>
                    </View>
                ))
            }
              
                <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                    <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                </View>
             
        </View>
      </ScrollView> 
</View>
    )
}



export default detailCar;