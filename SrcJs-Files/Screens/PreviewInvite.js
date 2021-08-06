import React from 'react'
import { Component } from "react";
import { StyleSheet, View, Image, Text, ActivityIndicator, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNImageToPdf from 'react-native-image-to-pdf';
import Video from 'react-native-video';
import ButtonComp from '../Components/ButtonComp';
import HeaderComp2 from '../Components/HeaderComp2';
import StatusBarComp from '../Components/StatusBarComp';
import mycolor from "../Constants/Colors";
import Trans from "../Translation/translation";
import Keys from "../Constants/keys";
import Prefs from "../Prefs/Prefs";
import ApiCalls from "../Services/ApiCalls";
import { ScrollView } from 'react-native-gesture-handler';
// import { StackActions } from 'react-navigation';
import { CommonActions, useNavigation } from '@react-navigation/native';
import moment from "moment";
import NetworkUtils from "../Constants/NetworkUtils";

export default class PreviewInvite extends Component {
    constructor(props) {
        super(props)
        console.log("RUNNNN")
        this.uriArr = Keys.invitealldata["ImageData"].split('.')
        this.ext = this.uriArr[this.uriArr.length - 1].toLowerCase()
        this.type = 'photo'
        if (this.ext == 'mp4' || this.ext == 'mov') {
            this.type = 'video'
        }
        console.log("CategoriesData", Keys.invitealldata["CategoriesMessages"])
    }

    state = {
        contentLoading: false
    }

    onBuffer() {
        console.log("BUFFERING")
    }

    videoError(error) {
        console.log("VIDEO ERRROR")
        console.log(error)
    }

    displayMessages(category) {
        return (
            <View style={{ flexDirection: 'row', marginTop: 15, marginLeft: 15 }}>
                <Text style={styles.textstyle}>{category.categoryname}</Text>
                <Text>{category.message}</Text>
            </View>
        )
    }

    render() {
        console.log(Keys.invitealldata["ImageData"])

        let categoryMessages = []
        for (let i = 0; i < Keys.invitealldata["CategoriesMessages"].length; i++) {
            let item = Keys.invitealldata["CategoriesMessages"][i]
            console.log({ item })
            categoryMessages.push(this.displayMessages(Keys.invitealldata["CategoriesMessages"][i]))
        }
        return (
            <View style={styles.container}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                {/* <StatusBar
                    backgroundColor={mycolor.pink} /> */}
                <HeaderComp2 alignSelf='center' textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={Trans.translate('CardPreview')} titlepos='center' leftBtnClicked={() => this.props.navigation.goBack()}></HeaderComp2>
                <ScrollView style={{ flex: 2.5 }}>
                    <View style={{ flex: 2.5, marginTop: 28, marginLeft: 20, marginRight: 20, marginBottom: 20, borderRadius: 2, borderWidth: 5, borderColor: 'white', elevation: 2 }}>
                        <View style={styles.imagecontainer}>
                            {/* <Image source={{ uri: Keys.invitealldata["ImageData"] }} style={{ height: 298, width: "100%", backgroundColor: 'white' }} resizeMode="center"></Image> */}
                            {this.type == 'photo' && <Image resizeMode='contain' style={{ width: '100%', height: 300, borderRadius: 6, backgroundColor: 'white', borderWidth: 1, borderColor: mycolor.lightgray }} source={{ uri: Keys.invitealldata["ImageData"] }}></Image>}
                            {this.type == 'video' && <Video source={{ uri: Keys.invitealldata["ImageData"] }}   // Can be a URL or a local file.
                                ref={(ref) => { this.player = ref }}     // Store reference
                                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                                onError={this.videoError}
                                controls={true}                   // Callback when video cannot be loaded
                                style={styles.backgroundVideo} />}
                        </View>
                        <Text style={{ marginLeft: 20, marginRight: 20, fontSize: 24, fontWeight: 'normal', color: mycolor.darkgray }}>{Keys.invitealldata["Eventdata"].event_name}</Text>

                        <View style={{ flexDirection: 'row', marginTop: 20 }}>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={styles.textstyle}>{Trans.translate('Date')}</Text>
                                <Text style={[styles.textstyle, { color: 'black' } || {}]}> {String(moment(Keys.invitealldata["Eventdata"].event_date).format("YYYY-MM-D"))}</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={styles.textstyle}>{Trans.translate('Time')}</Text>
                                <Text style={[styles.textstyle, { color: 'black' } || {}]}> {String(moment(Keys.invitealldata["Eventdata"].event_date).format("HH:MM A"))}</Text>
                            </View>

                        </View>
                        <View style={{ marginTop: 20 }}>
                            <Text style={styles.textstyle}>{Trans.translate('Place')}</Text>
                            <Text style={[styles.textstyle, { color: 'black' } || {}]}>{Keys.invitealldata["Eventdata"].event_address}</Text>
                        </View>
                        {categoryMessages.length > 0 && <Text style={[styles.textstyle, { marginTop: 20, fontSize: 16, fontWeight: 'bold' }]}>Messages</Text>}
                        {
                            categoryMessages
                        }
                    </View>

                    <View style={{ flex: 1, marginTop: 20, marginRight: 33, marginLeft: 33 }}>
                        <ButtonComp text={Trans.translate('SendInvites')}
                            textstyle={{ color: mycolor.white, fontWeight: 'bold' }}
                            // isloading={this.state.contentLoading}
                            onPress={() => this.CreateEvent()}>

                        </ButtonComp>
                        {/* <ButtonComp style={{ marginTop: 15, backgroundColor: mycolor.white }}
                            onPress={()=> this.myAsyncPDFFunction()}
                            textstyle={{ color: mycolor.pink, fontWeight: 'bold' }} text={Trans.translate('Savepdf')} ></ButtonComp> */}
                    </View>
                </ScrollView>
                {this.state.contentLoading && <View style={{ flex: 1, position: 'absolute', backgroundColor: 'rgba(52, 52, 52, 0.8)', height: '100%', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <ActivityIndicator color={'#fff'} size='large' />
                    <Text style={{ marginHorizontal: 40, textAlign: 'center', marginTop: 20, color: '#fff' }}>{Trans.translate('invite_wait_msg')}</Text>
                </View>}
            </View>
        );
    }


    async myAsyncPDFFunction() {
        console.log("myAsyncPDFFunction()");
        try {

            var imagepath = Platform.OS === "android" ? Keys.invitealldata["ImageData"].replace("file:///", "") : Keys.invitealldata["ImageData"]
            console.log("imagepath");
            console.log(imagepath);
            const options = {
                imagePaths: [imagepath],
                // filePath: "/storage/emulated/0/Pictures/",
                name: 'PDFName.pdf',
                maxSize: { // optional maximum image dimension - larger images will be resized
                    width: 500,
                    height: 900
                },
                quality: .7, // optional compression paramter
            };
            const pdf = await RNImageToPdf.createPDFbyImages(options);
            // CameraRollExtended.saveToCameraRoll({uri: pdf.filePath, album: 'QInvites'}, 'photo')
            console.log("PdfFile" + pdf.filePath);
            console.log(pdf);
        } catch (e) {
            console.log(e);
        }
    }

    logCallback = (log, callback) => {
        console.log(log);
        this.setState({
            callback
        });
    }

    async CreateEvent() {
        const isConnected = await NetworkUtils.isNetworkAvailable()

        if (!isConnected) {
            Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
            return
        }
        this.logCallback("Creating Event :", this.state.contentLoading = true);
        var userdata = await Prefs.get(Keys.userData);
        var parsedata = JSON.parse(userdata);
        var alleventdata = Keys.invitealldata
        var uriArr = alleventdata["ImageData"].split('.')
        let ext = uriArr[uriArr.length - 1].toLowerCase()

    console.log("IMGGGGGGGGGGG"+alleventdata["ImageData"])
 

        var formadata = new FormData()
        formadata.append("width", Keys.IMAGE_WIDTHDIMENSIONS)
        var photo = {
            uri: Platform.OS === "android" ? alleventdata["ImageData"] : alleventdata["ImageData"].replace("file://", ""),
            type: 'video/*',
            name: 'media.' + ext,
        };
        formadata.append("event_card", photo)
        formadata.append("event_id", alleventdata["Eventdata"].event_id)
        formadata.append("categories_messages", JSON.stringify(alleventdata["CategoriesMessages"]))

      
        var categories = alleventdata["CategoriesData"]
        categories.map((item, index) => {
            formadata.append("categories[" + index + "]", item.id)
        })
        ApiCalls.postApicall(formadata, "add_event_details").then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
            if (data.status == true) {
                const resetAction = CommonActions.reset({
                    index: 0,
                    routes: [{ name: 'CombineComp' }],
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            console.log(error);
            this.logCallback("Something Went Wrong", this.state.contentLoading = false);
            // Alert.alert('Error', JSON.stringify(error));
            const resetAction = CommonActions.reset({
                index: 0,
                routes: [{ name: 'CombineComp' }],
            });
            this.props.navigation.dispatch(resetAction);
        }
        )
    }

    requireddimensions(path) {

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
        marginRight: 20,
        marginBottom: 20,
        borderWidth: 1,
        alignSelf: 'center',
        borderColor: mycolor.lightgray,
        borderRadius: 5,

    },
    textstyle: {
        marginLeft: 20,
        marginRight: 20,
        fontSize: 12,
        fontWeight: 'normal',
        color: mycolor.lightgray
    },
    backgroundVideo: {
        // position: 'absolute',
        height: 300,
        borderRadius: 6,
        borderWidth: 1,
        borderColor: mycolor.lightgray,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});