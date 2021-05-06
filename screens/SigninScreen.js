import React, { useState, useEffect, useRef } from 'react';
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
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import host from '../port/index';
import { AsyncStorage } from 'react-native';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';



const SigninScreen = ({navigation}) =>{
    const [username , setUsername] = React.useState('');
    const [password , setPassword] = React.useState('');

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();


    const storeData = async (id) => {
        try {
          await AsyncStorage.setItem('id',id);
        } catch (error) {
          // Error saving data
        }
      };
     const retrieveData = async () => {
        try {
          // import { AsyncStorage } from 'react-native';
          
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
        // console.log(expoPushToken);
        const respone = {
            usernameAPI : username,
            passwordAPI : password,
            tokenDevice:  expoPushToken
        }
        axios.post(`${host}/login`, respone)
        .then(res => {
            // console.log(res.data.token);
            if(res.data.valid){
                
                storeData(res.data.id);
                storeEmail(res.data.email);
                // storeToken(res.data.token);

                Alert.alert("Đăng nhập thành công")
                navigation.navigate("Home")
                  }else {
                Alert.alert("Sai tài khoản hoặc mật khẩu")
            }
            
        })
    }

   


    async function registerForPushNotificationsAsync() {
      let token;
      if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        // console.log(token);
        // console.log(expoPushToken);
      } else {
        alert('Must use physical device for Push Notifications');
      }
    
      if (Platform.OS === 'android') {
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#FF231F7C',
        });
      }
    
      return token;
    }
    // console.log(expoPushToken);

   

    useEffect(() => { 
      

      registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
  
      notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        setNotification(notification);
      });
  
      responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
        console.log(response);
      });
  
      return () => {
        Notifications.removeNotificationSubscription(notificationListener.current);
        Notifications.removeNotificationSubscription(responseListener.current);
      };  
        }, []);


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
