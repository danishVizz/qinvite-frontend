import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mycolor from '../Constants/Colors';
import CircleImageComp from './CircleImageComp'
import HeaderComp2 from './HeaderComp2';
export default class DesignerComp extends Component {

    render() {
        return (
            this.props.isavailable ? <View style={styles.container}>
                <View style={{ flex: 1, marginTop: 22, marginLeft: 20, marginRight: 20, marginBottom: 10, borderRadius: 2, borderWidth: 5, borderColor: 'white' }}>
                    <View style={styles.imagecontainer}>
                        <Image source={require('../../assets/icon_dumy.png')} resizeMode="contain" style={{ width: '95%', alignSelf: 'center', height: 200 }}></Image>
                    </View>
                    <View style={{ flexDirection: 'row', margin: 15 }}>
                        <CircleImageComp imagestyle={{ height: 20, width: 20 }} style={{ height: 40, width: 40, borderColor: mycolor.pink }} imagesrc={require('../../assets/paint-person.png')} ></CircleImageComp>
                        <View style={{ flex: 3, flexDirection: 'column', marginLeft: 10 }}>
                            <Text style={[styles.textstyle, { color: '#474645', fontWeight: 'bold', fontSize: 14 } || {}]}> {this.props.designername}</Text>
                            <Text style={[styles.textstyle]}> {"Cost "+this.props.designerprice + " QR"}</Text>
                        </View>
                        <Image resizeMode="contain" style={{ width: 15, alignSelf: 'center', height: 15, backgroundColor: this.props.isavailable ? 'green' : 'orange', borderRadius: 7.5 }}></Image>
                    </View>
                    
                </View>
            </View> : null
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 20,
        borderRadius: 4,
        backgroundColor: "#fff",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    imagecontainer: {
        flex: 1,
        marginTop: 0,
        width: '100%',
        backgroundColor: 'white',

        borderColor: mycolor.lightgray,
        borderRadius: 5,
        alignSelf: 'center',
        flexDirection: 'column'
    },
    textstyle: {
        color: mycolor.lightgray,
        fontSize: 12
    }

});