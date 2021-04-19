
import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import mycolor from '../Constants/Colors';

export default class FloatingButtonComp extends Component {

    render() {
        return (
            <View style={styles.container2}>
                <TouchableOpacity
                    style={[styles.container]}
                    onPress={this.props.floatingclick}>
                    <Image source={this.props.imagesrc} style={{ resizeMode: 'center',height:60,width:60 }} />
                </TouchableOpacity>
            </View>

        );
    }
}
const styles = StyleSheet.create({

    container: {

        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        bottom: 10,
        right: 10,
        height: 70,
        paddingBottom: 0,
        alignSelf: 'flex-end',
        backgroundColor: mycolor.pink,
        borderRadius: 70,

    },
    container2: {

        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        bottom: 10,
        right: 10,
        height: 70,
        marginRight:5,
        paddingBottom: 0,
        alignSelf: 'flex-end',
        borderRadius: 70,

    }


})