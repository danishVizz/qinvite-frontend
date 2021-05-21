import React, { Component } from "react";
import Trans from '../Translation/translation'
import { StyleSheet, View, Image, TextInput, Text, ToastAndroid, Platform} from 'react-native';
import mycolor from "../Constants/Colors";
import EditTextComp from "../Components/EditTextComp";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "../Components/HeaderComp";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CircleImageComp from "../Components/CircleImageComp";
import * as ImagePicker from 'react-native-image-picker';
import Prefs from '../Prefs/Prefs'
import Keys from '../Constants/keys'
import ApiCalls from '../Services/ApiCalls'
import { Alert } from "react-native";
import { ActivityIndicator } from "react-native";
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
// import asst from '../../assets/'

const iamgepath = '../../assets';


export default class Profile extends Component {
    state = {
        backgroundColor: mycolor.lightgray,
        allfieldsenabel: false,
        changetext: true,
        response: null,
        user_id: '',
        firstnametxt: '',
        lastnametxt: "",
        emailtxt: '',
        idcardtxt: '',
        citytxt: '',
        phonetxt: '',
        countrytxt: '',
        isLoading: false
    }

    render() {
        return (
            <SafeAreaView style={styles.conatiner}>
                <HeaderComp selfalign={'flex-end'} titleclick={() => this.changeviews()} textfonts={'bold'} titlepos='right' titleColor={'black'} title={this.state.changetext == true ? Trans.translate('Edit') : Trans.translate('Save')} fromleft={7} lefttintColor={mycolor.darkgray} headerStyle={{ backgroundColor: mycolor.white }} leftBtn={require(iamgepath + '/icon_back.png')}
                leftBtnClicked={()=>this.props.navigation.goBack()}></HeaderComp>
                <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">
                    <View style={styles.innercontainer}>
                        <View style={{ justifyContent: 'center', alignSelf: 'center', height: 150 }}>
                            {/* <CircleImageComp imagesrc={(this.state.response == null || this.state.response == '') ? require('../../assets/profile-icon.png') : { uri: this.state.response }} backgroundColor='orange' style={styles.circleimage} imagestyle={{ height: 100, width: 100, borderRadius: 50,borderColor:'red',borderWidth:1 }}></CircleImageComp> */}
                            <Image
                                source={
                                    (this.state.response == null || this.state.response == '') ? require('../../assets/profile-icon.png') : { uri: this.state.response }}
                                style={{ width: 100, height: 100, borderRadius: 100 / 2, borderColor: 'white', borderWidth: 1 }}
                            />
                            <View style={{ position: 'absolute', alignSelf: 'center', bottom: 10, right: 10, borderColor: 'white' }}>
                                <TouchableOpacity onPress={this.chooseImage}>
                                    <CircleImageComp style={{ borderColor: 'white', borderWidth: 3 }} imagesrc={require('../../assets/icon_camera.png')} ></CircleImageComp>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            {this.state.isLoading && <ActivityIndicator size="large" color={mycolor.pink} />}
                        </View>
                        <EditTextComp value={this.state.firstnametxt} isEnable={this.state.allfieldsenabel} onChangeText={(firstname) => this.setState({ firstnametxt: firstname, eventnameError: false })} text={Trans.translate('FirstName')} ></EditTextComp>
                        <EditTextComp value={this.state.lastnametxt} isEnable={this.state.allfieldsenabel} onChangeText={(lastname) => this.setState({ lastnametxt: lastname, eventnameError: false })} text={Trans.translate('LastName')}></EditTextComp>
                        <EditTextComp value={this.state.emailtxt} isEnable={this.state.allfieldsenabel} onChangeText={(email) => this.setState({ emailtxt: email, eventnameError: false })} text={Trans.translate('Email')}></EditTextComp>
                        <EditTextComp value={this.state.idcardtxt} isEnable={this.state.allfieldsenabel} onChangeText={(idcard) => this.setState({ idcardtxt: idcard, eventnameError: false })} text={Trans.translate('IDCard')}></EditTextComp>
                        <EditTextComp value={this.state.citytxt} isEnable={this.state.allfieldsenabel} onChangeText={(city) => this.setState({ citytxt: city, eventnameError: false })} text={Trans.translate('City')}></EditTextComp>
                        <EditTextComp value={this.state.phonetxt} isEnable={this.state.allfieldsenabel} onChangeText={(phone) => this.setState({ phonetxt: phone, eventnameError: false })} text={Trans.translate('Phonenumber')}></EditTextComp>
                        <EditTextComp value={this.state.countrytxt} isEnable={this.state.allfieldsenabel} onChangeText={(country) => this.setState({ countrytxt: country, eventnameError: false })} text={Trans.translate('Country')}></EditTextComp>

                        <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: 'center' }} onPress={() => this.DeleteProfile()}>

                            <Image style={{ height: 17, width: 15 }} resizeMode='contain' source={require('../../assets/icon_delete.png')}></Image>
                            <Text style={{ alignItems: 'center', marginLeft: 10, fontSize: 14, color: mycolor.pink }}>{Trans.translate('DeleteAcc')}</Text>

                        </TouchableOpacity>
                        <TouchableOpacity style={{ height: 50, flexDirection: 'row', alignItems: 'center' }} onPress={() => this.logout()}>
                            <Image style={{ height: 17, width: 15 }} resizeMode='contain' source={require('../../assets/logout.png')}></Image>
                            <Text style={{ alignItems: 'center', marginLeft: 10, fontSize: 14, color: mycolor.pink }}>{Trans.translate('logout')}</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </SafeAreaView>

        );
    }
    componentDidMount() {
        this.getUserData()
    }

    async getUserData() {
        var userdata = await Prefs.get(Keys.userData);
        console.log(userdata)
        var parsedata = JSON.parse(userdata)
        this.setState({ firstnametxt: parsedata.first_name })
        this.setState({ lastnametxt: parsedata.last_name })
        this.setState({ emailtxt: parsedata.email })
        this.setState({ idcardtxt: parsedata.username })
        this.setState({ citytxt: parsedata.city })
        this.setState({ phonetxt: parsedata.phone })
        this.setState({ countrytxt: parsedata.country })
        this.setState({ user_id: parsedata.id })
        this.setState({ response: parsedata.user_image })
    }


    onProfileUpdate() {
        
        var photo = {
            uri: Platform.OS === "android" ? this.state.response : this.state.response.replace("file://", ""),
            type: 'image/jpeg',
            name: 'photo.jpg',
        };
        
        console.log("Imageeeeeeee" + JSON.stringify(photo))
        var formadata = new FormData()
        formadata.append("firstname", this.state.firstnametxt)
        formadata.append("lastname", this.state.lastnametxt)
        formadata.append("cnic", this.state.idcardtxt)
        formadata.append("user_id", this.state.user_id)
        formadata.append("email", this.state.emailtxt)
        formadata.append("city", this.state.citytxt)
        formadata.append("phone", this.state.phonetxt)
        formadata.append("country", this.state.countrytxt)
        
        if (photo.uri == "" || photo.uri == null) {

        } else {
            formadata.append("user_image ", photo)
        }
        
        this.logCallback('Updating Started....', this.state.isLoading = true);
        ApiCalls.postApicall(formadata, "update_user").then(data => {
            this.logCallback("Response came", this.state.isLoading = false);
            if (data.status == true) {
                Prefs.save(Keys.userData, JSON.stringify(data.data))
                console.log("---updatedDaata" + JSON.stringify(data.data))
                this.notifyMessage(data.message)
                // this.getUserData()
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.isLoading = false);
            Alert.alert('Error', JSON.stringify(error));
        }
        )
        return
    }

    async DeleteProfile() {
        this.logCallback("DeleteEvent :", this.state.contentLoading = true);
        ApiCalls.deletapicall("delete_user", this.state.user_id).then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
            if (data.status == true) {
                if (Platform.OS === 'ios') {
                    AsyncStorage.getAllKeys().then(AsyncStorage.multiRemove);
                } else {
                    AsyncStorage.clear()
                }
                this.props.navigation.navigate('LandingScreen')
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.contentLoading = false);
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }

    async logout() {
        // AsyncStorage.clear()
        //     .then(() => this.props.navigation.dispatch(
        //         StackActions.popToTop()
        //     ));

        const asyncStorageKeys = await AsyncStorage.getAllKeys();
        if (asyncStorageKeys.length > 0) {
            if (Platform.OS === 'android') {
                await AsyncStorage.clear();
                this.props.navigation.dispatch(
                    StackActions.pop(1)
                )

                // const pushAction = StackActions.push('LandingScreen');
                // this.props.navigation.dispatch(pushAction);
            }
            if (Platform.OS === 'ios') {
                await AsyncStorage.multiRemove(asyncStorageKeys);
                this.props.navigation.dispatch(
                    StackActions.pop(1)
                )

                // const pushAction = StackActions.push('LandingScreen');
                // this.props.navigation.dispatch(pushAction);
            }
        } else {
            this.props.navigation.dispatch(
                StackActions.pop(1)
            )
        }
    }
    notifyMessage(msg) {
        if (Platform.OS === 'android') {
          ToastAndroid.show(msg, ToastAndroid.SHORT)
        } else {
          Alert.alert(msg);
        }
      }
    

    logCallback = (log, callback) => {
        console.log(log);
        this.setState({
            callback
        });
    }

    changeviews() {
        this.setState({ changetext: !this.state.changetext, allfieldsenabel: !this.state.allfieldsenabel })
        if (!(this.state.changetext))
            this.onProfileUpdate()
    }

    chooseImage = () => {
        ImagePicker.launchImageLibrary(
            {
                mediaType: 'photo' || 'video',
                includeBase64: false,
                maxHeight: 500,
                maxWidth: 500,
            },
            (responses) => {
                this.setState({ response: responses.uri });
                console.log(responses.uri)
            },
        )
    }
}

const styles = StyleSheet.create({
    conatiner: {
        flex: 1,
        backgroundColor: '#fff'
    },
    innercontainer: {
        flex: 1,
        marginTop: 21,
        margin: 33,
        backgroundColor: '#fff'
    },
    circleimage: {
        height: 120,
        width: 120,
        borderRadius: 120,
        borderColor: 'white'

    }

});

