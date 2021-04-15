import React, {useState, useEffect, useContext} from 'react';
import {View, Text, FlatList, StyleSheet, TouchableNativeFeedback, Image} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';
import { ActivityIndicator } from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

import EventCard from '../components/EventCard';

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



    if(loading) return <ActivityIndicator style={styles.activityIndicatorStyle}/>

    return (
        <View style={styles.container}>
            <FlatList
                style={{width : '100%'}}
                data={eventsList}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => <EventCard item={item} />}
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
})

export default EventsCreatedScreen;