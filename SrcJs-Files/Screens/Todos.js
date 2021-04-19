


import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import Keys from '../Constants/keys'
import EventDetailsComp from '../Components/EventDetailsComp'
import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation';
import HeaderComp2 from '../Components/HeaderComp2';
import { SafeAreaView } from 'react-native';

export default class Todos extends Component {
    state = {
        imagedatadstatus: '',
        categoriestatus: ''
    }
    render() {

        return (
            <SafeAreaView>
                <HeaderComp2 textfonts={'bold'} fromleft={10} title={Trans.translate('todos')} textfonts={'normal'} textsize={16} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white' leftBtnClicked={() => this.props.navigation.goBack()} />

                <View style={styles.container}>

                    <EventDetailsComp
                        Onpress={() => this.props.navigation.navigate('Designer')}
                        mainviewstyle={{ backgroundColor: this.state.imagedatadstatus == undefined ? mycolor.offPink : "#C5FFE6", height: 120, borderWidth: 1, borderRadius: 8, borderColor: '#F54260', alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}
                        imagestyle={{ height: 56, width: 69, marginLeft: 30, flex: 3, alignSelf: 'center' }}
                        title={Trans.translate('invite_design')}
                        containerStyle={{ justifyContent: "center" }}
                        titlestyle={{ alignItems: 'center', marginLeft: 10, flexDirection: 'column', alignItems: 'center', fontSize: 22, fontWeight: 'bold', color: mycolor.pink }}
                        lefticon={require('../../assets/icon_cards.png')}
                    ></EventDetailsComp>

                    <EventDetailsComp
                        Onpress={() => this.props.navigation.navigate('ChooseCategory')}
                        mainviewstyle={{ backgroundColor: this.state.imagedatadstatus == undefined ? mycolor.offPink : "#C5FFE6", height: 120, borderWidth: 1, borderRadius: 8, borderColor: '#F54260' }}
                        imagestyle={{ height: 56, width: 69, marginLeft: 30, flex: 3, alignSelf: 'center' }}
                        title={Trans.translate('guestlist')}
                        containerStyle={{ justifyContent: "center" }}
                        titlestyle={{ marginLeft: 10, fontSize: 22, fontWeight: 'bold', color: mycolor.pink }}
                        lefticon={require('../../assets/icon_friends.png')}
                    ></EventDetailsComp>

                </View>
            </SafeAreaView>
        );


    }

    componentDidMount() {
        console.log("Working")
        this.setState({ imagedatadstatus: Keys.invitealldata["ImageData"], categoriestatus: Keys.invitealldata["CategoriesData"] }, () => console.log(this.state.imagedatadstatus))
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,

    }
});