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
const rate2  = ({navigation,route}) => {
    
    // console.log(route.params.data);
    useEffect(() => {
       
    },[])

   
   

    return(
        <View style={{ justifyContent:'center' ,backgroundColor:'white',height:'100%'}}>
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
                
               
               
          
            <View style={{ backgroundColor: '#fff' }}>
            {
                route.params.data.map((dt,index)=>(
                    <View key={index}>
                        <View style={{flexDirection:'row',paddingHorizontal:10}}>
                        <View style={{flexDirection:'row'}}>
                            <Text style={{fontSize:12, left: 270}}>{route.params.data.date}</Text>
                    
                        </View>
                            
                        
                    </View>
                    
                   
                        <View style={{flexDirection:'row'}}>
                                <View style={{paddingHorizontal: 10}}>
                                    
                                    <Avatar.Image
                                    source={{uri: host+"/"+dt?.idRating.images}}
                                    size={50}
                                    />
                                    
                                
                                </View>
                                <View style={{flexDirection:'column'}}>
                                    <View style={{flexDirection:'row'}}>
                                        <Text style={{fontSize: 14 , fontWeight:'bold', paddingHorizontal: 5,width:230}}>{dt?.idRating.name}</Text>
                                        <Text style={{fontSize:12 ,textAlign:'right'}}>{dt.date}</Text>
                                    </View>
                                    
                                  
                                        {
                                            dt.rating == 1 ?<FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/> : <View></View>
                                        }
                                        {
                                            dt.rating == 2 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                               < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                              < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                                </View> : <View></View>
                                        }
                                        
                                        {
                                             dt.rating == 3 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                         {
                                             dt.rating == 4 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                         {
                                             dt.rating == 5 ? <View style={{flexDirection:'row',marginLeft:5}}>
                                             < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                            < FontAwesome name="star" size={15} color="#ffa500" style={{paddingTop:7,marginLeft:2}}/>
                                              </View> : <View></View>
                                        }
                                   
                                    <View style={{paddingHorizontal: 5, marginTop: 10 , width:"100%"}}>
                                        <Text style={{fontSize:12, textAlign:'justify'}}>{dt.comment}</Text>
                                    </View>
                                </View>
                                
                        </View>
                         <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                                <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 2, borderColor: '#e8eaef'}}></View>
                        </View>
                    </View>
                ))
            }
            </View>
               
           
            </ScrollView>
        </View>
    )
} 



export default rate2;