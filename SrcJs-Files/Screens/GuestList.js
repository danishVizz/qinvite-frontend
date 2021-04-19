import React, { Component } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Image, View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native'

import Trans from '../Translation/translation'
import ConversationComp from '../Components/ConversationComp';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComp2 from '../Components/HeaderComp2';
import { StatusBar } from 'expo-status-bar';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ContactsComp from '../Components/ContactsComp';
import ApiCalls from "../Services/ApiCalls";
import Keys from "../Constants/keys";
import Prefs from "../Prefs/Prefs";

export default class GuestList extends Component {

    state = {
        ContactsList: [{"name": "Haroon Shaukat", "status": false}, {"name": "Mubashir Mobi", "status": true}, {"name": "Haroon Iqbal", "status": false}],
        isChecked: [],
        selectedLists: [],
        catdata: {}
    }
    render() {

        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: mycolor.white }}>
                <StatusBar
                    backgroundColor='#F54260'
                />
                <HeaderComp2
                    // textfonts={'bold'}
                    // righttitle={Trans.translate('Resend')}
                    titlepos={'center'}
                    leftBtnClicked={() => navigation.goBack()}
                    title={Trans.translate('guestlist')}
                    // righttitle={Trans.translate('Save')}
                    // righttextfonts={'bold'}
                    // rightBtnClicked={() => this.CreateCategoryCall()}
                    leftBtn={require('../../assets/icon_back.png')}></HeaderComp2>

                <FlatList
                    data={this.state.ContactsList}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} />


            </SafeAreaView>

        );
    }

    renderItem({ item, index, props }) {
        return (
            <View style={{ backgroundColor: item.isSelected ? '#DDD' : '#FFF', paddingLeft: 20, paddingRight: 20 }}>
                <View style={{ flexDirection: 'row', height: 60, alignItems: 'center' }}>
                    <Image resizeMode='cover' style={{ height: 40, width: 40, borderRadius: 20, backgroundColor: 'gray' }} source={require('../../assets/icon_lady.png')}></Image>
                    <View style={{ flexDirection: 'row', marginLeft: 15, flex: 1, height: 60, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: mycolor.lightgray }}>
                        <Text style={{ fontSize: 14 }}>{item.name}</Text>

                        <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => this.actionOnRow(index)}>
                            {(item.status == true) ?
                                <View style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image resizeMode='cover' style={{ height: 12, width: 12 }} source={require('../../assets/green_tick.png')}></Image>
                                </View>
                                :
                                <Text style={{ fontSize: 12, color: mycolor.pink }}>{Trans.translate('check_in')}</Text>

                            }
                        </TouchableOpacity>

                        {/* <Divider></Divider> */}
                    </View>
                </View>
            </View>
        );
    };

    actionOnRow(index) {
        console.log('good');
        var list = this.state.ContactsList;
        list[index].status = !(list[index].status);
        this.setState({ContactsList: list});
    }

    componentDidMount() {
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        height: 60,
        backgroundColor: '#03A9F4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingTest: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    list: {
        margin: 5,
        backgroundColor: 'white',
        height: 80,
        justifyContent: 'space-around',
        paddingLeft: 10,
        elevation: 1
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 40,
        color: 'white'
    }
});
;

