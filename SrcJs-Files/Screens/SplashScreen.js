import { Component } from "react";
import React from 'react'
import { Image, StyleSheet, View } from "react-native";
import ButtonComp from "../Components/ButtonComp";
import { CheckBox } from "react-native-elements";
import Trans from "../Translation/translation";
import mycolor from "../Constants/Colors";

export default class SplashScreen extends Component {
    state = {
        isLoading: true,
        langarabic: true,
        langenglish: false
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
                            onPress={() => this.props.navigation.navigate('LandingScreen')}
                            text={Trans.translate("Next")}
                            style={{ backgroundColor: mycolor.pink, marginTop: 20, }}
                            textcolor={mycolor.white}
                            textstyle={{ color: mycolor.white }} />
                    </View>
                </View>
            );
        }
    }
    SelectLanguage(langarabic, langenglish) {
        if (langarabic)
            this.setState({ langarabic: !(langarabic), langenglish: true })
        else if (langenglish)
            this.setState({ langenglish: !(langenglish), langarabic: true })


    }
    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        // const data = await this.performTimeConsumingTask();

        // if (data !== null) {
        //     this.props.navigation.navigate('LandingScreen');
        // }
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
