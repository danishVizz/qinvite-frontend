import { Component } from "react";
import React from 'react'
import { Image, StyleSheet, View } from "react-native";

export default class SplashScreen extends Component {
    state = {
        isLoading: true 
    }
    render() {
        if (this.state.isLoading) {
            return (
                <View style={styles.container}>
                    
                    <Image style={{height:200,width:200,alignSelf:'center'}} resizeMode="contain" source={require('../../assets/icon_logo.png')}>

                    </Image>
                </View>
            );
            }
    }
    async componentDidMount() {
        // Preload data from an external API
        // Preload data using AsyncStorage
        const data = await this.performTimeConsumingTask();
    
        if (data !== null) {
          this.props.navigation.navigate('LandingScreen');
        }
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
        justifyContent:'center'
    }});
