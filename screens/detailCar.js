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
    // Geocoder.init("AIzaSyBHRMxpBKc25CMHY51h1jrnCCm6PjNs62s");
    const refDetail = useRef(null)

   const [dataDetailCar , setDataDetailCar] = React.useState([])
    const [selected , setSelected] = React.useState('')
    const [name , setName] = React.useState('')
    const [email , setEmail] = React.useState('')
    const [img , setImg] = React.useState('')
    const [dataReview, setDataReview] = React.useState([])
    const [dataRelate, setDataRelate] = React.useState([])
    const [idHost, setIdHost] = React.useState('')
    const [numberRating, setNumberRating] = React.useState('')
    const [numberRatingHost, setNumberRatingHost] = React.useState('')
    const [number, setNumber] = React.useState('')
    // const [dataReviewHost, setDataReviewHost] = React.useState([])

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
            setDataReviewHost(res.data[0])
            setDataReviewCar(res.data[0].review)
            setDataDetailCar(res.data)
            getDataReview(res.data[0]._id)
            relateCar(res.data[0].address, res.data[0]._id)
            setIdHost(res.data[0].idUser)
            numberTrip(res.data[0]._id)
           
        })
        selectedHeart() , getName() 

    }
    

    const addFavorite = async (id) => {
        const value = await AsyncStorage.getItem('id');
        const idCar = id;
       if(!value) {
        Alert.alert(
            "",
            "B???n ch??a ????ng nh???p",
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
            Alert.alert("Vui l??ng ????ng nh???p ????? ti???p t???c")
            navigation.navigate("SigninScreen")
        }else {
           
            const  p = dataDetailCar.map((k)=>(
                (((Number(k.price) * Number(route.params.n?route.params.n:'')) - Number(route.params.data ?route.params.data: '') - ((Number(k.price)  * Number(route.params.n?route.params.n:'')) * Number(0.1)))  + (Number(route.params.km ?route.params.km : '' )*Number(10000)))
    
            ))
           const ps =  dataDetailCar.map((tt)=> 
           
           ((((Number(tt.price) * Number(route.params.n?route.params.n:'')) - Number(route.params.data ?route.params.data: '') - ((Number(tt.price)  * Number(route.params.n?route.params.n:'')) * Number(0.1)))  + (Number(route.params.km ?route.params.km : '' )*Number(10000))) * Number(0.3))
           
           )
            
            
            const i = dataDetailCar.map((id)=>(id.idUser))
        
            const j = route.params.km ? (Number(route.params.km) * Number(10000)) : 0

            const s =  dataDetailCar.map( (y)=>((Number(y.price)  * Number(route.params.n?route.params.n:'')) * Number(0.1)))
            // console.log(s);
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
                prices : ps,
                serviceFee : s
    
            }
            // console.log(respone);
            if(respone.dateStart == undefined || respone.dateEnd == undefined || respone.arrDates == undefined){
                Alert.alert("Vui l??ng ch???n ng??y thu??")
            }else {
                await axios.post(`${host}/checkout`,respone).then(()=>{
                    Alert.alert(
                        "?????t xe th??nh c??ng",
                        "Vui l??ng ?????i ch??? xe x??c nh???n ",
                        [
                          {
                            text: "Cancel",
                            onPress: () => console.log("Cancel Pressed"),
                            style: "cancel"
                          },
                          { text: "OK", onPress:  ()  => {
                                getIdToken()
                                notifiIdHost()
                                navigation.navigate('Home')  
                                
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
            // console.log(dt.data);
         const a = dt.data.filter(dl=>(dl._id) != i)
            // console.log(a);
         setDataRelate(a)
        })
        
        
    } 

    const naviDetailCar = async (id) => {
        // console.log(id);
        await axios.get(`${host}/detailCar/`+id).then(async(res)=>{
            // console.log(res.data[0]._id);
            const { address, _id } = res.data[0]
                setDataDetailCar(res.data)
                relateCar(address, _id)
                getDataReview(res.data[0]._id)
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
            
        //    console.log(dt.data.tokenDevices);
            for(var i of dt.data.tokenDevices){
                sendPushNotification(i.value)
            }
            
            
        })
    } 
    const notifiIdHost = async () => {
        const value = await AsyncStorage.getItem('id');
        const u = dataDetailCar.map((id)=>(id.idUser))
        // const c = dataDetailCar.map((id)=>(id._id))
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //To get the Current Hours
        var min = new Date().getMinutes(); //To get the Current Minutes
        
        const notifiRes = {
            idu : value,
            idh : u,
            title : "Th??ng B??o ?????t Xe",
            text : "Xe ???? c?? kh??ch ?????t. H??y x??c nh???n v???i kh??ch",
            dateNoti: date + '/' + month + '/' + year,
            time : hours + ':' + min
            
        } 
        // console.log(notifiRes);

         axios.post(`${host}/notificationRes`,notifiRes).then(()=>{
           
        })
    }
    const numberTrip = async (id) => {
    //    console.log(id);
        await axios.post(`${host}/getNumberTrip`, {id}).then((res)=>{
            setNumber(res.data.number)
        })

    }
 
    const setDataReviewCar = (dt) => {
        var avg = 0
        dt.map(dtt=>{
            avg += dtt.rating
        })
        var avgg = Number(avg/dt.length);
        const condition = avgg - Math.floor(Number(avg/dt.length))
            // console.log(condition);
            if(condition >= 0.5)
                setNumberRating(Math.round(avgg))
            else  setNumberRating(Math.floor(avgg))
    }
    const setDataReviewHost = (dt) => {
        var avgg = 0
        var length =0
        dt.idUser.review.map(dtt=>{
            length ++;
            if(dtt.rating){
                avgg += dtt.rating
            }
        })
        var avggg = Number(avgg/length);
        const condition = avggg - Math.floor(Number(avgg/length))
            // console.log(condition);
            if(condition >= 0.5)
                setNumberRatingHost(Math.round(avggg))
            else  setNumberRatingHost(Math.floor(avggg))
    }
    React.useEffect(  ()=>{
        detailCars() 
    },[])

    // console.log(dataReview);

    async function sendPushNotification(expoPushToken) {
        const message = {
          to: expoPushToken,
          sound: 'default',
          title: 'BookingCar Application',
          body: 'Xe ???? c?? kh??ch ?????t. H??y x??c nh???n v???i kh??ch!',
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

   const serviceFee = 0;
    
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
                        <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>CHI TI???T XE</Text>    
                    </View> 
                    {
                        dataDetailCar.map((k)=>(
                            
                            <TouchableOpacity key ={Math.random()} onPress={()=>addFavorite(k._id)}>
                                  
                                   {selected.indexOf(k._id) != -1 ? <MaterialIcons name="favorite" size={24} color="red" /> : <MaterialIcons name="favorite-border" size={24} color="white" />}
                                   
                            </TouchableOpacity> 
                       
                        ))
                    }
                   
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
                     <Text style={{marginTop: 7,marginLeft: 10}}>
                         
                     {numberRating ? 
                            
                            <Text style={{width:'60%',textAlign:'right'}}>
                            
                            {numberRating == 1?
                                <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                : "" 
                            }
                            {numberRating == 2 ?
                                <View style={{flexDirection:'row'}}>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    
                                </View>   
                                : "" 
                            }
                            {numberRating == 3 ?
                                <View style={{flexDirection:'row'}}>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    
                                </View>   
                                : "" 
                            }
                            {numberRating == 4 ?
                                <View style={{flexDirection:'row'}}>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                </View>   
                                : "" 
                            }
                            {numberRating == 5 ?
                                <View style={{flexDirection:'row'}}>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{}}/>
                                </View>   
                                : "" 
                            }
                            
                           
                            </Text>
                            :<Text style={{marginTop: 7,width:'60%',textAlign:'right',fontSize: 12}}>Ch??a c?? ????nh gi??</Text>
                            
                        }
                     
                     </Text>
                     <Text style={{marginTop: 7,marginLeft: 15,fontSize: 12,width:"30%"}}>{number} chuy???n</Text>
                     <View style={{flexDirection:'row'}}>
                     
                        {dataDetailCar.map((i)=>(
                            <Text key={Math.random()} style={{color:'#00a550',fontSize:18,fontWeight:'bold' }}>{Number(i.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}</Text>
                        ))}
                        
              
                       
                        <Text style={{fontSize:12,marginTop:5}}>/ng??y</Text>
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
                            
                            <Text key={Math.random()} style={{marginTop: 9,marginLeft: 5, fontSize:12,width:340}}>{e.addresss}</Text>
                            
                        ))
                    }
                   
                </View>
                
            </View>

                </View> 

          <View style={{marginTop:5,height:300,width:"100%", backgroundColor:'white'}}>
              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>TH???I GIAN</Text>
              <View style={{flexDirection:'row'}}>
                
                <Ionicons name="calendar-outline" size={20} color="black"  style={{justifyContent:'center',alignContent:'center', marginVertical:10,paddingHorizontal:10}}/>
                <View style={{flexDirection:'column', justifyContent:'center',alignContent:'center' ,marginLeft:10,width:'70%'}}>
                    <Text style={{fontSize:12, width:80}}>{route.params.s ? route.params.s : 'Ng??y b???t ?????u'}</Text>
                    
                    <Text style={{fontSize:12,marginVertical:2, width:80}}>{route.params.e ? route.params.e : 'Ng??y k???t th??c'}</Text>
                </View>
                <TouchableOpacity style={{width:50,height:25,backgroundColor:'white',marginTop:10,borderColor:'#00a550',borderWidth:1}} onPress={()=>navigation.navigate("calendarSave",{idc : route.params.ids})}>
                            <Text style={{textAlign:'center',color:'#00a550',paddingTop:5,fontSize:10,fontWeight:'bold'}}>CH???N</Text>   
                        </TouchableOpacity> 
       
              </View>

              <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>

            <Text style={{fontSize:12,fontWeight:'bold',paddingHorizontal:10}}>?????A ??I???M GIAO NH???N XE</Text>
              <View style={{flexDirection:'row',paddingTop:10}}>
                
                <Ionicons name="navigate-circle-outline" size={25} color="black"  style={{justifyContent:'center',alignContent:'center', marginVertical:10,paddingHorizontal:10}}/>
                <View style={{flexDirection:'column', justifyContent:'center',alignContent:'center'}}>
                {
                        dataDetailCar.map((r)=>(
                            
                            <Text key={Math.random()} style={{fontSize:12,width:'100%'}}>{r.addresss}</Text>
                            
                        ))
                    }
                    
                
                    <Text style={{fontSize:12,marginVertical:2,opacity:0.5}}>Chi ph?? giao xe 10.000??/1km (n???u c??)</Text>
                </View>
               
              </View>


              <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 5, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{paddingHorizontal:20}}> 
            {
                dataDetailCar.map((p)=>(
                    p.express == true ? 
                <TouchableOpacity key={Math.random()}onPress={()=>navigation.navigate("map", {id :p._id })}>
                    <Text style={{fontSize:10, color:"#00a550", fontWeight:'bold'}}>Ch???n ?????a ??i???m giao nh???n xe</Text>
                </TouchableOpacity>
                    : <View key={Math.random()}></View>
                ))
            }
          
                
            </View>
                <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                            <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                </View>

           

          </View>
            
          <View style={{marginTop:5,height:320,width:"100%", backgroundColor:'white'}}>

              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>CHI TI???T GI??</Text>
              <View style={{flexDirection:'row'  , width: "100%"}}>
                
               
                <View style={{flexDirection:'column', justifyContent:'center',alignContent:'center'}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:'60%'}}>????n gi?? thu??</Text>
                        {
                        dataDetailCar.map((t)=>(
                            
                            <Text key={Math.random()} style={{fontSize:12,paddingHorizontal:10,textAlign:'right',width:'40%',opacity:0.5,marginTop:5}}>{(Number(t.price)  ).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')} x {route.params.n ? route.params.n : 1 } ng??y</Text>
                        ))
                    }
                       
                    </View>
                   
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,marginTop:10,width:'60%'}}>Ph?? d???ch v???</Text>
                        {
                            dataDetailCar.map((k)=>(
                                <Text key ={Math.random()} style={{fontSize:12,paddingHorizontal:10,textAlign:'right',width:'40%',opacity:0.5,marginTop:5}}>-
                               { ((Number(k.price)  * Number(route.params.n?route.params.n:'')) * Number(0.1)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}   
                                    
                                ??</Text>
               
                            ))}
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,marginTop:10,width:'60%'}}>Gi???m gi??</Text>
                        <Text style={{fontSize:12,paddingHorizontal:10,textAlign:'right',width:'40%',opacity:0.5,marginTop:5}}>-{route.params.data ? Number(route.params.data).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,'): '0.0'}??</Text>
                    </View>

                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,marginTop:10,width:'60%'}}>Ph?? giao xe</Text>
                        <Text style={{fontSize:12,paddingHorizontal:10,textAlign:'right',width:'40%',opacity:0.5,marginTop:5}}> {route.params.km ? (Number(route.params.km) * Number(10000)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,') : '0'}??</Text>
                    </View>
                   
                    
                </View>
                
              </View>

              <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:'60%'}}>T???ng c???ng</Text>
                        {
                            dataDetailCar.map((l)=>(
                                <Text key={Math.random()} style={{fontSize:12,paddingHorizontal:10,textAlign:'right',width:'40%'}}>{(((Number(l.price) * Number(route.params.n?route.params.n:'')) - Number(route.params.data ?route.params.data: '') - ((Number(l.price)  * Number(route.params.n?route.params.n:'')) * Number(0.1)))  + (Number(route.params.km ?route.params.km : '' )*Number(10000))).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}??</Text>
                            ))
                        }
                      
                    </View>
            <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:'60%',marginTop:15,opacity:0.5}}>M?? khuy???n m??i</Text>
                        {
                            dataDetailCar.map((o)=>(
                                <TouchableOpacity key={Math.random()} onPress={()=>navigation.navigate("discount",{city:o.address})}style={{width: "40%", textAlign:'right' }}>
                        
                                    <Text style={{paddingTop: 2, fontSize: 10,backgroundColor:'#e4e6e8', textAlign:'center',borderRadius:5,height:20,marginTop:15,opacity:0.5}}>Nh???p m?? khuy???n m??i</Text>
                                </TouchableOpacity>
                            ))
                        }
                       
                        
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>
           
            <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:'60%'}}>Tr??? tr?????c</Text>
                        {
                            dataDetailCar.map((k)=>(
                                <Text key={Math.random()} style={{fontSize:12,paddingHorizontal:10,textAlign:'right',width:'40%'}}>
                                {((((Number(k.price) * Number(route.params.n?route.params.n:'')) - Number(route.params.data ?route.params.data: '') - ((Number(k.price)  * Number(route.params.n?route.params.n:'')) * Number(0.1)))  + (Number(route.params.km ?route.params.km : '' )*Number(10000))) * Number(0.3)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}    
                                    
                                ??</Text>
               
                            ))
                        }
                         
            </View>
            
            <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize:12,paddingHorizontal:10,width:'60%',fontWeight:'bold',marginTop:10}}>C??n l???i</Text>
                        {
                            dataDetailCar.map((k)=>(
                                <Text key={Math.random()} style={{fontSize:12,paddingHorizontal:10,textAlign:'right',width:'40%',fontWeight:'bold',marginTop:10}}>
                                {((((Number(k.price) * Number(route.params.n?route.params.n:'')) - Number(route.params.data ?route.params.data: '') - ((Number(k.price)  * Number(route.params.n?route.params.n:'')) * Number(0.1)))  + (Number(route.params.km ?route.params.km : '' )*Number(10000))) - ((((Number(k.price) * Number(route.params.n?route.params.n:'')) - Number(route.params.data ?route.params.data: '') - ((Number(k.price)  * Number(route.params.n?route.params.n:'')) * Number(0.1)))  + (Number(route.params.km ?route.params.km : '' )*Number(10000))) * Number(0.3))).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}    
                                    
                                ??</Text>
               
                            ))
                        }
                         
            </View>

          </View>
         
         <View style={{marginTop:5,height:350,width:"100%", backgroundColor:'white'}}>
              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>?????C ??I???M</Text>
              <View style={{flexDirection:'row',justifyContent:'center',marginVertical:10,marginLeft:40}}>
             
                    <MaterialCommunityIcons name="car-child-seat" size={30} color="#cccccc" style={{justifyContent:'center',alignContent:'center', width:"25%"}}/>
                    <FontAwesome name="cogs" size={25} color="#cccccc" style={{justifyContent:'center',alignContent:'center', width:"25%"}}/>
                    <MaterialCommunityIcons name="gas-station" size={30} color="#cccccc" style={{justifyContent:'center',alignContent:'center', width:"25%"}}/>
                    <MaterialCommunityIcons name="fuel" size={30} color="#cccccc" style={{justifyContent:'center',alignContent:'center', width:"25%"}}/>
                </View>
                {
                    dataDetailCar.map((z)=>(
                    <View  key={Math.random()} style={{flexDirection:'row',justifyContent:'center'}}>
                        <Text key={Math.random()} style={{justifyContent:'center', alignContent:'center',fontSize:12,textAlign:'center',width:"27%"}}>{z.seats} gh???</Text>
                        <Text key={Math.random()}  style={{justifyContent:'center', alignContent:'center',fontSize:12,textAlign:'center',width:"23%"}}>{z.transmission}</Text>
                        <Text key={Math.random()} style={{justifyContent:'center', alignContent:'center',fontSize:12,textAlign:'center',width:"20%"}}>{z.fuel}</Text>
                        <Text key={Math.random()} style={{justifyContent:'center', alignContent:'center',fontSize:12,textAlign:'center',width:"30%"}}>{z.fueled} l??t/100km</Text>
                     </View>
                    ))
                }
               
                <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                </View>
                <Text style={{fontSize:12,fontWeight:'bold',paddingHorizontal:10}}>M?? T???</Text>
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
                <Text style={{fontSize:12,fontWeight:'bold',paddingHorizontal:10}}>T??NH N??NG</Text>
                <View style={{flexDirection:'row', justifyContent:'center',alignContent:'center', marginTop:10}}>
                    {/* {dataDetailCar.map((i)=>(
                        <Text>{i.sunroof}</Text>
                    ))} */}
                    <Ionicons name="car-outline" size={25} color="black" />
                    {
                        dataDetailCar.map((j)=>(
                            j.sunroof == true ?  <Text key={Math.random()} style={{paddingHorizontal:10,fontSize: 12, paddingTop: 5,justifyContent:'center',alignContent:'center'}}>C???a s??? tr???i</Text> : <Text  key={Math.random()} style={{fontSize: 12, paddingTop: 5,paddingHorizontal:10,color:'#dc3545'}}>Ch??a c??</Text>
                        ))
                    }
                    <Ionicons name="bluetooth-outline" size={25} color="black"  style={{marginLeft:40}}/>
                    {
                        dataDetailCar.map((l)=>(
                            l.bluetooth == true ?  <Text key={Math.random()} style={{paddingHorizontal:10,fontSize: 12, paddingTop: 5,justifyContent:'center',alignContent:'center'}}>Bluetooth</Text> : <Text  key={Math.random()} style={{fontSize: 12, paddingTop: 5,paddingHorizontal:10,color:'#dc3545'}}>Ch??a c??</Text>
                        ))
                    }
                </View>
                <View style={{flexDirection:'row', justifyContent:'center',alignContent:'center', marginVertical:20}}>
                    <Ionicons name="navigate-outline" size={25} color="black" />
                    {
                        dataDetailCar.map((g)=>(
                            g.gps == true ?  <Text key={Math.random()} style={{paddingHorizontal:10,fontSize: 12, paddingTop: 5,justifyContent:'center',alignContent:'center'}}>GPS</Text> : <Text  key={Math.random()} style={{fontSize: 12, paddingTop: 5,paddingHorizontal:10,color:'#dc3545'}}>Ch??a c??</Text>
                        ))
                    }
                    <Ionicons name="camera-reverse-outline" size={25} color="black" style={{marginLeft:20}}/>
                    {
                        dataDetailCar.map((c)=>(
                            c.cameraback == true ?  <Text key={Math.random()} style={{paddingHorizontal:10,fontSize: 12, paddingTop: 5,justifyContent:'center',alignContent:'center'}}>Camera l??i</Text> : <Text  key={Math.random()} style={{fontSize: 12, paddingTop: 5,paddingHorizontal:10,color:'#dc3545'}}>Ch??a c??</Text>
                        ))
                    }
                    <Ionicons name="map-outline" size={25} color="black" style={{marginLeft:20}}/>
                    {
                        dataDetailCar.map((m)=>(
                            m.map == true ?  <Text key={Math.random()} style={{paddingHorizontal:10,fontSize: 12, paddingTop: 5,justifyContent:'center',alignContent:'center'}}>B???n ?????</Text> : <Text  key={Math.random()} style={{fontSize: 12, paddingTop: 5,paddingHorizontal:10,color:'#dc3545'}}>Ch??a c??</Text>
                        ))
                    }
                </View>
          </View>
          
          <View style={{marginTop:5,height:120,width:"100%", backgroundColor:'white'}}>
              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>GI???Y T??? THU?? XE</Text>
                <View style={{flexDirection:'row',paddingHorizontal:10}}>
                    <Ionicons size={25} color="black" name="card-outline"></Ionicons>
                    <Text style={{paddingTop:5, fontSize:12, marginLeft:10}}>CMND v?? GPLX </Text>       
                </View>
                <View style={{flexDirection:'row',paddingHorizontal:10,marginTop:20}}>
                    <Ionicons size={25} color="black" name="newspaper-outline"></Ionicons>
                    <Text style={{paddingTop:5, fontSize:12, marginLeft:10}}>H??? kh???u ho???c KT3 ho???c Passport </Text>       
                </View>
          </View>
          <View style={{marginTop:5,height:120,width:"100%", backgroundColor:'white'}}>
              <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10}}>CH??? XE </Text>
                <View style={{flexDirection:'row',paddingHorizontal:10}}>
                    <View style={{flexDirection:'column' , width: 180}}>
                        <Text style={{paddingTop:5, fontSize:14, marginLeft:10, color:'#00a550'}}>{name ? name :  email } </Text> 
                    
                      
                        <View style={{flexDirection:'row'}}>
                            <Text style={{paddingTop:5, fontSize:18, marginLeft:10}}>
                            {numberRatingHost ? 
                            
                            <Text style={{marginTop: 5,width:'55%',textAlign:'right'}}>
                            
                            {numberRatingHost == 1?
                                <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                : "" 
                            }
                            {numberRatingHost == 2 ?
                                <View style={{flexDirection:'row'}}>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    
                                </View>   
                                : "" 
                            }
                            {numberRatingHost == 3 ?
                                <View style={{flexDirection:'row'}}>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    
                                </View>   
                                : "" 
                            }
                            {numberRatingHost == 4 ?
                                <View style={{flexDirection:'row'}}>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                </View>   
                                : "" 
                            }
                            {numberRatingHost == 5 ?
                                <View style={{flexDirection:'row'}}>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                    <FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                </View>   
                                : "" 
                            }
                            
                           
                            </Text>
                            :<Text style={{paddingTop:5, fontSize:14, marginLeft:10}}>Ch??a c?? ????nh gi??</Text>
                        }
     
                            </Text>    
                         
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
                            <Text style={{textAlign:'center',color:'white', paddingTop:8,fontSize:14,fontWeight:'bold'}}>?????T XE</Text>   
                        </TouchableOpacity>                       
                        <TouchableOpacity style={{width:300,height:35,backgroundColor:'white',marginTop:10,borderColor:'#00a550',borderWidth:1}}>
                            <Text style={{textAlign:'center',color:'#00a550', paddingTop:8,fontSize:14,fontWeight:'bold'}}>B??O X???U</Text>   
                        </TouchableOpacity>  
                    </View>
                        
                    
                </View>
               
          </View>
          
          <View style={{marginTop:5,height:200,width:"100%", backgroundColor:'white'}}>
            
              <View style={{flexDirection:'row'}}>
                <Text style={{fontSize:12,fontWeight:'bold', marginVertical:10,paddingHorizontal:10,width:'60%'}}>????NH GI?? </Text>
                 <Text style={{fontSize:12,paddingHorizontal:10, marginVertical:10,width:'38%',textAlign:'right'}}>{dataReview.length} nh???n x??t</Text>
              </View>
                        

                
                    <View >
                        <View style={{flexDirection:'row',paddingHorizontal:10}}>   
            </View>
                    
                    
                        {   dataReview[0] ? 
                        <View>
                            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                                    <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                                </View>
                            <View style={{flexDirection:'row'}}>
                                
                            <View style={{paddingHorizontal: 10}}>
                                    
                                    <Avatar.Image
                                    source={{uri: host+"/"+dataReview[0]?.idRating.images}}
                                    size={50}
                                    />
                                    
                                
                                </View>
                                <View style={{flexDirection:'column'}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize: 14 , fontWeight:'bold', paddingHorizontal: 5,width:"72%"}}>{dataReview[0]?.idRating?.name}</Text>
                                        <Text style={{fontSize:12 ,textAlign:'right'}}>{dataReview[0]?.date}</Text>
                                    </View>
                                    
                                  
                                        {
                                            dataReview[0]?.rating == 1 ?<FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/> : <View></View>
                                        }
                                        {
                                            dataReview[0]?.rating == 2 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                               < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                              < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                                </View> : <View></View>
                                        }
                                        
                                        {
                                             dataReview[0]?.rating == 3 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                         {
                                             dataReview[0]?.rating == 4 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                         {
                                             dataReview[0]?.rating == 5 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                   
                                    <View style={{paddingHorizontal: 5, marginTop: 10 , width:"100%"}}>
                                        <Text style={{fontSize:12, textAlign:'justify'}}>{dataReview[0]?.comment}</Text>
                                    </View>

                                   
                                </View>
                               
                            </View>
                           
                        </View>
                        : <></>
                        }

                        
        
            </View>
        </View>
        
        <View style={{flexDirection:'row',backgroundColor:'#fff'}}>
                <TouchableOpacity style={{marginRight:10,width:'90%'}} onPress={()=>navigation.navigate('rate2', {data : dataReview})}>
                    <Text style={{textAlign:'right',fontSize:10,color:'#00a550',marginBottom:10}}>XEM TH??M</Text>
                </TouchableOpacity>
                <AntDesign name="right" size={10} color="silver" style={{textAlign:'right',marginTop:2}}/>
                
            </View>
        <ScrollView style={{backgroundColor:'#fff',marginTop:5}}>
            <View >
                <Text style={{marginLeft:10,marginTop:10,fontWeight:'bold'}}>XE LI??N QUAN</Text>
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