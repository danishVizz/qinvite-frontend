import React, { Component } from "react";
import Trans from '../Translation/translation'
import { StyleSheet, View, Image, TextInput, Text } from 'react-native';
import mycolor from "../Constants/Colors";
import EditTextComp from "../Components/EditTextComp";
import { SafeAreaView } from "react-native-safe-area-context";
import HeaderComp from "../Components/HeaderComp";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import CircleImageComp from "../Components/CircleImageComp";
import * as ImagePicker from 'react-native-image-picker';

const iamgepath = '../../assets'

export default class Profile extends Component {
    state = {
        backgroundColor: mycolor.lightgray,
        allfieldsenabel:false,
        changetext:true,
        response:''
    }

    render() {
        return (
            <SafeAreaView style={styles.conatiner}>
                <HeaderComp selfalign={'flex-end'} titleclick={()=>this.changeviews()} textfonts={'bold'} titlepos='right' titleColor={'black'} title={this.state.changetext==true ? Trans.translate('Edit'):Trans.translate('Save') } fromleft={7} lefttintColor={mycolor.darkgray} headerStyle={{ backgroundColor: mycolor.white }} leftBtn={require(iamgepath + '/icon_back.png')}></HeaderComp>
                <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="always">

                    <View style={styles.innercontainer}>
                        <View style={{ justifyContent: 'center', alignSelf: 'center', height: 150}}>
                            <CircleImageComp imagesrc={require('../../assets/icon_avatar.jpg')} backgroundColor='orange' style={styles.circleimage}  imagestyle={{height:110,width:110,borderRadius:55}}></CircleImageComp>
                            <View style={{position: 'absolute', alignSelf: 'center', bottom: 10, right: 10 , borderColor:'white' }}>
                             <TouchableOpacity onPress={this.chooseImage}>
                                <CircleImageComp  style={{borderColor:'white',borderWidth:3}} imagesrc={require('../../assets/icon_camera.png')} ></CircleImageComp>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <EditTextComp isEnable={this.state.allfieldsenabel} text={Trans.translate('FirstName')} ></EditTextComp>
                        <EditTextComp isEnable={this.state.allfieldsenabel} text={Trans.translate('LastName')}></EditTextComp>
                        <EditTextComp isEnable={this.state.allfieldsenabel} text={Trans.translate('Email')}></EditTextComp>
                        <EditTextComp isEnable={this.state.allfieldsenabel} text={Trans.translate('IDCard')}></EditTextComp>
                        <EditTextComp isEnable={this.state.allfieldsenabel} text={Trans.translate('City')}></EditTextComp>
                        <EditTextComp isEnable={this.state.allfieldsenabel} text={Trans.translate('Country')}></EditTextComp>
                     
                            <TouchableOpacity style={{ height:50, flexDirection:'row',alignItems:'center'}}>
                         <Image style={{height:17,width:15}} resizeMode='contain' source={require('../../assets/icon_delete.png')}></Image>
                         <Text style={{alignItems:'center',marginLeft:10,fontSize:14,color:mycolor.pink}}>{Trans.translate('DeleteAcc')}</Text>
                         </TouchableOpacity>
                        
                    </View>
                </ScrollView>
            </SafeAreaView>

        );
    }
    changeviews(){
        this.setState({changetext:!this.state.changetext,allfieldsenabel:!this.state.allfieldsenabel})
    }

    chooseImage = () => {
      ImagePicker.launchImageLibrary(
        {
          mediaType: 'photo',
          includeBase64: false,
          maxHeight: 200,
          maxWidth: 200,
        },
        (responses) => {
          this.setState({response:responses});
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
        marginTop:21,
        margin: 33,
        backgroundColor: '#fff'
    },
    circleimage: {
        height: 120,
        width: 120,
        borderRadius: 120,
        borderColor:'white'

    }

});

