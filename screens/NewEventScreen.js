import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import RNPicker from "rn-modal-picker";
import DatePicker from 'react-native-date-picker';
import { Input, Icon } from 'react-native-elements';

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
    
    const [date, setDate] = useState(new Date());
    const [time, setTime] = useState(new Date());
    const [eventDescription, setEventDescription] = useState("");
    const [contactEmail, setContactEmail] = useState("");
    const [contactPhone, setContactPhone] = useState(0);
    const [maxAttendees, setMaxAttendees] = useState(0);

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
                    date={date}
                    mode="date"
                    onDateChange={setDate}
                />
            </View>

            <View style={styles.timePickerStyle}>
                <DatePicker 
                    date={date}
                    mode="time"
                    onDateChange={setTime}
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
    }
});