import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mycolor from '../Constants/Colors';
import EventDetailsComp from '../Components/EventDetailsComp'
import CircleImageComp from '../Components/CircleImageComp'
import StatusBarComp from '../Components/StatusBarComp';
import Translation from '../Translation/translation'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderComp2 from '../Components/HeaderComp2';
import Trans from '../Translation/translation';

export default class EventDetails extends Component {

    state = {
        eventdata: []
    }

    render() {

        var eventdata = this.props.route.params.eventdata ?? []

        return (
            <View style={styles.container}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp2 leftBtnClicked={() => this.props.navigation.goBack()} alignSelf='center' textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={Trans.translate('EventDetails')} titlepos='center' ></HeaderComp2>
                {/* <StatusBar
                    backgroundColor='#F54260'
                /> */}
                <ScrollView>
                    


                    <View style={styles.imagecontainer}>
                        <Image style={{ height: 200, width: 300 }} source={eventdata.event_card == "" ? require('../../assets/logo.png') : { uri: eventdata.event_card }} resizeMode='contain'></Image>
                    </View>

                    <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 24, fontWeight: 'normal', color: mycolor.darkgray }}>{eventdata.event_name}</Text>

                    <View style={styles.innercontainer}>

                        <EventDetailsComp lefticon={require('../../assets/icon_eventday.png')} title={eventdata.event_date} description=""></EventDetailsComp>
                        <EventDetailsComp lefticon={require('../../assets/icon_location.png')} title={eventdata.event_address} description=""></EventDetailsComp>
                        <EventDetailsComp lefticon={require('../../assets/icon_pricetag.png')} title={eventdata.package_details.package_name === 'undefined' ? " " : eventdata.package_details.package_name} description={`Contains ${eventdata.package_details.package_people} Invitation Cards and it costs ${eventdata.package_details.package_price} QR`}></EventDetailsComp>

                    </View>

                    <TouchableOpacity onPress={() => this.Participantsdetail(eventdata)}>

                        <Text style={{ marginLeft: 20, marginTop: 19, marginRight: 20, fontSize: 14, fontWeight: 'bold', color: mycolor.darkgray }}>{Translation.translate('Participants')} </Text>

                        <View style={styles.participant}>

                            <CircleImageComp imagesrc={require('../../assets/icon_avatar.jpg')} style={{ marginLeft: 10 }}></CircleImageComp>

                            <CircleImageComp imagesrc={require('../../assets/icon_avatar.jpg')} style={{ marginLeft: -15 }}></CircleImageComp>

                            <CircleImageComp imagesrc={require('../../assets/icon_avatar.jpg')} style={{ marginLeft: -15 }}></CircleImageComp>

                            <Text style={{ marginLeft: 20, fontSize: 12, flex: 1 }}> {`${eventdata.participants.length} Invited`} </Text>

                            <Image source={require('../../assets/icon_arrowright.png')} style={{ height: 15, width: 15, marginRight: 10 }} resizeMode='contain'></Image>

                        </View>
                    </TouchableOpacity>
                </ScrollView>
            </View>
        );
    }
    Participantsdetail(eventdata) {
        console.log(eventdata.receptionists)
        this.props.navigation.navigate('ContactListing', { 'Participants': eventdata.participants })
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imagecontainer: {

        marginTop: 10,
        marginLeft: 20, marginRight: 20, marginBottom: 20,
        borderWidth: 1,
  
        borderColor: mycolor.lightgray,
        borderRadius: 5,
        alignSelf: 'center',
        flexDirection: 'column'
    },
    innercontainer: {
        marginTop: 24,
        margin: 20,
        flexDirection: 'column'
    },
    participant: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 60, marginTop: 10, marginBottom: 30, marginLeft: 35, marginRight: 35, borderColor: mycolor.lightgray, borderRadius: 5, borderWidth: 0.5, backgroundColor: '#FCFCFC'
    },
});