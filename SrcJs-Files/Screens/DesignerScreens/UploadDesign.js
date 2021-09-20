
import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native';
import mycolor from '../../Constants/Colors';
import Trans from '../../Translation/translation'
import Video from 'react-native-video';
import * as Progress from 'react-native-progress';
import ButtonComp from '../../Components/ButtonComp';
import HeaderComp2 from '../../Components/HeaderComp2';
import StatusBarComp from '../../Components/StatusBarComp';
import * as ImagePicker from 'react-native-image-picker';
import { Alert, Dimensions } from 'react-native';
import { CheckBox } from "react-native-elements";
import Snackbar from 'react-native-snackbar';
import ApiCalls from '../../Services/ApiCalls';
import NetworkUtils from "../../Constants/NetworkUtils";

const WINDOW = Dimensions.get('window');
export default class UploadDesign extends Component {

    state = {
        imageuri: '',
        progress: 0.5,
        spaceadjustcheck: false,
        qualitycheck: false,
        attachmentUrl: '',
        isLoading: false,
        mediaType: 'photo'
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
                <ScrollView style={{ flex: 1 }}>
                    <View style={{ alignSelf: 'center', justifyContent: 'center', marginTop: 20 }}>
                        <Image resizeMode={this.state.attachmentUrl == '' ? 'contain' : 'contain'} style={{ width: 300, height: 300, borderRadius: 15 }} source={(this.state.attachmentUrl == '' || this.state.mediaType == 'video') ? require('../../../assets/icon_uploadhint.png') : { uri: this.state.attachmentUrl }}></Image>
                        <Video
                            ref={ref => this._video = ref}
                            source={{ uri: this.state.attachmentUrl }}
                            resizeMode={'cover'}
                            repeat={true}
                            paused={true}
                            onLoad={() => this._onLoad()}
                        />
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
                </ScrollView>
                {/* </ScrollView> */}
            </View>

        );
    }

    componentDidMount() {
        // console.log("EVENT DATA");
        // console.log(this.props.route.params.event);
    }

    _onLoad(data) {
        let durationVideo = data.duration
        console.log(durationVideo)
    }

    checkConditions() {
        if (this.state.qualitycheck == true && this.state.spaceadjustcheck == true) {
            this.createDesign();
        } else {
            Alert.alert(Trans.translate('conditions'), Trans.translate('check_all_required_conditions_msg'));
        }
    }

    createDesign() {
        if (this.props.route.params.from == undefined) {
            if (this.state.attachmentUrl != '') {
                this.props.navigation.navigate('DumyEditor', { "imagedata": this.state.attachmentUrl })
            }
            else {
                Snackbar.show({
                    text: Trans.translate("ImageSelection"),
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        } else {
            if (this.state.attachmentUrl == "") {
                Alert.alert(Trans.translate('add_image'), Trans.translate('choose_design_image'))
                return
            } else {
                this.submitDesign();
            }
        }
    }

    async submitDesign() {
        const isConnected = await NetworkUtils.isNetworkAvailable()
        if (!isConnected) {
            Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
            return
        }
        this.setState({ isLoading: true });
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
            this.setState({ isLoading: false });
            this.props.navigation.navigate("DesignerRequests");
            // this.props.navigation.dispatch(
            //     StackActions.popToTop()
            // )
        }, error => {
            Alert.alert('Error', JSON.stringify(error));
            this.setState({ isLoading: false });
        }
        )

    }

    chooseImage = () => {
        this.mediaOptionAlert()
    }

    popImagePicker = (mediaType) => {
        ImagePicker.launchImageLibrary(
            {
                mediaType: mediaType, // 'photo', 'video
                includeBase64: false,
                quality:1
                // maxHeight: WINDOW.height / 2,
                // maxWidth: WINDOW.width - 20,
            },
            (responses) => {
                this.requireddimensions(responses.uri)
                if (responses.fileSize > 2000000) {
                    Alert.alert(Trans.translate("alert"), Trans.translate('filesize'))
                } else {
                    console.log("I AM IN MEDIA SUCCESS")
                    this.setState({ response: responses, imageuri: responses.uri, progress: 1, mediaType: mediaType, attachmentUrl: responses.uri });
                    console.log(responses.uri)
                }
            },
        )
    }

    requireddimensions(path) {
        Image.getSize(path, (imgwidth, imgheight) => {
           mykeys.IMAGE_WIDTHDIMENSIONS=imgwidth
        })
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
}