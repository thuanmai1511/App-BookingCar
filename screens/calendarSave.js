import React from 'react';
import { Button, Text, View ,ScrollView,StatusBar,TouchableOpacity} from 'react-native';
// import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// import { log } from 'react-native-reanimated';
// import { height } from '../constants';
import { AsyncStorage } from 'react-native';

import { Ionicons } from '@expo/vector-icons';  
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import axios from 'axios';
import host from '../port'
import { Alert } from 'react-native';

const calendarScreen = ({navigation,route})=> {

    
    const [startDate , setStartDate] = React.useState('')
    const [startDateDate , setStartDateDate] = React.useState()
    const [number , numberOfDay] = React.useState('')
    const [enddate , setEndDate] = React.useState('')
    const [makeDate , setMakeDate] = React.useState({})
    const [selectDate , SelectedDate] = React.useState([])
    var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};

    const save = async () => {
        // const value = await AsyncStorage.getItem('id');
        const idCar = route.params.idc;
        // console.log(idCar);
        const check = await axios.post(`${host}/dateChecked`, {id: idCar})

        var err = false;

        selectDate.map(item => {
            if(check.data.indexOf(item) !== -1) {
                err = true;
            }
        })
        if(err) {
            Alert.alert("Trùng ngày");
        } else {
            navigation.navigate("detailCar",{s: startDate,e:enddate,n:number,arrDate: selectDate })
        }
        // console.log(check.data);
    }
    
    // console.log(selectDate);
    const showDate = async () => {
        const idCar = route.params.idc;
        const checks =  await axios.post(`${host}/dateChecked`, {id: idCar})
        const myObj = {}
        var daylist = checks.data
        var arr = daylist
        for(var a of arr){

            myObj[a] = {
                color: 'gray',
                textColor: 'white',

            };
        }
        setMakeDate(myObj)

    } 
    React.useEffect(()=>{
        showDate()
    },[])


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
                   
                    <Text key={Math.random()} style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>CHỌN NGÀY</Text>   
                </View> 
                
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={24} color="black" style={{opacity: 0}}/>
                </TouchableOpacity>
            
        </View>
        <View style={{flexDirection:'row' , height:50, backgroundColor:'black',justifyContent:'center', alignItems:'center'}}>
            <Text style={{color:'white' , fontSize: 18, marginRight:30,fontWeight:'bold'}}>{startDate?startDate : 'Ngày nhận xe'}</Text>
            <Ionicons name="arrow-forward-outline" size={25} color="white" />
            <Text style={{color:'white' , fontSize: 18,marginLeft:30,fontWeight:'bold'}}>{enddate?enddate:'Ngày trả xe'}</Text>
        </View>
        <View>
        <Calendar
            markingType={'period'}
         
            onDayPress={day => {
                setStartDate(day.dateString)
                setStartDateDate(day)
                
              }}
            onDayLongPress={days=>{
                setEndDate(days.dateString)
                const myObj = {}
                // console.log(startDateDate,days);
                if (startDate) {
                myObj[startDate] = {
                    startingDay: true,
                    color: 'black',
                    textColor: 'white',
                };
                myObj[days?.dateString] = {
                    selected: true,
                    endingDay: true,
                    color: 'black',
                    textColor: 'white',
                };
                }
                var daylist = getDaysArray(new Date(startDate),new Date(days?.dateString));
            
                var arr = daylist.map((v)=>v.toISOString().slice(0,10));

                SelectedDate(arr)
      
                for(var a of arr.slice(1,arr.length-1)){

                    myObj[a] = {
                        // startingDay: true,
                        color: 'black',
                        textColor: 'white',
                    };
                }
                numberOfDay(arr.length)
            
            setMakeDate(myObj)
            }}
            monthFormat="yyyy MM"
            markedDates={makeDate}
            />

        </View>

            <TouchableOpacity style={{width:"100%",height:50,backgroundColor:'#00a550',marginTop:200}} 
                onPress={save}
            >
                    <Text style={{textAlign:'center',color:'white', paddingTop:15,fontSize:14,fontWeight:'bold'}}>LƯU</Text>   
            </TouchableOpacity>   
           
        </ScrollView>
        </View>
        
    )
}



export default calendarScreen;