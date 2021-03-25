import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TouchableNativeFeedback
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

//width, height
import {windowWidth, windowHeight} from '../utils/Dimensions';

//dummy data
import eventsData from '../data/db';
// import eventsData from '../data/eventsData.json';


const EventScreen = () => {
  const navigation = useNavigation();
  const [data, setData] = useState(eventsData);



  const Item = ({item}) => {
    return (
      <TouchableNativeFeedback onPress={() => navigation.navigate('EventDetailScreen', {...item})} >
        <View style={{marginVertical:20, 
                      marginHorizontal:15, 
                      borderRadius:15,  
                      backgroundColor:'#ced6e0', 
                      elevation:15}} >
                    <View style={{padding:15,  
                                  backgroundColor:'#d1f3f5', }}  >
                            <Text style={{ fontSize:24, fontWeight:'bold', }} >{item.eventName}</Text>
                            <Text style={{ fontSize:18, fontWeight:'900', }} > Max Attendees: {item.maxAttendees}</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:8, alignItems:'baseline'}} >
                                    <View style={{flexDirection:'row', alignItems:'baseline' }} >
                                            <Text style={{fontSize:16, fontWeight:'bold'}} >Type: </Text>
                                            <Text  >{item.genre}</Text>
                                    </View>
                                    <Text style={{fontSize:16, fontWeight:'bold'}} >{(item.date)} </Text>
                            </View>
                    </View>
                    <View style={{ height:200, maxwidth:'100%', }} >
                              <Image source={{uri:item.image}} resizeMode="cover" style={{ flex:1, alignSelf:'stretch', borderBottomLeftRadius:15, borderBottomRightRadius:15,   }} /> 
                    </View>
        </View>
        </TouchableNativeFeedback>
    );
  };


  return (
    <View style={styles.container}>
      <View style= {styles.header}>
             <Text style={styles.htext} >Find Events</Text>
      </View>

      <FlatList
        style={{width : '100%'}}
        data={data}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => <Item item={item} />}
        keyExtractor={(item) => item.eventId}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor:'#ddd',
    borderBottomWidth:2,
    backgroundColor:'transparent'
},
   container:{
       flex:1,
       backgroundColor:'#f1f2f6'
   },
   htext:{
    fontSize:20,
    // fontFamily: "Cochin",
    fontWeight:'bold',
    textAlign:'center',
    margin:15
}
});


export default EventScreen;