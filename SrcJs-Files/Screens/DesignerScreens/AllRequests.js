import React, { Component, useState } from 'react';
import mycolor from '../../Constants/Colors';
import { FlatList, Image, View, StyleSheet, Alert, Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import Request_items from '../../ListCustomviews/Request_items'
// import ButtonComp from '../../ListCustomviews/ButtonComp'
import FloatingButtonComp from '../../Components/FloatingButtonComp';
import ApiCalls from '../../Services/ApiCalls';
import Prefs from '../../Prefs/Prefs';
import Keys from '../../Constants/keys';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ButtonComp from '../../Components/ButtonComp';
import Trans from '../../Translation/translation';
import moment from "moment";

export default class AllRequests extends Component {
    state = {
        EventAllData: [],
        contentLoading: true,
        showDatePicker: false,
        date: new Date(),
        status: '',
        id:''
    }

    _onPress() {
        this.props.onPressButtonChildren(this.props.item); //Change: passing prop onPressItem and calling _onPressItem
    }

    render() {

        return (
            <View style={{ flex: 1, backgroundColor: mycolor.white }}>
                <FlatList
                    data={this.props.type == "All" ? this.getallData() : this.props.type == "Accepted" ? this.getActiveData() : this.getCloseData()}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} />
                <View style={{ flex: 1, alignSelf: 'center', alignItems: "center" }}>
                    {this.state.contentLoading && < ActivityIndicator size="large" color={mycolor.pink} />}
                </View>

                <View style={{
                    display: this.state.showDatePicker == true ? 'flex' : 'none', width: '100%', backgroundColor: '#FFF', position: 'absolute', bottom: 0, borderTopLeftRadius: 30, borderTopRightRadius: 30, justifyContent: 'center', alignItems: 'center', shadowColor: "#000",
                    shadowOffset: {
                        width: 0,
                        height: 8,
                    },
                    shadowOpacity: 0.46,
                    shadowRadius: 11.14,

                    elevation: 17,
                }}>
                    <Text style={{ fontSize: 22, fontWeight: 'bold', marginTop: 30, marginBottom: 20 }}>{Trans.translate('set_deadline')}</Text>
                    <DatePicker
                        date={this.state.date}
                        mode="datetime"
                        onDateChange={(date) => this.setState({ date: date, eventdate: date })}
                    />
                    <View style={{ margin: 20, width: '70%' }}>
                        <ButtonComp
                            onPress={() => this.changeDesignerStatus('2', '72')}
                            textstyle={{ color: 'white' }}
                            text={Trans.translate("set_as_deadline")}></ButtonComp>
                    </View>
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
        console.log("getActiveData()")
        try {
            var filterarray = this.state.EventAllData.filter(eventdata => eventdata.design_status == "1")
            return filterarray
        } catch {
            return this.state.EventAllData
        }
    }
    getCloseData() {
        console.log("getCloseData()")
        try {
            var filterarray = this.state.EventAllData.filter(eventdata => eventdata.design_status == "2")
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
        parsedata.id = "17";
        ApiCalls.getapicall("get_event_requests", "?designer_id=" + parsedata.id).then(data => {
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
                <Request_items
                    fromchildprops={this.onPressButtonChildren}
                    item={item}
                    image={item.image_url}
                    title={item.event_name}
                    description={item.event_date}
                />
            </TouchableOpacity>
        );
    };

    onPressButtonChildren = (value, item) => {
        console.log("value : " + value);
        console.log(item);
        if (value == 'accept') {
            this.setState({ 
                showDatePicker: true,
                status: value,
                id: item.event_id 
            }, console.log("status : "+this.state.status+", id : "+this.state.id));
        }
        // this.changeDesignerStatus(value, item.event_id);
    }

    async changeDesignerStatus(status, id) {
        this.setState({ showDatePicker: false });
        this.logCallback("getAllDesigner :", this.state.contentLoading = true);

        var formadata = new FormData()
        formadata.append("design_status", this.state.status);
        formadata.append("event_id", this.state.id);
        formadata.append("deadline", moment(this.state.date).format("YYYY-MM-DD HH:mm:ss"));

        ApiCalls.postApicall(formadata, "accept_design").then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
            if (data.status == true) {
                // var arr = this.state.EventAllData;
                // for ( let obj of arr) {
                //     if (obj.event_id == id) {
                //         if (status == "accept") {
                //             obj.design_status = "1"
                //         }else {
                //             obj.design_status = "2"
                //         }
                //         console.log("changed event id: "+obj.event_id)
                //     }
                // }
                // this.setState({EventAllData: arr});
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.contentLoading = false);
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }

    actionOnRow(itemdata, props) {
        console.log('Selected Item :' + itemdata.event_name);
        this.props.navigation.navigate('RequestDetails', { detail: itemdata })
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

