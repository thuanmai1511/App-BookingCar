import React, {useState,useEffect, useLayoutEffect} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,ScrollView,TextInput, Alert, Platform ,TouchableOpacity, LogBox, Dimensions } from 'react-native';
import {
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    Switch

} from 'react-native-paper';
import MapViewDirections from 'react-native-maps-directions';
import { getDistance } from 'geolib';
import axios from 'axios';
import host from '../port/index';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import MapView, { Marker,Polyline, } from 'react-native-maps';
import * as Location from 'expo-location';
import { Entypo } from '@expo/vector-icons'; 
import imgCar from '../images/car.png';
import man from '../images/bussiness-man.png';
const Map = ({navigation,route})=> {
    
    // const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [mapRegion , setMapRegion] = React.useState(null)
    // const [location , setLocation] = React.useState(null)

    const [locationCar , setLocationCar] = React.useState(null)
    const [distance , setDistance] = React.useState(0)


    // console.log(route.params.id);   

    const getLatLongCar = async () => {

        await axios.post(`${host}/getLatLong` , {idCar :route.params.id})
        .then(res=>{
            // console.log(res.data);
            setLocationCar(res.data.location)
            console.log(mapRegion);
            // const a = (Number(getDistance({
            //     longitude: mapRegion?.longitude,
            //     latitude: mapRegion?.latitude
            // },{
            //     longitude: res.data.location?.coords.longitude,
            //     latitude: res.data.location?.coords.latitude
            // }))/1000).toFixed(1)
            // setDistance(a)
        })
        
    }
    // const getDirections = async (startLoc, destinationLoc) => {
    //     try {
    //       const KEY = "YOUR GOOGLE API KEY";
    //       let resp = await fetch(
    //         `https://maps.googleapis.com/maps/api/directions/json?origin=${startLoc}&destination=${destinationLoc}&key=${KEY}`
    //       );
    //       let respJson = await resp.json();
    //       let points = decode(respJson.routes[0].overview_polyline.points);
    //       console.log(points);
    //       let coords = points.map((point, index) => {
    //         return {
    //           latitude: point[0],
    //           longitude: point[1]
    //         };
    //       });
    //       return coords;
    //     } catch (error) {
    //       return error;
    //     }
    //   };
    
    React.useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
        //   setLocation(location);
          
         await setMapRegion({
              longitude: location.coords.longitude,
              latitude : location.coords.latitude,
              longitudeDelta : 0.0922,
              latitudeDelta: 0.0421 
            });
            getLatLongCar()
        
        })();  
      },  []);

    //   console.log(location);
    const distanceFee = (e) => {
        // console.log(e);
        
        e ? navigation.navigate('detailCar', {km: e}) : 0
        // console.log(e);
    } 
    

    return(
        <View style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center',}}>
            <MapView style={{ width: Dimensions.get('window').width,height: Dimensions.get('window').height,}} initialRegion={mapRegion}> 
            
            {
                (mapRegion && locationCar) ? 
                <>
                <Marker
                    coordinate = {{
                        longitude: mapRegion.longitude,
                        latitude: mapRegion.latitude
                    }}

                
                >
                
                   <Image source={man} style={{}}/>
                </Marker>
               
             <MapViewDirections

                origin={{
                    longitude: mapRegion.longitude,
                    latitude: mapRegion.latitude
                }}
                destination={{
                    longitude: locationCar?.coords.longitude,
                    latitude: locationCar?.coords.latitude
                }}
                apikey="AIzaSyBHRMxpBKc25CMHY51h1jrnCCm6PjNs62s"
                strokeWidth={3}
                strokeColor="#669df6"
            />
                <Marker
                    coordinate = {{
                        longitude: locationCar?.coords.longitude,
                        latitude: locationCar?.coords.latitude
                    }}

                
                >
                  
                    <Image source={imgCar} style={{}}/>
                </Marker>
               
                </>
                 : <></>
            }
            </MapView>
            <View style={{height:150 }}>
                <View style={{justifyContent:'center',alignItems:'center'}}>
                    <Text style={{fontSize:20}}>Khoảng cách: {((mapRegion && locationCar))?(Number(getDistance({
                            longitude: mapRegion.longitude,
                            latitude: mapRegion.latitude
                        },{
                            longitude: locationCar?.coords.longitude,
                            latitude: locationCar?.coords.latitude
                        }))/1000).toFixed(1) + " km":"Đang tính"}
                    </Text>

                    {   (mapRegion && locationCar)?
                            <>{
                                ((Number(getDistance({
                                    longitude: mapRegion.longitude,
                                    latitude: mapRegion.latitude
                                },{
                                    longitude: locationCar?.coords.longitude,
                                    latitude: locationCar?.coords.latitude
                                }))/1000).toFixed(1)  < 5) ?  
                            <TouchableOpacity style={{borderWidth:1,width:80,height:30,borderColor:'#00a550' ,marginTop:5,borderRadius:5}} onPress={()=>distanceFee((Number(getDistance({
                                longitude: mapRegion.longitude,
                                latitude: mapRegion.latitude
                            },{
                                longitude: locationCar?.coords.longitude,
                                latitude: locationCar?.coords.latitude
                            }))/1000).toFixed(1))}>
                                <Text style={{paddingTop:5,textAlign:'center'}}>Giao xe</Text>
                            </TouchableOpacity>
                            : <Text>Không hỗ trợ giao xe</Text>
                            }</>:<></>
                    }
                       
                    </View>
               
                
            </View>
        </View>
        
    )
}



export default Map;