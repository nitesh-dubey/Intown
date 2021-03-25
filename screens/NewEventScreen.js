import React, {useState, useEffect, useContext} from 'react';
import {Text, View, StyleSheet, ScrollView, PermissionsAndroid} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import RNPicker from "rn-modal-picker";
import DatePicker from 'react-native-date-picker';
//import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Input, Icon, Button, Overlay } from 'react-native-elements';
import {AuthContext} from '../navigation/AuthProvider';

// import Geolocation from "@react-native-community/geolocation";
import Geolocation from 'react-native-geolocation-service';
import geohash from 'ngeohash';

import firestore from '@react-native-firebase/firestore';

import {requestLocationPermission} from '../utils/requestLocationPermission';

//Importing thumbnail data
import ThumbnailURL from '../data/thumbnailUrl.json';



const NewEventScreen = () => {
    const [eventCategory, setEventCategory] = useState('');
    const [categoryData, setCategoryData] = useState([
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
    ]);
    
    const [dateTime, setDateTime] = useState(new Date());
    // const [time, setTime] = useState(new Date());
    const [eventDescription, setEventDescription] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState(0);
    const [maxAttendees, setMaxAttendees] = useState(0);
    const [lat, setLat] = useState(null);
    const [long, setLong] = useState(null);
    const {user} = useContext(AuthContext);
    const [venue, setVenue] = useState("");
    const [eventMode, setEventMode] = useState()

    const navigation = useNavigation();

    const eventModeData = [
        {id : 1, name : 'Offline'},
        {id : 2, name : 'Online'},
    ]


    //checking for location permission
    const [isLocationPermissionGranted, setIsLocationPermissionGranted] = useState(false);
    
    
    //under construction
    const getCurrentPosition = () => {
        if(isLocationPermissionGranted) {
            Geolocation.getCurrentPosition(
                pos => {
                    setLat(pos.coords.latitude);
                    setLong(pos.coords.longitude);

                },
                error => alert(error.message),
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
            );
        }
        else {
            requestLocationPermission(isLocationPermissionGranted, setIsLocationPermissionGranted)
            .then(() => {
                Geolocation.getCurrentPosition(
                    pos => {
                        setLat(pos.coords.latitude);
                        setLong(pos.coords.longitude);               
                    },
                    error => alert(error.message)
                );
            })
        }
    };




    const addToDatabase = () => {

        let db = firestore();
        const hash = geohash.encode(lat, long);

        db.collection('Events')
            .add({
                eventcategory : eventCategory,
                eventMode : eventMode,
                venue : venue,
                latitude : lat,
                longitude : long,
                geohash : hash,
                contactEmail : contactEmail,
                contactPhone : contactPhone,
                createdBy : user.uid,
                date : dateTime,
                description : eventDescription,
                maxAttendees : maxAttendees,
                likesCount : 0,
                CommentsCount : 0,
                thumbnailURL : ThumbnailURL[eventCategory],
            })
            .then(() => {
                return db.collection('Users')
                        .doc(user.uid)
                        .update({
                            eventsCreatedCount : firestore.FieldValue.increment(1)
                        })
            })
            .catch(e => console.warn(e));
        
        navigation.goBack();

    }


    return(
        <ScrollView contentContainerStyle={styles.container}>

            <Text style={styles.textStyle}>Enter The Details</Text>

            <RNPicker
                dataSource={categoryData}
                dummyDataSource={categoryData}
                defaultValue={false}
                disablePicker={false}
                changeAnimation={"none"}
                searchBarPlaceHolder={"Search....."}
                showPickerTitle={true}
                pickerStyle={styles.pickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={eventCategory}
                placeHolderLabel="Choose Event Category"
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={require("../assets/ic_drop_down.png")}
                selectedValue={(index, item) => setEventCategory(item.name)}
            />


            <View style={styles.datePickerStyle}>
                <DatePicker 
                    date={dateTime}
                    mode="date"
                    onDateChange={(val) => {setDateTime(val);}}
                />
            </View>

            <View style={styles.timePickerStyle}>
                <DatePicker 
                    date={dateTime}
                    mode="time"
                    onDateChange={val => {setDateTime(val);}}
                />
            </View>

            
            <Input
                placeholder="Type Event Description..."
                leftIcon={
                    <Icon
                        type="MaterialIcons" 
                        name="short-text"
                        size={24}
                    />
                }
                label="Description"
                maxLength={140}
                inputContainerStyle={{
                    margin : 5,
                }}
                containerStyle={{
                    marginTop : 25,
                }}
                onChangeText={value => setEventDescription(value)}

            />

            <Input
                placeholder="Type Contact Email..."
                leftIcon={
                    <Icon
                        type="MaterialIcons" 
                        name="email"
                        size={24}
                    />
                }
                label="Contact Email"
                maxLength={140}
                inputContainerStyle={{
                    margin : 5,
                }}
                containerStyle={{
                    marginTop : 25,
                }}
                keyboardType="email-address"
                onChangeText={value => setContactEmail(value)}

            />

            <Input
                placeholder="Type contact number..."
                leftIcon={
                    <Icon
                        type="MaterialIcons" 
                        name="phone"
                        size={24}
                    />
                }
                label="Contact Phone"
                maxLength={10}
                inputContainerStyle={{
                    margin : 5,
                }}
                containerStyle={{
                    marginTop : 25,
                }}
                keyboardType="phone-pad"
                onChangeText={value => setContactPhone(value)}

            />

            <Input
                placeholder="Type Maximum attendees..."
                leftIcon={
                    <Icon
                        type="MaterialIcons" 
                        name="person"
                        size={24}
                    />
                }
                label="Maximum Attendees"
                maxLength={10}
                inputContainerStyle={{
                    margin : 5,
                }}
                containerStyle={{
                    marginTop : 25,
                }}
                keyboardType="numeric"
                onChangeText={value => setMaxAttendees(value)}
            />


            <Button
                type='outline'
                title="Use Current Location"
                containerStyle={{
                    marginTop : 25,
                    width : '96%',
                }}
                buttonStyle={{
                    height : 39,
                    borderColor : '#000',
                    borderWidth : 1,
                    borderRadius : 5,
                    elevation : 2,
                }}
                titleStyle={{
                    color : '#000'
                }}
                onPress={getCurrentPosition}
            />


            <Input
                placeholder="Enter Latitude"
                leftIcon={
                    <Icon
                        type="MaterialIcons" 
                        name="location-pin"
                        size={24}
                    />
                }
                label="Latitude"
                maxLength={10}
                inputContainerStyle={{
                    margin : 5,
                }}
                containerStyle={{
                    marginTop : 45,
                }}
                keyboardType="decimal-pad"
                value={lat ? lat.toString() : lat}
                onChangeText={value => setLat(value)}
            />

            <Input
                placeholder="Enter Longitude"
                leftIcon={
                    <Icon
                        type="MaterialIcons" 
                        name="location-pin"
                        size={24}
                    />
                }
                label="Longitude"
                maxLength={10}
                inputContainerStyle={{
                    margin : 5,
                }}
                containerStyle={{
                    marginTop : 25,
                    marginBottom : 20,
                }}
                keyboardType="decimal-pad"
                value={long ? long.toString() : long}
                onChangeText={value => setLong(value)}
            />

            <RNPicker
                dataSource={eventModeData}
                dummyDataSource={eventModeData}
                defaultValue={false}
                disablePicker={false}
                changeAnimation={"none"}
                searchBarPlaceHolder={"Search....."}
                showPickerTitle={true}
                pickerStyle={styles.pickerStyle}
                itemSeparatorStyle={styles.itemSeparatorStyle}
                pickerItemTextStyle={styles.listTextViewStyle}
                selectedLabel={eventMode}
                placeHolderLabel="Choose Event Mode"
                selectLabelTextStyle={styles.selectLabelTextStyle}
                placeHolderTextStyle={styles.placeHolderTextStyle}
                dropDownImageStyle={styles.dropDownImageStyle}
                dropDownImage={require("../assets/ic_drop_down.png")}
                selectedValue={(index, item) => setEventMode(item.name)}
            />

            <Input
                placeholder="Type the Venue (or URL).."
                leftIcon={
                    <Icon
                        type="MaterialIcons" 
                        name="house"
                        size={24}
                    />
                }
                label="Venue"
                maxLength={200}
                inputContainerStyle={{
                    margin : 5,
                }}
                containerStyle={{
                    marginTop : 40,
                }}
                onChangeText={value => setVenue(value)}

            />

            
            <Button
                raised
                title="Create Event"
                type="Solid"
                containerStyle={{
                    marginTop : 20,
                    marginBottom : 20,
                    borderRadius : 20,
                    padding : 10,
                }}
                titleStyle={{
                    color : '#000'
                }}
                onPress={addToDatabase}
            />

        </ScrollView>
    )
};

export default NewEventScreen;

const styles = StyleSheet.create({
    container : {
        flexGrow : 1,
        // justifyContent : 'space-between',
        alignItems : 'center',
        padding : 30,
        backgroundColor : '#fff'
    },
    textStyle : {
        fontSize : 20,
        fontWeight : 'bold',
        marginBottom : 35,
    },
    datePickerStyle : {
        marginTop : 25,
    },
    timePickerStyle : {
        marginTop : 25,
    },
    itemSeparatorStyle:{
        height: 1,
        width: "90%",
        alignSelf: "center",
        backgroundColor: "#D3D3D3"
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
    overlay : {
        height : '90%',
        width : '80%',
        borderRadius : 15,
        alignItems : 'center',
        justifyContent : 'center',
        elevation : 20,
    }
});