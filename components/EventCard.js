import React, {useState, useContext} from 'react';
import {Text, Image, View, StyleSheet, TouchableNativeFeedback} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import {Icon} from 'react-native-elements';
import firestore from '@react-native-firebase/firestore';
import {AuthContext} from '../navigation/AuthProvider';

const EventCard = (props) => {
    const navigation = useNavigation();
    const {user, setUser, likedEventSet, setLikedEventSet} = useContext(AuthContext);
    const [liked, setLiked] = useState(likedEventSet.has(props.item.eventId));
    const [likesNumber, setLikesNumber] = useState(props.item.likesCount);
    const dateVal = moment(props.item.date.toDate()).format("DD/MM/YYYY")

    //Updating the database when like button is pressed.
    const likeButtonPressed = () => {
        let userRef = firestore().collection('Users').doc(user.uid);
        let eventRef = firestore().collection('Events').doc(props.item.eventId);

        if(likedEventSet.has(props.item.eventId)) {
            //Remove Like
            userRef.update({
                likedEventList : firestore.FieldValue.arrayRemove(props.item.eventId),
            })
            .then(() => {
                setUser(prev => {
                    let newLikedEventList = prev.likedEventList.filter(eventId => eventId !== props.item.eventId);
                    let newUserInfo = {
                        uid : prev.uid,
                        name : prev.name,
                        email : prev.email,
                        eventsCreatedCount : prev.eventsCreatedCount,
                        likedEventList : newLikedEventList
                    };
                    return newUserInfo;
                })
                setLikedEventSet(prev => new Set([...prev].filter(eventId => eventId != props.item.eventId)))
                setLiked(prev => !prev);
            })
            .catch(e => console.log(e));

            eventRef.update({
                likesCount : firestore.FieldValue.increment(-1)
            })
            .then(() => {
                setLikesNumber(prev => prev-1);
            })
            .catch(e => console.log(e));

        }
        else {
            //add like
            userRef.update({
                likedEventList : firestore.FieldValue.arrayUnion(props.item.eventId)
            })
            .then(() => {
                setUser(prev => {
                    let newLikedEventList = [...prev.likedEventList, props.item.eventId];
                    let newUserInfo = {
                        uid : prev.uid,
                        name : prev.name,
                        email : prev.email,
                        eventsCreatedCount : prev.eventsCreatedCount,
                        likedEventList : newLikedEventList
                    };
                    return newUserInfo;
                })
                setLikedEventSet(prev => new Set([...prev, props.item.eventId]))
                setLiked(prev => !prev);
            })
            .catch(e => console.log(e));

            eventRef.update({
                likesCount : firestore.FieldValue.increment(1)
            })
            .then(() => {
                setLikesNumber(prev => prev+1);
            })
            .catch(e => console.log(e));
        }
    }

    return (
        <View style={styles.itemStyle} >
            <TouchableNativeFeedback onPress={() => navigation.navigate('EventDetailScreen', {...props.item})} >
                <View>
                    <View style={{padding:15, backgroundColor:'#d1f3f5', }} >
                        
                        <Text style={{ fontSize:24, fontWeight:'bold', }} >{props.item.eventcategory}</Text>
                        <Text style={{ fontSize:18, fontWeight:'900', }} > Max Attendees: {props.item.maxAttendees}</Text>

                        <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:8, alignItems:'baseline'}} >
                            <View style={{flexDirection:'row', alignItems:'baseline' }} >
                                <Text style={{fontSize:16, fontWeight:'bold'}} >Type: </Text>
                                <Text>{props.item.eventcategory}</Text>
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

            <View style={styles.cardFooterStyle}>
                <View style={{flex : 1, alignItems : 'center', justifyContent : 'space-evenly'}}>
                    <Icon 
                        type="font-awesome"
                        name="heart"
                        color={liked ? "red" : "grey"}
                        size={27}
                        onPress={likeButtonPressed}
                    />
                    <Text style={{color : 'red'}}>{likesNumber}</Text>
                </View>
            </View>

        </View>   
    );
};

export default EventCard;


const styles = StyleSheet.create({
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
    },
    cardFooterStyle : {
        height : 55, 
        width : '100%', 
        backgroundColor : 'white', 
        borderBottomLeftRadius : 15, 
        borderBottomRightRadius : 15, 
        elevation : 5,
        justifyContent : 'center',
        alignItems : 'flex-start',
        paddingHorizontal : 15,
        justifyContent : 'center'
    }

})
