import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mycolor from '../Constants/Colors';
import CategoryComp from '../Components/CategoryComp'

import Trans from '../Translation/translation' 
export default class ChooseCategory extends Component {

    render() {
        return (
            <SafeAreaView style={styles.container}>
               <CategoryComp lefticon={require('../../assets/icon_friends.png')} title={'Friends'} innerright={null} righticon={require('../../assets/icon_option.png')}></CategoryComp>
               <CategoryComp lefticon={require('../../assets/icon_family.png')} title={'Family'}  righticon={require('../../assets/icon_option.png')}></CategoryComp>
               <CategoryComp lefticon={require('../../assets/icon_friends.png')} title={'Oldage'} innerright={null}  righticon={require('../../assets/icon_option.png')}></CategoryComp>
               
               <View style={{position: 'absolute', width:'100%', marginBottom:20, bottom:0}}>
               <CategoryComp Onpress={()=>this.props.navigation.navigate('CreateCategory')} lefticon={require('../../assets/icon_add.png')} title={Trans.translate('NewCategory')}></CategoryComp>
        </View>
           
            </SafeAreaView>


        );
    }
}
const styles = StyleSheet.create({


    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
});