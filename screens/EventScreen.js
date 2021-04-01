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

import {Button} from 'react-native-elements'
import RNPicker from "rn-modal-picker";

import firestore from '@react-native-firebase/firestore';
import moment from 'moment';
//import geohash from "ngeohash";
import Geolocation from 'react-native-geolocation-service';

import FormButton from '../components/FormButton';
import {AuthContext} from '../navigation/AuthProvider';

//width, height
import {windowWidth, windowHeight} from '../utils/Dimensions';

//dummy data
// import eventsData from '../data/db';
// import eventsData from '../data/eventsData.json';

//Locations Functions
import {requestLocationPermission, getGeoHashRange} from '../utils/LocationFunctions';


const FilterButtons = (props) => {

  //Filter Data
  const categoryData = [
    {id : 1, name : 'Shopping'},
    {id : 2, name : 'Tech'},
    {id : 3, name : 'Concert'},
    {id : 4, name : 'Business'},
    {id : 5, name : 'Meetup'},
    {id : 6, name : 'Party'},
    {id : 7, name : 'Sports'},
    {id : 8, name : 'Comedy'},
    {id : 9, name : 'Cultural'},
    {id  : 10, name : 'Health'},
  ];

  const eventModeData = [
    {id : 1, name : 'Online'},
    {id : 2, name : 'Offline'},
  ]

  const distanceData = [
    {id : 1, name : 5},
    {id : 2, name : 10},
    {id : 3, name : 15},
    {id : 4, name : 20},
    {id : 5, name : 50},

  ]

  return (
    <View style={{}}>
      <RNPicker
        dataSource={categoryData}
        dummyDataSource={categoryData}
        defaultValue={true}
        disablePicker={false}
        changeAnimation={"none"}
        searchBarPlaceHolder={"Search....."}
        showPickerTitle={true}
        pickerStyle={styles.pickerStyle}
        itemSeparatorStyle={styles.itemSeparatorStyle}
        pickerItemTextStyle={styles.listTextViewStyle}
        selectedLabel={props.eventcategory}
        placeHolderLabel="Category"
        selectLabelTextStyle={styles.selectLabelTextStyle}
        placeHolderTextStyle={styles.placeHolderTextStyle}
        dropDownImageStyle={styles.dropDownImageStyle}
        dropDownImage={require("../assets/ic_drop_down.png")}
        selectedValue={(index, item) => props.setEventcategory(item.name)}
      />

      <RNPicker
        dataSource={eventModeData}
        dummyDataSource={eventModeData}
        defaultValue={true}
        disablePicker={false}
        changeAnimation={"none"}
        searchBarPlaceHolder={"Search....."}
        showPickerTitle={true}
        pickerStyle={styles.pickerStyle}
        itemSeparatorStyle={styles.itemSeparatorStyle}
        pickerItemTextStyle={styles.listTextViewStyle}
        selectedLabel={props.eventMode}
        placeHolderLabel="Mode"
        selectLabelTextStyle={styles.selectLabelTextStyle}
        placeHolderTextStyle={styles.placeHolderTextStyle}
        dropDownImageStyle={styles.dropDownImageStyle}
        dropDownImage={require("../assets/ic_drop_down.png")}
        selectedValue={(index, item) => props.setEventMode(item.name)}
      />

      <RNPicker
        dataSource={distanceData}
        dummyDataSource={distanceData}
        defaultValue={true}
        disablePicker={false}
        changeAnimation={"none"}
        searchBarPlaceHolder={"Search....."}
        showPickerTitle={true}
        pickerStyle={styles.pickerStyle}
        itemSeparatorStyle={styles.itemSeparatorStyle}
        pickerItemTextStyle={styles.listTextViewStyle}
        selectedLabel={props.distance}
        placeHolderLabel="Distance"
        selectLabelTextStyle={styles.selectLabelTextStyle}
        placeHolderTextStyle={styles.placeHolderTextStyle}
        dropDownImageStyle={styles.dropDownImageStyle}
        dropDownImage={require("../assets/ic_drop_down.png")}
        selectedValue={(index, item) => props.setDistance(item.name)}
      />
    </View>

    
  )
}

const EventScreen = () => {
  const navigation = useNavigation();
  //const [data, setData] = useState(eventsData);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([])

  const [lat, setLat] = useState();
  const [long, setLong] = useState();

  const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);
  const [distance, setDistance] = useState(5); //Distance from current position in miles
  const [eventcategory, setEventcategory] = useState("Comedy");
  const [eventMode, setEventMode] = useState("Offline");

  


  useEffect(() => {


    /*
    
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
                          events.push({
                            ...documentSnapshot.data(),
                            eventId : documentSnapshot.id,
                          })
                        })
                      }
                      console.log("Events : ", events);
                      console.log("Snapshots : ", querySnapshot);
                      setData(events);
                      setLoading(false);
                    })
              },
              error => alert(error.message)
          );
      })

      return () => subscriber ? subscriber() : null;

      */
    

    
    const subscriber = firestore()
    .collection('Events')
    .where("eventcategory", "==", eventcategory)
    .where("eventMode", "==", eventMode)
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

    
  }, [distance, eventMode, eventcategory]);


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

});


export default EventScreen;