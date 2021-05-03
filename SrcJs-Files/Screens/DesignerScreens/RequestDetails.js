import React from 'react'
import { Component } from "react";
import { StyleSheet, View, Image, Text, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ButtonComp from '../../Components/ButtonComp';
import HeaderComp2 from '../../Components/HeaderComp2';
import mycolor from "../../Constants/Colors";
import Trans from "../../Translation/translation";
import Keys from "../../Constants/keys";
import moment from 'moment';
import StatusBarComp from '../../Components/StatusBarComp';
import { ScrollView } from 'react-native-gesture-handler';

export default class RequestDetails extends Component {
    state = {
        contentLoading: false
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp2 alignSelf='center' textfonts='bold' leftBtn={require('../../../assets/icon_back.png')} title={this.props.route.params.detail.event_name} titlepos='center' leftBtnClicked={() => this.props.navigation.goBack()}></HeaderComp2>
                <View style={{ flex: 2.5 }}>
                    <View style={{ flex: 2.5, marginTop: 30, marginLeft: 20, marginRight: 20, marginBottom: 20, borderRadius: 2, borderWidth: 5, borderColor: 'white', elevation: 2 }}>

                        <Text style={{ marginLeft: 20, marginRight: 20, marginTop: 20, fontSize: 24, fontWeight: 'bold', color: mycolor.darkgray }}>{this.props.route.params.detail.event_name}</Text>

                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={styles.textstyle}>{Trans.translate('Date')}</Text>
                                <Text style={[styles.textstyle, { color: 'black' } || {}]}>{moment(this.props.route.params.detail.event_date).format('ddd DD MMM,YYYY')}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={styles.textstyle}>{Trans.translate('Time')}</Text>
                                <Text style={[styles.textstyle, { color: 'black' } || {}]}>{moment(this.props.route.params.detail.event_date).format("hh:mm A")}</Text>
                            </View>

                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.textstyle}>{Trans.translate('DeadLine')}</Text>
                            <Text style={[styles.textstyle, { color: 'black' } || {}]}>{moment(this.props.route.params.detail.design_deadline).format('ddd DD MMM,YYYY')}</Text>
                        </View>
                        <View
                            style={{
                                marginTop: 30,
                                margin: 20,
                                backgroundColor: 'red',
                                borderBottomColor: '#E4E4E4',
                                borderBottomWidth: 1,

                            }} />

                        <Text style={{ alignSelf: 'center', margin: 5, textAlign: 'center', fontWeight: 'bold' }}>{Trans.translate('PointtoPonder')}</Text>
                        <Text style={{ alignSelf: 'center', marginTop: 20, margin: 50, textAlign: 'center' }}>{Trans.translate('SpaceAdjusted')}</Text>

                        {this.props.route.params.detail.request_status == "1" &&
                            <View style={{ marginTop: 30, marginBottom: 30, margin: 20 }}>
                                <ButtonComp text={Trans.translate('SubmitDesign')}
                                    textstyle={{ color: mycolor.white, fontWeight: 'bold' }}
                                    isloading={this.state.contentLoading}
                                    onPress={() => this.props.navigation.navigate('UploadDesign', { event: this.props.route.params.detail, from: 'request_details' })}>
                                </ButtonComp>
                            </View>
                        }
                    </View>
                </View>
            </View>
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
        height: 300,
        width: "100%",
        alignItems: 'center',
        marginRight: 20,
        marginBottom: 20,
        borderWidth: 1,
        alignSelf: 'center',
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