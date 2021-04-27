import React, { Component, useState } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, StyleSheet, ActivityIndicator, Text, TouchableOpacity, View, Alert, Image, Modal } from 'react-native'
import Trans from '../Translation/translation'
import FloatingButtonComp from '../Components/FloatingButtonComp';
import HeaderComp2 from '../Components/HeaderComp2';
import StatusBarComp from '../Components/StatusBarComp';
import DesignerComp from '../Components/DesignerComp';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputComp from '../Components/TextInputComp';
import CircleImageComp from '../Components/CircleImageComp';
import { CheckBox } from 'react-native-elements';
import ApiCalls from '../Services/ApiCalls';
import Keys from '../Constants/keys';
import moment from 'moment';

// const MyStatusBar = ({ backgroundColor, ...props }) => (
//     <View style={[styles.statusBar, { backgroundColor }]}>
//         <SafeAreaView>
//             <StatusBar translucent backgroundColor={backgroundColor} {...props} />
//         </SafeAreaView>
//     </View>
// );

export default class ReceivedDesign extends Component {

    state = {
        isLoading: true,
        designerdata: [],
        modalVisible: false,
        checked: false,
    }


    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "white" }}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp2 alignSelf='center' textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={Trans.translate('received_design')} titlepos='center' leftBtnClicked={() => this.props.navigation.goBack()}></HeaderComp2>
                
                {this.state.isLoading ? <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                    <ActivityIndicator size="large" color={mycolor.pink} />
                </View> :
                    <FlatList
                        style={{ marginBottom: 30 }}
                        data={this.state.designerdata}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={(item) => item.id}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false} />
                }


            </View>
        );
    }


    searchItems = text => {
        var datatosearch = this.state.designerdata
        if (text.length == 0) {
            this.getAllDesigners()
        }
        let newData = datatosearch.filter(item => {
            const itemData = `${item.first_name.toUpperCase()}`;
            const textData = text.toUpperCase();
            if (text.length > 0) {
                return itemData.indexOf(textData) > -1;
            }
        });
        this.setState({
            designerdata: newData,
            value: text,
        });

    }

    checkBox(index) {
        // let checkedCopy = this.state.checked
        // checkedCopy[index] = !checkedCopy[index]
        // this.setState({
        //     checked: checkedCopy,
        // }) Tue 15 Mar,2021
    }
    renderItem({ item, index }) {
        console.log("inex: " + index);
        return (

            // moment(testDate).format('MM/DD/YYYY');
            <TouchableOpacity style={styles.itemView} onPress={() => this.actionOnRow(item, index)}>
                <Image source={{ uri: item.design_card }} resizeMode="contain" style={{ width: '94%', height: 200, borderRadius: 6, margin: 10 }}></Image>
                <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 20 }}>
                    <Text style={{ fontSize: 12, color: "#A3A3B1" }}>{Trans.translate('received_date')}</Text>
                    <Text style={{ fontSize: 12, color: "#A3A3B1", marginLeft: 'auto' }}>{Trans.translate('Time')}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10, marginTop: 5, marginBottom: 20 }}>
                    <Text style={{ fontSize: 12, fontWeight: 'bold' }}>{moment(item.submit_date).format('ddd DD MMM,YYYY')}</Text>
                    <Text style={{ fontSize: 12, fontWeight: 'bold', marginLeft: 'auto' }}>{moment(item.submit_date).format('HH:mm A')}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    renderItem2({ item, index, props }) {
        console.log("inex: " + index);
        return (
            <View style={{ flex: 1, margin: 5, padding: 10, borderRadius: 5, borderColor: 'white', borderWidth: 5, flexDirection: "row", backgroundColor: "white" }}>
                <CircleImageComp imagesrc={require('../../assets/icon_selection.png')}></CircleImageComp>
                <View style={{ flex: 9 }}>
                    <Text style={{ marginLeft: 10, alignSelf: 'baseline', fontSize: 14, color: 'black' }}>Kevin</Text>
                    <Text style={{ marginLeft: 10, alignSelf: 'baseline', fontSize: 14, color: 'gray' }}>030078601</Text>
                </View>
                <CheckBox
                    // checked={this.state.checked}
                    onPress={() => true}
                    checkedIcon={<Image source={require('../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                    uncheckedIcon={<Image source={require('../../assets/icon_logo.png')} style={{ height: 20, width: 20 }} />}
                    value={true}
                    onChange={() => this.checkBox(index)} />
            </View>


        );
    }
    componentDidMount() {
        this.getDesigns()
    }

    logCallback = (log, callback) => {
        console.log(log);
        this.setState({
            callback
        });
    }


    actionOnRow(itemdata, index) {
        this.props.navigation.navigate('ImageEditor', { "imagedata": itemdata.design_card })
    }

    async getDesigns() {
        this.logCallback("getDesigns :", this.state.contentLoading = true);
        ApiCalls.getapicall("get_event_cards", "?event_id=73").then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
            if (data.status == true) {
                this.setState({ designerdata: data.data, isLoading: false })
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.contentLoading = false);
            Alert.alert('Error', JSON.stringify(error));
        }
        )
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        backgroundColor: mycolor.lightwhite,
        borderRadius: 5,
        margin: 5,
        borderWidth: 5,
        borderColor: 'white',
        shadowColor: "red",
        shadowOpacity: 0.25,
        shadowRadius: 30,
        elevation: 2
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    itemView: {
        margin: 20,
        borderRadius: 8,
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
});





