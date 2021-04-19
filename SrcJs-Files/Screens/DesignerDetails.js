import React, { Component } from 'react';
import { Alert, StatusBar } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import ButtonComp from '../Components/ButtonComp';
import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation';
import ApiCalls from '../Services/ApiCalls';
import Keys from '../Constants/keys';
import Prefs from '../Prefs/Prefs';
import { ScrollView } from 'react-native-gesture-handler';

export default class DesignerDetails extends Component {
    state = {
        contentLoading: false
    }

    render() {
        const desingertdata = this.props.route.params.DesingerData || 'none'
        return (
            <ScrollView>
                <View style={styles.container}>

                    <StatusBar
                        backgroundColor='white' />
                    <View style={{ width: '100%', flex: 1, marginTop: 22, marginLeft: 20, marginRight: 20, marginBottom: 10, justifyContent: "center", alignContent: 'center', alignSelf: 'center' }}>
                        <View style={styles.imagecontainer}>
                            <Image source={desingertdata.user_image == "" ? require('../../assets/icon_dumy.png') : desingertdata.user_image} resizeMode="contain" style={{ width: '100%', height: 250, alignSelf: 'center' }}></Image>
                        </View>

                        <Text style={[styles.textstyle, { color: '#474645', fontWeight: 'bold', fontSize: 24, alignSelf: 'center' } || {}]}> {desingertdata.first_name + " " + desingertdata.last_name}</Text>

                        <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5 }}>
                            <Image
                                imagestyle={{ height: 15, width: 9 }} style={{ height: 15, width: 9, borderColor: mycolor.pink }} source={require('../../assets/icon_phone.png')} ></Image>
                            <Text style={[styles.textstyle, { color: '#474645', fontWeight: 'bold', fontSize: 14, alignSelf: 'center', marginLeft: 5 } || {}]}>{desingertdata.phone}</Text>

                        </View>

                        <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 10, alignSelf: 'center' }}>
                            <Image style={{ height: 300, width: 250 }} resizeMode='contain' source={require('../../assets/icon_designprocedure.png')} />
                            <ButtonComp textstyle={{ color: 'white' }} style={{ marginTop: 20 }} text={Trans.translate('RequestDesign')} onPress={() => this.SendRequestDesigners(desingertdata.id)}> </ButtonComp>

                        </View>

                        <View style={{ marginLeft: 10, marginTop: 10 }}>

                            <Text style={[styles.textstyle, { marginTop: 10, color: '#474645', fontWeight: 'bold', fontSize: 24, alignSelf: 'center', marginLeft: 5 } || {}]}>{Trans.translate("pleasewait")}</Text>
                            <Text style={[styles.textstyle, { marginTop: 15, color: '#474645', fontWeight: 'bold', fontSize: 14, alignSelf: 'center', marginLeft: 5 } || {}]}>{Trans.translate("progresswait")}</Text>
                            <Text style={[styles.textstyle, { marginTop: 20, color: mycolor.lightgray, textAlign: 'center', fontSize: 14, alignSelf: 'center', marginLeft: 5 } || {}]}>{Trans.translate("pleasewaitdesigner")}</Text>

                        </View>

                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 20 }}>


                            <View style={{ flex: 1, marginLeft: 20, margin: 10 }}>
                                <ButtonComp
                                    onPress={() => this.props.navigation.navigate('Designer')}
                                    text={Trans.translate("changedesigner")}
                                    style={{ backgroundColor: mycolor.white, marginTop: 20 }}
                                    textcolor={mycolor.darkgray}
                                    textstyle={{ color: mycolor.pink }} />
                            </View>

                            <View style={{ flex: 1, marginRight: 20, margin: 10 }}>

                                <ButtonComp
                                    onPress={() => this.props.navigation.navigate('ChooseCategory')}
                                    text={Trans.translate("guestlist")}
                                    style={{ backgroundColor: mycolor.pink, marginTop: 20, }}
                                    textcolor={mycolor.white}
                                    textstyle={{ color: mycolor.white }} />

                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }


    logCallback = (log, callback) => {
        console.log(log);
        this.setState({
            callback
        });
    }

    async SendRequestDesigners(designerid) {
        this.logCallback("getAllDesigner :", this.state.contentLoading = true);
        var userdata = await Prefs.get(Keys.userData);
        var parsedata = JSON.parse(userdata);

        var formadata = new FormData()
        formadata.append("user_id", parsedata.id)
        formadata.append("designer_id", designerid)

        ApiCalls.postApicall(formadata, "request_designer").then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
            if (data.status == true) {
                this.setState({ designerdata: data.data })
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.contentLoading = false);
            Alert.alert('Error', JSON.stringify(error));
        }
        )
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