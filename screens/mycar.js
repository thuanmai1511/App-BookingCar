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
const myCar = ({navigation,route})=> {
    
    const [data ,setData] = React.useState([])
   

    const myOrder = async () => {
        await axios.post(`${host}/myOrders`,{id: route.params.id}).then((res)=>{
            setData(res.data)
            // getIDNotification(res.data.)
            // console.log(res.data.idUserCheckOut._id);
        })
    }

   
    
    const confirm = (id,num,idu) => {
        // console.log(id,num);
        const respone = {
            idConfirm: id,
            numConfirm : num,
            id : idu
        }
        // console.log(respone);
        axios.post(`${host}/Confirm`,respone).then(dt=>{

            for(var i of dt.data){
                sendPushNotification(i.value)
            }
            Alert.alert(
                "Duyệt xe thành công.",
                "",
                [
                  { text: "OK", onPress: () => myOrder()}
                ]
              );
            // Alert.alert("sadasd")
        })
    }

    const unConfirm = (id,num) => {
        // console.log(id,num);
        const respone = {
            idConfirm: id,
            numConfirm : num
        }
        axios.post(`${host}/unConfirm`,respone).then(dt=>{
            Alert.alert(
                "Duyệt xe không thành công.",
                "",
                [
                  { text: "OK", onPress: () => myOrder()}
                ]
              );
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


 
    // console.log(data);
    React.useEffect(()=>{myOrder()},[])



    
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
                        <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>DUYỆT XE</Text>    
                    </View> 
                    
                    <TouchableOpacity>
                        <Ionicons name="notifications-outline" size={24} color="white"/>
                    </TouchableOpacity>
                
            </View>

           

            
               {
                   data.length ? <View style={{justifyContent:'center', alignItems:'center'}}>
                         {
                    Object.entries(data).length !== 0 && data.map((it,index)=>(
                        
                        <View key={index} style={{width:'100%'}}>
                                <View style={{justifyContent:'center', alignItems:'center',marginTop:5}}>
               
               <View style={{borderColor:'#e8eaef',width:"100%", height:500, backgroundColor:"#ffffff",borderTopLeftRadius:5,borderTopRightRadius:5,borderBottomEndRadius:5,borderBottomLeftRadius: 5,shadowColor: "#000",
   shadowOffset: {
       width: 0,
       height: 3,
   },
   shadowOpacity: 0.29,
   shadowRadius: 4.65,
   
   elevation: 7,}}>
                    <View style={{justifyContent:'center', alignContent:'center',height:50,backgroundColor:'#00a550'}}>
                        <Text style={{textAlign:'center',fontSize:18,fontWeight:'bold',color:'white'}}>
                         {it.idCar.address}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10 , justifyContent:'center',alignItems:'center'}}>
                        
                        <Text style={{fontSize:19}}>{it.dateStart}</Text>
                        <Entypo name="arrow-long-right" size={30} color="#00a550" style={{marginHorizontal:20}} />
                        <Text style={{fontSize:19}}>{it.dateEnd}</Text>
                    </View>
                    {/* <View style={{marginTop:10,justifyContent:'center',alignContent:'center'}}>
                        <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center',alignContent:'center',justifyContent:'center'}}>Thông tin người đặt</Text>
                    </View> */}
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={{fontWeight:'bold', marginLeft:30,width:100,marginTop:10}}>Họ tên</Text>
                        <Text style={{marginTop:10}}>{it.idUserCheckOut.name}</Text>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 10}}>
                        <View style={{width: "80%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontWeight:'bold', marginLeft:30,width:100}}>Liên lạc</Text>
                        <Text >{it.idUserCheckOut.phone}</Text>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 10}}>
                        <View style={{width: "80%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontWeight:'bold',  marginLeft:30,width:100}}>Địa chỉ</Text>
                        <TouchableOpacity onPress={()=>navigation.navigate('maps',{data : it.locationCheckOut})}>
                            <Text style={{fontSize:12, color:"#00a550", fontWeight:'bold'}}>Nhấp vào để xem</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 10}}>
                        <View style={{width: "80%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                    </View>


                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontWeight:'bold',  marginLeft:30,width:100}}>Giá thuê</Text>
                        <Text>{Number(it.idCar.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ /{it.dateNumber} ngày</Text>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 10}}>
                        <View style={{width: "80%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                    </View>


                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontWeight:'bold',  marginLeft:30,width:100}}>Giao xe</Text>
                  
                        {it.feeExpress ? <Text>Có hỗ trợ</Text> : <Text>Không hỗ trợ</Text>}
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 10}}>
                        <View style={{width: "80%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontWeight:'bold', marginLeft:30,width:100}}>Tổng cộng</Text>
                        <Text style={{fontWeight:'bold'}}>{(Number(it.price)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 10}}>
                        <View style={{width: "80%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                    </View>

                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontWeight:'bold',marginLeft:30,width:100}}>Trạng thái</Text>
                            
                            {it.status == 0 ?  <Text style={{color:'red'}}>Chưa xác nhận</Text> : <Text style={{color:'#00a550'}}>Đã xác nhận</Text> } 
                        </View>


                        <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 10}}>
                            <View style={{width: "80%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                        </View>
 
                        {
                            it.status == 1 ? <View></View> :<View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',marginTop:10}} >
                           
                           
                           
                            <TouchableOpacity style={{width:100,height:30,borderRadius:5,marginTop:5,backgroundColor:'#00a550'}} onPress={()=>confirm(it._id,1,it.idUserCheckOut._id)}>
                                {/* <Ionicons name="checkmark-outline" size={20} color="#00a550" style={{textAlign:'center'}}/> */}
                                <Text style={{textAlign:'center', paddingTop:5,color:'#fff'}}>Xác nhận</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{width:100,height:30,borderRadius:5,marginTop:5,marginLeft:5,backgroundColor:'red'}} onPress={()=>unConfirm(it._id,0)}>
                                {/* <Ionicons name="close-outline" size={20} color="red" style={{textAlign:'center'}}/> */}
                                <Text style={{textAlign:'center', paddingTop:5,color:'#fff'}}>Hủy</Text>
                                
                            </TouchableOpacity>
                        </View>
                        }
                         
                       

                        </View>

                    

                    </View>
                   </View> 
                    ))
                }
        
                   </View>
                   : 
                   <View style={{backgroundColor:'white' ,height: Dimensions.get("screen").height }}> 
                   <View style={{justifyContent:'center',alignItems:'center',marginTop:100}}>
                           <Text style={{fontSize:12,color:"#73777b"}}>Hiện tại bạn chưa có yêu cầu duyệt xe.</Text>
                   </View>
                   <View style={{justifyContent:'center',alignItems:'center',marginTop:20,backgroundColor:'#fff'}}>
                       
                       <Image  style={{width:"100%" , height:250}} source={imgCar}/>
                           
                       </View>
                </View>
               }
                
              
                
                <View style={{marginTop:10}}></View>
         
            
        
      </ScrollView>
</View>
    )
}



export default myCar;