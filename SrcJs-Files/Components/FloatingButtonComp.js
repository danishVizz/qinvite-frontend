
import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import mycolor from '../Constants/Colors';

export default class FloatingButtonComp extends Component {

    render() {
        return (
            // <View style={styles.container2}>
                <TouchableOpacity
                    style={[styles.container, this.props.containerStyle]}
                    onPress={this.props.floatingclick}>
                    <Image resizeMode='contain' source={this.props.imagesrc} style={{ width: 40, height: 40}} />
                </TouchableOpacity>
            // </View>

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
        height: 70,
        backgroundColor: mycolor.pink,
        borderRadius: 70,

    },
    container2: {

        alignItems: 'center',
        justifyContent: 'center',
        width: 70,
        height: 70,
        borderRadius: 70,

    }


})