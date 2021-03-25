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

import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
import geohash from "ngeohash";

import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

//width, height
import {windowWidth, windowHeight} from '../utils/Dimensions';

//dummy data
// import eventsData from '../data/db';
// import eventsData from '../data/eventsData.json';


const EventScreen = () => {
  const navigation = useNavigation();
  //const [data, setData] = useState(eventsData);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])


  useEffect(() => {
    const subscriber = firestore()
    .collection('Events')
    .limit(3)
    .onSnapshot(querySnapshot => {
      let events = []

      querySnapshot.forEach(documentSnapshot => {
        events.push({
          ...documentSnapshot.data(),
          eventId : documentSnapshot.id,
        })
      })
      // console.log("Events : ", events);
      setData(events);
      setLoading(false);
    })

    return () => subscriber();
  }, []);


  const Item = (props) => {
    const dateVal = moment(props.item.date.toDate()).format("DD/MM/YYYY")
    return (
      <TouchableNativeFeedback onPress={() => navigation.navigate('EventDetailScreen', {...props.item})} >
        <View style={{marginVertical:20, 
                      marginHorizontal:15, 
                      borderRadius:15,  
                      backgroundColor:'#ced6e0', 
                      elevation:15}} >
                    <View style={{padding:15,  
                                  backgroundColor:'#d1f3f5', }}  >
                            <Text style={{ fontSize:24, fontWeight:'bold', }} >{props.item.eventcategory}</Text>
                            <Text style={{ fontSize:18, fontWeight:'900', }} > Max Attendees: {props.item.maxAttendees}</Text>
                            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:8, alignItems:'baseline'}} >
                                    <View style={{flexDirection:'row', alignItems:'baseline' }} >
                                            <Text style={{fontSize:16, fontWeight:'bold'}} >Type: </Text>
                                            <Text  >{props.item.eventcategory}</Text>
                                    </View>
                                    <Text style={{fontSize:16, fontWeight:'bold'}} >{dateVal} </Text>
                            </View>
                    </View>
                    <View style={{ height:200, maxwidth:'100%', }} >
                              <Image source={{uri:props.item.thumbnailURL}} resizeMode="cover" style={{ flex:1, alignSelf:'stretch', borderBottomLeftRadius:15, borderBottomRightRadius:15,   }} /> 
                    </View>
        </View>
      </TouchableNativeFeedback>
    );
  };

  if(loading) {
    return <ActivityIndicator />
  }


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