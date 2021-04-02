import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation'
import * as Progress from 'react-native-progress';
import ButtonComp from '../Components/ButtonComp';
import HeaderComp2 from '../Components/HeaderComp2';
export default class UploadMedia extends Component {
    render() {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <StatusBar
                    backgroundColor='#F54260'
                />
                <HeaderComp2 alignSelf='center' textfonts='bold' leftBtn={require('../../assets/icon_back.png')} title={Trans.translate('UploadDesign')} titlepos='center' ></HeaderComp2>

                <View style={{ flex: 1 }}>
                    <View style={{ flex: 2, alignSelf: 'center', justifyContent: 'center' }}>
                        <Image source={require('../../assets/icon_uploadhint.png')} resizeMode='center'></Image>
                    </View>
                    <View style={{ flex: 2, alignSelf: 'center', justifyContent: 'flex-start', alignSelf: 'center' }}>
                        <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center' }}>{Trans.translate('UploadMedia')}</Text>
                        <Text style={{ fontSize: 14, textAlign: 'center' }}>{Trans.translate('UploadDesc')}</Text>

                        <Text style={{ fontSize: 18, textAlign: 'center', fontWeight: 'normal', marginTop: 20, color: mycolor.pink }}>{Trans.translate('Browse')}</Text>

                        <View style={{ flexDirection: 'row', marginTop: 30 }}>
                            <Image style={{ height: 25, width: 25 }} source={require('../../assets/icon_camera.png')}></Image>
                            <Progress.Bar borderColor='#FBEEF1' indeterminate={false} style={{ margin: 10, backgroundColor: '#FBEEF1' }} progress={0.5} width={200} color={mycolor.pink} />
                        </View>

                        <ButtonComp style={{ marginTop: 30 }} textstyle={{ color: 'white', fontWeight: 'bold' }} text={Trans.translate('ProceedtoInvites')}
                            onPress={() => this.props.navigation.navigate('Packages')}>

                        </ButtonComp>

                    </View>
                </View>
            </SafeAreaView>

        );
    }
}