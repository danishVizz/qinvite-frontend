import { Component } from "react";
import React from 'react'
import { Image, StyleSheet, View, AsyncStorage } from "react-native";
import ButtonComp from "../Components/ButtonComp";
import { CheckBox } from "react-native-elements";
import Trans from "../Translation/translation";
import mycolor from "../Constants/Colors";
import Keys from '../Constants/keys';
import Prefs from '../Prefs/Prefs';

export default class SplashScreen extends Component {
    state = {
        isLoading: true,
        langarabic: true,
        langenglish: false,
        isSignedIn: false,
        userRole: ''
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    <Image style={{ height: 200, width: 200, alignSelf: 'center' }} resizeMode="contain" source={require('../../assets/icon_logo.png')}>
                    </Image>
                    <View style={{ flexDirection: 'row', marginTop: 20 }}>
                        <CheckBox
                            title="Arabic"
                            checked={this.state.langarabic}
                            onPress={() => this.SelectLanguage(this.state.langarabic, this.state.langenglish)}
                            checkedIcon={<Image source={require('../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                            uncheckedIcon={<Image source={require('../../assets/icon_oval.png')} style={{ height: 20, width: 20 }} />}
                        />
                        <CheckBox
                            checked={this.state.langenglish}
                            onPress={() => this.SelectLanguage(this.state.langarabic, this.state.langenglish)}
                            checked={this.state.langenglish}
                            checkedIcon={<Image source={require('../../assets/icon_check.png')} style={{ height: 20, width: 20 }} />}
                            uncheckedIcon={<Image source={require('../../assets/icon_oval.png')} style={{ height: 20, width: 20 }} />}
                            title="English"
                        ></CheckBox>
                    </View>
                    <View style={{ width: '80%', position: 'absolute', bottom: 40, }}>
                        <ButtonComp
                            onPress={() => this.redirectScreen()}
                            text={Trans.translate("Next")}
                            style={{ backgroundColor: mycolor.pink, marginTop: 20, }}
                            textcolor={mycolor.white}
                            textstyle={{ color: mycolor.white }} />
                    </View>
                </View>
            );
        }
    }

    redirectScreen() {
        if (this.state.isSignedIn) {
            this.props.navigation.replace('CombineComp')
        } else {
            this.props.navigation.replace('LandingScreen')
        }
    }

    SelectLanguage(langarabic, langenglish) {
        if (langarabic) {
            Trans.setI18nConfig("en");
            Prefs.save(Keys.SELECTED_LANGUAGE, 'en')
            this.setState({ langarabic: !(langarabic), langenglish: true })
        } else if (langenglish) {
            Trans.setI18nConfig("ar");
            Prefs.save(Keys.SELECTED_LANGUAGE, 'ar')
            this.setState({ langenglish: !(langenglish), langarabic: true })
        }
    }

    componentDidMount() {
        console.log('componentDidMount()');
        this.setLanguage()
        // this.signinStatus();
        this.getUserData();
    }

    setLanguage() {
        if (this.state.langarabic == true) {
            Trans.setI18nConfig("ar");
        } else {
            Trans.setI18nConfig("en");
        }
        this.setState({
            langarabic : this.state.langarabic
        })
    }

    async getUserData() {
        var userData = await Prefs.get(Keys.userData);
        var rememberMe = await Prefs.get(Keys.REMEMBER_ME) || false;
        if (userData != null && rememberMe) {
            console.log("userData 1");
            var parsedData = JSON.parse(userData);
            console.log(parsedData);
            this.setState({
                userRole: parsedData.role,
            }, () => this.redirectPage());
        }
    }

    redirectPage() {
        switch (this.state.userRole) {
            case "0":
            case "2":
                this.props.navigation.replace('CombineComp');
                break;
            case "4":
                this.props.navigation.replace('Reception');
                break;
            case "5":
                this.props.navigation.replace('DesignerRequests');
                break;
            default:
            // screen = 'SplashScreen';
        }
    }

    async signinStatus() {
        // this.clearAllData();
        var userData = await Prefs.get(Keys.userData);
        console.log('userData');
        console.log(userData);
        if (userData != undefined || userData != null) {
            this.setState({ isSignedIn: true });
        }
    }

    clearAllData() {
        AsyncStorage.getAllKeys()
            .then(keys => AsyncStorage.multiRemove(keys))
            .then(() => alert('success'));
    }

    performTimeConsumingTask = async () => {
        return new Promise((resolve) =>
            setTimeout(
                () => { resolve('result') },
                2000
            )
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: 'center'
    }
});
