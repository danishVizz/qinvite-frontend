import React, { Component } from "react";
import Trans from '../Translation/translation'
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';
import mycolor from "../Constants/Colors";
import CircleImageComp from "./CircleImageComp";
import { CheckBox } from 'react-native-elements';
export default class ContactsComp extends Component {
    state = {
        backgroundColor: mycolor.lightgray,
        allfieldsenabel: false,
        changetext: true
    }


    render() {
        return (

            <View style={styles.conatiner}>
                <View style={{ flex: 1, flexDirection: 'row', marginRight: 1, marginTop: 20}}>
                    <View style={{ flex: 2 }}>
                        <CircleImageComp imagestyle={{ height: 40, width: 40 }} style={{ height: 40, width: 40 }} imagesrc={this.props.imagepath} ></CircleImageComp>
                        <View style={{ position: 'absolute', alignSelf: 'center', bottom: -20, right: 0, borderColor: 'white' }}>
                        <CheckBox
                                checked={this.props.isChecked}
                                checkedIcon={<Image source={require('../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                                uncheckedIcon={<Image source={null} />}
                                onPress={this.props.OnCheckPress}
                            ></CheckBox>
                        </View>
                    </View>
                    <View style={{ flex: 7 }}>
                        <Text>{this.props.contactname}</Text>
                        <Text>{this.props.status}</Text>
                    </View>

                    <View style={{ flex: 1,justifyContent:'center' }}>
                        <Image source={require('../../assets/icon_phallow.png')} style={{ height: 27, width: 16 }} resizeMode="contain"></Image>
                    </View>
                </View>
                <View
                    style={{
                      
                        marginTop: 10,
                        backgroundColor: 'red',
                        borderBottomColor: '#E4E4E4',
                        borderBottomWidth: 1,

                    }}
                />

            </View>

        );
    }
    changeviews() {
        this.setState({ changetext: !this.state.changetext, allfieldsenabel: !this.state.allfieldsenabel })
    }

}
const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#fff'
    },
    innercontainer: {
        flex: 1,
        marginTop: 21,
        margin: 33,
        backgroundColor: '#fff'
    },
    circleimage: {
        height: 120,
        width: 120,
        borderRadius: 120,
        borderColor: 'white'

    }

});

