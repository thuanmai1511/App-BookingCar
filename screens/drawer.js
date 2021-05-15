import React, {useEffect, useState}  from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    Switch,
    Button

} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';
import Icon  from 'react-native-vector-icons/MaterialCommunityIcons';
import { AsyncStorage } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Alert } from 'react-native';
import host from '../port/index';
import axios from 'axios';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
export default function DrawerContent({...props}) {
    const navigation = useNavigation();
    const [user, setUser] = React.useState(null)
    const [dataProfile , setDataProfile] = React.useState('');
    const [auth , setUserAuth] = React.useState('');

    const retrieveEmail = async () => {
        try {
          const value = await AsyncStorage.getItem('email');
          
          if (value !== null) {
            // We have data!!
            setUser(value)
            // console.log(value);
            return value
          }
        } catch (error) {
          // Error retrieving data
          return null
        }}


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
            return token;
          }
    const onLogout = async () =>{
        const value = await AsyncStorage.getItem('id');
        try {
              if(value){
                registerForPushNotificationsAsync().then(token => 
                
                    axios.post(`${host}/delToken`, {token: token , id: value })
                );
                await AsyncStorage.clear()
                Alert.alert(
                    "",
                    "Đăng xuất thành công",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => navigation.replace('Home')}
                    ]
                  );
              }else {
                Alert.alert(
                    "",
                    "Bạn đã đăng xuất",
                    [
                      {
                        text: "Cancel",
                        onPress: () => console.log("Cancel Pressed"),
                        style: "cancel"
                      },
                      { text: "OK", onPress: () => console.log("OK Pressed") }
                    ]
                  );
              }
        } catch (err) {
            // console.log(err);
        }
    }
   
    retrieveEmail()
    
    const getDataProfile = async () => {
      const value = await AsyncStorage.getItem('id');
      const id = value;
      // console.log(id);
      await axios.post(`${host}/dataProfile`,{id})
      .then(res => {
          setDataProfile(res.data[0])
          // console.log(res.data[0]);
      })
    }
    
    const userAuth  = async () => {
        const value = await AsyncStorage.getItem('id');
        await axios.post(`${host}/userAuthen`, {id :value})
        .then((res)=>{
            setUserAuth(res.data)
        })
    } 


    // console.log(auth);

    React.useEffect(() => {
        getDataProfile() , userAuth()
    } ,[])
    
    return (
        <View  style= {{flex: 1}}>
           <DrawerContentScrollView >
               <View style={styles.drawerContent}>
                   <View style={styles.userInfoSection}>
                       <View style={{flexDirection: 'row', marginTop: 15}}>
                           {
                               dataProfile?
                               <Avatar.Image
                               source={{uri: host+ '/'+dataProfile.images}}
                               size={50}
                               
                              />
                              :<Avatar.Image
                              source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vO2n-_DpXS1ZSm8d4Tn743V5FTuU2tYhEw&usqp=CAU"}}
                              size={50}
                              />
                           }
                            
                       
                          
                          
                           <View style={{marginLeft: 15, flexDirection:'column'}}>
                               <Title style={styles.titles}>{dataProfile ? dataProfile.name : "Bạn chưa đăng nhập"}</Title>
                               <Caption style={styles.caption}>{dataProfile ? dataProfile.email : ""}</Caption>
                              
                           </View>
                       </View>

                       
                   </View>
                   <Drawer.Section style={styles.drawerSection}>
                       
                        <DrawerItem
                            icon={({color, size})=> (
                               
                                <Ionicons name="md-home" size={24} color="grey" />
                                
                            )}
                            label="Trang Chủ"
                            
                            
                            onPress= {()=> navigation.navigate("Home")}
                        />
                         <DrawerItem
                            icon={({color, size})=> (
                              
                                <FontAwesome name="user-circle" size={24} color="grey" />
                                
                            )}
                            label="Tài khoản"
                            onPress= {async ()=> {
                                const value = await retrieveEmail()
                                // console.log(value);
                                if(value) {
                                    
                                    navigation.navigate("Profile")
                                  
                                } else {
                                    navigation.navigate("SigninScreen")
                                }
                            }}
                        />
                        <DrawerItem
                            icon={({color, size})=> (
                               
                                <MaterialIcons name="post-add" size={25} color="grey" />
                                
                            )}
                            label="Đăng xe"
                            onPress= { async()=> {
                                const value = await AsyncStorage.getItem('id');
                                // console.log(value);
                                if(value) {
                                    navigation.navigate("homeCar",{id: value})
                                } else {
                                    navigation.navigate("SigninScreen")
                                }
                            }}
                            />
                            {
                                auth ?
                                auth == ''
                                ? <></>

                                : 
                                <DrawerItem
                                    icon={({color, size})=> (
                                    
                                        <Feather name="user-check" size={24} color="grey" />
                                        
                                    )}
                                    label="Duyệt xe"
                                    onPress= { async()=> {
                                        const value = await AsyncStorage.getItem('id');
                                        // console.log(value);
                                        if(value) {
                                            navigation.navigate("myCar",{id: value})
                                        } else {
                                            navigation.navigate("SigninScreen")
                                        }
                                    }}
                                />
                                : null
                            }
                            
                             <DrawerItem
                            icon={({color, size})=> (
                                <FontAwesome name="car" size={20} color="grey" />
                                
                            )}
                            label="Chuyến của tôi"
                            onPress= { async()=> {
                                const value = await AsyncStorage.getItem('id');
                                // console.log(value);
                                if(value) {
                                    navigation.navigate("myTrip",{id: value})
                                } else {
                                    navigation.navigate("SigninScreen")
                                }
                            }}
                            />
                            <DrawerItem
                            icon={({color, size})=> (
                                <Ionicons name="heart" size={25} color="grey" />
                                
                            )}
                            label="Xe yêu thích"
                            onPress= { async()=> {
                                const value = await AsyncStorage.getItem('id');
                                // console.log(value);
                                if(value) {
                                    navigation.navigate("favorite",{id: value})
                                } else {
                                    navigation.navigate("SigninScreen")
                                }
                            }}
                            />
                            <DrawerItem
                            icon={({color, size})=> (
                                <Ionicons name="notifications-outline" size={25} color="grey" />
                                
                            )}
                            label="Thông báo"
                            onPress= { async()=> {
                                const value = await AsyncStorage.getItem('id');
                                // console.log(value);
                                if(value) {
                                    navigation.navigate("notification",{id: value})
                                } else {
                                    navigation.navigate("SigninScreen")
                                }
                            }}
                            />
                           
                           
                    </Drawer.Section>
               </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
                <DrawerItem
                    icon={({color, size})=> (
                        <Icon
                            name="logout"
                            color={color}
                            size={size}
                        />
                        
                    )}
                    label="Đăng xuất"
                    onPress= {onLogout}
                />
        </Drawer.Section>
        </View>
    )
}
const styles = StyleSheet.create({
    drawerContent: {
        flex: 1
    },
    userInfoSection: {
        paddingLeft: 10
    },
    titles: {
        fontSize: 16,
        marginTop: 3,
        fontWeight: 'bold'
    },
    caption: {
        fontSize: 14,
        lineHeight: 14,
        marginTop:5
    },
    row: {
        marginTop: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 15
    },
    drawerSection:{
        marginTop: 15
    },
    paragraph: {
        fontWeight: 'bold',
        marginRight: 3
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16
    }
})