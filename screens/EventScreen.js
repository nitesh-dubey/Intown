import React, {useContext, useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';
import {Icon} from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native-paper';

// import {Button} from 'react-native-elements'
import RNPicker from "rn-modal-picker";

import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
//import geohash from "ngeohash";
import Geolocation from 'react-native-geolocation-service';
import haversine from 'haversine'; //calculates distance between two geo points

// import FormButton from '../components/FormButton';
// import {AuthContext} from '../navigation/AuthProvider';
import FilterButtons from '../components/FilterButtons';

//width, height
// import {windowWidth, windowHeight} from '../utils/Dimensions';

//dummy data
// import eventsData from '../data/db';
// import eventsData from '../data/eventsData.json';

//Locations Functions
import {requestLocationPermission, getGeoHashRange} from '../utils/LocationFunctions';


const EventScreen = () => {
  const navigation = useNavigation();
  //const [data, setData] = useState(eventsData);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);
  const [distance, setDistance] = useState(2); //Distance from current position in miles
  const [eventcategory, setEventcategory] = useState("Tech");
  const [eventMode, setEventMode] = useState("Offline");

  


  useEffect(() => {

    /*
    let subscriber = undefined;
    Geolocation.getCurrentPosition(
      pos => {
        setLat(pos.coords.latitude);
        setLong(pos.coords.longitude);
        const range = getGeoHashRange(pos.coords.latitude, pos.coords.longitude, distance);
        subscriber = firestore()
        .collection('Events')
        .where('geohash', '>=', range.lower)
        .where('geohash', '<=', range.upper)
        .where('eventMode', '==', eventMode)
        .where('eventcategory', '==', eventcategory)
        .onSnapshot(querySnapshot => {
          let events = [];
          if(querySnapshot) {
            querySnapshot.forEach(documentSnapshot => {
              events.push({
                ...documentSnapshot.data(),
                eventId : documentSnapshot.id,
              })
            })
          }

          console.log("Events = ", events);
          console.log("querySnapshot = ", querySnapshot)
        })
      },
      error => alert(error.message)
    );

    return () => subscriber ? subscriber() : null;

    */

  
    
    let subscriber = undefined;

    requestLocationPermission(isLocationPermissionGranted, setIsLocationPermissionGranted)
    .then(() => {
        Geolocation.getCurrentPosition(
            pos => {
                setLat(pos.coords.latitude);
                setLong(pos.coords.longitude);
                const range = getGeoHashRange(pos.coords.latitude, pos.coords.longitude, distance);
                subscriber = firestore()
                  .collection('Events')
                  .where("geohash", ">=", range.lower)
                  .where("geohash", "<=", range.upper)
                  .where("eventMode", "==", eventMode)
                  .where("eventcategory", "==", eventcategory)
                  .onSnapshot(querySnapshot => {
                    let events = []

                    if(querySnapshot) {
                      querySnapshot.forEach(documentSnapshot => {
                        const data = documentSnapshot.data();
                        const start = {latitude : pos.coords.latitude, longitude : pos.coords.longitude};
                        const end = {latitude : parseFloat(data.latitude), longitude : parseFloat(data.longitude)};
                        let dist = haversine(start, end, {unit : 'mile'})

                        if(dist <= distance) {
                          events.push({
                            ...data,
                            eventId : documentSnapshot.id,
                          })
                        }
                      })
                    }

                    setData(events);
                    setLoading(false);
                    console.log("Events Size : ", events.length)
                    console.log("Events : ", events);
                    console.log('Event Category : ', eventcategory);
                    console.log('Event Mode : ', eventMode);
                  }, (error) => console.log(error))
            },
            error => alert(error.message)
        );
    })

    return () => subscriber ? subscriber() : null;

    
    

    /*
    const range = getGeoHashRange(24.083132, 82.6589776, distance)
    
    const subscriber = firestore()
    .collection('Events')
    .where("geohash", '>=', range.lower)
    .where("geohash", '<=', range.upper)
    .where("eventMode", "==", eventMode)
    .where("eventcategory", "==", eventcategory)
    .onSnapshot(querySnapshot => {
      let events = []
      
      if(querySnapshot) {
        querySnapshot.forEach(documentSnapshot => {
          events.push({
            ...documentSnapshot.data(),
            eventId : documentSnapshot.id,
          })
        })
      }
      // console.log("Events : ", events);
      setData(events);
      setLoading(false);
      console.log("Events Size : ", events.length)
      console.log("Events : ", events);
      console.log('Event Category : ', eventcategory);
      console.log('Event Mode : ', eventMode);
    }, (error) => console.log(error))

    return () => subscriber();

    */
    
  }, [distance, eventMode, eventcategory]);


  const Item = (props) => {
    const dateVal = moment(props.item.date.toDate()).format("DD/MM/YYYY")
    return (
        <TouchableNativeFeedback onPress={() => navigation.navigate('EventDetailScreen', {...props.item})} >
            <View style={styles.itemStyle} >

                <View style={{padding:15, backgroundColor:'#d1f3f5', }} >
                    
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
                        <Image 
                            source={{uri:props.item.thumbnailURL}} 
                            resizeMode="cover" 
                            style={styles.imageStyle}
                        /> 
                </View>

            </View>
        </TouchableNativeFeedback>
    );
  };

  if(loading) {
    return <ActivityIndicator style={styles.activityIndicatorStyle} />
  }


  return (
    <View style={styles.container}>
      <View style= {styles.header}>
          <Text style={styles.htext} >Find Events</Text>

          <FilterButtons
            eventcategory = {eventcategory}
            setEventcategory = {setEventcategory}
            distance = {distance}
            setDistance = {setDistance}
            eventMode = {eventMode}
            setEventMode = {setEventMode}
          />
          
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
  },
  itemSeparatorStyle:{
    height: 1,
    width: "90%",
    alignSelf: "center",
    backgroundColor: "#D3D3D3",
  },
  selectLabelTextStyle: {
      color: "#000",
      textAlign: "left",
      width: "99%",
      padding: 10,
      flexDirection: "row"
  },
  placeHolderTextStyle: {
      color: "#D3D3D3",
      padding: 10,
      textAlign: "left",
      width: "99%",
      flexDirection: "row"
  },
  dropDownImageStyle: {
      marginLeft: 10,
      width: 10,
      height: 10,
      alignSelf: "center"
  },
  listTextViewStyle: {
      color: "#000",
      marginVertical: 10,
      flex: 0.9,
      marginLeft: 20,
      marginHorizontal: 10,
      textAlign: "left"
  },
  pickerStyle: {
      marginLeft: 18,
      elevation:3,
      paddingRight: 25,
      marginRight: 10,
      marginBottom: 2,
      shadowOpacity: 1.0,
      shadowOffset: {
          width: 1,
          height: 1
      },
      borderWidth:1,
      shadowRadius: 10,
      backgroundColor: "rgba(255,255,255,1)",
      shadowColor: "#d3d3d3",
      borderRadius: 5,
      flexDirection: "row"
  },
  activityIndicatorStyle :  {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  },
  itemStyle : {
    marginVertical:20, 
    marginHorizontal:15, 
    borderRadius:15,  
    backgroundColor:'#ced6e0', 
    elevation:15
  },
  imageStyle : {
    flex:1,
    alignSelf:'stretch',
    borderBottomLeftRadius:15,
    borderBottomRightRadius:15, 
  }

});


export default EventScreen;