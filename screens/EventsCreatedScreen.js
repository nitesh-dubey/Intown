import React, {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableNativeFeedback, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import { ActivityIndicator } from 'react-native-paper';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';

const EventsCreatedScreen = () => {
    const [loading, setLoading] = useState(true);
    const [eventsList, setEventsList] = useState([]);
    const {user} = useContext(AuthContext);
    const userId = user.uid;
    const navigation = useNavigation();

    useEffect(() => {
        const subscriber = firestore()
        .collection('Events')
        .where("createdBy", "==", userId)
        .onSnapshot(querySnapshot => {
            let events = []

            if(querySnapshot) {
                querySnapshot.forEach(documentSnapShot => {
                    events.push({
                        ...documentSnapShot.data(),
                        eventId : documentSnapShot.id,
                    })
                })
            }
            setEventsList(events);
            setLoading(false);
        })
        return () => subscriber();
    }, [])


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



    if(loading) return <ActivityIndicator style={styles.activityIndicatorStyle}/>

    return (
        <View style={styles.container}>
            <FlatList
                style={{width : '100%'}}
                data={eventsList}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <Item item={item} />}
                keyExtractor={(item) => item.eventId}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#f1f2f6'
    },
    activityIndicatorStyle : {
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
})

export default EventsCreatedScreen;