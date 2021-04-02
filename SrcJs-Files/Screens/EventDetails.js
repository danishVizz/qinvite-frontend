import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mycolor from '../Constants/Colors';
import EventDetailsComp from '../Components/EventDetailsComp'
import CircleImageComp from '../Components/CircleImageComp'
import Translation from '../Translation/translation'
import { TouchableOpacity } from 'react-native-gesture-handler';
export default class EventDetails extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.imagecontainer}>
                    <Image source={require('../../assets/logo.png')} style={{ resizeMode: 'center' }}></Image>
                </View>
                <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 24, fontWeight: 'normal', color: mycolor.darkgray }}>Joyce S. Bell Wedding</Text>

                <View style={styles.innercontainer}>
                    <EventDetailsComp lefticon={require('../../assets/icon_eventday.png')} title="Tue 15 Mar,2021" description="05:00 PM - 06:00 PM"></EventDetailsComp>
                    <EventDetailsComp lefticon={require('../../assets/icon_location.png')} title="Tue 15 Mar,2021" description="523 Pinewood Drive Park Ridge, IL 60068"></EventDetailsComp>
                    <EventDetailsComp lefticon={require('../../assets/icon_pricetag.png')} title="Tue 15 Mar,2021" description="Contains 800-1000 Invitation Cards and it costs 9000 QR"></EventDetailsComp>
                </View>
                <TouchableOpacity>
                    <Text style={{ marginLeft: 20,marginTop:19, marginRight: 20, fontSize: 14, fontWeight: 'bold', color: mycolor.darkgray}}>{Translation.translate('Participants')}</Text>
                    <View style={styles.participant}>

                        <CircleImageComp imagesrc={require('../../assets/icon_avatar.jpg')} style={{marginLeft:10}}></CircleImageComp>
                        <CircleImageComp imagesrc={require('../../assets/icon_avatar.jpg')} style={{marginLeft:-15}}></CircleImageComp>
                        <CircleImageComp imagesrc={require('../../assets/icon_avatar.jpg')} style={{marginLeft:-15}}></CircleImageComp>
                <Text style={{marginLeft:20,fontSize:12,flex:1}}> Participants </Text>
            
                <Image source={require('../../assets/icon_arrowright.png')} style={{height:15,width:15,marginRight:10}} resizeMode='contain'></Image>
                    </View>
                </TouchableOpacity>
               

            </SafeAreaView>

        );
    }
}
const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imagecontainer: {
        flex: 0,
        marginTop: 0,
        marginLeft: 20, marginRight: 20, marginBottom: 20,
        borderWidth: 1,
        borderColor: mycolor.lightgray,
        borderRadius: 5,
        flexDirection: 'column'
    },
    innercontainer: {
        marginTop: 24,
        margin: 20,
        flexDirection: 'column'
    },
    participant: {
        flexDirection: 'row',
        alignItems:'center',
        height: 60, marginTop: 10, marginBottom: 30, marginLeft: 35, marginRight: 35, borderColor: mycolor.lightgray, borderRadius: 5, borderWidth: 0.5, backgroundColor: '#FCFCFC'
    },
});