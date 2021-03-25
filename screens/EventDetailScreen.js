import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity , ScrollView, Linking} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Communications from 'react-native-communications';
import moment from 'moment';

//width, height
class EventDetailScreen extends Component {
    render() {
       // const { params } = this.props.navigation.state;
        const phone_icon = <Icon style={{paddingRight:5}} name="phone" size={20} color="black" />;
        const register_icon = <Icon style={{paddingRight:5}} name="user-plus" size={20} color="black" />;
        const email_icon = <Icon style={{paddingRight:5}} name="envelope-square" size={20} color="black" />;
        const map_icon = <Icon style={{paddingRight:5}} name="map-signs" size={20} color="black" />;
        const { params } = this.props.route;
        const eventName = params ? params.eventcategory : null;
       // const name = navigation.getParam('eventName') || '';
        return(
            <View style={styles.container}>
                <View style={{height:100, width:'100%', alignSelf:'center' }} >
                       <Image source={{uri:params.thumbnailURL}} resizeMode="contain" style={{borderRadius:12, flex:1,alignSelf:'stretch', width:'100%', height:'100%', }} />
                </View>
                <View style={{marginVertical:10}} >
                         <Text style={{fontSize:24, fontWeight:'bold',color:'black'}} >{params.eventcategory}</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:8, alignItems:'baseline'}} >
                        <View style={{flexDirection:'row', alignItems:'baseline' }} >
                                <Text style={{fontSize:18, fontWeight:'bold',color:'brown'}} >Max_Attendes: </Text>
                                <Text style={{fontSize:18, fontWeight:'bold'}} >{params.maxAttendees}</Text>
                        </View>
                        {/* <Text style={{fontSize:16, fontWeight:'bold'}} >{params.time}</Text> */}
                  </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:8, alignItems:'baseline'}} >
                        <View style={{flexDirection:'row', alignItems:'baseline' }} >
                                <Text style={{fontSize:18, fontWeight:'bold',color:'brown'}} >Type: </Text>
                                <Text style={{fontSize:18, fontWeight:'bold'}} >{params.eventcategory}</Text>
                        </View>
                        <Text style={{fontSize:16, fontWeight:'bold'}} >{moment(params.date.toDate()).format("DD/MM/YYYY")}</Text>
                  </View>
                         <View>
                                {
                                    params.venue !== null &&  
                                    <TouchableOpacity style={{elevation:9, flexDirection:'row', padding:12,borderRadius:6, backgroundColor:"#97d381"}}  onPress={() => console.log("dummy_map")} >
                                        {map_icon}
                                    <Text style={{color:'black', fontSize:15}} >{params.venue}</Text>
                                    </TouchableOpacity>
                                }

                        </View>
                         <View>
                                {
                                    params.contactPhone !== null &&  
                                    <TouchableOpacity style={{elevation:9, flexDirection:'row', padding:12,borderRadius:6, backgroundColor:"#97d381"}}  onPress={() => Communications.phonecall(params.contactPhone, true)} >
                                        {phone_icon}
                                    <Text style={{color:'black', fontSize:15}} >Contact Organizer</Text>
                                    </TouchableOpacity>
                                }

                        </View>
                        
                        {/* <View>
                           {  
                                   params.form !== null &&                  
                                   <TouchableOpacity style={{elevation:9, flexDirection:'row', padding:12,borderRadius:6, backgroundColor:"#97d381"}}  onPress={() => Linking.openURL(params.form)} >
                                    {register_icon}
                                    <Text style={{color:'black',fontSize:15 }} >Register</Text>
                                  </TouchableOpacity> 
                           }
                         </View> */}
                         <View>
                           {  
                                   params.form == null &&                  
                                   <TouchableOpacity style={{elevation:9, flexDirection:'row', padding:12,borderRadius:6, backgroundColor:"#97d381"}}  onPress={() => alert("Registration Yet to open")} >
                                    {register_icon}
                                    <Text style={{color:'black',fontSize:15 }} >Register</Text>
                                  </TouchableOpacity> 
                           }
                         </View>
                         <View>
                           {  
                                  // params.form == null &&                  
                                   <TouchableOpacity style={{elevation:9, flexDirection:'row', padding:12,borderRadius:6, backgroundColor:"#97d381"}}  onPress={() => Communications.email(params.contactEmail, null, null, null, null)} >
                                    {email_icon}
                                    <Text style={{color:'black',fontSize:15 }} >{params.contactEmail}</Text>
                                  </TouchableOpacity> 
                           }
                         </View>
                         <ScrollView style={{marginTop:5, elevation:6}}  showsHorizontalScrollIndicator={false} >
                        <View style={{marginTop:5}} > 
                                   
                                    <Text style={{marginVertical:5,lineHeight:23, fontSize:20,fontWeight:'bold',color:'brown'}} >Event Details: </Text>
                                    <Text style={{lineHeight:23, fontSize:20}} >{params.description} </Text>
                        </View>
                 </ScrollView>
            </View>
        );
   }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop:8,
        margin:10
       
        
    },
});

//make this component available to the app
export default EventDetailScreen;
