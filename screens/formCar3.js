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





const formCar3 = ({navigation, route}) =>{
    const [price,setPrice] = React.useState('')
    const [imageCar, setImageCar] = React.useState('')
    const [imageCars, setImageCars] = React.useState('')





    useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
          
        })();
      }, []);

      const pickImageCar = async () => {
        const value = await AsyncStorage.getItem('id');
        // console.log(value);
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              quality: 1,
            });
        
            // console.log(result);
        
            if (!result.cancelled) {
                setImageCar(result.uri);
            }

            const localUri = result.uri;
            const filename = localUri.split('/').pop();
            // Infer the type of the image
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;
            const formData = new FormData();
            const dataPicture = JSON.parse(JSON.stringify({ uri: localUri, name: filename, type }));
            
           
            formData.append('photo', dataPicture);
            formData.append('id', value);

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };

            axios
            .post(host + '/uploadCar', formData, config )
            .then(res => {
                setImageCars(res.data.uri)
                // navigation.replace('formCar2')
            })
        
      }
    //   console.log(imageCar);
    const postCars = async ()=>{
        // console.log(imageCar);
        // console.log(imageCars);
        const respone3 = route.params.respone2;
       
        const respone4 = {
            ...respone3,
            price: price,
            imageCar: imageCars
           


        }
        // console.log(respone4);

        if(respone4.price == '' || respone4.imageCar == ''){
            Alert.alert("Hãy nhập đầy đủ thông tin")
        }else {
            await axios.post(`${host}/formCar`,respone4)
            Alert.alert("Đăng kí hoàn tất. Hãy chờ hệ thống duyệt xe")
            navigation.navigate("homeCar")
        }
       

    }
    return(
        <View style={{ flex: 1 , backgroundColor: '#fff'}}>
        <StatusBar  backgroundColor="black" barStyle="light-content"/>
        <ScrollView>
        <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                <TouchableOpacity
                   onPress={ () => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={25} color="white" />
                </TouchableOpacity>

                <View style={{flex: 1 }}>
                    <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>GIÁ CHO THUÊ</Text>    
                </View> 
                
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="black" style={{opacity: 0}}/>
                </TouchableOpacity>
            
        </View>
        

        <View style={{ backgroundColor:'black',height: 200,justifyContent:'center', alignItems:'center'}}>
            <View>
                <Text style={{color: 'white', fontSize: 12,width: 320,textAlign:'center'}}>Giá mặc định sẽ được sử dụng cho các ngày không có giá tùy chỉnh</Text>
            </View>
            <TextInput
                style={{color:'green' , fontSize:40,borderBottomColor:'green',textAlign:'left', borderBottomWidth: 1,paddingHorizontal: 30, marginTop: 20}}
                placeholder="1234567"
                placeholderTextColor = "green"
                onChangeText={(val)=>setPrice(val)}
            ></TextInput>
            <View style={{bottom:52}}>
                <Text style={{left: 90, fontSize:40,color:'green'}}>đ</Text>
            </View>
            
        </View>
        <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 20}}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 20}}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>
        <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold'}}>Hình ảnh xe</Text>
                    <View  style={{left: 200, flex: 1, bottom: 5}}>
                       <TouchableOpacity onPress={pickImageCar}>
                            <Feather name="upload" size={20} color="green" style={{marginLeft: 20, marginTop: 5}} />
                       </TouchableOpacity>
                    </View>
                    <View style={{left: 135, flex: 2 }}>
                        <Text style={{fontSize: 12, fontWeight:'bold'}}></Text>
                    </View>
                    
                </View>
            </View>
        

        <View style={{flexDirection:"row", alignItems:"center",justifyContent: 'center',marginHorizontal: 0,marginTop:20,paddingVertical: 10, backgroundColor:'#00a550' , borderRadius: 3, height: 55 ,marginTop: 230}}>
        <TouchableOpacity
                onPress={postCars}> 
           <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>Hoàn tất</Text>
         </TouchableOpacity> 
         </View>
        
          

      </ScrollView>
</View>
    )
}


export default formCar3;