import React, {useState,useEffect} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,ScrollView,TextInput, Alert, Platform , Modal , Dimensions , TouchableOpacity
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
import DateTimePickerModal from "react-native-modal-datetime-picker"; 
import RNPickerSelect from 'react-native-picker-select'; 
import { Button } from 'react-native-elements';
import { AntDesign } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
// import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import host from '../port/index';
import { AsyncStorage } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';


const Profile = ({navigation}) => {
    const [iD, setID] = React.useState(null)
    const [dataProfile , setDataProfile] = React.useState('');
    const [user, setUser] = React.useState(null)
    const [dateShow , setDateShow] = React.useState('');
    // Edit profile
    const [dates , setDates] = React.useState(false)
    const [gender , setgender] = React.useState(false)
    const [phone , setPhone] = React.useState(false)
    const [name, setName] = React.useState(false)
    const [valueDate, setValueDate] = React.useState('');
    const [valueGender, setValueGender] = React.useState('');
    const [valuePhone, setValuePhone] = React.useState('');
    const [valueName , setValueName] = React.useState('');
    const [image, setImage] = useState(null);
    const [imageGPLX1, setImageGPLX1] = useState(null);
    const [imageGPLX2, setImageGPLX2] = useState(null);
    const [isDatePickerVisible, setDatePickerVisibility] = React.useState(false);
    const [modalImage , setModalImage] = React.useState(false);
    const [getImageModal , setGetImageModal] = React.useState('');
    

    const screens = Dimensions.get('screen');
    const { width , height } = screens;
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
    
    retrieveEmail()

    //   Get Id from AsyncStorage
    const retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('id');
          
          if (value !== null) {
            // We have data!!
            setID(value)
            // console.log(value);
            return value
          }
        } catch (error) {
          // Error retrieving data
          return null
        }}
        retrieveData()
        // console.log("Id" , retrieveData());
    // console.log("Email" , retrieveEmail());

    const handleDate = () => {
        setDates(!dates);
        const birthdayAPI = {
            id : iD,
            birthday : dateShow.toString().slice(0,16)
        }
        axios.post(`${host}/editBirthday`, birthdayAPI)
        .then(res=>{
            // navigation.replace("Profile")
        })
    } 
    const handleGender = () =>{ 
        setgender(!gender);
        const genderAPI = {
            id : iD,
            gender: valueGender
        }
        // console.log(idUser);
        // console.log(valueGender);
        axios.post(`${host}/editGender`, genderAPI)
        .then(res=>{
            navigation.replace("Profile")
        })
    }
    const handlePhone = ()=>{
        setPhone(!phone)
        const phoneAPI = {
            id : iD,
            phone: valuePhone
        }
        
        axios.post(`${host}/editPhone`, phoneAPI)
        .then(res=>{
            navigation.replace("Profile")
        })
    }
    const handleName = ()=>{
        setName(!name)
        const nameAPI = {
            id : iD,
            name: valueName
        }
        // console.log(nameAPI);
        axios.post(`${host}/editName`, nameAPI)
        .then(res=>{
            navigation.replace("Profile")
        })
    }
    const showDatePicker = () => {
        setDatePickerVisibility(true);
      };
    
      const hideDatePicker = () => {
        setDatePickerVisibility(false);
      };
    
      const handleConfirm = (date) => {
        // console.log("A date has been picked: ", date);
        hideDatePicker();
        setDateShow(date)


      };
     
      // get data Profile
    //   React.useEffect(() => {
         
    //   } ,[dataProfile])
      
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
      useEffect(() => {
        (async () => {
          if (Platform.OS !== 'web') {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              alert('Sorry, we need camera roll permissions to make this work!');
            }
          }
          getDataProfile()
        })();
      }, []);
      const pickImage = async () => {
        // console.log("Hi");
            
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 4],
              quality: 1,
            });
        
            // console.log(result);
        
            if (!result.cancelled) {
              setImage(result.uri);
            }

            const localUri = result.uri;
            const filename = localUri.split('/').pop();
            // Infer the type of the image
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;
            const formData = new FormData();
            const dataPicture = JSON.parse(JSON.stringify({ uri: localUri, name: filename, type }));
            const id = iD;
            formData.append('photo', dataPicture);
            formData.append('id', iD);

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };

            axios
            .post(host + '/upload', formData, config )
            .then(res => {
                // console.log(res.data);
                navigation.replace('Profile')
            })
        
      }
      const pickImageGPLX1 = async () => {
        // console.log("Hi");
            
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 4],
              quality: 1,
            });
        
            // console.log(result);
        
            if (!result.cancelled) {
              setImageGPLX1(result.uri);
            }

            const localUri = result.uri;
            const filename = localUri.split('/').pop();
            // Infer the type of the image
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;
            const formData = new FormData();
            const dataPicture = JSON.parse(JSON.stringify({ uri: localUri, name: filename, type }));
            const id = iD;
            formData.append('photo', dataPicture);
            formData.append('ids', iD);
            formData.append('status', 1);
            const config = { headers: { 'Content-Type': 'multipart/form-data' } };

            axios
            .post(host + '/uploadImageGPLX', formData, config )
            .then(res => {
                // console.log(res.data);
                navigation.replace('Profile')
            })
        
      }
      const pickImageGPLX2 = async () => {
        // console.log("Hi");
            
            let result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.All,
              allowsEditing: true,
              aspect: [4, 4],
              quality: 1,
            });
        
            // console.log(result);
        
            if (!result.cancelled) {
              setImageGPLX2(result.uri);
            }

            const localUri = result.uri;
            const filename = localUri.split('/').pop();
            // Infer the type of the image
            const match = /\.(\w+)$/.exec(filename);
            const type = match ? `image/${match[1]}` : `image`;
            const formData = new FormData();
            const dataPicture = JSON.parse(JSON.stringify({ uri: localUri, name: filename, type }));
            const id = iD;
            formData.append('photo', dataPicture);
            formData.append('ids', iD);
            formData.append('status', 2);

            const config = { headers: { 'Content-Type': 'multipart/form-data' } };

            axios
            .post(host + '/uploadImageGPLX', formData, config )
            .then(res => {
                // console.log(res.data);
                navigation.replace('Profile')
            })
        
      }
    const ModalImages = () => {
       return (
        <Modal animationType= {"slide"} transparent={false} visible={modalImage}>
           
                <View style={{position: 'relative'}}>
                        <TouchableOpacity
                        onPress={ () => setModalImage(false)}
                        >
                        <Icon name="chevron-left"  size={20} color="black" style={{marginTop:15, marginLeft :15}}/>
                    </TouchableOpacity>
                </View>
               
                <Image source={{uri: host +'/'+getImageModal}} style={{width: width, height: width , marginTop: 100 }}></Image>
            
        </Modal>
       )
    }
    // console.log(modalImage);
    return (
        
            <View style={{ flex: 1 }}>
            <StatusBar  backgroundColor="black" barStyle="light-content"/>

            
            <ModalImages/>

            <ScrollView>
            <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                    <TouchableOpacity
                       onPress={ () => navigation.goBack()}
                    >
                        <Icon name="chevron-left"  size={20} color="white" />
                    </TouchableOpacity>

                    <View style={{flex: 1 }}>
                        <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>TÀI KHOẢN</Text>    
                    </View> 
                    
                    <TouchableOpacity>
                        <Icon name="chevron-left"  size={20} color="white" style={{ opacity: 0 }} />
                    </TouchableOpacity>
                
            </View>
           
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15}}>
                    <TouchableOpacity onPress={pickImage}>
                            {
                               dataProfile?
                               <Avatar.Image
                               source={{uri: host+ '/'+dataProfile.images}}
                               size={120}
                               
                              />
                              :<Avatar.Image
                              source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vO2n-_DpXS1ZSm8d4Tn743V5FTuU2tYhEw&usqp=CAU"}}
                              size={50}
                              />
                           }
                       
                    </TouchableOpacity>
                    {/* <Text>{dataProfile?dataProfile.images:''}</Text> */}
                    <View >
                        
                        <Text style={{color: 'black', fontWeight:'bold',fontSize: 16, textAlign:'center', marginTop: 10 }}>{dataProfile?dataProfile.email: ''}</Text>   
                        <Text style={{color: 'black',fontSize: 12, textAlign:'center', marginTop: 5 }}>Ngày tham gia: {dataProfile?dataProfile.currDate: ''} </Text> 
                        
                    </View> 
                   

            </View>
            <View  style={{ marginVertical: 10, padding: 15, backgroundColor: '#fff'}}>
                
                
                <View style={{paddingVertical: 20 , flexDirection:'row',justifyContent:'center',alignContent: 'center'}}>
                    <Text style={{fontWeight:'bold', fontSize: 13, paddingHorizontal: 30}}>Tỉ lệ phản hồi</Text>
                    <Text style={{fontWeight:'bold', fontSize: 13, paddingHorizontal: 30}}>Tỉ lệ đồng ý</Text>
                </View>

        
       
             </View> 
            
            <View  style={{ marginVertical: 5, padding: 15, backgroundColor: '#fff'}}>
                        <View style={{paddingVertical: 5 , flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold', fontSize: 13, width:'20%'}}>Họ tên</Text>
                            {
                                !name
                                ? <Text style={{ fontSize: 13, flex: 1, marginLeft: 40}}>{dataProfile?dataProfile.name: ''}</Text>
                                :  
                                <TextInput
                                    style={{  height: 20, borderWidth: 1,flex: 1, marginRight: 10, marginLeft: 40}}
                                    onChangeText={(value) => setValueName(value)}
                                    value={valueName}

                                />
                            }
                            {
                                name 
                                ?  <TouchableOpacity onPress={handleName}>
                                    <AntDesign name="check" size={14} color="green" />
                                    </TouchableOpacity>
                                : 
                                <TouchableOpacity onPress={()=> setName(!name)}>
                                    <Icon name="edit"  size={14} color="green" />
                                </TouchableOpacity>
                            }   
                        </View>

                        <View style={{paddingVertical: 5 , flexDirection:'row'}}>
                            {/* <Text style={{fontWeight:'bold', fontSize: 13, width:'20%'}}>Họ tên </Text> */}
                             <Text style={{fontWeight:'bold', fontSize: 13, width:'20%'}}>Ngày sinh </Text>
                          
                             <View style={{flex: 1, alignItems: 'flex-start'}}>
                                    <DateTimePickerModal
                                    isVisible={isDatePickerVisible}
                                    mode="date"
                                    onConfirm={handleConfirm}
                                    onCancel={hideDatePicker}
                                />
                                    <Text style={{fontSize: 13  , flex: 1, marginLeft: 40 }}>{dataProfile?dataProfile.birthday: ''}</Text> 
                              </View>
                             
                            
                            {
                                dateShow.toString()
                                ? 
                                <TouchableOpacity >
                                    <AntDesign name="check" size={14} color="green" onPress={handleDate} />
                                </TouchableOpacity>
                                :  
                                <TouchableOpacity onPress={()=> setDates(!dates)}>
                                    <Icon name="edit"  size={14} color="green" onPress={showDatePicker} />
                                </TouchableOpacity>
                            }
                            
                               
                            
                               
                        </View>
                        <View style={{paddingVertical: 5 , flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold', fontSize: 13, width:'20%'}}>Giới tính</Text>
                            {/* <Text style={{ fontSize: 13, flex: 1, marginLeft: 40}}>{dataProfile.gender}</Text> */}
                           
                             {
                                !gender
                                ? <Text style={{ fontSize: 13, flex: 1, marginLeft: 40}}>{dataProfile?dataProfile.gender: ''}</Text>
                                :  
                                <View style={{flex:1}}>
                                    <RNPickerSelect
                                        onValueChange={(value) => setValueGender(value)}
                                        items={[
                                            { label: 'Nam', value: 'Nam' },
                                            { label: 'Nữ', value: 'Nữ' },

                                            
                                        ]}
                                    
                                />
                                </View>
                                
                            } 
                           
                           {
                                gender 
                                ?  <TouchableOpacity onPress={handleGender}>
                                    <AntDesign name="check" size={14} color="green" />
                                    </TouchableOpacity>
                                : 
                                <TouchableOpacity onPress={()=> setgender(!gender)}>
                                    <Icon name="edit"  size={14} color="green" />
                                </TouchableOpacity>
                            }    
                            {/* <TouchableOpacity onPress={handleGender} >
                                <Icon name="edit"  size={14} color="green" />
                            </TouchableOpacity> */}
                        </View>

                
               
            </View>   
            <View  style={{ marginVertical: 5, padding: 15, backgroundColor: '#fff'}}>
                        <View style={{paddingVertical: 5 , flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold', fontSize: 13, width:'20%'}}>GPLX</Text>
                            {/* <Text style={{ fontSize: 13, flex: 1, marginLeft: 40}}>-</Text> */}
                            <View style={{  flexDirection: 'row'}}>
                                <View style={{width:"50%" }}>
                                <View style={{width: 50 , height: 50, marginBottom: 10 , marginLeft: 40 }}>
                                        <TouchableOpacity onPress={()=> {
                                            setModalImage(true)
                                            setGetImageModal(dataProfile.imagesGPLX.font)
                                        } 
                                        
                                        }>
                                        {
                                            dataProfile.imagesGPLX
                                            ? 
                                            <Avatar.Image
                                                source={{uri: host+"/"+dataProfile.imagesGPLX.font}}
                                                size={50}
                                            />
                                            : <Avatar.Image
                                            source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vO2n-_DpXS1ZSm8d4Tn743V5FTuU2tYhEw&usqp=CAU"}}
                                            size={50}
                                            />
                                        }
                                        </TouchableOpacity>
                                        
                                    </View>
                                    
                                   
                                    <TouchableOpacity onPress={pickImageGPLX1} style={{marginLeft: 40}}>
                                        <Text style={{fontSize: 13}}>Mặt trước</Text>
                                        <Feather name="upload" size={15} color="green" style={{marginLeft: 20, marginTop: 5}} />

                                    </TouchableOpacity>
                                    
                                </View>
                                <View style={{width:"50%"}} >
                                    
                                  
                                <View style={{width: 50 , height: 50, marginBottom: 10}}>
                                        <TouchableOpacity onPress={()=> {
                                            setModalImage(true)
                                            setGetImageModal(dataProfile.imagesGPLX.end)
                                        } 
                                        
                                        }>
                                        {
                                            dataProfile.imagesGPLX
                                            ? 
                                            <Avatar.Image
                                                source={{uri: host+"/"+dataProfile.imagesGPLX.end}}
                                                size={50}
                                            />
                                            : <Avatar.Image
                                            source={{uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2vO2n-_DpXS1ZSm8d4Tn743V5FTuU2tYhEw&usqp=CAU"}}
                                            size={50}
                                            />
                                        }
                                        </TouchableOpacity>
                                        
                                    </View>
                                   
                                    <TouchableOpacity onPress={pickImageGPLX2}>
                                        <Text  style={{fontSize: 13}}>Mặt sau</Text>
                                        <Feather name="upload" size={15} color="green" style={{marginLeft: 16, marginTop: 5}} />
                                    </TouchableOpacity>
                                </View>
                                
                                
                            </View>
                           
                        </View>
               
            </View>    
            <View  style={{ marginVertical: 5, padding: 15, backgroundColor: '#fff'}}>
                
                         <View style={{paddingVertical: 10 , flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold', fontSize: 13, width:'20%'}}>Điện thoại</Text>
                            {
                                !phone
                                ? <Text style={{ fontSize: 13, flex: 1, marginLeft: 40}}>{dataProfile?dataProfile.phone: ''}</Text>
                                :  
                                <TextInput
                                    style={{  height: 20, borderWidth: 1,flex: 1, marginRight: 10, marginLeft: 40}}
                                    onChangeText={(value) => setValuePhone(value)}
                                    value={valuePhone}

                                />
                            }
                            {
                                phone 
                                ?  <TouchableOpacity onPress={handlePhone}>
                                    <AntDesign name="check" size={14} color="green" />
                                    </TouchableOpacity>
                                : 
                                <TouchableOpacity onPress={()=> setPhone(!phone)}>
                                    <Icon name="edit"  size={14} color="green" />
                                </TouchableOpacity>
                            }   
                           
                        </View>
                        <View style={{paddingVertical: 10 , flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold', fontSize: 13,width:'20%'}}>Email</Text>
                            { user ? <Text style={{ fontSize: 13, flex: 1, marginLeft: 40}}>{dataProfile?dataProfile.email: ''}</Text> : <Text style={{ fontSize: 13, flex: 1, marginLeft: 40}}>-</Text> }
                            
                            <TouchableOpacity >
                                <Icon name="edit"  size={14} color="green" />
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingVertical: 10 , flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold', fontSize: 13,width:'20%'}}>Facebook</Text>
                            <Text style={{ fontSize: 13, flex: 1, marginLeft: 40}}>-</Text>
                            <TouchableOpacity >
                                <Icon name="edit"  size={14} color="green" />
                            </TouchableOpacity>
                        </View>
                        <View style={{paddingVertical: 10 , flexDirection:'row'}}>
                            <Text style={{fontWeight:'bold', fontSize: 13,width:'20%'}}>Google</Text>
                            <Text style={{ fontSize: 13, flex: 1, marginLeft: 40}}>-</Text>
                            <TouchableOpacity >
                                <Icon name="edit"  size={14} color="green" />
                            </TouchableOpacity>
                        </View>



                
               
            </View>          
           
            </ScrollView>
            
           
        </View>
    )
}


export default Profile ;