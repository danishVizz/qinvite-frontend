import React from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Image, View, StyleSheet } from 'react-native'

import Trans from '../Translation/translation'
import { useNavigation } from '@react-navigation/core';
import ConversationComp from '../Components/ConversationComp';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComp2 from '../Components/HeaderComp2';
import { StatusBar } from 'expo-status-bar';



function ContactListing(props) {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: mycolor.white }}>
            <StatusBar
                backgroundColor='#F54260'
            />
            <HeaderComp2 textfonts={'bold'}
                righttitle={Trans.translate('Resend')}
                titlepos={'center'}
                leftBtnClicked={()=>navigation.goBack()}
                title={Trans.translate('InvitedPeoples')}
                leftBtn={require('../../assets/icon_back.png')}></HeaderComp2>

            <FlatList
                data={list}
                renderItem={renderItem}
                keyExtractor={(item) => item._id}
                showsVerticalScrollIndicator={false}
                showsHorizontalScrollIndicator={false} />


        </SafeAreaView>

    );


    function renderItem({ item, index, props }) {
        console.log("inex: " + index);
        return (

            // <TouchableWithoutFeedback style={{
            //   marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, }} onPress={() => actionOnRow(item,props)}>
            <ConversationComp
                // toggle={() => this.onToggle(index)}
                propsfromparents={onPressButtonChildren.bind()}
                imagepath={require('../../assets/icon_lady.png')}
                contactname={item.title}
                status={item.description}
                time={'10:52 Pm'}
            />
            // </TouchableWithoutFeedback>
        );
    };

    function onPressButtonChildren(value) {
        switch (value) {
            case 'delete':
                break
            case 'edit':
                break
            default:
                navigation.navigate('EventDetails')
        }

        console.log("working" + value)
        //press button chilldren 
    }

    function actionOnRow(itemdata, props) {
        console.log('Selected Item :' + itemdata.title);
        // navigation.navigate('EventDetails')
        alert(itemdata.title)
    }
}

const successCallBackData = (data) => {
    console.log(data)// can get callback data here
}
const list = [
    {
        title: 'Mike is Programming',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'Jack is Play Basketball',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'John is Singing',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'Rose is Dancing',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'Sarah is Writing',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'Mike is Programming',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'Jack is Play Basketball',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'John is Singing',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'Rose is Dancing',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
    {
        title: 'Sarah is Writing',
        description: 'Test Description',
        image_url: `https://source.unsplash.com/collection/${Math.floor(
            Math.random() * 100,
        )}/100x100`,
    },
];

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
;

export default ContactListing;