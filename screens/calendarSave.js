import React from 'react';
import { Button, Text, View ,ScrollView,StatusBar,TouchableOpacity} from 'react-native';
// import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
// import { log } from 'react-native-reanimated';
// import { height } from '../constants';

import { Ionicons } from '@expo/vector-icons';  
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';


const calendarScreen = ({navigation,route})=> {

    
    const [startDate , setStartDate] = React.useState('')
    const [startDateDate , setStartDateDate] = React.useState()
    const [number , numberOfDay] = React.useState('')
    const [enddate , setEndDate] = React.useState('')
    const [makeDate , setMakeDate] = React.useState({})
   
    var getDaysArray = function(s,e) {for(var a=[],d=new Date(s);d<=e;d.setDate(d.getDate()+1)){ a.push(new Date(d));}return a;};

    const save = () => {
        // console.log(startDate , enddate , number);
        navigation.navigate("detailCar",{s: startDate,e:enddate,n:number})
    }
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
            // style={{
            //     borderWidth: 1,
            //     borderColor: 'gray',
            //     height: 350
            // }}
          
            
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
                for(var a of arr.slice(1,arr.length-1)){
                    // console.log(a);
                   
                    
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

            <TouchableOpacity style={{width:"100%",height:50,backgroundColor:'#00a550',marginTop:200}} onPress={save}>
                    <Text style={{textAlign:'center',color:'white', paddingTop:15,fontSize:14,fontWeight:'bold'}}>LƯU</Text>   
            </TouchableOpacity>   
           
        </ScrollView>
        </View>
        
    )
}



export default calendarScreen;