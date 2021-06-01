import React, {useState,useEffect,useCallback} from 'react';
import {
    View,
    StyleSheet,
    StatusBar,
    Image,ScrollView,TextInput, Alert, Platform ,TouchableOpacity, LogBox , Dimensions, Linking
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
import { AsyncStorage } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat'
import { Ionicons } from '@expo/vector-icons'; 
import { Entypo } from '@expo/vector-icons';
import io from 'socket.io-client';
import host from '../port/index';
import axios from 'axios';
let socket;

const Chat = ({navigation,route}) =>{
  
    const [messages, setMessages] = useState([]);
    const [name, setName] = React.useState('');
    const [room, setRoom] = React.useState('');
    const [user, setU] = React.useState('');
   
    


    
    const getData = async () => {
        const values = await AsyncStorage.getItem('id');
        setU(values)
        try{
      
          socket = io.connect(host);

          var room = "";
          if(route.params.type == 0) {
              room = values+'_'+route.params.idH;
          } else {
              room = route.params.idH+"_"+values;
          }
          // const room = values+'_'+route.params.idH;
          // console.log(room);
          axios.post(`${host}/checkroom`, {room} )
  
          const getMessages = await  axios.post(`${host}/showMessages`, {room})

       
          
          setMessages(getMessages.data[0].messages)

          setName(name);
          setRoom(room);
  
          socket.emit('join', { name, room });
  
          return () => {
            socket.emit('disconnect');
            socket.off();
          }
        } catch(error) {
          console.log(error);
        }
      
    }
    const acc = async () => {
      const value= await AsyncStorage.getItem('id');
      socket.on('message', (message) => {
        if(message.data[0].user._id !== value) {
          const mess = message.data[0]
          setMessages(previousMessages => GiftedChat.append(previousMessages, mess))
        }
      }) 
    }
    

    const onSend = React.useCallback((messages = {}) => {
        // console.log(messages);
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
        socket.emit('sendMessage', messages);
    }, [])
    const call = () =>{
      Linking.openURL(`tel:${route.params.phone}`)
    }
    React.useEffect( () => {
      acc() , getData()
    } , []);

    return(
        <View style={{flex: 1 }}>
             <View style={{ flexDirection: 'row', backgroundColor:'black', alignItems:"center", marginTop: 30, padding: 20}}>
                    <TouchableOpacity
                       onPress={ () => navigation.goBack()}
                    >
                        <Ionicons name="arrow-back" size={25} color="white" />
                    </TouchableOpacity>

                    <View style={{flex: 1 }}>
                        <Text style={{color: '#fff', fontWeight:'bold',fontSize: 17, textAlign:'center' }}>TRÒ CHUYỆN</Text>    
                    </View> 
                    
                    <TouchableOpacity onPress={call}>
                      <Entypo name="phone" size={24} color="white" />
                    </TouchableOpacity>
                
            </View>
            <GiftedChat
                messages={messages}
                onSend={messages => onSend(messages)}
                user={{
                    _id: user,
                }}
                />
        </View>
    )
}
export default Chat;