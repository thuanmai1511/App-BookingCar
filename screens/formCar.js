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

import { AntDesign } from '@expo/vector-icons'; 
import axios from 'axios';
import host from '../port/index';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import RNPickerSelect from 'react-native-picker-select'; 

const formCar = ({navigation},{}) => {
    
    const [ getBrandsCar, setGetBrandsCar ] = React.useState([]); 
    const [licenseplates , setLicenseplates] = React.useState('');
    const [year , setYear] = React.useState('');
    const [seats , setSeats] = React.useState('');
    const [transmission , setTransmission] = React.useState('');
    const [fuel , setFuel] = React.useState('');
    const [brands , setBrands] = React.useState('');
    const [listBrand,setListBrand] = React.useState([]);
    const [listModel,setListModel] = React.useState([]);
    const [listModelFill,setListModelFill] = React.useState([]);
    const [models,setModels] = React.useState('');
   

    const getModelCar = async ()=> {
        const cars = await axios.get("https://raw.githubusercontent.com/matthlavacka/car-list/master/car-list.json")
        
        cars.data.map((value)=>{
            
            setListBrand(prevArray =>[...prevArray ,{label: value.brand,value: value.brand }])
            setListModel(prevArrays=>[...prevArrays , {label: value.models , value: value.models , brand: value.brand}]) 
           
        })
    
    }

    const handlerBrand = async (value)=>{ 
        setBrands(value)
        var b = null;
        for (var a of listModel ){
            if(a.brand == value){
                b = a;
            }
        }
        const c = b?b.value.map(d=>{return {value: d, label: d}}):[{label: 'choose', value: 0}]
        setListModelFill(c)

        
        
    }
    
    React.useEffect(  ()=>{
        getModelCar() 
    },[])

    const formRegisterCar  = async () => {
        const Id = await AsyncStorage.getItem('id');
            // console.log(Id);
        const  respone = {
            idUser: Id,
            licenseplatesAPI : licenseplates,
            yearAPI: year,
            seatsAPI: seats,
            transmissionAPI: transmission,
            fuelAPI: fuel,
            modelsAPI: models,
            brandsAPI: brands,
            
          
        }
   
        if(respone.idUser == '' || respone.licenseplatesAPI == ''  ||  respone.yearAPI == '' || respone.seatsAPI == '' || respone.transmissionAPI == '' || respone.fuelAPI == '' || respone.modelsAPI == '' || respone.brandsAPI == ''){
            Alert.alert("Hãy nhập đầy đủ thông tin")
        }else {
          
            navigation.navigate("formCar2", {
                respone: respone
            })
        }
           
        
    }
    
    

    return (

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
                        <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>THÔNG TIN CƠ BẢN</Text>    
                    </View> 
                    
                    <TouchableOpacity>
                        <Ionicons name="arrow-back" size={24} color="black" style={{opacity: 0}}/>
                    </TouchableOpacity>
                
            </View>
           
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 20}}>
               <Text style={{paddingHorizontal: 18 , fontSize: 11 , color: '#dc3545'}}>Lưu ý: Bạn sẽ không thể thay đổi các thông tin ở màn hình này sau khi tạo xe thành công . Vì vậy bạn cần điền chính xác các thông tin này dựa trên giấy tờ xe.</Text>
                <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 35, borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' }}>
                    <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold'}}>Biển số xe</Text>
                    <TextInput 
                        style={{flex: 1 , marginLeft: 120, fontSize: 11, textAlign:'right', right: 20 , height: 20}}
                        placeholder="Nhập biến số xe"
                        value={licenseplates}
                        onChangeText={(val)=> setLicenseplates(val)}
                        
                    ></TextInput>
                   
                    
                </View>
                    <View style={{marginTop: 15}}>
                        <Text style={{fontSize: 12, color: '#acaeb1', paddingHorizontal: 20}}>Bạn cần điền chính xác biển số xe. Không dùng biển số giả hoặc biển số không có thực.</Text>
                    </View>
                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 }}>
                        <View style={{width: "90%",borderBottomWidth: 1 , marginTop: 10, borderColor: '#e8eaef'}}></View>
                    </View>
            </View>

            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 20}}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>

            <View style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row' , marginTop: 5, alignItems:'center'}}>
                    <Text style={{fontSize: 12, marginLeft:20,fontWeight:'bold' , width: 80}}>Hãng xe</Text>
                    <View style={{flex: 1 , marginLeft: 40}}>
                        <Text  style={{  fontSize: 13}}>{brands}</Text>
                    </View>
                    <View style={{flex:1 , top: 2   }}>
                        <RNPickerSelect
                                        placeholder={{ label: '' }}
                                        items={listBrand}
                                        onValueChange={value=> handlerBrand(value)}
                                        
                                />
                                    {/* {console.log(listBrand[0])} */}
                    </View>
                    
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 5}}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row' , marginTop: 5, alignItems:'center'}}>
                    <Text style={{fontSize: 12, marginLeft:20,fontWeight:'bold' , width: 80}}>Mẫu xe</Text>
                    <View style={{flex: 1 , marginLeft: 40}}>
                        <Text  style={{  fontSize: 13}}>{models}</Text>
                    </View>
                    <View style={{flex:1 , top: 2  }}>
                        <RNPickerSelect
                                        placeholder={{ label: '' }}
                                        items={listModelFill}
                                        onValueChange={val=>setModels(val)}
                                        
                                />
                                   
                                    
                    </View>
                    
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15, marginTop: 5 }}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>

            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 5}}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>

            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' , marginTop: 5}}>
                    <Text style={{fontSize: 12, marginLeft:20,fontWeight:'bold' , width: 80}}>Năm sản xuất</Text>
                    <View style={{flex: 1 , marginLeft: 40}}>
                        <Text  style={{  fontSize: 13}}>{year}</Text>
                    </View>
                    <View style={{flex:1 , bottom: 15   }}>
                        <RNPickerSelect
                                        placeholder={{ label: '' }}
                                        onValueChange = {(val)=>setYear(val)}
                                        items={[
                                            { label: '2010', value: '2010' },
                                            { label: '2011', value: '2011' },
                                            { label: '2012', value: '2012' },
                                            { label: '2013', value: '2013' },
                                            { label: '2014', value: '2014' },
                                            { label: '2015', value: '2015' },
                                            { label: '2016', value: '2016' },
                                            { label: '2017', value: '2017' },
                                            { label: '2018', value: '2018' },
                                            { label: '2019', value: '2019' },
                                            { label: '2020', value: '2020' },
                                        
                                        ]}
                                        
                                    
                                />
                              
                    
                    </View>
                   
                    
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 5}}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold',width: 80}}>Số ghế</Text>
                    <View style={{flex: 1 , marginLeft: 40}}>
                        <Text  style={{  fontSize: 13}}>{seats}</Text>
                    </View>
                    <View style={{flex:1 , bottom: 15 }}>
                                    <RNPickerSelect
                                        placeholder={{ label: '' }}
                                        onValueChange = {(val)=>setSeats(val)}
                                        items={[
                                            { label: '2', value: '2' },
                                            { label: '3', value: '3' },
                                            { label: '4', value: '4' },
                                            { label: '5', value: '5' },
                                            { label: '6', value: '6' },
                                            { label: '7', value: '7' },
                                            { label: '8', value: '8' },
                                            { label: '9', value: '9' },
                                            { label: '10', value: '10' },
                                            { label: '11', value: '11' },
                                            { label: '12', value: '12' },
                                            { label: '13', value: '13' },
                                            { label: '14', value: '14' },
                                            { label: '15', value: '15' },
                                            { label: '16', value: '16' },
                                            { label: '17', value: '17' },
                                            { label: '18', value: '18' },
                                            { label: '19', value: '19' },
                                            { label: '20', value: '20' },



                                            
                                        ]}
                                    
                                />
                                
                                </View>
                             
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 5}}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>


            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row' , marginTop: 5}}>
                    <Text style={{fontSize: 12, marginLeft:20,fontWeight:'bold', width: 80 }}>Truyền động</Text>
                    <View style={{flexDirection: 'row', marginLeft: 100  }}>
                        <View style={{borderWidth: 1, width: 60, borderRadius: 3 , height: 25 , justifyContent: 'center', alignItems:'center' }}>
                            <TouchableOpacity onPress={()=> setTransmission("Số sàn")}>
                            <Text style={ transmission==="Số sàn" ? {  borderWidth: 1,width: 60, borderRadius: 3 , height: 25 ,textAlign:'center', fontSize:12, backgroundColor: "black", color:'#fff', paddingTop: 3} : {textAlign:'center', fontSize: 12}}>Số sàn</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{borderWidth: 1, width: 70, borderRadius: 3 , height: 25 , justifyContent: 'center', alignItems:'center' , marginLeft: 3}}>
                            <TouchableOpacity onPress={()=> setTransmission("Số tự động")}>
                            <Text style={ transmission==="Số tự động" ? { borderWidth: 1,width: 70, borderRadius: 3 , height: 25 ,textAlign:'center', fontSize:12, backgroundColor: "black", color:'#fff', paddingTop: 3} : {textAlign:'center', fontSize: 12}}>
                                    Số tự động
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 5}}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>
            <View style={{backgroundColor: '#fff'}}>
                <View style={{flexDirection: 'row', marginTop: 5 }}>
                    <Text style={{fontSize: 12, marginLeft: 20,fontWeight:'bold', width: 80}}>Loại nhiên liệu</Text>
                    <View style={{flexDirection: 'row', marginLeft: 100}}>
                        <View style={{borderWidth: 1, width: 60, borderRadius: 3 , height: 25 , justifyContent: 'center', alignItems:'center' }}>
                            <TouchableOpacity onPress={()=> setFuel("Xăng")}>
                                <Text style={fuel==="Xăng" ? {  borderWidth: 1,width: 60, borderRadius: 3 , height: 25 ,textAlign:'center', fontSize:12, backgroundColor: "black", color:'#fff', paddingTop: 3} : {textAlign:'center', fontSize: 12}}>
                                    Xăng
                                </Text>
                            </TouchableOpacity>
                        </View>
                        <View style={{borderWidth: 1, width: 70, borderRadius: 3 , height: 25 , justifyContent: 'center', alignItems:'center', marginLeft: 3 }}>
                            <TouchableOpacity onPress={()=> setFuel("Dầu")} >
                            <Text style={ fuel==="Dầu" ? {  borderWidth: 1,width: 70, borderRadius: 3 , height: 25 ,textAlign:'center', fontSize:12, backgroundColor: "black", color:'#fff', paddingTop: 3} : {textAlign:'center', fontSize: 12}}>
                                    Dầu Delsei
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'center', backgroundColor: '#fff', paddingVertical: 15 , marginTop: 5}}>
                <View style={{width: "90%",borderBottomWidth: 1 , borderColor: '#e8eaef'}}></View>
            </View>

            <View style={{flexDirection:"row", alignItems:"center",justifyContent: 'center',marginHorizontal: 0,marginTop:20,paddingVertical: 10, backgroundColor:'#00a550' , borderRadius: 3, height: 55 }}>
            <TouchableOpacity
                    onPress={formRegisterCar}> 
               <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 12}}>TIẾP TỤC</Text>
             </TouchableOpacity> 
             </View>
          </ScrollView>
    </View>
    )
}


export default formCar ;


