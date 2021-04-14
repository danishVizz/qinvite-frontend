import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import ButtonComp from '../Components/ButtonComp';
import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation';
import ApiCalls from '../Services/ApiCalls';
import Keys from '../Constants/keys';

export default class DesignerRequestDetils extends Component {

    render() {
        const desingertdata = this.props.route.params.DesingerData || 'none'
        return (
            <View style={styles.container}>
                
                <StatusBar
                    backgroundColor='white' />

                <View style={{ flex: 1, marginTop: 22, marginLeft: 20, marginRight: 20, marginBottom: 10, justifyContent: "center", alignContent: 'center', alignSelf: 'center' }}>
                    <View style={styles.imagecontainer}>
                        <Image source={desingertdata.user_image == "" ? require('../../assets/icon_dumy.png') : desingertdata.user_image} resizeMode="contain" style={{ width: '100%', height: 250, alignSelf: 'center' }}></Image>
                    </View>

                    <Text style={[styles.textstyle, { color: '#474645', fontWeight: 'bold', fontSize: 24, alignSelf: 'center' } || {}]}> {desingertdata.first_name + " " + desingertdata.last_name}</Text>

                    <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: 5 }}>
                        <Image
                            imagestyle={{ height: 15, width: 9 }} style={{ height: 15, width: 9, borderColor: mycolor.pink }} source={require('../../assets/icon_phone.png')} ></Image>
                        <Text style={[styles.textstyle, { color: '#474645', fontWeight: 'bold', fontSize: 14, alignSelf: 'center', marginLeft: 5 } || {}]}>{desingertdata.phone}</Text>

                    </View>

                    <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 10 }}>
                        <Image style={{ height: 300, width: 250 }} resizeMode='contain' source={require('../../assets/icon_designprocedure.png')} />
                        <ButtonComp textstyle={{ color: 'white' }} style={{ marginTop: 20 }} text={Trans.translate('RequestDesign')} > </ButtonComp>

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
        justifyContent: 'center',
    },
    textstyle: {
        color: mycolor.lightgray,
        fontSize: 12
    }
});