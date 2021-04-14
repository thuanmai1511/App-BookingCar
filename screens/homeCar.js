import React, {useState,useEffect} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,ScrollView,TextInput, Alert, Platform ,TouchableOpacity
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
import { FontAwesome } from '@expo/vector-icons'; 
import dealerman from '../img/dealerman.jpg'



const SignupCar = ({navigation,route}) => {
    // console.log(route.params.id);
    const [confirm , isConfirm] = React.useState('')

    const getGPLX = async ()  => {
        const ids  = route.params.id;
        await axios.post(`${host}/isGPLX`, {ids}).then((res)=>{
            isConfirm(res.data)
        })
    }
    // console.log(confirm);
    const nextPage = async () => {
        // console.log(confirm);
        if(Object.entries(confirm) == 0){
            Alert.alert("Hãy thêm giấy phép lái xe")
        }else {
            navigation.navigate("formCar")
        }
    }
    React.useEffect(()=>{getGPLX()},[])
    return (
        
            <View style={{ flex: 1 , backgroundColor: '#fff'}}>
            <StatusBar  backgroundColor="black" barStyle="light-content"/>
            <ScrollView>
            <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                    <TouchableOpacity
                       onPress={ () => navigation.goBack()}
                    >
                        <FontAwesome name="times" size={25} color="white"/>
                    </TouchableOpacity>

                    <View style={{flex: 1 }}>
                        <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>XE CỦA TÔI</Text>    
                    </View> 
                    
                    <TouchableOpacity>
                        <FontAwesome name="times" size={20} color="white" style={{opacity: 0}}/>
                    </TouchableOpacity>
                
            </View>
           
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15}}>
                <View style={{marginTop: 80 }}>
                    <Text style={{color: 'black', fontWeight:'bold', textAlign:'center' }}>Bạn muốn cho thuê xe</Text>    
                </View> 
                <View style={{marginTop: 10, paddingHorizontal: 30}}>
                    <Text style={{fontSize: 10}}>Trờ thành đối tác của chúng tôi để có cơ hội kiếm thêm thu nhập </Text>
                    <Text style={{fontSize: 10 , textAlign: 'center'}}>hằng tháng</Text>
                </View> 
               
                   

            </View>
            <View style={{ marginTop: 10}}>
                
                <Image 
                    
                    source={dealerman}
                    style={{width: "100%" , height: 280}}
                ></Image>
            </View>
            <View style={{flexDirection:"row", alignItems:"center",justifyContent: 'center',marginHorizontal: 130,marginTop:50,paddingVertical: 10, backgroundColor:'#00a550' , borderRadius: 3 }}>
            <TouchableOpacity
                    onPress={nextPage}> 
               <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>ĐĂNG XE</Text>
             </TouchableOpacity> 
             </View>

           
            </ScrollView>
           
           
        </View>
    )
}


export default SignupCar ;