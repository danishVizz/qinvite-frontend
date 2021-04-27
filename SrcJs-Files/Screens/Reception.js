import React, { Component } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Image, View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native'
import ReceptionTabComp from '../Components/ReceptionTabComp'
import Trans from '../Translation/translation'

import { Icon } from "react-native-elements";
import ConversationComp from '../Components/ConversationComp';
import { SafeAreaView } from 'react-native-safe-area-context';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import HeaderComp2 from '../Components/HeaderComp2';
import { StatusBar } from 'expo-status-bar';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native'
import { TextInput, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ContactsComp from '../Components/ContactsComp';
import ApiCalls from "../Services/ApiCalls";
import Keys from "../Constants/keys";
import Prefs from "../Prefs/Prefs";
import CreateEvent from './CreateEvent';
import Events from './Events';
import ScannerScreen from './ScannerScreen';
import GuestList from './GuestList';
// import GuestList from './GuestList';

const Tab = createMaterialBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

const BottomNavigator = (props) => {
    return (
        <ReceptionTabComp navigation={props.navigation}></ReceptionTabComp>
    );
}

export default class Reception extends Component {

    state = {
        ContactsList: [{ "name": "Haroon Shaukat", "status": false }, { "name": "Mubashir Mobi", "status": true }, { "name": "Haroon Iqbal", "status": false }],
        isChecked: [],
        selectedLists: [],
        catdata: {}
    }
    render() {
        return (
            <Tab.Navigator
                activeColor="#F54260"
                inactiveColor="#D9D9D9"
                style={{backgroundColor: 'white'}}
                barStyle={{ backgroundColor: mycolor.white, elevation: 10, height: 70, justifyContent: 'center', marginBottom: 20, marginLeft: 50, marginRight: 50 }}>
                
                <Tab.Screen name="Home" component={ScannerScreen} options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                require('../../assets/qr-code.png')
                            }
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? mycolor.pink : 'gray'
                            }}
                        />
                    )


                }}
                    listeners={({ navigation }) => ({
                        blur: () => navigation.setParams({ screen: undefined }),
                    })}
                />
                {/* <Tab.Screen name="Packages" component={GuestList} options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            resizeMode='contain'
                            source={
                                require('../../assets/guest-list.png')
                            }
                            style={{
                                width: 50,
                                height: 30,
                                tintColor: focused ? mycolor.pink : 'gray'
                            }}
                        />
                    )
                }} /> */}

                <Tab.Screen name="Profile" component={BottomNavigator} options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                require('../../assets/tab-calendar.png')
                            }
                            style={{
                                width: 30,
                                height: 30,
                                tintColor: focused ? mycolor.pink : 'gray'
                            }}
                        />
                    )
                }} />
            </Tab.Navigator>
        );
    }

    renderItem({ item, index, props }) {
        return (
            <View style={{ backgroundColor: item.isSelected ? '#DDD' : '#FFF', paddingLeft: 20, paddingRight: 20 }}>
                <View style={styles.searchView}>
                    <Image resizeMode='cover' style={styles.searchImg} source={require('../../assets/icon_lady.png')}></Image>
                    <View style={{ flexDirection: 'row', marginLeft: 15, flex: 1, height: 60, alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: mycolor.lightgray }}>
                        <Text style={{ fontSize: 14 }}>{item.name}</Text>
                        <TouchableOpacity style={{ marginLeft: 'auto' }} onPress={() => this.actionOnRow(index)}>
                            {(item.status == true) ?
                                <View style={{ width: 50, justifyContent: 'center', alignItems: 'center' }}>
                                    <Image resizeMode='cover' style={{ height: 12, width: 12 }} source={require('../../assets/green_tick.png')}></Image>
                                </View>
                                :
                                <Text style={{ fontSize: 12, color: mycolor.pink }}>Check In</Text>
                            }
                        </TouchableOpacity>
                        {/* <Divider></Divider> */}
                    </View>
                </View>
            </View>
        );
    };


    actionOnRow(index) {
        // console.log('good');
        var list = this.state.ContactsList;
        list[index].status = !(list[index].status);
        this.setState({ ContactsList: list });
    }

    componentDidMount() {

    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    searchView: {
        flexDirection: 'row',
        height: 60,
        alignItems: 'center'
    },
    searchImg: {
        width: 20,
        height: 20,
        tintColor: mycolor.lightgray,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 14,
        marginBottom: 14
    }
});

