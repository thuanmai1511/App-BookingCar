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

const Map = ({navigation,route})=> {
    
    // const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const [mapRegion , setMapRegion] = React.useState(null)
    // const [location , setLocation] = React.useState(null)

   
    // console.log(getMyCars);




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
      }, []);

    //   console.log(location);

    
    return(
        <View style={{flex: 1,backgroundColor: '#fff',alignItems: 'center',justifyContent: 'center',}}>
            <MapView style={{ width: Dimensions.get('window').width,height: Dimensions.get('window').height,}} initialRegion={mapRegion}> 
            {
                mapRegion ? 
                <Marker
                    coordinate = {{
                        longitude: mapRegion.longitude,
                        latitude: mapRegion.latitude
                    }}
                /> : <></>
            }
            </MapView>
        </View>
        
    )
}



export default Map;