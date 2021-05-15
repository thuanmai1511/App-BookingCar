import React from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    StatusBar,
    Image,
    Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import host from '../port/index';
import axios from 'axios';


const SigninScreen = ({navigation}) =>{
    const [username , setUsername] = React.useState('');
    const [password , setPassword] = React.useState('');
    const [rePassword , setrePassword] = React.useState('');
    const [currentDate, setCurrentDate] = React.useState('');
    const [validate , setValidate] = React.useState({
        email: true,
        password: true,
        repassword: true
    });
    const valiEmail = (val) =>{
        const ValidEmail = /^\w+@[a-zA-Z]{3,}\.com$/i;
        if(!ValidEmail.test(val)){
            setValidate({
               ...validate ,
                email: true
            })
        }else {
            setValidate({
                ...validate ,
                 email: false
             })
        }
    }
    const valiPassword = (val) => {
        if(val.length === 0) {
            setValidate({
                ...validate,
                password: true
            })
        }else {
            setValidate({
            ...validate,
            password: false
            })
        }
    }
    const valirePassword = (val) => {
        if(val.length === 0) {
            setValidate({
                ...validate,
                repassword: true
            })
        }else {
            setValidate({
            ...validate,
            repassword: false
            })
        }
    }
    const signup =  () => {
       
        const respone = {
            usernameAPI: username,
            passwordAPI: password,
            rePasswordAPI: rePassword,
            currDate : currentDate
        }
        if(!validate.email && !validate.password && !validate.repassword ){
            axios.post(`${host}/signup`, respone)
            .then(res => {
                if(res.data.valid){
                    Alert.alert("Đăng kí thành công")
                    navigation.navigate("SigninScreen")
                }else {
                    Alert.alert("Mật khẩu không khớp")
                }
                
            })
        }
       
    }
    React.useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
      
        setCurrentDate(
          date + '/' + month + '/' + year
        );
      }, []);
    return(
        <View style={{backgroundColor: '#fff', height:"100%"}}>
            <StatusBar  backgroundColor="#fff" barStyle="light-content"/>
            <View style={{alignItems:'center', justifyContent:'center',marginTop:5}}>
                <Image

              source={{uri:"https://media.istockphoto.com/vectors/car-showroom-purchase-sale-or-rental-car-seller-man-vector-id624288380?b=1&k=6&m=624288380&s=612x612&w=0&h=_kilpQSXz24DZcXAubQ9gIySeJ7b7phaqtCTZ05yxpw="}}
              style={{width:"90%", height: "50%"}}
                >
              </Image>  
            </View>
            <Text style={{fontSize: 30, alignSelf:'center',color:"#00716F"}}>
             Đăng Kí
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
                    value={username}
                    onChangeText={(value) => setUsername(value)}
                    onEndEditing={value => valiEmail(value.nativeEvent.text)}
                />
                
                
            </View>
            
            {validate.email &&
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={{color: '#dc3545', fontSize: 12, right: 30, textAlign:'center'}}>Email không đúng định dạng</Text>
                </Animatable.View>
            }
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
                        onEndEditing={value => valiPassword(value.nativeEvent.text)}
                />
            </View>
            {validate.password && 
            <Animatable.View animation="fadeInLeft" duration={500}>
                <Text style={{color: '#dc3545', fontSize: 12,right: 30, textAlign:'center'}}>Mật khẩu không được để trống</Text>
            </Animatable.View>
            }
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
                        value={rePassword}
                        onChangeText={(value)=> setrePassword(value)}
                        onEndEditing={value => valirePassword(value.nativeEvent.text)}
                />
            </View>
            {validate.repassword &&
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={{color: '#dc3545' , fontSize: 12, right: 30, textAlign:'center'}}>Mật khẩu không được để trống</Text>
                </Animatable.View>
            }
            <View style={{marginHorizontal: 55, alignItems: 'center', justifyContent: 'center', marginTop: 20, backgroundColor: "#00716F", paddingVertical: 8, borderRadius: 23}}>
            <TouchableOpacity
                    onPress={(signup)} >
                <Text style={{color: 'white', fontWeight: 'bold'}}>Đăng kí</Text> 
             </TouchableOpacity>  
            </View>
            <View style={{flexDirection:"row", alignItems:"center",justifyContent: 'center',marginHorizontal: 55, borderWidth: 2,marginTop:15,paddingHorizontal:10,borderColor: '#00716F', borderRadius: 23,paddingVertical: 5 }}>
            <TouchableOpacity style={{ width:200 , justifyContent:'center' , alignItems:'center'}}
                     onPress={ () => navigation.goBack() }>
               <Text style={{color: '#00716F', fontWeight: 'bold',paddingHorizontal: 10}}>Đăng nhập</Text>
             </TouchableOpacity> 
                
            </View>
        </View>
        
    );
};


export default SigninScreen;
