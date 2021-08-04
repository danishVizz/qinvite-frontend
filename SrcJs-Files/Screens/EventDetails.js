import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mycolor from '../Constants/Colors';
import EventDetailsComp from '../Components/EventDetailsComp'
import CircleImageComp from '../Components/CircleImageComp'
import StatusBarComp from '../Components/StatusBarComp';
import Translation from '../Translation/translation'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import HeaderComp2 from '../Components/HeaderComp2';
import ButtonComp from '../Components/ButtonComp';
import Trans from '../Translation/translation';
import Video from 'react-native-video';
export default class EventDetails extends Component {

    constructor(props) {
        super(props)
        let eventdata = this.props.route.params.eventdata ?? []
        this.uriArr = eventdata.event_card.split('.')
        this.ext = this.uriArr[this.uriArr.length - 1].toLowerCase()
        this.type = 'photo'
        if (this.ext == 'mp4' || this.ext == 'mov') {
            this.type = 'video'
        }
    }

    state = {
        eventdata: []
    }

    render() {

        var eventdata = this.props.route.params.eventdata ?? []
        console.log("eventdata")
        console.log(eventdata)
        console.log("eventdata.package_details")
        console.log(eventdata.package_details)
        console.log("eventdata.package_details.package_name")
        console.log(eventdata.package_details.package_name)
        return (
            <View style={styles.container}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp2 leftBtnClicked={() => this.props.navigation.goBack()} alignSelf='center' textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={Trans.translate('EventDetails')} titlepos='center' ></HeaderComp2>
                {/* <StatusBar
                    backgroundColor='#F54260'
                /> */}
                <ScrollView>
                    {/* <View style={styles.imagecontainer}>
                        {this.type == 'photo' && <Image style={{ height: 200, width: 300 }} source={eventdata.event_card == "" ? require('../../assets/logo.png') : { uri: eventdata.event_card }} resizeMode='contain'></Image>}
                        {this.type == 'video' && <Video source={{ uri: eventdata.event_card }}   // Can be a URL or a local file.
                            ref={(ref) => { this.player = ref }}     // Store reference
                            onBuffer={this.onBuffer}                // Callback when remote video is buffering
                            onError={this.videoError}
                            controls={true}                   // Callback when video cannot be loaded
                            style={styles.backgroundVideo} />}
                    </View> */}
                    <Text style={{ fontSize: 25, margin: 20, alignSelf: 'center', fontWeight: 'bold', color: 'black' }}>{eventdata.package_details != undefined && eventdata.package_details.package_name}</Text>
                    <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 24, fontWeight: 'normal', color: mycolor.darkgray }}>{eventdata.event_name}</Text>
                    <View style={styles.innercontainer}>
                        <EventDetailsComp lefticon={require('../../assets/icon_eventday.png')} title={eventdata.event_date} description=""></EventDetailsComp>
                        <EventDetailsComp lefticon={require('../../assets/icon_location.png')} title={eventdata.event_address} description=""></EventDetailsComp>
                        <EventDetailsComp lefticon={require('../../assets/icon_pricetag.png')} title={eventdata.package_details == undefined ? " " : eventdata.package_details.package_name} description={`Contains ${eventdata.package_details != undefined && eventdata.package_details.package_people} Invitation Cards and it costs ${eventdata.package_details != undefined && eventdata.package_details.package_price} QR`}></EventDetailsComp>
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

                    {eventdata.package_details != undefined && eventdata.payment_status != 3 && <View>
                        <Text style={{ paddingHorizontal: 30, textAlign: 'center', color: 'red', fontWeight: '700' }}>{Trans.translate('no_payment_msg')}</Text>
                        <Button title={Trans.translate('pay_now')} onPress={() => this.props.navigation.navigate("Payment", { "event_data": eventdata, "Type": "new" })} />
                    </View>}

                    {eventdata.participants.length > 0 && <View style={{ width: '100%', alignItems: 'center', marginBottom: 50 }}>
                        <ButtonComp
                            style={{ width: '70%' }}
                            textstyle={{ color: 'white' }}
                            text={Trans.translate('Savepdf')}
                            onPress={() => this.props.navigation.navigate('CategoryList', { categories: this.props.route.params.eventdata.categories })}
                        ></ButtonComp>
                    </View>}

                </ScrollView>
            </View>
        );
    }

    onBuffer() {
        console.log("BUFFERING")
    }

    videoError(error) {
        console.log("VIDEO ERRROR")
        console.log(error)
    }

    componentDidMount() {
        console.log("CategoryList");
        console.log(this.props.route.params.eventdata.categories)
    }

    Participantsdetail(eventdata) {
        console.log(eventdata.receptionists)
        // this.props.navigation.navigate('ContactListing', { 'Participants': eventdata.participants })
        this.props.navigation.navigate('ContactListing', { 'Eventdata': eventdata })
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
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: mycolor.lightgray,
        borderRadius: 5,
        // alignSelf: 'center',
        // flexDirection: 'column'
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
    backgroundVideo: {
        // position: 'absolute',
        height: 300,
        width: '100%',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: mycolor.lightgray,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});