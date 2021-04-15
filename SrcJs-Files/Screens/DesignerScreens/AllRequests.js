import React, { Component, useState } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Image, View, StyleSheet, Alert, Text } from 'react-native'
import Event_items from '../../ListCustomviews/Event_items'
import FloatingButtonComp from '../../Components/FloatingButtonComp';
import ApiCalls from '../../Services/ApiCalls';
import Prefs from '../../Prefs/Prefs';
import Keys from '../../Constants/keys';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';

export default class AllRequests extends Component {
    state = {
        EventAllData: [],
        contentLoading: false
    }

    _onPress() {
        this.props.onPressButtonChildren(this.props.item); //Change: passing prop onPressItem and calling _onPressItem
    }


    render() {
       
        return (
            <View style={{ flex: 1, backgroundColor: mycolor.white }}>
                <FlatList
                    data={this.props.type == "All" ? this.getallData() : this.props.type == "Active" ? this.getActiveData() : this.getCloseData()}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} />

                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', position: "absolute", bottom: 0 }}>
                    <FloatingButtonComp imagesrc={require('../../../assets/icon_event.png')} floatingclick={() => this.props.navigation.navigate("CreateEvent", { "eventdata": [] })}></FloatingButtonComp>
                </View>

                <View style={{ flex: 1, alignSelf: 'center', alignItems: "center" }}>
                    {this.state.contentLoading && < ActivityIndicator size="large" color={mycolor.pink} />}
                </View>
            </View>);
    }

    getallData() {
        try {
            var filterarray = this.state.EventAllData
            return filterarray

        } catch {
            return this.state.EventAllData
        }

    }
    getActiveData() {
        try {
            var filterarray = this.state.EventAllData.filter(eventdata => eventdata.event_status == "1")
            return filterarray
        } catch {
            return this.state.EventAllData
        }
    }
    getCloseData() {
        try {
            var filterarray = this.state.EventAllData.filter(eventdata => eventdata.event_status == "2")
            return filterarray
        } catch {
            return this.state.EventAllData
        }
    }
    componentDidMount() {
        console.log('Mounted');

        this.getAllEvents();
    }

    logCallback = (log, callback) => {
        console.log(log);
        this.setState({
            callback
        });
    }


    async getAllEvents() {
        var userdata = await Prefs.get(Keys.userData);
        var parsedata = JSON.parse(userdata)
        ApiCalls.getapicall("get_events", "?user_id=" + parsedata.id).then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
            if (data.status == true) {
                this.setState({ EventAllData: data.data })
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.contentLoading = false);
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }

    async DeleteEvent(id) {
        this.logCallback("DeleteEvent :", this.state.contentLoading = true);
        // var userdata = await Prefs.get(Keys.userData);
        // var parsedata = JSON.parse(userdata)
        console.log("Event-Idddd" + id)
        ApiCalls.deletapicall("delete_event", id).then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
            if (data.status == true) {
                const newList = this.state.EventAllData.filter((item) => item.id !== id);
                this.setState({ EventAllData: newList })
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.contentLoading = false);
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }


    renderItem({ item, index }) {
        return (
            <TouchableOpacity onPress={() => this.actionOnRow(item)}>
                <Event_items
                    fromchildprops={this.onPressButtonChildren}
                    item={item}
                    image={item.image_url}
                    title={item.event_name}
                    description={item.event_address}
                />
            </TouchableOpacity>
        );
    };

    onPressButtonChildren = (value, item) => {
        switch (value) {
            case 'delete':
                this.DeleteEvent(item.id)
                break
            case 'edit':
                var newitem = {
                    "eventid": item.id,
                    "eventname": item.event_name,
                    "eventaddress": item.event_address,
                    "eventdate": item.event_date,
                    "no_of_receptionists": item.no_of_receptionists,
                    "receptionists": item.receptionists
                }

                this.props.navigation.navigate('CreateEvent',
                    {
                        "eventdata": newitem
                    })

                this
                break
            default:
            // this.props.navigation.navigate('EventDetails')
        }
    }

    actionOnRow(itemdata, props) {
        console.log('Selected Item :' + itemdata.event_name);
        this.props.navigation.navigate('EventDetails', {
            "eventdata": itemdata

        })
    }


    successCallBackData = (data) => {
        console.log(data)// can get callback data here
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

