import React, { Component } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Image, View, StyleSheet, Alert } from 'react-native'

import Trans from '../Translation/translation'
import ConversationComp from '../Components/ConversationComp';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderComp2 from '../Components/HeaderComp2';
import { StatusBar } from 'expo-status-bar';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import ContactsComp from '../Components/ContactsComp';
import ApiCalls from "../Services/ApiCalls";
import Keys from "../Constants/keys";
import Prefs from "../Prefs/Prefs";

     
export default class CategoryContactsSelection extends Component {


    state = {
        ContactsList: [],
        isChecked: [],
        selectedLists: [],
        catdata:{}
    }
    render() {
  
        const data=this.props.route.params.categorydata.categoryename
        
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: mycolor.white }}>
                <StatusBar
                    backgroundColor='#F54260'
                />
                <HeaderComp2 textfonts={'bold'}
                    righttitle={Trans.translate('Resend')}
                    titlepos={'center'}
                    leftBtnClicked={() => navigation.goBack()}
                    title={Trans.translate('SelectInvites')}
                    righttitle={Trans.translate('Save')}
                    righttextfonts={'bold'}
                    rightBtnClicked={() => this.CreateCategoryCall()}
                    leftBtn={require('../../assets/icon_back.png')}></HeaderComp2>

                <FlatList
                    data={this.state.ContactsList}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} />


            </SafeAreaView>

        );
    }
    async CreateCategoryCall() {


        var usersdata = await Prefs.get(Keys.userData);
        // var parsedata = JSON.parse(usersdata)
        // console.log("MYDATA" + parsedata.id)
    
        
        var formadata = new FormData()
        formadata.append("category_name", this.props.route.params.categorydata.categoryename)
        formadata.append("phones", this.props.route.params.categorydata.isphoneallowd ? "allowed" : "notallowed")
        formadata.append("people_per_qr", this.props.route.params.categorydata.invitaitoncount)
        formadata.append("user_id", "19")
        formadata.append("participants[]",JSON.stringify(this.state.selectedLists))
        // formadata.append("no_of_people", this.state.invitationcounttxt)
        // formadata.append("package_price", this.state.passwordtxt)
        console.log(formadata)

      
        // this.logCallback('Creating Package Start', this.state.isLoading = true);
        ApiCalls.postApicall(formadata, "add_category").then(data => {
            // this.logCallback("Response came", this.state.isLoading = false);
            if (data.status == true) {

            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            // this.logCallback("Something Went Wrong", this.state.isLoading = false);
            console.log("inerror")
            console.log(error)
            Alert.alert('Error', JSON.stringify(error));
        }
        )

    }
    isIconCheckedOrNot = (item, index) => {
        let { isChecked } = this.state;
        isChecked[index] = !this.state.isChecked[index];
        this.setState({ isChecked: isChecked });
        var contactdata = JSON.stringify({
            "name": item.displayName,
            "number": item.phoneNumbers[0]?.number
        })
        if (isChecked[index] == true) {
            this.state.selectedLists.push(contactdata)
        } else {
            this.state.selectedLists.pop(contactdata)
        }
        console.log("key is" + this.state.selectedLists)

    }

    renderItem({ item, index, props }) {

        return (
            <TouchableWithoutFeedback style={{ backgroundColor: item.isSelected ? '#DDD' : '#FFF' }} onPress={() => this.isIconCheckedOrNot(item, index)}>
                <ContactsComp
                    isChecked={this.state.isChecked[index]}
                    imagepath={require('../../assets/icon_lady.png')}
                    contactname={item.displayName}
                    status={item.phoneNumbers[0]?.number}

                />
            </TouchableWithoutFeedback>
        );
    };


    actionOnRow(key) {
        let authUsers = [...this.state.ContactsList]
        for (let item of authUsers) {
            if (item.key == key) {
                item.isSelected = (item.isSelected == null) ? true : !item.isSelected;
                break;
            }
        }
        this.setState({ authUsers });
        console.log("key is" + key)

    }


    successCallBackData = (data) => {
        console.log(data)// can get callback data here
    }

    componentDidMount() {
        PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
            {
                'title': 'Contacts',
                'message': 'This app would like to view your contacts.'
            }
        ).then(() => {
            Contacts.getAll()
                .then((contacts) => {
                    this.setState({ ContactsList: contacts })
                })
        })
            .catch((err) => {
                console.log(err);
            })
    }
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
;

