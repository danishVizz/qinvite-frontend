import React, { Component } from 'react';
import { Alert, StatusBar } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import ButtonComp from '../Components/ButtonComp';
import HeaderComp from '../Components/HeaderComp';
import StatusBarComp from '../Components/StatusBarComp';
import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation';
import ApiCalls from '../Services/ApiCalls';
import Keys from '../Constants/keys';
import Prefs from '../Prefs/Prefs';
import { ScrollView } from 'react-native-gesture-handler';

const iamgepath = '../../assets';

export default class DesignerDetails extends Component {
    state = {
        contentLoading: false,
        isresponded: false
    }

    render() {
        const desingertdata = this.props.route.params.DesingerData || 'none'
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <StatusBarComp backgroundColor={'white'} />
                <HeaderComp selfalign={'flex-end'} titleclick={() => this.changeviews()} textfonts={'bold'} titlepos='right' titleColor={'black'} fromleft={7} lefttintColor={mycolor.darkgray} headerStyle={{ backgroundColor: mycolor.white }} leftBtn={require(iamgepath + '/icon_back.png')}
                    leftBtnClicked={() => this.props.navigation.goBack()}></HeaderComp>
                <ScrollView>
                    <View style={styles.container}>
                        {/* <StatusBar
                        backgroundColor='white' /> */}

                        <View style={{ width: '100%', flex: 1, marginTop: 22, marginLeft: 20, marginRight: 20, marginBottom: 10, justifyContent: "center", alignContent: 'center', alignSelf: 'center' }}>
                            <View style={styles.imagecontainer}>
                                <Image source={require('../../assets/icon_dumy.png')} resizeMode="contain" style={{ width: '100%', height: 250, alignSelf: 'center' }}></Image>
                            </View>

                            <Text style={[styles.textstyle, { color: '#474645', fontWeight: 'bold', fontSize: 24, textAlign: 'center' } || {}]}> {this.props.route.params.DesignerData.first_name + " " + this.props.route.params.DesignerData.last_name}</Text>

                            {this.state.isresponded ? <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5 }}>
                                <Image
                                    imagestyle={{ height: 15, width: 9 }} style={{ height: 15, width: 9, borderColor: mycolor.pink }} source={require('../../assets/icon_phone.png')} ></Image>
                                <Text style={[styles.textstyle, { color: '#474645', fontWeight: 'bold', fontSize: 14, textAlign: 'center', marginLeft: 5 } || {}]}>{this.props.route.params.DesignerData.phone}</Text>

                            </View> : null}

                            {!(this.state.isresponded)
                                ? <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 10, alignSelf: 'center' }}>
                                    <Image style={{ height: 300, width: 200 }} resizeMode='contain' source={require('../../assets/icon_designprocedure.png')} />
                                    <ButtonComp
                                        isloading={this.state.contentLoading}
                                        textstyle={{ color: 'white' }} style={{ marginTop: 10 }} text={Trans.translate('RequestDesign')} onPress={() => this.SendRequestDesigners(this.props.route.params.DesignerData.id)}> </ButtonComp>

                                </View> : null}
                            {/* after Acceptview */}
                            {this.state.isresponded ? <View >
                                <View style={{ marginLeft: 10, marginTop: 10 }}>
                                    <Text style={[styles.textstyle, { marginTop: 10, color: '#474645', fontWeight: 'bold', fontSize: 24, alignSelf: 'center', marginLeft: 5 } || {}]}>{Trans.translate("pleasewait")}</Text>
                                    <Text style={[styles.textstyle, { marginTop: 15, color: '#474645', fontWeight: 'bold', fontSize: 14, alignSelf: 'center', marginLeft: 5 } || {}]}>{Trans.translate("progresswait")}</Text>
                                    <Text style={[styles.textstyle, { marginTop: 20, color: mycolor.lightgray, textAlign: 'center', fontSize: 14, alignSelf: 'center', margin: 15 } || {}]}>{Trans.translate("pleasewaitdesigner")}</Text>

                                </View>

                                <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>
                                    {/* <View style={{ flex: 1, marginLeft: 20, margin: 10 }}>
                                        <ButtonComp
                                            // onPress={() => this.props.navigation.goBack()}
                                            onPress={() => this.props.navigation.push('Designer')}
                                            text={Trans.translate("changedesigner")}
                                            style={{ backgroundColor: mycolor.white, marginTop: 20 }}
                                            textcolor={mycolor.darkgray}
                                            textstyle={{ color: mycolor.pink }} />
                                    </View> */}

                                    <View style={{ flex: 1, marginRight: 20, margin: 10 }}>

                                        <ButtonComp
                                            onPress={() => this.props.navigation.navigate('ChooseCategory')}
                                            text={Trans.translate("guestlist")}
                                            style={{ backgroundColor: mycolor.pink, marginTop: 20, }}
                                            textcolor={mycolor.white}
                                            textstyle={{ color: mycolor.white }}
                                            isloading={this.state.contentLoading} />

                                    </View>
                                </View>
                            </View> : null}
                            {/* after Acceptview */}
                        </View>
                    </View>
                </ScrollView>
            </View>
        );
    }

    componentDidMount() {
        if ((this.props.route.params.DesignerData.request_status == '1') || this.props.route.params.DesignerData.design_status == '1') {
            console.log(this.props.route.params.DesignerData.request_status);
            console.log(this.props.route.params.DesignerData.design_status);
            console.log(this.props.route.params.DesignerData.designer_id);
            // if ((this.props.route.params.DesignerData.request_status == '1' || this.props.route.params.DesignerData.design_status == '0') || (this.props.route.params.DesignerData.request_status == '1' && this.props.route.params.DesignerData.design_status == '1')) {
            if (this.props.route.params.DesignerData.request_status == undefined || this.props.route.params.DesignerData.design_status == undefined) {
                this.setState({ isresponded: false })
            }

            else if ((this.props.route.params.DesignerData.request_status == '1') || this.props.route.params.DesignerData.design_status == '1') {
                this.setState({
                    isresponded: true
                });
            }
        }

        logCallback = (log, callback) => {
            console.log(log);
            this.setState({
                callback
            });
        }
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: 'center',
    },
    textstyle: {
        color: mycolor.lightgray,
        fontSize: 12
    }
});