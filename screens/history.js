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
const historyPage = ({navigation,route})=> {
    const [dataNew , setDataNew] = React.useState([])

    // console.log(route.params.dataNavi);
    const filterData = () => {
        const data = route.params.dataNavi;
        
        const dataF = data.filter(dt=> {
            return dt.checkCompleted == 1
        })
        // console.log(dataF);
        setDataNew(dataF)
    }
//    console.log(dataNew.status);
    


    React.useEffect(()=>{ filterData()},[])



    
    return(
        
        <View style={{  backgroundColor: '#d6d9dc',height:"100%"}}>
       
       <ScrollView> 
            <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                    <TouchableOpacity
                    onPress={ () => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>

                    <View style={{flex: 1 }}>
                    
                        <Text key={Math.random()} style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>LỊCH SỬ</Text>   
                    </View> 
                    
                    <TouchableOpacity>
                        <Ionicons name="arrow-back" size={24} color="black" style={{opacity: 0}}/>
                    </TouchableOpacity>
                
            </View>
            {

                dataNew.map((item, index)=>(
                    
                <View key={index}>
                   
                        <View style={{justifyContent:'center' , alignItems:'center',marginTop:20}}>
                            <View style={{ height:190 , width:"95%",borderRadius:10,backgroundColor:"#fff"}}> 
                            <View style={{flexDirection:'row'}}>
                                <Text style={{marginLeft:10, marginTop:10,fontWeight:'bold'}}>Đặt xe </Text>
                                <Text style={{marginTop:10,color:'grey'}}>#{item._id.slice(0,6)}</Text>
                                <Text style={{marginTop:10,left:150,color:'grey'}}>{item.currDate}</Text>
                            </View>
                            <View style={{flexDirection:'row',marginTop:10, width:"55%", marginLeft:5}}>
                            
                            <Image
                            source={{uri: host + '/' +item.idCar.imagesCar}}
                            style={{width: 180, height: 100,borderRadius:10}}
                            
                            />
                            <View style={{flexDirection:'column'}}>
                                <Text style={{marginTop:10,marginLeft:5}}>{item.idCar.carModel} {item.idCar.carName}</Text>
                                <Text style={{marginTop:10,marginLeft:5}}>{item.idCar.district} {item.idCar.address}</Text>
                            
                                <Text style={{marginTop:10,marginLeft:5,fontWeight:'bold'}}>{(Number(item.price)).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
                            </View>
                            
                        </View>
                        <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 5 }}>
                            <View style={{width: "90%",borderBottomWidth: 1 ,marginTop:2, borderColor: '#e8eaef'}}></View>
                        </View>
                        <View style={{flexDirection:'row',height:50,marginTop:5}}>
                            {
                                item.checkCompleted == 1 ? <Text style={{marginLeft:15 , fontWeight:'bold',color:'#00a550'}}>Hoàn thành</Text> : ''
                            }
                            
                            <TouchableOpacity style={{left:130,borderWidth:1,borderRadius:10,height:25,width:70,borderColor:'#e8eaef'}} onPress={()=>navigation.navigate("rate",{data: item.idHost})}>
                                <Text style={{fontSize:12,fontWeight:'bold',textAlign:'center',paddingTop:2}}>Đánh giá</Text>
                            </TouchableOpacity>
                            
                        </View>
                </View> 
                
            </View>
            
        
                    </View>
                ))
            }
            <View style={{marginTop:10}}></View>
    </ScrollView>  
</View>
    )
}



export default historyPage;