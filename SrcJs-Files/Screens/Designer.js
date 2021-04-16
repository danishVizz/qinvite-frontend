import React, { Component, useState } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, StyleSheet, StatusBar, Text, Pressable, View, Alert, Image, Modal } from 'react-native'
import Trans from '../Translation/translation'
import FloatingButtonComp from '../Components/FloatingButtonComp';
import HeaderComp2 from '../Components/HeaderComp2';
import DesignerComp from '../Components/DesignerComp';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputComp from '../Components/TextInputComp';
import CircleImageComp from '../Components/CircleImageComp';
import { CheckBox } from 'react-native-elements';
import ApiCalls from '../Services/ApiCalls';
import Keys from '../Constants/keys';

import { TouchableOpacity } from 'react-native-gesture-handler';

export default class Designer extends Component {

    state = {
        designerdata: [],
        modalVisible: false,
        checked: false,
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <HeaderComp2 alignSelf='center' textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={Trans.translate('ChooseDesigner')} titlepos='center' leftBtnClicked={()=>this.props.navigation.goBack()}></HeaderComp2>
                <StatusBar
                    backgroundColor={mycolor.pink}
                />
                <Modal
                    animationType="fade"
                    transparent={true}
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setState({ modalVisible: true })
                    }}>
                    <View style={{ marginTop: 100, marginBottom: 50, marginLeft: 30, marginRight: 30, width: '80%', borderRadius: 0, borderWidth: 0, alignSelf: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: mycolor.white }}>
                        <View style={styles.modalView}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 10, alignSelf: 'center', color: "black" }}>Choose Designer</Text>
                            <FlatList
                                data={this.state.designerdata}
                                renderItem={this.renderItem2}
                                keyExtractor={(item) => item._id}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false} />
                        </View>
                    </View>
                </Modal>

                <View style={{ marginTop: 10, marginRight: 20, marginLeft: 20 }}>
                    <TextInputComp
                        onPressRightBtn={() => this.setState({ modalVisible: true })}
                        tintcolor={mycolor.lightgray}
                        onChangeText={text => this.searchItems(text)}
                        leftIcon={require('../../assets/icon_search.png')}
                        textviewstyle={{ height: 40 }}></TextInputComp>
                </View>
                <FlatList
                    style={{ marginBottom: 30 }}
                    data={this.state.designerdata}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} />


                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', position: "absolute", bottom: 0 }}>

                    <FloatingButtonComp imagesrc={require('../../assets/icon_upload.png')} floatingclick={() => this.props.navigation.navigate("UploadMedia")}></FloatingButtonComp>

                    <FloatingButtonComp imagesrc={require('../../assets/icon_selection.png')} ></FloatingButtonComp>
                </View>

            </SafeAreaView>
        );
    }


    searchItems = text => {
        console.log(this.state.designerdata)
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

    };



    checkBox(index) {
        // let checkedCopy = this.state.checked
        // checkedCopy[index] = !checkedCopy[index]
        // this.setState({
        //     checked: checkedCopy,
        // })
    }
    renderItem({ item, index }) {
        console.log("inex: " + index);
        return (

            // <TouchableWithoutFeedback style={{
            //   marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, }} onPress={() => actionOnRow(item,props)}>
            <TouchableOpacity onPress={() => this.actionOnRow(item, index)}>
                <DesignerComp
                    // toggle={() => this.onToggle(index)}
                    // propsfromparents={onPressButtonChildren.bind()}
                    imagepath={item.image_url}
                    designername={item.first_name}
                    designercontact={item.phone}
                />
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
        this.getAllDesigners()
    }

    logCallback = (log, callback) => {
        console.log(log);
        this.setState({
            callback
        });
    }


    actionOnRow(itemdata, index) {

        this.props.navigation.navigate('DesignerDetails', { "DesingerData": itemdata })
    }

    async getAllDesigners() {
        this.logCallback("getAllDesigner :", this.state.contentLoading = true);
        // var userdata = await Prefs.get(Keys.userData);
        // var parsedata = JSON.parse(userdata)

        ApiCalls.getapicall("get_designers", "").then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
            if (data.status == true) {
                this.setState({ designerdata: data.data })
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
    }
});





