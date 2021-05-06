import React, { useEffect, useState } from 'react' ;
import {View ,Text,Image,TextInput, Alert } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {
    Avatar

} from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons';  
import icon1 from '../images/icon.png';
import icon2 from '../images/icon1.png';
import icon3 from '../images/icon2.png';
import icon4 from '../images/icon3.png';
import icon5 from '../images/icon4.png';
import host from '../port/index';
import axios from 'axios';
import { AsyncStorage } from 'react-native';
const rate  = ({navigation,route}) => {
    const { review } = route.params.data
    
    const [ defaultRating , setdefaultRating] = useState(1)
    const [maxRating , setmaxRating] =useState([1,2,3,4,5])
    const [ ratingData , setRatingData] = useState({})

    const [valueRating , setValueRating] = useState('')
    const [currentDate, setCurrentDate] = React.useState('');
    // console.log(valueRating);

    const checkReview = async () => {
        const value = await AsyncStorage.getItem('id');
        const a = review.find(x => x.idRating == value)
        setRatingData(a)
    }

    useEffect(() => {
        checkReview()
    },[])

    const CustomRatingBar = () => {
        return(
            <View style={{justifyContent:'center',flexDirection:'row', backgroundColor:'#fff',marginTop:10}}>
                  
                {
                    maxRating.map((item , key)=> {
                        return(
                            <TouchableOpacity activeOpacity={0.7} key={item} onPress={()=>setdefaultRating(item)}>
                               
                                <View>
                                   {
                                       item <= defaultRating ? <FontAwesome name="star" size={40} color="#ffa500" /> : <FontAwesome name="star" size={40} color="black" />
                                   }
                                   
                                </View>                           
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        )
    }
    const handleRating = async () => {
        const value = await AsyncStorage.getItem('id');
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        // console.log(route.params.data._id);
        const resp = {
            rating: defaultRating,
            com: valueRating,
            idRating : value,
            IdHost : route.params.data._id,
            dates : date + '/' + month + '/' + year
        }
        
        // console.log(resp);
        await axios.post(`${host}/ratingAPI`,resp).then(()=>{
            Alert.alert(
                "Cảm ơn bạn đã đánh giá",
                "",
                [
                  { text: "OK", onPress: () => navigation.navigate("myTrip")}
                ]
              );
            
        })
    }
   

    return(
        <View style={{ justifyContent:'center' ,backgroundColor:'#d6d9dc'}}>
            <ScrollView>
                <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                        <TouchableOpacity
                        onPress={ () => navigation.goBack()}
                        >
                            <Ionicons name="arrow-back" size={25} color="white" />
                        </TouchableOpacity>

                        <View style={{flex:1}}>
                            <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>ĐÁNH GIÁ</Text>    
                        </View> 
                        
                        <TouchableOpacity>
                            <Ionicons name="notifications-outline" size={24} style={{opacity:0}}/>
                        </TouchableOpacity>
                    
                </View>
                
               
                {/* <View style={{height:650,borderWidth:1}}> */}
                    
                       
                           
                            <View style={{backgroundColor:'#fff',height:650}}>
                                <View style={{justifyContent:'center',alignItems:'center',marginTop:10}}>
                                    <Avatar.Image
                                        source={{uri: host + '/' + route.params.data.images}}
                                        size={120}
                                        
                                        />   
                            </View>

                            <Text style={{textAlign:'center' ,marginTop:15,fontWeight:'bold',fontSize:16}}>{route.params.data.name}</Text>


                          

                            
                            {
                                ratingData ? 
                            <View style={{backgroundColor:'#fff',height:200,alignItems:'center',marginTop:15}}>
                                    {
                                        ratingData.rating == 1 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star-o" size={40} color="black" />
                                        <FontAwesome name="star-o" size={40} color="black" />
                                        <FontAwesome name="star-o" size={40} color="black" />
                                        <FontAwesome name="star-o" size={40} color="black" />
                                            </View> : <View></View>
                                    }
                                    {
                                        ratingData.rating == 2 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star" size={40} color="black" />
                                        <FontAwesome name="star" size={40} color="black" />
                                        <FontAwesome name="star" size={40} color="black" />
                                            </View> : <View></View>
                                    }
                                    
                                    {
                                        ratingData.rating == 3 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star-o" size={40} color="black" />
                                        <FontAwesome name="star-o" size={40} color="black" />
                                        </View> : <View></View>
                                    }
                                    {
                                        ratingData.rating == 4 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star-o" size={40} color="black" />
                                        </View> : <View></View>
                                    }
                                    {
                                        ratingData.rating == 5 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        <FontAwesome name="star" size={40} color="#ffa500" />
                                        </View> : <View></View>
                                    }
                                    <Text style={{color:'gray',marginTop:15}}>Cám ơn bạn đánh giá!</Text>
                        </View>

                         :
                            <View style={{ height :400, backgroundColor:'#fff'}}>
                            
                            <CustomRatingBar /> 
                             
                                    <View style={{marginTop:10,alignItems:'center'}}>
                                        {  defaultRating == 1 ? <Image source={icon1} style={{height:50,width:50}}/>  : <View></View>
                                        }
                                        {
                                            defaultRating == 2 ? <Image source={icon2} style={{height:50,width:50}} /> :  <View></View>
                                        } 
                                        {
                                            defaultRating == 3 ? <Image source={icon3}  style={{height:50,width:50}} /> :  <View></View>
                                        }
                                        {
                                            defaultRating == 4 ? <Image source={icon4}  style={{height:50,width:50}} /> :  <View></View>
                                        }
                                        {
                                            defaultRating == 5 ? <Image source={icon5}  style={{height:50,width:50}}/> :  <View></View>
                                        } 
                                    </View>
                                    <View style={{marginTop:5,height:150,backgroundColor:'#d6d9dc'}}>
                                        <TextInput
                                            style={{padding:5,width:200}}
                                            onChangeText={(value)=>setValueRating(value)}
                                            value={valueRating}
                                            placeholder="Nhập phản hồi của bạn."
                                        />
                                    </View>
                                    <View style={{justifyConten:'center',alignItems:'center',alignContent:'center',marginTop:5,backgroundColor:'#fff',height:150}}>
                                        <TouchableOpacity style={{width:300,height:35,backgroundColor:'#00a550',marginTop:40}} onPress={handleRating}>
                                            <Text style={{textAlign:'center',paddingTop:8,fontSize:14,color:'#fff',fontWeight:'bold'}}>PHẢN HỒI</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={{width:300,height:35,marginTop:5,borderWidth:1,borderColor:'#00a550'}}>
                                            <Text style={{textAlign:'center',paddingTop:8,fontSize:14,color:'#00a550',fontWeight:'bold'}}>BÁO XẤU</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                           
                            
                           
                            }
                            </View>
                            
                           
                              
                                       
                                    
                    
                   
                    
                        
                {/* </View> */}
               
            </ScrollView>
            
               
           
        
        </View>
    )
} 



export default rate;