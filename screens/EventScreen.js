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

import EventCard from '../components/EventCard';


import firestore from '@react-native-firebase/firestore';

//React native geolocation service
import Geolocation from 'react-native-geolocation-service';

//Haversine formula is used to calculate distance between 2 lat-langs on earth.
//It takes into consideration the curvature of earth.
import haversine from 'haversine';

import FilterButtons from '../components/FilterButtons';


//Location Related Functions
import {requestLocationPermission, getGeoHashRange} from '../utils/LocationFunctions';


const EventScreen = () => {
  const navigation = useNavigation();
  
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])


  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);
  const [distance, setDistance] = useState(2); //Distance from current position in miles
  const [eventcategory, setEventcategory] = useState("Tech");
  const [eventMode, setEventMode] = useState("Offline");

  
  //used to fetch events data from firestore based on filters and location
  //and that data is displayed in EventCard
  useEffect(() => {

    
    let subscriber = undefined;

    requestLocationPermission(isLocationPermissionGranted, setIsLocationPermissionGranted)
    .then(() => {
        Geolocation.getCurrentPosition(
            pos => {
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
    
  }, [distance, eventMode, eventcategory]);


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
        renderItem={({item}) => <EventCard item={item} />}
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

});


export default EventScreen;