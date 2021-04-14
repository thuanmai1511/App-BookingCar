
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';

import Home from './screens/homepage';
import SigninScreen from './screens/SigninScreen';
import SignupScreen from './screens/SignupScreen';
import Profile from './screens/profile';
import homeCar from './screens/homeCar';
import formCar from './screens/formCar';
import formCar2 from './screens/formCar2';
import formCar3 from './screens/formCar3';
import postCar from './screens/postCar';
import detailCar from './screens/detailCar';
import discount from './screens/discount';
import DrawerCustom from './screens/drawer'
import myCar from './screens/mycar';
import favorites from './screens/favorite'
import map from './screens/map'

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();




export default function App() {

  const drawerScreen = () => {
    const DrawerContent = () => {
      const [name, setName] = React.useState('');
      return (<DrawerCustom/>);
      };
    return (
    <Drawer.Navigator drawerContent={props => <DrawerContent {...props} />}>
      <Drawer.Screen name="Home" component={Home} />
    </Drawer.Navigator>
    )
  }

  return ( 
      <NavigationContainer>
        <Stack.Navigator
        initialRoute="Home"
        screenOptions={{
          headerShown: false
        }}>

          <Stack.Screen name="Home" component={drawerScreen} />
          <Stack.Screen name="SigninScreen" component={SigninScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="homeCar" component={homeCar} />
          <Stack.Screen name="formCar" component={formCar} />
          <Stack.Screen name="formCar2" component={formCar2} />
          <Stack.Screen name="formCar3" component={formCar3} />
          <Stack.Screen name="postCar" component={postCar} />
          <Stack.Screen name="detailCar" component={detailCar} />
          <Stack.Screen name="discount" component={discount} />
          <Stack.Screen name="myCar" component={myCar} />
          <Stack.Screen name="favorite" component={favorites} />
          <Stack.Screen name="map" component={map} />
        </Stack.Navigator>
        
      </NavigationContainer>
   
     
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});