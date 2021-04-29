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
            
        })
    }

   
    
    const confirm = (id,num) => {
        // console.log(id,num);
        const respone = {
            idConfirm: id,
            numConfirm : num
        }
        axios.post(`${host}/Confirm`,respone).then(dt=>{
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


 
    console.log(data);
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
                        
                        <View key={index} style={{width:'90%'}}>
                                <View style={{justifyContent:'center', alignItems:'center',marginTop: 10}}>
               
               <View style={{borderColor:'#e8eaef',borderWidth:1,width:"100%", height:300, backgroundColor:"#ffffff",borderTopLeftRadius:5,borderTopRightRadius:5,borderBottomEndRadius:5,borderBottomLeftRadius: 5,shadowColor: "#000",
   shadowOffset: {
       width: 0,
       height: 3,
   },
   shadowOpacity: 0.29,
   shadowRadius: 4.65,
   
   elevation: 7,}}>
                    <View style={{justifyContent:'center', alignContent:'center'}}>
                        <Text style={{textAlign:'center', marginTop:10,fontSize:16,fontWeight:'bold'}}>
                         {it.idCar.address}
                        </Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10 , justifyContent:'center',alignItems:'center'}}>
                        {/* <Text style={{fontSize:15,fontWeight:'bold'}}>Ngày</Text> */}
                        <Text style={{fontSize:19}}>{it.dateStart}</Text>
                        <Entypo name="arrow-long-right" size={30} color="#00a550" style={{marginHorizontal:20}} />
                        <Text style={{fontSize:19}}>{it.dateEnd}</Text>
                    </View>
                    <View style={{marginTop:10,justifyContent:'center',alignContent:'center'}}>
                        <Text style={{fontSize:15,fontWeight:'bold',textAlign:'center',alignContent:'center',justifyContent:'center'}}>Thông tin người đặt</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:10}}>
                        <Text style={{fontWeight:'bold', marginLeft:10,width:80}}>Tên</Text>
                        <Text>{it.idUserCheckOut.name}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontWeight:'bold', marginLeft:10,width:80}}>Liên lạc</Text>
                        <Text>{it.idUserCheckOut.phone}</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontWeight:'bold', marginLeft:10,width:80}}>Địa chỉ</Text>
                        <Text></Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontWeight:'bold', marginLeft:10,width:80}}>Giá thuê</Text>
                        <Text>{Number(it.idCar.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ /{it.dateNumber} ngày</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontWeight:'bold', marginLeft:10,width:80}}>Tổng cộng</Text>
                        <Text style={{fontWeight:'bold'}}>{(Number(it.price)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
                    </View>
                    <View style={{flexDirection:'row',marginTop:5}}>
                        <Text style={{fontWeight:'bold', marginLeft:10,width:80}}>Trạng thái</Text>
                            
                            {it.status == 0 ?  <Text style={{color:'red'}}>Chưa xác nhận</Text> : <Text style={{color:'#00a550'}}>Đã xác nhận</Text> } 
                        </View>
 
                        {
                            it.status == 1 ? <View></View> :<View style={{justifyContent:'center',alignItems:'center',flexDirection:'row',left:100}} >
                           
                           
                           
                            <TouchableOpacity style={{borderWidth:1,width:40,borderRadius:5,marginTop:5,borderColor:'#00a550'}} onPress={()=>confirm(it._id,1)}>
                                <Ionicons name="checkmark-outline" size={20} color="#00a550" style={{textAlign:'center'}}/>
                                
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderWidth:1,width:40,borderRadius:5,marginTop:5,marginLeft:5,borderColor:'red'}} onPress={()=>unConfirm(it._id,0)}>
                                <Ionicons name="close-outline" size={20} color="red" style={{textAlign:'center'}}/>
                                
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