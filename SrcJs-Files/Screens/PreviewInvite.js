import React from 'react'
import { Component } from "react";
import { StyleSheet, View, Image, Text, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComp from '../Components/ButtonComp';
import HeaderComp2 from '../Components/HeaderComp2';
import mycolor from "../Constants/Colors";
import Trans from "../Translation/translation";

export default class PreviewInvite extends Component {

    render() {

        return (
            <SafeAreaView style={styles.container}>
                  <StatusBar
                backgroundColor={mycolor.pink}/>
                <HeaderComp2  alignSelf='center' textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={ Trans.translate('CardPreview')} titlepos='center' ></HeaderComp2>
                
                <View style={{ flex: 3, marginTop: 28, marginLeft: 20, marginRight: 20, marginBottom: 20, borderRadius: 2, borderWidth: 5, borderColor: 'white', elevation: 2 }}>
                    <View style={styles.imagecontainer}>
                        <Image source={require('../../assets/logo.png')} resizeMode="center"></Image>
                    </View>
                    <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 24, fontWeight: 'normal', color: mycolor.darkgray }}>Joyce S. Bell Wedding</Text>

                    <View style={{ flexDirection: 'row', marginTop: 25 }}>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={styles.textstyle}>{Trans.translate('Date')}</Text>
                            <Text style={[styles.textstyle, { color: 'black' } || {}]}> {this.props.date}</Text>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'column' }}>
                            <Text style={styles.textstyle}>{Trans.translate('Time')}</Text>
                            <Text style={[styles.textstyle, { color: 'black' } || {}]}> {this.props.time}</Text>
                        </View>

                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.textstyle}>{Trans.translate('Place')}</Text>
                        <Text style={[styles.textstyle, { color: 'black' } || {}]}>Muree Road to Islamabad</Text>
                    </View>
                </View>

                <View style={{ flex: 1,marginTop:20,marginRight:33,marginLeft:33}}>
                    <ButtonComp text={Trans.translate('SendInvites')} textstyle={{ color: mycolor.white, fontWeight:'bold'}} ></ButtonComp>
                    <ButtonComp style={{marginTop:15,backgroundColor: mycolor.white }}  textstyle={{ color: mycolor.pink,fontWeight:'bold' }} text={Trans.translate('Savepdf')} ></ButtonComp>

                </View>
            </SafeAreaView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imagecontainer: {
        flex: 0,
        marginTop: 0,
        marginTop: 10,
        marginLeft: 20,
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: mycolor.lightgray,
        borderRadius: 5,
        flexDirection: 'column'
    },
    textstyle: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 12,
        fontWeight: 'normal',
        color: mycolor.lightgray
    }
});