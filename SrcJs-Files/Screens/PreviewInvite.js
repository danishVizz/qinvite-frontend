import React from 'react'
import { Component } from "react";
import { StyleSheet, View, Image, Text, StatusBar, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import RNImageToPdf from 'react-native-image-to-pdf';
import CameraRollExtended from 'react-native-store-photos-album'
import ButtonComp from '../Components/ButtonComp';
import HeaderComp2 from '../Components/HeaderComp2';
import mycolor from "../Constants/Colors";
import Trans from "../Translation/translation";
import Keys from "../Constants/keys";
import Prefs from "../Prefs/Prefs";
import ApiCalls from "../Services/ApiCalls";
import { ScrollView } from 'react-native-gesture-handler';
import moment from "moment";

export default class PreviewInvite extends Component {
    state = {
        contentLoading: false
    }
    
    render() {
        console.log(Keys.invitealldata["ImageData"])
        return (
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor={mycolor.pink} />
                <HeaderComp2 alignSelf='center' textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={Trans.translate('CardPreview')} titlepos='center' ></HeaderComp2>
                <ScrollView style={{ flex: 2.5 }}>
                    <View style={{ flex: 2.5, marginTop: 28, marginLeft: 20, marginRight: 20, marginBottom: 20, borderRadius: 2, borderWidth: 5, borderColor: 'white', elevation: 2 }}>
                        <View style={styles.imagecontainer}>
                            <Image source={{ uri: Keys.invitealldata["ImageData"] }} style={{ height: 298, width: "100%",  backgroundColor: 'white' }} resizeMode="center"></Image>
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
                    </View>

                    <View style={{ flex: 1, marginTop: 20, marginRight: 33, marginLeft: 33 }}>
                        <ButtonComp text={Trans.translate('SendInvites')}
                            textstyle={{ color: mycolor.white, fontWeight: 'bold' }}
                            isloading={this.state.contentLoading}
                            onPress={() => this.CreateEvent()}>

                        </ButtonComp>
                        <ButtonComp style={{ marginTop: 15, backgroundColor: mycolor.white }}
                            onPress={()=> this.myAsyncPDFFunction()}
                            textstyle={{ color: mycolor.pink, fontWeight: 'bold' }} text={Trans.translate('Savepdf')} ></ButtonComp>

                    </View>
                </ScrollView>
            </SafeAreaView>
        );
    }

    componentDidMount() {
        // console.log("Event Data KEYS");
        // console.log(Keys.invitealldata["Eventdata"]);
        // console.log(Keys.invitealldata["Eventdata"].event_date);
        
    }

    async

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
        this.logCallback("Creating Event :", this.state.contentLoading = true);
        var userdata = await Prefs.get(Keys.userData);
        var parsedata = JSON.parse(userdata);
        var alleventdata = Keys.invitealldata
        var formadata = new FormData()
        var photo = {
            uri: Platform.OS === "android" ? alleventdata["ImageData"] : alleventdata["ImageData"].replace("file://", ""),
            type: 'image/jpeg',
            name: 'photo.jpg',
        };

        // formadata.append("event_card", alleventdata["ImageData"])
        formadata.append("event_card",photo)
        formadata.append("event_name", alleventdata["Eventdata"].event_name)
        formadata.append("event_date", String(moment(alleventdata["Eventdata"].event_date).format("YYYY-MM-D")))
        formadata.append("event_address", alleventdata["Eventdata"].event_address)
        formadata.append("user_id", parsedata.id)
        formadata.append("package_id", alleventdata["PackageData"])
        formadata.append("no_of_receptionists", alleventdata["Eventdata"].no_of_receptionists)

        var receptionists = alleventdata["Eventdata"].receptionists

        var categories = alleventdata["CategoriesData"].SelectedCategories

        receptionists.map((item, index) => {
            formadata.append("receptionists[" + index + "]", item.id)
        })
        categories.map((item, index) => {
            formadata.append("categories[" + index + "]", item.id)
        })
        console.log("Formdataaaaa?????" + JSON.stringify(formadata))

        ApiCalls.postApicall(formadata, "add_event").then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
            if (data.status == true) {
                this.props.navigation.navigate('CombineComp')
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.contentLoading = false);
            Alert.alert('Error', JSON.stringify(error));
            // this.props.navigation.navigate('CombineComp')
        }
        )
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