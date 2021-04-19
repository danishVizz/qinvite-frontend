import React, { Component } from 'react';
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native';
import mycolor from '../Constants/Colors';
import OptionsMenu from "react-native-options-menu";
import Trans from '../Translation/translation';

class CategoryComp extends Component {

    onPressButtonChildren(value, item) {
        this.props.fromchildprops(value, item)
    }

    render() {
        return (
            <View>
                <View onPress={this.props.Onpress} style={[styles.container, this.props.containerstyle || {}]} >
                    <Image source={this.props.lefticon} style={[styles.photo, this.props.imagestyle || {}]} />
                    <View style={[styles.container_text, this.props.containerStyle || {}]}>
                        <Text style={[styles.title, this.props.titlestyle || {}]}>
                            {this.props.title}
                        </Text>
                    </View>
                    {/* <Image source={this.props.innerright} style={[styles.checkboxphoto,this.props.innerrightimagestyle || {}]} />
            <Image source={this.props.righticon} style={[styles.optionphoto,this.props.rightimagestyle || {}]} /> */}
                    <View style={{ flex: 1, alignSelf: "center", marginRight: 10 }}>
                        <OptionsMenu
                            button={require('../../assets/icon_option.png')}
                            buttonStyle={{ width: 32, height: 15, margin: 5, resizeMode: "contain", justifyContent: 'center', alignSelf: 'center' }}
                            destructiveIndex={2}
                            options={[Trans.translate('view'), Trans.translate('Edit'), Trans.translate('Delete')]}
                            actions={[() => this.onPressButtonChildren("view", this.props.item), () => this.onPressButtonChildren("edit", this.props.item), () => this.onPressButtonChildren("delete", this.props.item)]} />

                    </View>
                </View>
            </View>
        );
    }
};



const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft: 20, marginRight: 20,
        marginBottom: 20,
        height: 70,
        elevation: 0.1,
        justifyContent: 'center',
        borderWidth: 1,
        backgroundColor: mycolor.lightwhite,
        borderRadius: 5, borderColor: mycolor.lightgray
    },
    title: {
        fontSize: 21,
        color: '#000',
        fontWeight: 'bold'

    },
    container_text: {
        marginLeft: 10,
        flex: 8,
        justifyContent: 'center',


    },

    photo: {
        flex: 2,
        height: 27,
        width: 37,
        margin: 5,
        marginLeft: 21,
        borderRadius: 2,
        resizeMode: 'contain',
        alignSelf: 'center',

    },

    checkboxphoto: {
        height: 13,
        width: 17,
        margin: 5,
        resizeMode: 'contain',
        alignSelf: 'center',
        flex: 1
    },

    optionphoto: {
        height: 16,
        width: 4,
        margin: 5,
        resizeMode: 'contain',
        alignSelf: 'center',
        flex: 1
    },

});


export default CategoryComp;