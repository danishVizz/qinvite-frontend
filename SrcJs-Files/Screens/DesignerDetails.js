import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import ButtonComp from '../Components/ButtonComp';
import mycolor from '../Constants/Colors';
import CircleImageComp from './CircleImageComp'

export default class DesignerDetails extends Component {

    render() {
        return (
            <View style={styles.container}>

                <View style={{ flex: 1, marginTop: 22, marginLeft: 20, marginRight: 20, marginBottom: 10, justifyContent: "center" }}>
                    <View style={styles.imagecontainer}>
                        <Image source={require('../../assets/icon_dumy.png')} resizeMode="contain" style={{ width: '95%', alignSelf: 'center', height: 200 }}></Image>
                    </View>

                    <Text style={[styles.textstyle, { color: '#474645', fontWeight: 'bold', fontSize: 24 } || {}]}> {this.props.designername}</Text>
                    <View style={{flexDirection:'row',flex:1}}>
                        <Image
                            imagestyle={{ height: 40, width: 40 }} style={{ height: 40, width: 40, borderColor: mycolor.pink }} imagesrc={this.props.imagepath} ></Image>
                         <Text style={[styles.textstyle, { color: '#474645', fontWeight: 'bold', fontSize: 14 } || {}]}>03448876648</Text>
                    </View>
                    <View style={{ flex: 3, flexDirection: 'column', marginLeft: 10 }}>
                      <Image >

                          
                      </Image>
                        <ButtonComp text={'Proceed To Upload'} > </ButtonComp>
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
        width: '100%',
        backgroundColor: 'white',

        borderColor: mycolor.lightgray,
        borderRadius: 5,
        alignSelf: 'center',
        flexDirection: 'column'
    },
    textstyle: {
        color: mycolor.lightgray,
        fontSize: 12
    }

});