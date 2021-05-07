import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator, FlatList, TouchableOpacity, PermissionsAndroid } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mycolor from '../Constants/Colors';
import ApiCalls from '../Services/ApiCalls';
import CategoryComp from '../Components/CategoryComp'
import Trans from '../Translation/translation'
import { Alert } from 'react-native';
import Prefs from '../Prefs/Prefs'
import Keys from '../Constants/keys'
import AwesomeAlert from 'react-native-awesome-alerts';
import TextComp from '../Components/TextComp';
import StatusBarComp from '../Components/StatusBarComp';
import HeaderComp2 from '../Components/HeaderComp2';
import RNFetchBlob from 'rn-fetch-blob';

export default class CategoryList extends Component {
    state = {
        loading: false
    }
    render() {

        return (
            <View style={styles.container}>
                {/* {this.state.loading ? <AwesomeAlert
                    show={this.state.loading}
                    contentContainerStyle={{ width: '100%', borderRadius: 4 }}
                    showProgress={false}
                    onTextchange={() => this.getparentdata()}
                    closeOnTouchOutside={false}
                    closeOnHardwareBackPress={false}
                    customView={this.alertView()}
                /> : null } */}

                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp2 leftBtnClicked={() => this.props.navigation.goBack()} alignSelf='center' textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={Trans.translate('categories')} titlepos='center' ></HeaderComp2>

                {this.state.loading ?
                    this.loadingView() :
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={this.props.route.params.categories}
                            renderItem={this.renderItem.bind(this)}
                            keyExtractor={(item) => item.category_id}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false} />
                    </View>}

                {/* <ButtonComp
                    onPress={() => this.onNextScreen()}
                    text={Trans.translate("Next")}
                    isloading={this.state.setLoginLoading}
                    style={{ backgroundColor: mycolor.pink, marginBottom: 10, marginLeft: 22, marginRight: 22 }}
                    textcolor={mycolor.white}
                    textstyle={{ color: mycolor.white }} /> */}
            </View>
        );


    }

    componentDidMount() {
        // this.permissionFunc("https://qinvite.vizzwebsolutions.com/pdf/1620114635.jpg-1620298644.jpg.pdf")
    }

    loadingView() {
        return (
            <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(52, 52, 52, 0.5)', position: 'absolute', zIndex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <View>
                    <ActivityIndicator style={{ marginBottom: 20 }} size='large' color="#FFF" />
                    <TextComp
                        text="Downloading pdf ..." />
                </View>
            </View>
        )
    }

    alertView() {
        return (
            <View>
                <ActivityIndicator style={{ marginBottom: 20 }} size='large' color={mycolor.pink} />
                <TextComp
                    text="Downloading pdf ..." />
            </View>
        );
    }

    renderItem({ item, index }) {
        return (

            <TouchableOpacity
                style={{ borderWidth: 1, flexDirection: "row", borderColor: mycolor.lightgray, borderRadius: 5, margin: 15, padding: 30, alignItems: 'center' }}
                onPress={() => this.permissionFunc(item.pdf)}>
                {/* <CategoryComp lefticon={require('../../assets/icon_category.png')}
                    title={item.category_name}
                    innerright={null}
                    item={item}
                    containerstyle={this.state.isChecked[index] ? { backgroundColor: mycolor.lightPink } : {}}
                    fromchildprops={this.onPressButtonChildren}
                    righticon={null}></CategoryComp> */}
                <View >
                    <TextComp

                        textStyle={{ fontSize: 20, fontWeight: 'bold' }}
                        text={item.category_name}
                    />
                    <TextComp

                        textStyle={{ fontSize: 15, fontWeight: 'normal', marginTop: 5 }}
                        text={Trans.translate("Download_Pdf")}
                    />
                </View>
                <Image
                    style={{ marginLeft: 'auto', height: 30, width: 30 }}
                    source={require("../../assets/icon_download.png")}
                ></Image>
            </TouchableOpacity>
        );
    }

    permissionFunc = async (url) => {
        this.setState({ loading: true });
        if (Platform.OS == 'ios') {
            this.downloadPDF(url);
        } else {
            // if (this.state.downloaded) {
            try {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log("---Downloadfunc call")
                    this.downloadPDF(url);
                } else {
                    PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE && PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        {
                            'title': 'Save Pdf',
                            'message': 'This app would like to access storage to save pdf'
                        }
                    ).then(() => {
                        this.downloadPDF(url);
                    })
                    // showSnackbar('You need to give storage permission to download the file');

                }
            }
            catch (err) {
                console.warn(err);
            }
            // }
            // else {
            //     console.log('File is already downloaded.');
            // }
        }
    }

    downloadPDF = (url) => {
        console.log("Downloading")

        const { config, fs } = RNFetchBlob
        const date = new Date()
        const { dirs } = RNFetchBlob.fs;
        const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
        const configfb = {
            useDownloadManager: true,
            notification: true,
            path: `${dirToSave}/${(Math.floor(date.getTime() + date.getSeconds() / 2))}.pdf`,

        }

        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true, // setting it to true will use the device's native download manager and will be shown in the notification bar.
                notification: true,
                path: configfb.path, // this is the path where your downloaded file will live in
                description: 'Downloading Pdf.'
            }
        }

        const configOptions = Platform.select({
            ios: {
                fileCache: configfb.fileCache,
                title: configfb.title,
                path: configfb.path,
                appendExt: 'pdf',
            },
            android: options,
        });
        config(configOptions).fetch('GET', url).then((res) => {
            // console.log(JSON.stringify(res));
            this.setState({ loading: false });
            if (Platform.OS === "ios") {
                RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');
                RNFetchBlob.ios.previewDocument(configfb.path);
                console.log(res.path());
            }
            if (Platform.OS == 'android') {
                console.log("File downloaded" + res.path())
            }

        })
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
});