import React, {useState,useEffect} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,ScrollView,TextInput, Alert, Platform ,TouchableOpacity, LogBox,Modal, Pressable
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
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Feather } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons';
import Geocoder from 'react-native-geocoding';

const postCar = ({navigation,route})=> {
    Geocoder.init("AIzaSyBHRMxpBKc25CMHY51h1jrnCCm6PjNs62s");
    const [dataCar , setDataCar] = React.useState([])
    const [modalVisible, setModalVisible] = React.useState(false);
    const [modalVisibles, setModalVisibles] = React.useState(false);
    const [dataFilterSeat , setDataFilterSeat] = React.useState([])
    const [dataFilterModel , setDataFilterModel] = React.useState([])
    const [dataFilter , setDataFilter] = React.useState([])
    const [selected1 , setSelected1] = React.useState(false)
    const [selected2 , setSelected2] = React.useState(false)
    const [selected3 , setSelected3] = React.useState(false)
    const [selected4 , setSelected4] = React.useState(false)
    const [selected5 , setSelected5] = React.useState(false)
    const [selected6 , setSelected6] = React.useState(false)
    const [text , setText] = React.useState('')
    const detailCar = async (id) => {
        const ids = id;
        navigation.navigate("detailCar",{ids})
       
    }
    const getDataCarType = async () => {
        const value = await AsyncStorage.getItem('id');
        // console.log("sdasdsds",value);
        const title = route.params.title;
        
        await axios.get(`${host}/getDetailCar/type=`+title).then((res)=>{
            // console.log(res.data);
            res.data.map(async(val)=>{
                let a = []
                for (var b of res.data){
                const {latitude, longitude} =b.location.coords
                const gg = await Geocoder.from({
                    latitude,
                    longitude
                });

                b['address'] = gg.results[0].formatted_address
                a.push(b)
            }
            
                if(val.status == true && val.idUser != value){
                    setDataCar(a)
                    setDataFilterSeat(previous=>[...previous, val])
                    setDataFilterModel(previous=>[...previous, val])
                    setDataFilter(previous=>[...previous, val])
                }else {
    
                }              
           })
        })
    }
// console.log(dataCar);
    const carFilter = (seat) => {
        const filterCar = dataFilterSeat.filter(dt=>{
           return dt.seats == seat
        })
        setDataCar(filterCar)
    }
    // console.log(dataFilterSeat); 

    const filterModelsCar = (model,i) => {
        // console.log(model);
        if(i == 0)
            setSelected1(!selected1)
        if(i == 1)
            setSelected2(!selected2)
        if(i == 2)
            setSelected3(!selected3)
        if(i == 3)
            setSelected4(!selected4)
        if(i == 4)
            setSelected5(!selected5)
        if(i == 5)
            setSelected6(!selected6)

        const filterCars = dataFilterModel.filter(dt=>{
            return dt.carModel == model
        })
        setDataCar(filterCars)
    }   
    const search  = async (t) => {
        // console.log(t);
       setText(t)
    
        let i = t.toLowerCase()
        // console.log(i);
        let filterData = dataFilter.filter(dt=>{
            return dt.carModel.toLowerCase().indexOf(i) != -1
           
        })
        
        setDataCar(filterData)


    }
    
    React.useEffect(()=>{getDataCarType()},[])


  
    return(
        
        <View style={{ flex: 1 , backgroundColor: '#d6d9dc'}}>
        <StatusBar  backgroundColor="black" barStyle="light-content"/>
       
        

        <ScrollView>
        <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                <TouchableOpacity
                   onPress={ () => navigation.goBack()}
                >
                    <Ionicons name="arrow-back" size={25} color="white" />
                </TouchableOpacity>

                <View style={{flex: 1 }}>
                   
                    <Text key={Math.random()} style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>{route.params.title}</Text>   
                </View> 
                
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="black" style={{opacity: 0}}/>
                </TouchableOpacity>
            
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', alignItems:'center',backgroundColor:'black',height:50,borderWidth:1,borderColor:'black'}}>
            
            <TouchableOpacity style={{ height: 25, width: 100, borderRadius:15, marginHorizontal: 10,borderColor:'#fff',borderWidth:1,backgroundColor:'#fff'}} onPress={()=>setModalVisible(true)}>
                <View style={{flexDirection:'row' , alignContent:'center',justifyContent:'center'}}>
                    <Ionicons name="car-sport-outline" color="black" style={{fontSize: 15,paddingTop: 3,fontWeight:'bold'}}></Ionicons>
                    <Text style={{textAlign:'center', paddingTop: 3 , fontSize: 12,marginLeft:2,color:'black',fontWeight:'bold'}}>Loại xe</Text>
                   
                </View>
                
            </TouchableOpacity>
           
            <View>
                <TextInput 
                    style={{borderWidth:1 , width:200 , borderColor:'white', backgroundColor:'white',fontSize:12, borderRadius:15,height: 25,paddingLeft:10}}
                    onChangeText={value=>search(value)}
                    value={text}
                    placeholder =  " Nhập tìm kiếm ..."
                />
            </View>
            
        </View>

            {
                dataCar.map((item,index)=>(
            <TouchableOpacity 
                key={index}
                onPress={()=>detailCar(item._id)}
            >  

                <View style={{justifyContent:'center', alignItems:'center',marginTop: 10}}>
                <View style={{width:"90%", height:200}}>
                <Image
                    source={{uri: host + '/' + item.imagesCar}}
                    style={{width:"100%", height: "100%",borderTopLeftRadius:10,borderTopRightRadius:10}}
                />
            </View>
            <View style={{width:"90%", height:130, backgroundColor:"#ffffff",borderBottomEndRadius:5,borderBottomLeftRadius: 5,shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 3,
},
shadowOpacity: 0.29,
shadowRadius: 4.65,

elevation: 7,}}>
                <Text  style={{marginTop: 10,marginLeft: 10,fontSize: 15,fontWeight:'bold'}}>{item.carModel} {item.carName}</Text>
                <View style={{flexDirection:'row'}}>
                     <Text style={{marginTop: 5,marginLeft: 10}}>5.0 <Ionicons name="star-outline" style={{color:'green', fontSize: 14}}></Ionicons> </Text>
                     <Text style={{marginTop: 7,marginLeft: 10,fontSize: 12,width:120}}>22 chuyến</Text>
                     <View style={{flexDirection:'row'}}>
                        <Text style={{color:'#00a550',fontSize:18,fontWeight:'bold'}}>
                        {Number(item.price).toFixed(1).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                        </Text>
                        <Text style={{fontSize:12,marginTop:5}}>/ngày</Text>
                    </View>
                    
                </View>
                <View style={{flexDirection:'row',marginTop:7}}>
                     <Text style={{paddingTop: 2,marginLeft: 10, fontSize: 11,backgroundColor:'#e4e6e8', width: 80 , textAlign:'center',borderRadius:5,height:20}}>{item.transmission}</Text>
                     <Text style={{paddingTop: 2,marginLeft: 10, fontSize: 11,backgroundColor:'#e4e6e8', width: 80 , textAlign:'center',borderRadius:5,height:20}}>{item.fuel}</Text>
                </View>
                <View style={{flexDirection:'row'}}>
                    <Text style={{marginTop: 10,marginLeft: 10}}><Ionicons name="location-outline" style={{ fontSize: 14}}></Ionicons></Text>
                    <Text style={{marginTop: 9,marginLeft: 5, fontSize:12,width:'90%'}}>{item.address}</Text>
                </View>
                
            </View>

                </View> 
                <View style={{marginTop:10}}></View>
           </TouchableOpacity>     
           
                ))
            }
            
           
         
        
            
      
      <View>
     
      <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.centeredView}>
          

            <View style={styles.containerModal}>
                <Pressable  style={{height: '50%'}} onPress={() => setModalVisible(!modalVisible)}>
                    <View style={{height: '100%',backgroundColor:'rgba(230,230,230,0)'}}>
                    </View>
                </Pressable>
               
                <View style={{height: '50%',backgroundColor: '#fff'}}>
                    <Feather name="minus" size={30} color="black" style={{marginLeft:165}}/>
                    <Text style={{fontWeight:'bold', textAlign:'center',fontSize:14}}>LOẠI XE</Text>
                    <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
                        <TouchableOpacity onPress={() => carFilter(4)}>
                            <View style={{flexDirection:'row', marginTop:20,paddingHorizontal:40}}>
                                    <View style={{flexDirection:'column'}}>
                                        <View style={{borderWidth:1 , width:80,borderRadius:200,height:80,borderColor:'#00a550',justifyContent:'center', alignItems:'center'}}>
                                            
                                            <FontAwesome5 name="car-side" size={25} color="#00a550" />
                                            

                                        </View>
                                        <Text style={{fontSize:12 ,textAlign:'center', marginTop:5}}>4 chỗ</Text>
                                    </View>
                                    
                                </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => carFilter(7)}>
                        <View style={{flexDirection:'row', marginTop:20}}>
                                <View style={{flexDirection:'column'}}>
                                    <View style={{borderWidth:1 , width:80,borderRadius:200,height:80,borderColor:'#00a550',justifyContent:'center', alignItems:'center'}}>
                                        
                                        <FontAwesome5 name="car-side" size={25} color="#00a550" />
                                        

                                    </View>
                                    <Text style={{fontSize:12 ,textAlign:'center', marginTop:5}}>7 chỗ</Text>
                                </View>
                                
                            </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => carFilter(12)}>
                        <View style={{flexDirection:'row', marginTop:20,paddingHorizontal:40}}>
                                <View style={{flexDirection:'column'}}>
                                    <View style={{borderWidth:1 , width:80,borderRadius:200,height:80,borderColor:'#00a550',justifyContent:'center', alignItems:'center'}}>
                                        
                                        <FontAwesome5 name="car-side" size={25} color="#00a550" />
                                        

                                    </View>
                                    <Text style={{fontSize:12 ,textAlign:'center', marginTop:5}}>12 chỗ</Text>
                                </View>
                                
                            </View>
                    </TouchableOpacity>
                        
                    
                    </View>
                   
                       
                    <View style={{marginTop:30}}>
                        <TouchableOpacity  onPress={()=>setModalVisibles(true)}>
                            <View style={{flexDirection:'row',left:240}}>
                                
                                <Text style={{fontSize:10,paddingTop:5}}>Lọc theo Hãng xe</Text>
                                <Octicons name="chevron-right" size={24} color="#cbcbcb" style={{marginLeft:5}}/>
                            </View>
                            
                        </TouchableOpacity>
                    </View>
                    
                </View>
               
                
            </View>
            </View>
        </Modal>
        
        </View>
        
      </View>
      <View>
     
      <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisibles}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisibles(!modalVisibles);
            }}
        >
            <View style={styles.centeredView}>
          

            <View style={styles.containerModal}>
                <Pressable  style={{height: '50%'}} onPress={() => setModalVisibles(!modalVisibles)}>
                    <View style={{height: '100%',backgroundColor:'rgba(230,230,230,0)'}}>
                    </View>
                </Pressable>
               
                <View style={{height: '50%',backgroundColor: '#fff'}}>
                    <Feather name="minus" size={30} color="black" style={{marginLeft:165}}/>
                    <Text style={{fontWeight:'bold', textAlign:'center',fontSize:14}}>HÃNG XE</Text>

                <ScrollView>
                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
                    </View>

                    <View>
                        <View style={{flexDirection:'row',paddingHorizontal:15}}>
                            <Image style={{width:60,height:30}}source={{uri : "https://static1.cafeauto.vn/cafeautoData/upload/tintuc/thitruong/2016/12/tuan-01/fordlogo-1480766018.jpg" }}/>
                            <Text style={{fontSize:12,paddingTop:7,marginLeft:5, width:80}}>Ford</Text>
                            
                            <TouchableOpacity  style={{left:150}} onPress={() =>filterModelsCar("Ford",0) }>

                                {selected1 == true ? <AntDesign name="checkcircleo" size={20} color="#00a550" style={{paddingTop:5}}/> :  <AntDesign name="checkcircleo" size={20} color="black" style={{paddingTop:5}}/> }
                                
                            </TouchableOpacity>
                               
                            
                           
                        </View>
                        
                       
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
                    </View>

                    <View>
                        <View style={{flexDirection:'row',paddingHorizontal:15}}>
                            <Image style={{width:60,height:30}}source={{uri : "https://vtvauto.com.vn/media/category/cb_bb58e2224c40b875142eadfe9b5f6b6c.jpg" }}/>
                            <Text
                             style={{fontSize:12,paddingTop:7,marginLeft:5, width:80}}>Chevrolet</Text>
                            
                            <TouchableOpacity  style={{left:150}} onPress={()=>filterModelsCar("Chevrolet",1)}>
                                
                            {selected2 == true ? <AntDesign name="checkcircleo" size={20} color="#00a550" style={{paddingTop:5}}/> :  <AntDesign name="checkcircleo" size={20} color="black" style={{paddingTop:5}}/> }
                            </TouchableOpacity>           
                        </View>
                    </View>
                       
                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
                    </View>

                    <View>
                        <View style={{flexDirection:'row',paddingHorizontal:15}}>
                            <Image style={{width:60,height:30}}source={{uri : "https://hondahanoi5s.com/wp-content/uploads/2019/12/y-nghia-logo-honda.jpg" }}/>
                            <Text
                             style={{fontSize:12,paddingTop:7,marginLeft:5, width:80}}>Honda</Text>
                            
                            <TouchableOpacity  style={{left:150}} onPress={()=>filterModelsCar("Honda",2)}>
                                {selected3 == true ? <AntDesign name="checkcircleo" size={20} color="#00a550" style={{paddingTop:5}}/> :  <AntDesign name="checkcircleo" size={20} color="black" style={{paddingTop:5}}/> }
                            </TouchableOpacity>           
                        </View>
                    </View>
                       
                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
                    </View>

                    <View>
                        <View style={{flexDirection:'row',paddingHorizontal:15}}>
                            <Image style={{width:60,height:30}}source={{uri : "https://i.pinimg.com/originals/fa/d0/ac/fad0ac3aca6540c07863210ff2faee4e.jpg" }}/>
                            <Text
                             style={{fontSize:12,paddingTop:7,marginLeft:5, width:80}}>Hyundai</Text>
                            
                            <TouchableOpacity  style={{left:150}} onPress={()=>filterModelsCar("Hyundai",3)}>
                            {selected4 == true ? <AntDesign name="checkcircleo" size={20} color="#00a550" style={{paddingTop:5}}/> :  <AntDesign name="checkcircleo" size={20} color="black" style={{paddingTop:5}}/> }
                            </TouchableOpacity>           
                        </View>
                    </View>
                    
                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
                    </View>


                    <View>
                        <View style={{flexDirection:'row',paddingHorizontal:15}}>
                            <Image style={{width:60,height:30}}source={{uri : "http://ford-danang.com.vn/uploads/images/mazda-logo-thumb-1.png" }}/>
                            <Text
                             style={{fontSize:12,paddingTop:7,marginLeft:5, width:80}}>Mazda</Text>
                            
                            <TouchableOpacity  style={{left:150}} onPress={()=>filterModelsCar("Mazda",4)}>
                            {selected5== true ? <AntDesign name="checkcircleo" size={20} color="#00a550" style={{paddingTop:5}}/> :  <AntDesign name="checkcircleo" size={20} color="black" style={{paddingTop:5}}/> }
                            </TouchableOpacity>           
                        </View>
                    </View>

                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
                    </View>

                    <View>
                        <View style={{flexDirection:'row',paddingHorizontal:15}}>
                            <Image style={{width:60,height:35}}source={{uri : "data:image/jpeg;base64,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" }}/>
                            <Text
                             style={{fontSize:12,paddingTop:7,marginLeft:5, width:80}}>Mercedes</Text>
                            
                            <TouchableOpacity  style={{left:150}}  onPress={()=>filterModelsCar("Mercedes-Benz",5)}>
                                {selected6 == true ? <AntDesign name="checkcircleo" size={20} color="#00a550" style={{paddingTop:5}}/> :  <AntDesign name="checkcircleo" size={20} color="black" style={{paddingTop:5}}/> }
                            </TouchableOpacity>           
                        </View>
                    </View>
                    
                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
                    </View>


                </ScrollView>

                    <View style={{marginTop:10,height:50}}>
                        <TouchableOpacity onPress={()=>{
                            setModalVisible(true)
                            setModalVisibles(false)
                        }}>
                            <View style={{flexDirection:'row'}}>
                               
                                <Octicons name="chevron-left" size={24} color="#cbcbcb" style={{marginLeft:10}}/>
                                <Text style={{fontSize:10,paddingTop:5,marginLeft:5}}>Lọc theo Loại xe</Text>
                            </View>
                            
                        </TouchableOpacity>
                    </View>
                    
                </View>
               
                
            </View>
            </View>
        </Modal>
        
        </View>
        
      </View>
      </ScrollView>
</View>
    )
}



export default postCar;

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    containerModal: {
        height: '100%',
        width: '100%',
        // backgroundColor: 'white'
    }

  });
  
  