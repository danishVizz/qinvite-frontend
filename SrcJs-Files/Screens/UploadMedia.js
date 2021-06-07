import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { CheckBox } from "react-native-elements";
import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation'
import * as Progress from 'react-native-progress';
import ButtonComp from '../Components/ButtonComp';
import HeaderComp2 from '../Components/HeaderComp2';
import StatusBarComp from '../Components/StatusBarComp';
import * as ImagePicker from 'react-native-image-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, Dimensions } from 'react-native';
import mykeys from '../Constants/keys';
// import Snackbar from 'react-native-snackbar';

const WINDOW = Dimensions.get('window');
export default class UploadMedia extends Component {

    state = {
        imageuri: '',
        mediaType: 'photo',
        progress: 0.5,
        spaceadjustcheck: false,
        qualitycheck: false,
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp2 alignSelf='center' textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={Trans.translate('UploadDesign')} titlepos='center'
                    leftBtnClicked={() => this.props.navigation.goBack()} ></HeaderComp2>
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ flex: 2, alignSelf: 'center', justifyContent: 'center' }}>
                        <Image resizeMode='cover' style={{
                            width: 300, height: 300, borderRadius: 15
                        }} source={(this.state.imageuri == '' || this.state.mediaType == 'video') ? require('../../assets/icon_uploadhint.png') : { uri: this.state.imageuri }}></Image>
                    </View>
                    <View style={{ flex: 2, alignSelf: 'center', justifyContent: 'flex-start', alignSelf: 'center' }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{Trans.translate('UploadMedia')}</Text>
                        <Text style={{ fontSize: 14, textAlign: 'center' }}>{Trans.translate('UploadDesc')}</Text>
                        <View style={{ borderRadius: 2, borderWidth: 0.5, borderColor: 'black', padding: 10, margin: 10 }}>
                            <Text style={{ fontSize: 14, textAlign: 'center' }}>{Trans.translate('PointtoPonder')}</Text>
                            <CheckBox
                                checked={this.state.langenglish}
                                textStyle={{ fontSize: 12, fontWeight: 'normal', color: "#474645" }}
                                onPress={() => this.SelectLanguage(this.state.langarabic, this.state.langenglish)}
                                checked={this.state.spaceadjustcheck}
                                onPress={() => this.setState({ spaceadjustcheck: !(this.state.spaceadjustcheck) })}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, paddingTop: 0, paddingBottom: 0 }}
                                checkedIcon={<Image source={require('../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                                uncheckedIcon={<Image source={require('../../assets/icon_oval.png')} style={{ height: 20, width: 20 }} />}
                                title={Trans.translate('SpaceAdjusted')}
                            ></CheckBox>
                            <CheckBox
                                checked={this.state.langenglish}
                                textStyle={{ fontSize: 12, fontWeight: 'normal', color: "#474645" }}
                                onPress={() => this.setState({ qualitycheck: !(this.state.qualitycheck) })}
                                checked={this.state.qualitycheck}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, paddingTop: 0, paddingBottom: 0 }}
                                checkedIcon={<Image source={require('../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                                uncheckedIcon={<Image source={require('../../assets/icon_oval.png')} style={{ height: 20, width: 20 }} />}
                                title={Trans.translate('DesignQuality')}
                            ></CheckBox>
                        </View>
                        <CheckBox
                            checked={this.state.langenglish}
                            textStyle={{ fontSize: 14, fontWeight: 'normal', color: "#474645", textAlign: 'center' }}
                            checked={true}
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, width: '70%', alignSelf: 'center', paddingTop: 0, paddingBottom: 0 }}
                            checkedIcon={<Image source={require('../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                            uncheckedIcon={<Image source={require('../../assets/icon_oval.png')} style={{ height: 20, width: 20 }} />}
                            title={Trans.translate('Filesizehint')}
                        ></CheckBox>
                        <TouchableOpacity onPress={() => this.chooseImage()}>
                            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'normal', marginTop: 20, color: mycolor.pink }}>{Trans.translate('Browse')}</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Image style={{ height: 25, width: 25 }} source={require('../../assets/icon_camera.png')}></Image>
                            <Progress.Bar borderColor='#FBEEF1' indeterminate={false} style={{ margin: 10, backgroundColor: '#FBEEF1' }} progress={this.state.progress} width={200} color={mycolor.pink} />
                        </View>

                        <ButtonComp style={{ marginTop: 30 }} textstyle={{ color: 'white', fontWeight: 'bold' }} text={Trans.translate('ProceedtoInvites')}
                            onPress={() => this.checkConditions()}>
                        </ButtonComp>
                    </View>
                </ScrollView>
            </View>

        );
    }

    createDesign() {
        if (this.state.imageuri != '') {

            var invitedata = mykeys.invitealldata
            invitedata = { "Eventdata": invitedata["Eventdata"], "PackageData": invitedata["PackageData"], "CategoriesData": invitedata['CategoriesData'], "ImageData": this.state.imageuri }
            mykeys.invitealldata = invitedata
           

            if (this.state.mediaType == 'photo') {
                this.props.navigation.navigate('ImageEditor', { "imagedata": this.state.imageuri })
            } else {
                if (mykeys.invitealldata['CategoriesData'] == undefined || mykeys.invitealldata['CategoriesData'] == "") {
                    this.props.navigation.navigate('Todos');
                }
                else {
                    this.props.navigation.navigate('SendEditor', { "imagedata": this.state.imageuri })
                }
            }

        }
        else {
            // Snackbar.show({
            //     text: Trans.translate("ImageSelection"),
            //     duration: Snackbar.LENGTH_SHORT,
            // });
        }
    }
    chooseImage = () => {
        this.mediaOptionAlert()
    }

    popImagePicker = (mediaType) => {
        ImagePicker.launchImageLibrary(
            {
                mediaType: mediaType, // 'photo', 'video
                includeBase64: false,
                maxHeight: WINDOW.height / 2,
                maxWidth: WINDOW.width - 20,
            },
            (responses) => {
                // console.log("Size "+this.niceBytes(responses.fileSize))
                if (responses.fileSize > 5000000)
                    Alert.alert(Trans.translate("alert"), Trans.translate('filesize'))
                else {
                    this.setState({ response: responses, imageuri: responses.uri, progress: 1, mediaType: mediaType });
                    console.log(responses.uri)
                }
            },
        )
    }

    mediaOptionAlert = () => {
        Alert.alert(
            "Choose from",
            "",
            [
                {
                    text: "Photo",
                    onPress: () => this.popImagePicker('photo'),
                    style: "cancel"
                },
                {
                    text: "Video", onPress: () => this.popImagePicker('video')
                }
            ]
        );
    }

    checkConditions() {
        if (this.state.qualitycheck == true && this.state.spaceadjustcheck == true) {
            this.createDesign();
        } else {
            Alert.alert(Trans.translate('conditions'), Trans.translate('check_all_required_conditions_msg'));
        }
    }
}