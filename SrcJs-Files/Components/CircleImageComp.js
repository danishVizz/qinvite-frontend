
import React, { Component } from 'react'
import { View, Image } from 'react-native';
import mycolor from '../Constants/Colors';

const CircleImageComp = (props) => {
    return (
        <View style={[{flexDirection: 'row', alignSelf: 'center', borderRadius: 35, height: 35, width: 35, borderWidth: 1, borderColor: mycolor.lightgray, justifyContent: 'center', alignItems: 'center' },props.style || {} ]}>
            <Image style={[{ height: 30, width: 30, borderRadius: 15 },props.imagestyle||{}]} resizeMode="contain" source={props.imagesrc}></Image>
        </View>
    )

};
export default CircleImageComp;
