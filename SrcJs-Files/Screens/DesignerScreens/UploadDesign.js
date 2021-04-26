import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackActions } from '@react-navigation/native';
import mycolor from '../../Constants/Colors';
import Trans from '../../Translation/translation'
import * as Progress from 'react-native-progress';
import ButtonComp from '../../Components/ButtonComp';
import HeaderComp2 from '../../Components/HeaderComp2';
import StatusBarComp from '../../Components/StatusBarComp';
import * as ImagePicker from 'react-native-image-picker';
import { ScrollView, } from 'react-native-gesture-handler';
import { Alert, Dimensions } from 'react-native';
import { CheckBox } from "react-native-elements";
import Snackbar from 'react-native-snackbar';
import ApiCalls from '../../Services/ApiCalls';

const WINDOW = Dimensions.get('window');
export default class UploadDesign extends Component {

    state = {
        imageuri: '',
        progress: 0.5,
        spaceadjustcheck: false,
        qualitycheck: false,
        attachmentUrl: '',
        isLoading: false
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                {/* <StatusBar
                    backgroundColor='#F54260'
                /> */}
                {/* <HeaderComp2 alignSelf='center' textfonts='bold' leftBtn={require('../../../assets/icon_back.png')} title={Trans.translate('UploadDesign')} titlepos='center' leftBtnClicked={() => this.props.navigation.goBack()} ></HeaderComp2> */}
                <HeaderComp2 alignSelf='center' textfonts='bold' leftBtn={require('../../../assets/icon_back.png')} title={Trans.translate('UploadDesign')} titlepos='center' leftBtnClicked={() => this.props.navigation.goBack()}></HeaderComp2>
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
                                textStyle={{ fontSize: 12, fontWeight: 'normal', color: "#474645" }}
                                onPress={() => this.SelectLanguage(this.state.langarabic, this.state.langenglish)}
                                checked={this.state.spaceadjustcheck}
                                onPress={() => this.setState({ spaceadjustcheck: !(this.state.spaceadjustcheck) })}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, paddingTop: 0, paddingBottom: 0 }}
                                checkedIcon={<Image source={require('../../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                                uncheckedIcon={<Image source={require('../../../assets/icon_oval.png')} style={{ height: 20, width: 20 }} />}
                                title={Trans.translate('SpaceAdjusted')}
                            ></CheckBox>
                            <CheckBox
                                checked={this.state.langenglish}
                                textStyle={{ fontSize: 12, fontWeight: 'normal', color: "#474645" }}
                                onPress={() => this.setState({ qualitycheck: !(this.state.qualitycheck) })}
                                checked={this.state.qualitycheck}
                                containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, paddingTop: 0, paddingBottom: 0 }}
                                checkedIcon={<Image source={require('../../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                                uncheckedIcon={<Image source={require('../../../assets/icon_oval.png')} style={{ height: 20, width: 20 }} />}
                                title={Trans.translate('DesignQuality')}
                            ></CheckBox>
                        </View>
                        <CheckBox
                            checked={this.state.langenglish}
                            textStyle={{ fontSize: 14, fontWeight: 'normal', color: "#474645", textAlign: 'center' }}
                            checked={true}
                            containerStyle={{ backgroundColor: 'transparent', borderWidth: 0, width: '70%', alignSelf: 'center', paddingTop: 0, paddingBottom: 0 }}
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
                            onPress={() => this.checkConditions()}
                            isloading={this.state.isLoading}>
                        </ButtonComp>
                    </View>
                </View>
                {/* </ScrollView> */}
            </View>

        );
    }

    componentDidMount() {
        console.log("EVENT DATA");
        console.log(this.props.route.params.event);
    }

    checkConditions(){
        if (this.state.qualitycheck == true && this.state.spaceadjustcheck == true) {
            this.createDesign();
        } else {
            Alert.alert(Trans.translate('conditions'), Trans.translate('check_all_required_conditions_msg')); 
        }
    }

    createDesign() {
        if (this.props.route.params.from == undefined) {
            if (this.state.imageuri != '') {
                this.props.navigation.navigate('DumyEditor', { "imagedata": this.state.imageuri })
            }
            else {
                console.log("thisis here");
                Snackbar.show({
                    text: Trans.translate("ImageSelection"),
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        } else {
            console.log("this is There");
            this.submitDesign();
        }
    }

    async submitDesign() {
        this.setState({ isLoading: true});
        var photo = {
            uri: Platform.OS === "android" ? this.state.attachmentUrl : this.state.attachmentUrl.replace("file://", ""),
            type: 'image/*',
            name: 'photo.jpg',
        };
        console.log("photo data");
        console.log(photo);
        var formadata = new FormData()
        formadata.append("designer_id", this.props.route.params.event.designer_id);
        formadata.append("event_id", this.props.route.params.event.event_id);
        formadata.append("event_card", photo);

        ApiCalls.postApicall(formadata, "submit_design").then(data => {
            // if (data.status == true) {
            //     this.setState({ isLoading: false});
            // } else {
            //     console.log(data);
            //     Alert.alert('Failed', data.message);
            //     this.setState({ isLoading: false});
            // }
            this.setState({ isLoading: false});
            this.props.navigation.dispatch(
                StackActions.popToTop()
            )
        }, error => {
            Alert.alert('Error', JSON.stringify(error));
            this.setState({ isLoading: false});
        }
        )

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
                this.setState({
                    attachmentUrl: responses.uri
                })
            },
        )
    }
}