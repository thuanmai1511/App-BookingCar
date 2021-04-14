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
import { set } from 'react-native-reanimated';

const discount = ({navigation,route})=> {

   
    
    const [coupon , setCoupon] = React.useState([]);
    const [priceCoupon , setPriceCoupon] = React.useState('');

    const Coupons = async () => {
        // setCity(route.params.city)
        const couponMap = await axios.get(`${host}/discount`)

        const dataFilter = couponMap.data.map(dt => {
            return {
                ...dt,
                city: route.params.city
            }
        })

        setCoupon(dataFilter)
        // couponMap.data.map((item)=>{
        //     setCoupon(pre=>[...pre , item])
        // })
    }
    const selectCoupon  = async (id)  => {
        // const idCoupon = id;
        await axios.post(`${host}/selectedCoupon` , {idCoupon: id}).then(res=>{
            // setPriceCoupon(res.data)
            navigation.navigate('detailCar', {data : res.data})
        })
    }
    // console.log(priceCoupon);
    React.useEffect(  ()=>{
        Coupons()
    },[])

    // console.log(coupon);

    
    return(
        
        <View style={{ flex: 1 , backgroundColor: '#d6d9dc'}}>
        <StatusBar  backgroundColor="black" barStyle="light-content"/>
        <ScrollView>
        <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                <TouchableOpacity
                   onPress={ () => navigation.goBack()}
                >
                    <Ionicons name="close-outline" size={30} color="white" />
                </TouchableOpacity>

                <View style={{flex: 1 }}>
                    <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>KHUYẾN MÃI</Text>    
                </View> 
                
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="black" style={{opacity: 0}}/>
                </TouchableOpacity>
            
        </View>
        {coupon.map((co,index)=>(
                         <TouchableOpacity key={Math.random()} onPress={()=>{selectCoupon(co._id)}}>
                         <View style={{width:"90%", height:100,flexDirection:'row', justifyContent:'center',marginLeft:20,marginTop:30,alignItems:'center',borderRadius:10,borderWidth:1}}>
             
                             {!index ? <Image style={{width:70, height:70}} source={{uri : "https://image.flaticon.com/icons/png/512/2763/2763242.png"}}/> :<Image style={{width:70, height:80}} source={{uri : "https://cdn0.iconfinder.com/data/icons/election-8/64/17_mouth_publicity_announcement_branding_promotion_-512.png"}}/>  }
                             <View style={{borderWidth: 1, width:"70%",height: 70, borderRadius:10,borderColor:'#70757a',borderStyle: 'dashed'}}>
                                <Text key={Math.random()} style={{justifyContent:'center',alignContent:'center',textAlign:'center',paddingTop:12,fontWeight:'bold',fontSize:15}}>{index ? co.city : co.note}</Text>
                                <Text key={Math.random()} style={{justifyContent:'center',alignContent:'center',textAlign:'center', paddingTop:5}}>{co.name}</Text>
                             </View>
             
                         </View>
             
                     </TouchableOpacity>
                    ))}
      

      </ScrollView>
</View>
    )
}



export default discount;