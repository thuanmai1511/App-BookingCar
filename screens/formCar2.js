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
import * as Location from 'expo-location';
import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import host from '../port/index';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import RNPickerSelect from 'react-native-picker-select'; 
import * as ImagePicker from 'expo-image-picker';
import Textarea from 'react-native-textarea';
import { Feather } from '@expo/vector-icons'; 
import Geocoder from 'react-native-geocoding';
const formCar2 = ({navigation,route}) => {

    Geocoder.init("AIzaSyBLnQ6KLSCfkgMFDgbw1_jMzlo4fhXILss");
    const [selected, setSelected] = React.useState(false)
    const [selected1, setSelected1] = React.useState(false)
    const [selected2, setSelected2] = React.useState(false)
    const [selected3, setSelected3] = React.useState(false)
    const [selected4, setSelected4] = React.useState(false)
    const [selected5, setSelected5] = React.useState(false)
    const [fueled , setFueled] = React.useState('')
    const [note , setNote] = React.useState('')
    const [listCity , setListCity] = React.useState([])
    const [listProvince , setListProvince] = React.useState([])
    const [listWard , setListWard] = React.useState([])
    const [getCity , setCity] = React.useState('')
    const [getProvince , setProvince] = React.useState('')
    const [getWard , setWard] = React.useState('')
  
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const getAddress = async ()=> {
        const isCity = [];
        const getAddressed = await  axios.get("https://www.thegioididong.com/cart/api/location/GetAllProvinces")
        getAddressed.data.data.map((val)=>{
            
            isCity.push({
                id:val.provinceID,label: val.provinceName,value: val.provinceName
            })
        
        })
     
        setListCity(isCity)
    }


    const handlerCity = async(val)=>{

        var a = []
    
        setCity(val)
       
        const province = listCity.filter(pro =>{
            return pro.value == val
        })
        
        if(province.length){
           
                const getProvice = await axios.get('https://www.thegioididong.com/cart/api/location/GetDistrictsByProvinceId/'+province[0].id)
                getProvice.data.data.map((getp)=>{
                 a = [...a,{id: getp.districtID, label: getp.districtName,value: getp.districtName}]
                })
                // console.log(a);
                setListProvince(a)

        }
        
    }

    const handlerProvince = async(value)=>{

        var  b = []
        setProvince(value)
        const ward = listProvince.filter(pro =>{
                return pro.value == value
            })
            // console.log(ward);
        if(ward.length){
            const getWard = await axios.get('https://www.thegioididong.com/cart/api/location/GetWardsByDistrictId/' +ward[0].id)
            getWard.data.data.map((item)=>{
                b = [...b ,{id:item.wardID,label: item.wardName,value: item.wardName }]
            })
            setListWard(b)
        }
    

    }




    const postCar = async ()=>{
        const {latitude, longitude} =location.coords
        const gg = await Geocoder.from({
                    latitude,
                    longitude
                });
        // console.log(gg.results[0].formatted_address);

        const respone1 = route.params.respone;
        
        const respone2 = {
            ...respone1,
            sunroofAPI: selected,
            bluetoothAPI: selected1,
            gpsAPI : selected2,
            mapAPI : selected3,
            cameraback: selected4,
            express : selected5,
            noteAPI : note,
            fueledAPI : fueled,
            address: getCity,
            district : getProvince,
            ward: getWard,
            location: location,
            addressCurr: gg.results[0].formatted_address

        }
            // console.log(respone2);
        if(respone2.address == '' || respone2.express == '' ||respone2.district == '' ||respone2.ward == '' || respone2.noteAPI == '' || respone2.fueledAPI == '' || !respone2.location ){
            Alert.alert("H??y nh???p ?????y ????? th??ng tin")
        }else {
            navigation.navigate("formCar3", {
                respone2: respone2
            })
        }
       

    }

    React.useEffect(()=>{
        (async () => {
             getAddress() 

            let { status } = await Location.requestPermissionsAsync();
            if (status !== 'granted') {
              setErrorMsg('Permission to access location was denied');
              return;
            }
          })();
    },[])
    // console.log(listCity);
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
                        <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>TH??NG TIN CHI TI???T</Text>    
                    </View> 
                    
                    <TouchableOpacity>
                        <Ionicons name="arrow-back" size={24} color="black" style={{opacity: 0}}/>
                    </TouchableOpacity>
                
            </View>

            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 20}}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>
            
            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold', width: 80}}>Th??nh ph???</Text>
                    <View style={{flex: 1 , marginLeft: 40}}>
                        <Text  style={{  fontSize: 13}}>{getCity}</Text>
                    </View>
                    <View style={{flex:1 , bottom: 15  }}>
                        <RNPickerSelect
                                        placeholder={{ label: '' }}
                                        items={listCity}
                                        onValueChange={value=> handlerCity(value)}
                                        
                                />
                                    
                    </View>
                    
                    
                </View>
                <View style={{flexDirection: 'row' }}>
                    <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold',width: 80}}>Qu???n</Text>
                    <View style={{flex: 1 , marginLeft: 40}}>
                        <Text  style={{  fontSize: 13}}>{getProvince}</Text>
                    </View>
                    <View style={{flex:1 , bottom: 15  }}>
                        <RNPickerSelect
                                        placeholder={{ label: '' }}
                                        items={listProvince}
                                        onValueChange={value=> handlerProvince(value)}
                                        
                                />
                                    
                    </View>
                    
                   
                
                </View>
                   <View style={{flexDirection: 'row' }}>
                    <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold',width: 80}}>Ph?????ng</Text>
                    <View style={{flex: 1 , marginLeft: 40}}>
                        <Text  style={{  fontSize: 13}}>{getWard}</Text>
                    </View>
                    <View style={{flex:1 , bottom: 15  }}>
                        <RNPickerSelect
                                        placeholder={{ label: '' }}
                                        items={listWard}
                                        onValueChange={value=> setWard(value)}
                                        
                                />
                                    
                    </View>
                    
                    
                    
            
                
                </View>
                {/* <Text>??dsad</Text>                 */}
                   
                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold',width: 80}}>L???y v??? tr??</Text>

                        <TouchableOpacity style={{borderWidth: 1, height: 25,width:240 ,borderColor:'#e8eaef'}}onPress={async()=>{
                        if(!location){
                            let location = await Location.getCurrentPositionAsync({});
                                // console.log(location);
                            setLocation(location);
                            // console.log(location);
                        }
                    }} >
                            <Text style={{  textAlign:'center', fontSize:12, paddingTop: 3,color:'#00a550'}}>
                                {/* {location?"lat: "+location?.coords.latitude+"- long: "+location?.coords.longitude:"Get Location"} */}
                                {location ? '???? l???y v??? tr?? th??nh c??ng' : 'L???y v??? tr??'}
                            </Text>
                        </TouchableOpacity>
                    </View>

            </View>

            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold'}}>M?? t??? xe</Text>
                   
                    <View style={styles.container}>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            maxLength={120}
                            placeholder={'Xe gia ????nh m???i ?????p, n???i th???t nguy??n b???n, s???ch s???, b???o d?????ng th?????ng xuy??n, r???a xe mi???n ph??...'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                            onChangeText={(val)=>setNote(val)}
                        />
                    </View> 
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>

            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold'}}>M???c ti??u th??? nhi??n li???u</Text>
                    <View  style={{left: 60, flex: 1, bottom: 5}}>
                        <TextInput
                            style={{fontSize: 12, textAlign: 'right'}}
                            placeholder="0.0"
                            onChangeText={(val)=>setFueled(val)}
                        />
                    </View>
                    <View style={{left: 70, flex: 2 }}>
                        <Text style={{fontSize: 12, fontWeight:'bold'}}>l??t/100 km</Text>
                    </View>
                    
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>


            
            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <View style={{marginLeft: 20}}>
                        <Ionicons name="car-outline" size={25} color="black" />
                    </View>
                   
                    <Text style={{fontSize: 12,fontWeight:'bold', justifyContent: 'center', top: 5, marginLeft: 10, width: 80}}>C???a s??? tr???i</Text>
                    <View style={{left: 180 }}>
                        <TouchableOpacity onPress={()=> setSelected(!selected)} >
                            <Text style={ selected == true ? {  borderWidth: 1,width: 25, borderRadius: 30, height: 25 ,textAlign:'center', fontSize:12, borderColor: 'green', color:'#fff', paddingTop: 3} :{borderWidth: 1,width: 25, borderRadius: 30, height: 25 ,textAlign:'center', fontSize:12, backgroundColor: "#fff", paddingTop: 3}}>
                                
                                { selected == true? <Ionicons name="checkmark-outline" size={18} color="green" /> : ''}
                            </Text>
                        </TouchableOpacity>
                       
                    </View>
                    
                    
                </View>
                   
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>

            
            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <View style={{marginLeft: 20}}>
                        <Ionicons name="bluetooth-outline" size={25} color="black" />
                    </View>
                   
                    <Text style={{fontSize: 12,fontWeight:'bold', justifyContent: 'center', top: 5, marginLeft: 10, width: 80}}>Bluetooth</Text>
                    <View style={{left: 180 }}>
                        <TouchableOpacity onPress={()=> setSelected1(!selected1)} >
                            <Text style={ selected1 == true ? {  borderWidth: 1,width: 25, borderRadius: 30, height: 25, borderColor: 'green',textAlign:'center', fontSize:12, color:'#fff', paddingTop: 3} :{borderWidth: 1,width: 25, borderRadius: 30, height: 25 ,textAlign:'center', fontSize:12, backgroundColor: "#fff", paddingTop: 3}}>
                                
                                { selected1 == true? <Ionicons name="checkmark-outline" size={18} color="green" /> : ''}
                            </Text>
                        </TouchableOpacity>
                       
                    </View>
                    
                    
                </View>
                   
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <View style={{marginLeft: 20}}>
                        <Ionicons name="navigate-outline" size={25} color="black" />
                    </View>
                   
                    <Text style={{fontSize: 12,fontWeight:'bold', justifyContent: 'center', top: 5, marginLeft: 10, width: 80}}>?????nh v??? GPS</Text>
                    <View style={{left: 180 }}>
                        <TouchableOpacity onPress={()=> setSelected2(!selected2)} >
                            <Text style={ selected2 == true ? {  borderWidth: 1,width: 25, borderRadius: 30, borderColor: 'green', height: 25 ,textAlign:'center', fontSize:12, color:'#fff', paddingTop: 3} :{borderWidth: 1,width: 25, borderRadius: 30, height: 25 ,textAlign:'center', fontSize:12, backgroundColor: "#fff", paddingTop: 3}}>
                                
                                { selected2 == true? <Ionicons name="checkmark-outline" size={18} color="green" /> : ''}
                            </Text>
                        </TouchableOpacity>
                       
                    </View>
                    
                    
                </View>
                   
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <View style={{marginLeft: 20}}>
                        <Ionicons name="map-outline" size={25} color="black" />
                    </View>
                   
                    <Text style={{fontSize: 12,fontWeight:'bold', justifyContent: 'center', top: 5, marginLeft: 10, width: 80}}>B???n ?????</Text>
                    <View style={{left: 180 }}>
                        <TouchableOpacity onPress={()=> setSelected3(!selected3)} >
                            <Text style={ selected3 == true ? {  borderWidth: 1,width: 25,  borderColor: 'green',borderRadius: 30, height: 25 ,textAlign:'center', fontSize:12,  color:'#fff', paddingTop: 3} :{borderWidth: 1,width: 25, borderRadius: 30, height: 25 ,textAlign:'center', fontSize:12, backgroundColor: "#fff", paddingTop: 3}}>
                                
                                { selected3 == true? <Ionicons name="checkmark-outline" size={18} color="green" /> : ''}
                            </Text>
                        </TouchableOpacity>
                       
                    </View>
                    
                    
                </View>
                   
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <View style={{marginLeft: 20}}>
                        <Ionicons name="camera-reverse-outline" size={25} color="black" />
                    </View>
                   
                    <Text style={{fontSize: 12,fontWeight:'bold', justifyContent: 'center', top: 5, marginLeft: 10, width: 80}}>Camera l??i</Text>
                    <View style={{left: 180 }}>
                        <TouchableOpacity onPress={()=> setSelected4(!selected4)} >
                            <Text style={ selected4 == true ? {  borderWidth: 1,width: 25, borderColor: 'green', borderRadius: 30, height: 25 ,textAlign:'center', fontSize:12,  color:'#fff', paddingTop: 3} :{borderWidth: 1,width: 25, borderRadius: 30, height: 25 ,textAlign:'center', fontSize:12, backgroundColor: "#fff", paddingTop: 3}}>
                                
                                { selected4 == true? <Ionicons name="checkmark-outline" size={18} color="green" /> : ''}
                            </Text>
                        </TouchableOpacity>
                       
                    </View>
                    
                    
                </View>
                   
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <View style={{marginLeft: 20}}>
                        <Ionicons name="car-sport-outline" size={25} color="black" />
                    </View>
                   
                    <Text style={{fontSize: 12,fontWeight:'bold', justifyContent: 'center', top: 5, marginLeft: 10, width: 80}}>Giao xe</Text>
                    <View style={{left: 180 }}>
                        <TouchableOpacity onPress={()=> setSelected5(!selected5)} >
                            <Text style={ selected5 == true ? {  borderWidth: 1,width: 25, borderColor: 'green', borderRadius: 30, height: 25 ,textAlign:'center', fontSize:12,  color:'#fff', paddingTop: 3} :{borderWidth: 1,width: 25, borderRadius: 30, height: 25 ,textAlign:'center', fontSize:12, backgroundColor: "#fff", paddingTop: 3}}>
                                
                                { selected5 == true? <Ionicons name="checkmark-outline" size={18} color="green" /> : ''}
                            </Text>
                        </TouchableOpacity>
                       
                    </View>
                    
                    
                </View>
                   
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>



            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
            </View>

            {/* <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold'}}>Gi?? cho thu??</Text>
                    <View  style={{left: 150, flex: 1, bottom: 5}}>
                        <TextInput
                            
                            placeholder="0.0"
                            onChangeText={(val)=>setPrice(val)}
                            style={{color: 'green',fontSize: 16}}
                        />
                    </View>
                    <View style={{left: 135, flex: 2 }}>
                        <Text style={{fontSize: 12, fontWeight:'bold'}}>VN??</Text>
                    </View>
                    
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 20}}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold'}}>H??nh ???nh xe</Text>
                    <View  style={{left: 200, flex: 1, bottom: 5}}>
                       <TouchableOpacity onPress={pickImageCar}>
                            <Feather name="upload" size={15} color="green" style={{marginLeft: 20, marginTop: 5}} />
                       </TouchableOpacity>
                    </View>
                    <View style={{left: 135, flex: 2 }}>
                        <Text style={{fontSize: 12, fontWeight:'bold'}}></Text>
                    </View>
                    
                </View>
            </View>


 */}



            <View style={{flexDirection:"row", alignItems:"center",justifyContent: 'center',marginHorizontal: 0,marginTop:20,paddingVertical: 10, backgroundColor:'#00a550' , borderRadius: 3, height: 55 }}>
            <TouchableOpacity
                    onPress={postCar}> 
               <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>Ti???p t???c</Text>
             </TouchableOpacity> 
             </View>
            
              

          </ScrollView>
    </View>
    )
}



export default formCar2 ;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 30,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textareaContainer: {
      height: 180,
      padding: 5,
      backgroundColor: '#F5FCFF',
    },
    textarea: {
      textAlignVertical: 'top',  // hack android
      height: 170,
      fontSize: 14,
      color: '#333',
    },
  });