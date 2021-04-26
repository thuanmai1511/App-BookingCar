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

import axios from 'axios';
import host from '../port/index';
import { AsyncStorage } from 'react-native';
import { Ionicons } from '@expo/vector-icons';  
import MapView, { Marker } from 'react-native-maps';
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

    // console.log(route.params.id);   

    const getLatLongCar = async () => {

        await axios.post(`${host}/getLatLong` , {idCar :route.params.id})
        .then(res=>{
            console.log(res.data);
            setLocationCar(res.data.location)
        })
    }


    React.useEffect(() => {
        (async () => {
          let { status } = await Location.requestPermissionsAsync();
          if (status !== 'granted') {
            setErrorMsg('Permission to access location was denied');
            return;
          }
    
          let location = await Location.getCurrentPositionAsync({});
        //   setLocation(location);
          
          setMapRegion({
              longitude: location.coords.longitude,
              latitude : location.coords.latitude,
              longitudeDelta : 0.0922,
              latitudeDelta: 0.0421 
            });
        })();  
        getLatLongCar()
      },  []);

    //   console.log(location);

    
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
                   {/* <Entypo name="direction" size={24} color="#4285f4" /> */}
                   <Image source={man} style={{}}/>
                </Marker>
                <Marker
                    coordinate = {{
                        longitude: locationCar?.coords.longitude,
                        latitude: locationCar?.coords.latitude
                    }}

                
                >
                   {/* <Entypo name="direction" size={24} color="#4285f4" /> */}
                   {/* <Entypo name="laptop" size={30} color="green" />
                    */}
                    <Image source={imgCar} style={{}}/>
                </Marker>
                </>
                 : <></>
            }
            </MapView>
        </View>
        
    )
}



export default Map;