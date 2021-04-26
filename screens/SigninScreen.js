import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    StatusBar,
    Image,
    Alert,
    TouchableOpacity
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import imgLogin from '../images/imgLogin.jpeg';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import host from '../port/index';
import { AsyncStorage } from 'react-native';



const SigninScreen = ({navigation}) =>{
    const [username , setUsername] = React.useState('');
    const [password , setPassword] = React.useState('');

    const storeData = async (id) => {
        try {
          await AsyncStorage.setItem('id',id);
        } catch (error) {
          // Error saving data
        }
      };
     const retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('id');
          
          if (value !== null) {
            // We have data!!
            console.log(value);
            return value
          }
        } catch (error) {
          // Error retrieving data
          return null
        }}
        
        // console.log("Id" , retrieveData());

        const storeEmail = async (email) => {
            try {
              await AsyncStorage.setItem('email',email);
            } catch (error) {
              // Error saving data
            }
          };
         const retrieveEmail = async () => {
            try {
              const value = await AsyncStorage.getItem('email');
              
              if (value !== null) {
                // We have data!!
                // console.log(value);
                return value
              }
            } catch (error) {
              // Error retrieving data
              return null
            }}
            // console.log("Email" , retrieveEmail());
            retrieveEmail()

    const login = () => {
        const respone = {
            usernameAPI : username,
            passwordAPI : password
        }
        // console.log(respone);
        axios.post(`${host}/login`, respone)
        .then(res => {
            // console.log(res.data);
            if(res.data.valid){
                
                storeData(res.data.id);
                storeEmail(res.data.email);
                Alert.alert("Đăng nhập thành công")
                navigation.navigate("Home")
                  }else {
                Alert.alert("Sai tài khoản hoặc mật khẩu")
            }
            
        })
    }

    return(
        <View style={{backgroundColor: '#fff', height:"100%"}}>
            <StatusBar  backgroundColor="#fff" barStyle="light-content"/>
            <View style={{alignItems:'center', justifyContent:'center'}}>
                <Image

              source={{uri:"https://media.istockphoto.com/vectors/car-showroom-purchase-sale-or-rental-car-seller-man-vector-id624288380?b=1&k=6&m=624288380&s=612x612&w=0&h=_kilpQSXz24DZcXAubQ9gIySeJ7b7phaqtCTZ05yxpw="}}
              style={{width:"100%", height: "50%"}}
                >
              </Image>  
            </View>
             
            
           
            <Text style={{fontSize: 30, alignSelf:'center',color:"#00716F"}}>
             Đăng nhập
            </Text>
            
            <View style={{flexDirection:"row", alignItems:"center",marginHorizontal: 55, borderWidth: 2,marginTop:20,paddingHorizontal:10,borderColor: '#00716F', borderRadius: 23,paddingVertical: 2 }}>
                <Icon 
                    name="envelope"
                    color="#00716F"
                    size={24}
                />
                <TextInput
                    style={{paddingHorizontal: 10}}
                    placeholder="Email"
                    autoCapitalize="none"
                    onChangeText={(value) => setUsername( value )}
                    value={username}
                />
            </View>
            <View style={{flexDirection:"row", alignItems:"center",marginHorizontal: 55, borderWidth: 2,marginTop:15,paddingHorizontal:10,borderColor: '#00716F', borderRadius: 23,paddingVertical: 2 }}>
                <Icon 
                    name="lock"
                    color="#00716F"
                    size={24}
                />
                <TextInput
                    style={{paddingHorizontal: 10}}
                    placeholder="Mật khẩu"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        value={password}
                        onChangeText={(value)=> setPassword(value)}
                />
            </View>
            <View style={{marginHorizontal: 55, alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: "#00716F", paddingVertical: 8, borderRadius: 23}}>
            <TouchableOpacity
                    onPress={(login)} >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Đăng nhập</Text> 
             </TouchableOpacity>  
            </View>
            <View style={{flexDirection:"row", alignItems:"center",justifyContent: 'center',marginHorizontal: 55, borderWidth: 2,marginTop:15,paddingHorizontal:10,borderColor: '#00716F', borderRadius: 23,paddingVertical: 5 }}>
            <TouchableOpacity
                    onPress={()=>{navigation.navigate("SignupScreen")}}> 
               <Text style={{color: '#00716F', fontWeight: 'bold',paddingHorizontal: 10}}>Đăng kí</Text>
             </TouchableOpacity> 
                
            </View>
        </View>
      
    );
};


export default SigninScreen;
