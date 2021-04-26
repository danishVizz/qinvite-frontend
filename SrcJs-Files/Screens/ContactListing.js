import React, { Component } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Image, View, StyleSheet } from 'react-native'

import Trans from '../Translation/translation'
import ConversationComp from '../Components/ConversationComp';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComp2 from '../Components/HeaderComp2';
import StatusBarComp from '../Components/StatusBarComp';
import { StatusBar } from 'expo-status-bar';
import moment from 'moment';



export default class ContactListing extends Component {

    render() {
        var participants = this.props.route.params.Participants ?? []
        return (
            <View style={{ flex: 1, backgroundColor: mycolor.white }}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                {/* <StatusBar
                    backgroundColor='#F54260'
                /> */}
                <HeaderComp2 textfonts={'bold'}
                    righttitle={Trans.translate('Resend')}
                    titlepos='center'
                    leftBtnClicked={() => this.props.navigation.goBack()}
                    title={Trans.translate('InvitedPeoples')}
                    leftBtn={require('../../assets/icon_back.png')}></HeaderComp2>

                <FlatList
                    data={participants}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} />


            </View>

        );
    }

    renderItem({ item, index, props }) {
        console.log("inex: " + index);
        return (

            // <TouchableWithoutFeedback style={{
            //   marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, }} onPress={() => actionOnRow(item,props)}>
            <ConversationComp
                // toggle={() => this.onToggle(index)}
                // propsfromparents={onPressButtonChildren.bind()}
                imagepath={require('../../assets/icon_lady.png')}
                contactname={item.name}
                status={item.number}
                time={String(moment(item.invitation_date).format("HH:MM A"))}
            />
            // </TouchableWithoutFeedback>
        );
    }

    // onPressButtonChildren(value) {
    //     switch (value) {
    //         case 'delete':
    //             break
    //         case 'edit':
    //             break
    //         default:
    //             navigation.navigate('EventDetails')
    //     }

    //     console.log("working" + value)
    //     //press button chilldren 
    // }

    actionOnRow(itemdata, props) {
        console.log('Selected Item :' + itemdata.title);
        // navigation.navigate('EventDetails')
        alert(itemdata.title)
    }
}
const successCallBackData = (data) => {
    console.log(data)// can get callback data here
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    heading: {
        height: 60,
        backgroundColor: '#03A9F4',
        alignItems: 'center',
        justifyContent: 'center',
    },
    headingTest: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
    },
    list: {
        margin: 5,
        backgroundColor: 'white',
        height: 80,
        justifyContent: 'space-around',
        paddingLeft: 10,
        elevation: 1
    },
    fab: {
        position: 'absolute',
        width: 56,
        height: 56,
        alignItems: 'center',
        justifyContent: 'center',
        right: 20,
        bottom: 20,
        backgroundColor: '#03A9F4',
        borderRadius: 30,
        elevation: 8
    },
    fabIcon: {
        fontSize: 40,
        color: 'white'
    }
});
