import React, { Component, useState } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, StyleSheet, StatusBar, Text, Pressable, View, Alert, Image } from 'react-native'
import Trans from '../Translation/translation'
import { useNavigation } from '@react-navigation/core';
import FloatingButtonComp from '../Components/FloatingButtonComp';
import HeaderComp2 from '../Components/HeaderComp2';
import DesignerComp from '../Components/DesignerComp';
import { SafeAreaView } from 'react-native-safe-area-context';
import TextInputComp from '../Components/TextInputComp';
import { Modal } from 'react-native';
import CircleImageComp from '../Components/CircleImageComp';
import { CheckBox } from 'react-native-elements';

const list = [
    {
        title: 'Mike is Programming',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'Jack is Play Basketball',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'John is Singing',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'Rose is Dancing',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },]



export default class Designer extends Component {
    // const navigation = useNavigation();


    state = {
        timeSlots: [
            { id: '1', time: '10am - 11am' },
            { id: '2', time: '11am - 12pm' },
            { id: '3', time: '12pm - 1pm' },
            { id: '4', time: '1pm - 2pm' },
            { id: '5', time: '2pm - 3pm' },
            { id: '6', time: '3pm - 4pm' },
            { id: '7', time: '4pm - 5pm' },
            { id: '8', time: '5pm - 6pm' },
        ],

        //checkBox
        modalVisible: false,
        checked: false,
    }
    render() {
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
                <HeaderComp2 alignSelf='center' textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={Trans.translate('ChooseDesigner')} titlepos='center' ></HeaderComp2>
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
                    }}
                >
                    <View style={{ marginTop: 100, marginBottom: 50, marginLeft: 30, marginRight: 30, width: '80%', borderRadius: 0, borderWidth: 0, alignSelf: 'center', justifyContent: 'center', alignSelf: 'center', backgroundColor: mycolor.white }}>
                        <View style={styles.modalView}>
                            <Text style={{ fontSize: 24, fontWeight: 'bold', padding: 10, alignSelf: 'center', color: "black" }}>Choose Designer</Text>
                            <FlatList
                                data={list}
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
                        leftIcon={require('../../assets/icon_search.png')}
                        textviewstyle={{ height: 40 }}></TextInputComp>
                </View>
                <FlatList
                    style={{ marginBottom: 30 }}
                    data={list}
                    renderItem={this.renderItem}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} />


                <View style={{ flexDirection: 'row', alignSelf: 'flex-end', position: "absolute", bottom: 0 }}>

                    <FloatingButtonComp imagesrc={require('../../assets/icon_upload.png')}></FloatingButtonComp>

                    <FloatingButtonComp imagesrc={require('../../assets/icon_selection.png')} ></FloatingButtonComp>
                </View>

            </SafeAreaView>
        );
    }
    checkBox(index) {
        // let checkedCopy = this.state.checked
        // checkedCopy[index] = !checkedCopy[index]
        // this.setState({
        //     checked: checkedCopy,
        // })
    }
    renderItem({ item, index, props }) {
        console.log("inex: " + index);
        return (

            // <TouchableWithoutFeedback style={{
            //   marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, }} onPress={() => actionOnRow(item,props)}>
            <DesignerComp
                // toggle={() => this.onToggle(index)}
                // propsfromparents={onPressButtonChildren.bind()}s
                imagepath={item.image_url}
                designername={'Bette J. Wright'}
                designercontact={'090078601'}
            />
            // </TouchableWithoutFeedback>
        );
    }

    renderItem2({ item, index, props }) {
        console.log("inex: " + index);
        return (

            // <TouchableWithoutFeedback style={{
            //   marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, }} onPress={() => actionOnRow(item,props)}>

            <View style={{ flex: 1, margin: 5, padding: 10, borderRadius: 5, borderColor: 'white', borderWidth: 5, flexDirection: "row", backgroundColor: "white" }}>
                <CircleImageComp imagesrc={require('../../assets/icon_selection.png')}></CircleImageComp>
                <View style={{ flex: 9 }}>
                    <Text style={{ marginLeft: 10, alignSelf: 'baseline', fontSize: 14, color: 'black' }}>Kevin</Text>
                    <Text style={{ marginLeft: 10, alignSelf: 'baseline', fontSize: 14, color: 'gray' }}>030078601</Text>
                </View>
                <CheckBox
                    checked={this.state.checked}
                    onPress={() => true}
                    checkedIcon={<Image source={require('../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                    uncheckedIcon={<Image source={require('../../assets/icon_logo.png')} style={{ height: 20, width: 20 }} />}
                    value={checked}
                    onChange={() => this.checkBox(index)} />
            </View>


        );
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





