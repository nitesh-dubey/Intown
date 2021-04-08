import React from 'react';
import {View, StyleSheet} from 'react-native';
import RNPicker from "rn-modal-picker";

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
      {id : 1, name : '1'},
      {id : 2, name : '2'},
      {id : 3, name : '5'},
      {id : 4, name : '10'},
      {id : 5, name : '15'},
      {id : 6, name : '25'},
      {id : 7, name : '50'},
      {id : 8, name : '100'},
      {id : 9, name : '250'},
      {id : 10, name : '500'},
      {id : 11, name : '1000'},
    ]
  
    return (
      <View>
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
          selectedLabel={props.distance.toString()}
          placeHolderLabel="Distance"
          selectLabelTextStyle={styles.selectLabelTextStyle}
          placeHolderTextStyle={styles.placeHolderTextStyle}
          dropDownImageStyle={styles.dropDownImageStyle}
          dropDownImage={require("../assets/ic_drop_down.png")}
          selectedValue={(index, item) => props.setDistance(parseInt(item.name))}
        />
      </View>
      
    )
  }


  const styles = StyleSheet.create({
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


  export default FilterButtons;