import { StatusBar } from 'expo-status-bar';
import React , {useState} from 'react';
import { StyleSheet, Text, View , ImageBackground, ScrollView, TouchableOpacity, FlatList, TextInput, Image, Alert,} from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Feather} from '@expo/vector-icons';
import { AsyncStorage } from 'react-native';
import host from '../port/index';

import axios from 'axios';

const Home = ({navigation}) =>{
   
    const naviPages = (title) => {
        
        // console.log(title);
        axios.get(`${host}/getDetailCar/type=`+title)
        navigation.navigate("postCar", {title: title})
        

    }    
const image = { uri: "https://images.pexels.com/photos/799443/pexels-photo-799443.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" };

const [gallery, setgallery] = useState([
    {image: {uri: "https://www.mioto.vn/static/media/features-2.f7d40f43.jpg"},
    },
    {image: {uri: "https://www.mioto.vn/static/media/features-5.5e0a5832.jpg"},
    },
    {image: {uri: "https://www.mioto.vn/static/media/features-6.e7932d18.jpg"},
    },
    {image: {uri: "https://www.mioto.vn/static/media/features-3.faaf0570.jpg"},
    },
    {image: {uri: "https://www.mioto.vn/static/media/features-4.df19c5f2.jpg"},
    },
   
]);

const [city, setcity] = useState([
    {image: {uri: "https://thamhiemmekong.com/wp-content/uploads/2019/07/ben-ninh-kieu-can-tho.jpg"},title: 'Cần Thơ'
    },
    {image: {uri: "https://znews-photo.zadn.vn/w1024/Uploaded/zdhwqmjwq/2020_08_31/tphcm_zing_1_.jpeg"}, title: 'TP Hồ Chí Minh'
    },
    {image: {uri: "https://znews-photo.zadn.vn/w1024/Uploaded/zdhwqmjwq/2020_08_31/ha_noi_0_zing_2_.jpg"}, title: 'Hà Nội'
    },
    {image: {uri: "https://c1.wallpaperflare.com/preview/843/155/800/da-nang-vietnam-danang-vietnamese.jpg"}, title: 'Đà Nẵng'
    },
]);
    const [values , setValue] = React.useState('')
    
    const findId =  async () => {
        const value = await AsyncStorage.getItem('id');
        setValue(value)
        // window.location.reload(true);
    }
    React.useEffect(()=>{findId()},[])
    // console.log(values);
  return (
    
    <View style={styles.container}>
        <StatusBar  backgroundColor="rgb(0, 179, 89)" barStyle="light-content"/>
      <View style={{
          backgroundColor: 'rgb(0, 179, 89)',
          height: '27%',
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,
          paddingHorizontal: 20

      }}>
        
          
            
                <View style= {styles.bars}>
                   
                    <Button onPress={() => navigation.openDrawer()}type="clear" icon={<Icon name="bars"  size={25} color="white"/>}  /> 
                    
              
                </View>
                                  
                {
                   values == null ? <View style= {styles.btnLogin}>
                
                <Button onPress={() => navigation.navigate('SigninScreen')} type="clear" icon={<Icon name="user"  size={30} color="white"/>}  /> 
            
            </View> : <View style={styles.btnLogin}><Text style={{fontWeight:'bold', marginTop:10,color:'white',marginRight:10,fontSize:16}}>Xin Chào</Text></View>
                }
                
            
            
            {/* <View>
                <TextInput
                style={styles.searchBox}
                placeholder=' Tìm kiếm...'
                placeholderTextColor="#666"></TextInput>
                <Feather name= 'search' size={20} color='#666' style={{position: 'absolute', top: 170, right: 25, opacity: 0.6}}/>
            </View> */}
            
        {/* </ImageBackground> */}
        

      </View>
      <ScrollView>
        <View>
            <Text style={styles.layoutDiscount}>TÍNH NĂNG NỔI BẬT</Text>
        </View>
        <View>
            <FlatList horizontal={true} keyExtractor={(item, index) => index.toString()} data= {gallery} renderItem={({item}) => {
                
                return(
                    <View style= {{paddingVertical: 20, paddingLeft: 8}}>
                        <TouchableOpacity>
                            <Image source={item.image} style={{width: 250, height: 165, borderRadius: 15}}></Image>
                           
                        </TouchableOpacity>
                    </View>
                )
                
            }}>

            </FlatList>
        </View>
      </ScrollView>
      <ScrollView>
        <View>
            <Text style={styles.layoutDiscount}>ĐỊA ĐIỂM NỔI BẬT </Text>
        </View>
        <View>
            <FlatList horizontal={true}  keyExtractor={(item, index) => index.toString()} data= {city} renderItem={({item}) => {
                return(
                    <View style= {{paddingVertical: 20, paddingLeft: 8}}>
                        <TouchableOpacity onPress={()=>{naviPages(item.title)}}>
                            <Image source={item.image} style={{width: 120, height: 120, borderRadius: 15}}/>
                            <View style= {styles.Imageoverlays}></View>
                            <Text style={styles.imageText}>{item.title}</Text>
                        </TouchableOpacity>
                    </View>
                )
            }}>

            </FlatList>
            {/* <TouchableOpacity>
                <View style= {{paddingVertical: 20, paddingLeft: 8}}>
                    <Image source={{uri: "https://thamhiemmekong.com/wp-content/uploads/2019/07/ben-ninh-kieu-can-tho.jpg"}} style={{width: 120, height: 120, borderRadius: 15}}/>
                    <View style= {styles.Imageoverlays}></View>  
                    <Text style={styles.imageText}>Cần Thơ</Text>  
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style= {{paddingVertical: 20, paddingLeft: 8}}>
                    <Image source={{uri: "https://znews-photo.zadn.vn/w1024/Uploaded/zdhwqmjwq/2020_08_31/tphcm_zing_1_.jpeg"}} style={{width: 120, height: 120, borderRadius: 15}}/>
                    <View style= {styles.Imageoverlays}></View>  
                    <Text style={styles.imageText}>Hồ Chí Minh</Text>  
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style= {{paddingVertical: 20, paddingLeft: 8}}>
                    <Image source={{uri: "https://znews-photo.zadn.vn/w1024/Uploaded/zdhwqmjwq/2020_08_31/ha_noi_0_zing_2_.jpg"}} style={{width: 120, height: 120, borderRadius: 15}}/>
                    <View style= {styles.Imageoverlays}></View>  
                    <Text style={styles.imageText}>Hà Nội</Text>  
                </View>
            </TouchableOpacity>
            <TouchableOpacity>
                <View style= {{paddingVertical: 20, paddingLeft: 8}}>
                    <Image source={{uri: "https://c1.wallpaperflare.com/preview/843/155/800/da-nang-vietnam-danang-vietnamese.jpg"}} style={{width: 120, height: 120, borderRadius: 15}}/>
                    <View style= {styles.Imageoverlays}></View>  
                    <Text style={styles.imageText}>Đà Nẵng</Text>  
                </View>
            </TouchableOpacity> */}
        </View>
      </ScrollView>
      
    </View>
     
  );
}

const styles = StyleSheet.create({
    // Darkoverlay: {
    //     position: 'absolute', 
    //     top: 0,
    //     left: 0,
    //     right: 0,
    //     height: 200,
    //     backgroundColor:'#000',
    //     opacity: 0.2,
    //     borderBottomRightRadius: 65
    // },
    // hello: {
    //     marginLeft: 50,
    //     marginTop: 52,
    //     fontSize: 12,
    //     color: 'white'
    // },
    // hellos: {
    //     marginLeft: 50,
    //     marginTop: 52,
    //     fontSize: 16,
    //     color: 'white',
    //     fontWeight: 'bold'
    // },
    bars: {
        position: 'absolute',
        marginTop: 35,
        marginLeft: 10
        
    },
    btnLogin: {
        position: 'absolute',
        marginTop: 27,
        right: 7
        
    },
    searchBox: {
        backgroundColor: '#fff',
        borderBottomRightRadius: 40,
        borderBottomLeftRadius: 40,
        borderTopRightRadius: 40,
        borderTopLeftRadius: 40,
        top: 160,
        padding: 6,
        width: 300,
        marginLeft: 10
    },
    layoutDiscount: {
        fontWeight: "700",
        fontSize: 14,
        marginLeft: 10,
        marginTop: 30
    },
    Imageoverlays: {
        width: 'auto',
        height: 250, 
        marginRight: 6,
        borderRadius: 10,
        position: 'absolute',
        backgroundColor: '#000',
        opacity: 0.2
    },
    imageText: {
        position: 'absolute',
        color: 'white',
        marginTop: 4,
        fontSize: 13,
        left: 10,
        bottom: 10 ,
        fontWeight: '700'
    }


});

export default Home;