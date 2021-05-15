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
                dataNew.length ?  <View style={{justifyContent:'center', alignItems:'center'}}>
            {

            dataNew.map((item, index)=>(
            <TouchableOpacity key={index} style={{}}>
                <View style={{backgroundColor:'#fff', width: '100%', height: 80 ,justifyContent:'center',alignItems:'center'}}>
                    
                    <View style={{flexDirection:'row', justifyContent:'center',alignItems:'center'}}>
                        <Avatar.Image
                            source={{uri: host + "/" +item.idCar.imagesCar}}
                            size={50}
                        />
                        <View>
                            <View style={{flexDirection:'row'}}>
                                <View style={{flexDirection:'column'}}>
                                    <Text style={{width:200,marginLeft:5}}>Đặt xe {item.idCar.carModel} {item.idCar.carName} #{item._id.slice(0,6)}</Text>
                                    
                                    <Text style={{marginLeft:5,fontSize:12,marginTop: 5,color:'#86929e'}}>{item.currDate}</Text>
                                       
                                   
                                </View>
                                <View style={{flexDirection:'column' , justifyContent:'center',alignItems:'center'}}>
                                    <Text style={{width:100,fontWeight:'bold'}}>-{Number(item.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}đ</Text>
                                    <TouchableOpacity onPress={()=>navigation.navigate("rate",{data: item.idHost})} style={{borderColor: '#00a550',borderRadius:5,width: 50 , height: 25,borderWidth:1, marginTop: 5,justifyContent:'center',alignItems:'center'}}>
                                            <Text style={{fontSize:10,color:'#00a550'}}>Đánh giá</Text>
                                    </TouchableOpacity>
                                   
                                </View>
                                
                            </View>
                            
                        </View>
                        <View style={{marginTop:100}}></View>
                    </View>
                   
                
                </View>
                <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 5 }}>
                    <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                </View>
            </TouchableOpacity>
            ))
            }
            </View>

                : 
                
                <View style={{backgroundColor:'white' ,height: Dimensions.get("screen").height }}> 
                <View style={{justifyContent:'center',alignItems:'center',marginTop:100}}>
                        <Text style={{fontSize:12,color:"#73777b"}}>Lịch sử trống.</Text>
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



export default historyPage;