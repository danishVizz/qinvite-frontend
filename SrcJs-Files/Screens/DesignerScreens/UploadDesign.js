import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mycolor from '../../Constants/Colors';
import Trans from '../../Translation/translation'
import * as Progress from 'react-native-progress';
import ButtonComp from '../../Components/ButtonComp';
import HeaderComp2 from '../../Components/HeaderComp2';
import * as ImagePicker from 'react-native-image-picker';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Alert, Dimensions } from 'react-native';
import { CheckBox } from "react-native-elements";
import Snackbar from 'react-native-snackbar';

const WINDOW = Dimensions.get('window');
export default class UploadDesign extends Component {

    state = {
        imageuri: '',
        progress: 0.5,
        spaceadjustcheck: false,
        qualitycheck: false
    }

    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor='#F54260'
                />
                <HeaderComp2 alignSelf='center' textfonts='bold' leftBtn={require('../../../assets/icon_back.png')} title={Trans.translate('UploadDesign')} titlepos='center'
                    leftBtnClicked={() => this.props.navigation.goBack()} ></HeaderComp2>
{/* <ScrollView> */}
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, alignSelf: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../../assets/icon_uploadhint.png')} resizeMode='center'></Image>
                    </View>
                    <View style={{ flex: 2, alignSelf: 'center', justifyContent: 'flex-start', alignSelf: 'center' }}>
                        <Text style={{ color: 'black', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 10 }}>{Trans.translate('UploadDesign')}</Text>
                        <View style={{ borderRadius: 2, borderWidth: 0.5, borderColor: 'black', padding: 10, margin: 10 }}>

                            <Text style={{ fontSize: 14, textAlign: 'center' }}>{Trans.translate('PointtoPonder')}</Text>

                            <CheckBox
                                checked={this.state.langenglish}
                                textStyle={{ fontSize: 10, fontFamily: 'normal', color: "#474645" }}
                                onPress={() => this.SelectLanguage(this.state.langarabic, this.state.langenglish)}
                                checked={this.state.spaceadjustcheck}
                                onPress={() => this.setState({ spaceadjustcheck: !(this.state.spaceadjustcheck) })}
                                containerStyle={{ backgroundColor: 'transparent', height: 10 }}
                                checkedIcon={<Image source={require('../../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                                uncheckedIcon={<Image source={require('../../../assets/icon_oval.png')} style={{ height: 20, width: 20 }} />}
                                title={Trans.translate('SpaceAdjusted')}
                            ></CheckBox>
                            <CheckBox
                                checked={this.state.langenglish}
                                textStyle={{ fontSize: 10, fontFamily: 'normal', color: "#474645" }}
                                onPress={() => this.setState({ qualitycheck: !(this.state.qualitycheck) })}
                                checked={this.state.qualitycheck}
                                containerStyle={{ backgroundColor: 'transparent', height: 10 }}
                                checkedIcon={<Image source={require('../../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                                uncheckedIcon={<Image source={require('../../../assets/icon_oval.png')} style={{ height: 20, width: 20 }} />}
                                title={Trans.translate('DesignQuality')}
                            ></CheckBox>
                        </View>
                        <CheckBox
                            checked={this.state.langenglish}
                            textStyle={{ fontSize: 10, fontFamily: 'normal', color: "#474645" }}
                            checked={true}
                            containerStyle={{ backgroundColor: 'transparent', height: 10 }}
                            checkedIcon={<Image source={require('../../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                            uncheckedIcon={<Image source={require('../../../assets/icon_oval.png')} style={{ height: 20, width: 20 }} />}
                            title={Trans.translate('Filesizehint')}
                        ></CheckBox>

                        <TouchableOpacity onPress={() => this.chooseImage()}>
                            <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'normal', marginTop: 20, color: mycolor.pink }}>{Trans.translate('Browse')}</Text>
                        </TouchableOpacity>

                        <View style={{ flexDirection: 'row', marginTop: 30, alignSelf: 'center' }}>
                            <Image style={{ height: 25, width: 25 }} source={require('../../../assets/icon_camera.png')}></Image>
                            <Progress.Bar borderColor='#FBEEF1' indeterminate={false} style={{ margin: 10, backgroundColor: '#FBEEF1' }} progress={this.state.progress} width={200} color={mycolor.pink} />
                        </View>

                        <ButtonComp style={{ marginTop: 30 }} textstyle={{ color: 'white', fontWeight: 'bold' }} text={Trans.translate('Send')}
                            onPress={() => this.createDesign()}>
                        </ButtonComp>
                    </View>
                </View>
                {/* </ScrollView> */}
            </SafeAreaView>

        );
    }

    createDesign() {
        if (this.state.imageuri != '') {
            this.props.navigation.navigate('DumyEditor', { "imagedata": this.state.imageuri })
        }
        else {
            Snackbar.show({
                text: Trans.translate("ImageSelection"),
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }
    chooseImage = () => {
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo',
                includeBase64: false,
                maxHeight: WINDOW.height / 2,
                maxWidth: WINDOW.width - 20,
            },
            (responses) => {
                this.setState({ response: responses, imageuri: responses.uri, progress: 1 });
                console.log(responses.uri)
            },
        )
    }
}