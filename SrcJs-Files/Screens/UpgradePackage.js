
import { SafeAreaView, Text } from "react-native"
import { View } from "react-native"
import React, { PureComponent } from 'react';
import PackagesComp from "../Components/PackagesComp";

import StatusBarComp from '../Components/StatusBarComp';
import Prefs from '../Prefs/Prefs';
import mykeys from '../Constants/keys';
import Trans from '../Translation/translation';
import HeaderComp2 from "../Components/HeaderComp2";
import mycolor from "../Constants/Colors";
import TextInputComp from "../Components/TextInputComp";
import ButtonComp from "../Components/ButtonComp";


export default class UpgradePackage extends PureComponent {
    state = {
        invitationcounttxt: '0'

    }

    render() {
        var invitedata = mykeys.invitealldata
        var packagedetails = invitedata["Eventdata"].package_details
        // console.log("EventDataaaaa" + JSON.stringify(invitedata["Eventdata"]))
        
        return (
            <View>
                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp2 textfonts={'bold'} fromleft={10} title={Trans.translate('packagedetails')} textfonts={'normal'} textsize={16} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white' leftBtnClicked={() => this.props.navigation.goBack()} />
                <SafeAreaView style={{ marginLeft: 20, marginRight: 20 }}>
                    <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("selectedpackage")}</Text>

                    <PackagesComp
                        image={require('../../assets/icon_badge.png')}
                        title={packagedetails.package_name}
                        price={packagedetails.package_price}
                        invitationcount={packagedetails.package_people}
                    />

                    <Text style={{ fontSize: 14, marginTop: 15 }}>{Trans.translate("InivationCount")}</Text>
                    <TextInputComp
                        placeholder={'0'}
                        inputtype={'numeric'}
                        placeholderTextColor={mycolor.lightgray}
                        textinstyle={{ paddingLeft: 0, width: '100%' }}
                        onChangeText={(count) => this.setState({ invitationcounttxt: count, InvitaionCountError: false })}
                    />

                    <ButtonComp
                        onPress={() => this.props.navigation.navigate('Payment', {"event_data": mykeys.invitealldata["Eventdata"],"Type":"upgrade","People":this.state.invitationcounttxt})}
                        text={Trans.translate("upgrade")}
                        isloading={ this.state.setLoginLoading }
                        style={{ backgroundColor: mycolor.pink, marginTop: 30, marginLeft: 22, marginRight: 22 }}
                        textcolor={mycolor.white}
                        textstyle={{ color: mycolor.white }} />
                </SafeAreaView>
            </View>
        )
    }
    componentDidMount(){
        var invitedata = mykeys.invitealldata["Eventdata"]
        console.log("ssss"+invitedata)
    }

}