import React, { Component } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Image, View, StyleSheet, Alert, Text, TouchableOpacity, ActivityIndicator } from 'react-native'

import Trans from '../Translation/translation'
import ConversationComp from '../Components/ConversationComp';
import { SafeAreaView } from 'react-native-safe-area-context';
import AwesomeAlert from 'react-native-awesome-alerts';
import HeaderComp2 from '../Components/HeaderComp2';
import { StatusBar } from 'expo-status-bar';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ContactsComp from '../Components/ContactsComp';
import ApiCalls from "../Services/ApiCalls";
import Keys from "../Constants/keys";
import Prefs from "../Prefs/Prefs";
import moment from "moment";

var query = ""
export default class AllEvents extends Component {

    state = {
        isLoading: true,
        originalList: [],
        list: [],
        isChecked: [],
        selectedLists: [],
        catdata: {},
        isFetching: false
    }

    hideAlert() {
        console.log("hideAlert");
        this.props.hideAlertCallback(false); //Change: passing prop onPressItem and calling _onPressItem
    }

    render() {
        {
            if (this.props.query != query) {
                this.filterData(this.props.query)
                query = this.props.query
            }
        }

        return (
            <View style={{ backgroundColor: 'white', flex: 1, paddingTop: 20 }}>
                <AwesomeAlert
                    show={this.props.showFilter}
                    contentContainerStyle={{ width: '100%', borderRadius: 4 }}
                    showProgress={false}
                    closeOnTouchOutside={true}
                    closeOnHardwareBackPress={false}
                    onDismiss={() => this.hideAlert()}
                    customView={this.alertView()}
                />

                { !this.state.isFetching && this.state.isLoading && <ActivityIndicator size="large" color={mycolor.pink} />}
                <FlatList
                    contentContainerStyle={(this.props.type == "All" ? this.getallData().length : this.props.type == "Active" ? this.getActiveData().length : this.getCloseData().length) === 0 && {
                        flexGrow: 1,
                        justifyContent: "center",
                        alignItems: "center"
                    }}
                    data={this.props.type == "All" ? this.getallData() : this.props.type == "Active" ? this.getActiveData() : this.getCloseData()}
                    getparentdata={this.onparendata}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item) => String(item.key)}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    ListEmptyComponent={this.noItemDisplay} />
                    
            </View>
        );
    }

    onRefresh() {
        this.setState({ isFetching: true, }, () => { this.getAllEvents(); });
    }

    noItemDisplay = () => {
        return (
            <Text style={{ display: this.state.isLoading ? 'none' : 'flex' }}>{Trans.translate('no_record_found')}</Text>
        )
    }

    onparendata = (value) => {
        // console.log('Query ' + value)
    }

    filterData(query) {
        // console.log("filterdata")
        if (query.length >= 3) {
            var filteredList = [];
            for (let obj of this.state.originalList) {
                console.log(obj.event_name);
                if (obj.event_name.includes(query)) {
                    filteredList.push(obj);
                }
            }
            this.setState({
                list: filteredList
            });
        } else {
            this.setState({
                list: this.state.originalList
            });
        }

    }

    alertView() {
        return (
            <View style={{ width: '100%' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10, borderBottomColor: mycolor.lightgray, borderBottomWidth: 2 }}>
                    <Text style={{ fontSize: 16 }}>Filters</Text>
                    <Image style={{ width: 20, height: 20, marginLeft: 'auto' }} source={require('../../assets/filter.png')}></Image>
                </View>
                <Text style={{ fontSize: 13, marginTop: 20, color: mycolor.darkgray, fontWeight: '500' }}>Filter By</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image style={{ width: 16, height: 16 }} source={require('../../assets/icon_check.png')}></Image>
                    <Text style={{ fontSize: 13, marginLeft: 12, color: mycolor.darkgray, fontWeight: '500' }}>Per Year</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image style={{ width: 16, height: 16 }} source={require('../../assets/gray_tick.png')}></Image>
                    <Text style={{ fontSize: 13, marginLeft: 12, color: mycolor.darkgray, fontWeight: '500' }}>Per Month</Text>
                </View>
                <Text style={{ fontSize: 13, marginTop: 20, color: mycolor.darkgray, fontWeight: '500' }}>Type</Text>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image style={{ width: 16, height: 16 }} source={require('../../assets/icon_check.png')}></Image>
                    <Text style={{ fontSize: 13, marginLeft: 12, color: mycolor.darkgray, fontWeight: '500' }}>Paid</Text>
                </View>
                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                    <Image style={{ width: 16, height: 16 }} source={require('../../assets/gray_tick.png')}></Image>
                    <Text style={{ fontSize: 13, marginLeft: 12, color: mycolor.darkgray, fontWeight: '500' }}>Not Paid</Text>
                </View>
            </View>
        );
    }

    renderItem({ item, index, props }) {
        return (
            <TouchableOpacity style={{

                backgroundColor: 'white', marginLeft: 20, marginRight: 20, marginTop: 7.5, marginBottom: 7.5, height: 90, borderRadius: 8, shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 3,
                },
                shadowOpacity: 0.27,
                shadowRadius: 4.65,

                elevation: 6,
            }} onPress={() => this.props.navigation.navigate('WeddingDetails', { item: item })}>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, margin: 14 }}>
                    <Image style={{ width: 24, height: 24 }} source={require('../../assets/icon_calendar.png')}></Image>
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: 15, color: "black" }}>{item.event_name}</Text>
                        <Text style={{ fontSize: 12, color: "#C9C9C9" }}>{moment(item.event_date).format('DD/MM/YYYY')}</Text>
                    </View>
                    <Image resizeMode='contain' style={{ width: 15, height: 15, marginLeft: 'auto' }} source={require('../../assets/icon_arrowright.png')}></Image>
                </View>

            </TouchableOpacity>
        );
    };


    actionOnRow(index) {
        // console.log('good');
        var list = this.state.ContactsList;
        list[index].status = !(list[index].status);
        this.setState({ ContactsList: list });
    }

    componentDidMount() {
        console.log("this.props.query")
        this.getAllEvents();
    }

    async getAllEvents() {
        var userdata = await Prefs.get(Keys.userData);
        var parsedata = JSON.parse(userdata)
        let query = '?receptionist_id=' + parsedata.id
        ApiCalls.getGenericCall("get_rp_events", query).then(data => {
            if (data.status == true) {
                this.setState({ list: data.data, originalList: data.data, isLoading: false, isFetching: false })
            } else {
                this.setState({ isLoading: false, isFetching: false })
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.setState({ isLoading: false, isFetching: false })
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }

    getallData() {
        try {
            var filterarray = this.state.list
            return filterarray

        } catch {
            return this.state.list
        }
    }
    getActiveData() {
        try {
            var filterarray = this.state.list.filter(eventdata => eventdata.event_status == "1")
            return filterarray
        } catch {
            return this.state.list
        }
    }
    getCloseData() {
        try {
            var filterarray = this.state.list.filter(eventdata => eventdata.event_status == "2")
            return filterarray
        } catch {
            return this.state.list
        }
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

