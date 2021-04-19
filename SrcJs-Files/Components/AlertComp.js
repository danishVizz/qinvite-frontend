import React from 'react'
import { Component } from "react";
import { Alert, View, Text, Button, Modal,TouchableOpacity } from "react-native";
import Trans from "../Translation/translation";
import ButtonComp from './ButtonComp';
import mycolor from '../Constants/Colors';


export default class AlertComp extends Component {

    render() {
        return (
            <Modal
                transparent={true}
                visible={true}
                animationIn="slideInLeft"
                animationOut="slideOutRight">
                <View
                    style={{
                        backgroundColor: 'rgba(0,0,0,0.2)',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flex: 1,
                    }}>
                    <View
                        style={{
                            width: '90%',
                            backgroundColor: 'white',
                            padding: 22,
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: 4,
                            borderColor: 'rgba(0, 0, 0, 0.1)',
                        }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>{this.props.alerttitle}</Text>

                        <Text style={{ fontSize: 15, color: 'black', marginTop: 20,textAlign:'center' }}>{this.props.alertbody}</Text>

                        <View style={{ width: '100%', marginTop: 30 }}>
                            <ButtonComp
                                onPress={this.props.onDeletePress}
                                text={Trans.translate("Delete")}
                                style={{ backgroundColor: mycolor.pink, marginTop: 20, marginLeft: 25, marginRight: 25 }}
                                textcolor={mycolor.white}
                                textstyle={{ color: mycolor.white }} />

                            <TouchableOpacity style={{ alignSelf: 'center', marginTop: 20 }} onPress={this.props.onCancelPress}>
                                <Text>{Trans.translate('Nothanks')}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        );
    }
}