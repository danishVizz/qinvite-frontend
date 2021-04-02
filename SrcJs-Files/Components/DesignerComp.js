import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mycolor from '../Constants/Colors';
import CircleImageComp from './CircleImageComp'
import HeaderComp2 from './HeaderComp2';
export default class DesignerComp extends Component {

    render() {
        return (
            <View style={styles.container}>
                
                   <View style={{ flex:1, marginTop: 22, marginLeft: 20, marginRight: 20, marginBottom: 10, borderRadius: 2, borderWidth: 5, borderColor: 'white', elevation: 2 }}>
                    <View style={styles.imagecontainer}>
                        <Image source={require('../../assets/icon_dumy.png')} resizeMode="contain" style={{width:'95%',alignSelf:'center',height:200}}></Image>
                    </View>
                    <View style={{flexDirection: 'row', margin:15 }}>

                    <CircleImageComp  imagestyle={{height:40,width:40}} style={{height:40,width:40,borderColor:mycolor.pink}} imagesrc={this.props.imagepath} ></CircleImageComp>
                     
                        <View style={{  flex:3, flexDirection: 'column',marginLeft:10}}>
                            <Text style={[styles.textstyle,{color:'#474645',fontWeight:'bold',fontSize:14}||{}]}> {this.props.designername}</Text>
                            <Text style={[styles.textstyle]}> {this.props.designercontact}</Text>
                        </View>

                    </View>
                
                </View>

            </View>

        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imagecontainer: {
        flex: 1,
        marginTop: 0,
        width:'100%',
        backgroundColor:'white',

        borderColor: mycolor.lightgray,
        borderRadius: 5,
        alignSelf:'center',
        flexDirection: 'column'
    },
    textstyle:{
        color:mycolor.lightgray,
        fontSize:12
    }

});