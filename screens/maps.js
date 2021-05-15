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
const maps= ({navigation,route})=> {
    
    // const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [mapRegion , setMapRegion] = React.useState(null)
    // const [location , setLocation] = React.useState(null)

    const [locationCar , setLocationCar] = React.useState(null)
   


    

    const setStep =  () => {

        setLocationCar(route.params.data[0])
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
          
         await setMapRegion({
              longitude: location.coords.longitude,
              latitude : location.coords.latitude,
              longitudeDelta : 0.0922,
              latitudeDelta: 0.0421 
            });
           setStep()
        
        })();  
      },  []);

    //   console.log(locationCar);   

    return(
        <View style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center',}}>
            <MapView style={{ width: Dimensions.get('window').width,height: Dimensions.get('window').height,}} initialRegion={mapRegion}> 
            

            {
                locationCar ? <Marker
                coordinate = {{
                    longitude: locationCar?.coords.longitude,
                    latitude: locationCar?.coords.latitude
                }}

            
            >
              
                <Image source={man} style={{}}/>
            </Marker> : null
            }
            {/* {
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
            } */}
            </MapView>
            
        </View>
        
    )
}



export default maps;