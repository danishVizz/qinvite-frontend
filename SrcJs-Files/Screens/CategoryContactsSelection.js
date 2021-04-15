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
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import TextInputComp from '../Components/TextInputComp';


export default class CategoryContactsSelection extends Component {
    state = {
        ContactsList: [],
        isChecked: [],
        selectedLists: [],
        catdata: {},
        isLoading: false,
        isphoneallowed: false
    }
    render() {

        // const data = this.props.route.params.categorydata.categoryename


        
        return (
            <SafeAreaView style={{ flex: 1, backgroundColor: mycolor.white }}>
                <StatusBar
                    backgroundColor='#F54260'
                />
                <HeaderComp2 textfonts={'bold'}
                    righttitle={Trans.translate('Resend')}
                    titlepos={'center'}
                    leftBtnClicked={() => this.props.navigation.goBack()}
                    title={Trans.translate('SelectInvites')}
                    righttitle={Trans.translate('Save')}
                    righttextfonts={'bold'}
                    // rightBtnClicked={() => this.CreateCategoryCall()}
                    leftBtn={require('../../assets/icon_back.png')}></HeaderComp2>

                <View style={{ flex: 1, alignSelf: 'center', alignItems: "center" }}>
                    {this.state.isLoading && <ActivityIndicator size="large" color={mycolor.pink} />}
                </View>

                <View style={{ marginTop: 10, marginRight: 20, marginLeft: 20 }}>
                    <TextInputComp
                        tintcolor={mycolor.lightgray}
                        onChangeText={text => this.searchItems(text)}
                        leftIcon={require('../../assets/icon_search.png')}
                        textviewstyle={{ height: 40 }}></TextInputComp>
                </View>

                <FlatList
                    data={this.state.ContactsList}
                    renderItem={this.renderItem.bind(this)}
                    keyExtractor={(item) => item._id}
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false} />

            </SafeAreaView>

        );
    }


    searchItems = text => {
        var datatosearch = this.state.designerdata
        if (text.length == 0) {
            this.getAllDesigners()
        }
        let newData = datatosearch.filter(item => {
            const itemData = `${item.first_name.toUpperCase()}`;
            const textData = text.toUpperCase();
            if (text.length > 0) {
                return itemData.indexOf(textData) > -1;
            }
        });
        this.setState({
            designerdata: newData,
            value: text,
        });

    }

    logCallback = (log, callback) => {
        console.log(log);
        this.setState({
            callback
        });
    }


    // async CreateCategoryCall() {
    //     var usersdata = await Prefs.get(Keys.userData);
    //     var parsedata = JSON.parse(usersdata)
    //     console.log("MYDATA" + parsedata.id)


    //     var formadata = new FormData()
    //     formadata.append("category_name", this.props.route.params.categorydata.categoryename)
    //     formadata.append("phones", this.props.route.params.categorydata.isphoneallowd ? "allowed" : "notallowed")
    //     formadata.append("people_per_qr", this.props.route.params.categorydata.invitaitoncount)
    //     formadata.append("user_id", parsedata.id)
    //     this.state.selectedLists.map((item, index) => {
    //         formadata.append("participants[" + index + "]", this.state.selectedLists[index])
    //     });

    //     this.logCallback('Creating Package Start', this.state.isLoading = true);
    //     ApiCalls.postApicall(formadata, "add_category").then(data => {
    //         this.logCallback("Response came", this.state.isLoading = false);
    //         if (data.status == true) {
    //             this.props.navigation.navigate('ChooseCategory')

    //         } else {
    //             Alert.alert('Failed', data.message);
    //         }
    //     }, error => {
    //         this.logCallback("Something Went Wrong", this.state.isLoading = false);
    //         this.props.navigation.navigate('ChooseCategory')
    //         // Alert.alert('Error', JSON.stringify(error));
    //     }
    //     )

    // }
    isIconCheckedOrNot = (item, index) => {
        let { isChecked } = this.state;
        isChecked[index] = !this.state.isChecked[index];
        this.setState({ isChecked: isChecked });
        
        var contactdata = JSON.stringify({
            "name": item.name,
            "number": item.number,
            "isphoneallow": item.isphoneallow
        })

        if (isChecked[index] == true) {
            this.state.selectedLists.push(contactdata)
        } else {
            this.state.selectedLists.pop(contactdata)
        }

    }

    renderItem({ item, index, props }) {

        // item = JSON.parse(item);
        // console.log("name : " + item.isphoneallow);
        return (
            <TouchableOpacity style={{ backgroundColor: item.isSelected ? '#DDD' : '#FFF' }} onPress={() => this.isIconCheckedOrNot(item, index)}>
                <ContactsComp
                    isChecked={this.state.isChecked[index]}
                    imagepath={require('../../assets/icon_lady.png')}
                    contactname={item.name}
                    index={index}
                    isphonellow={item.isphoneallow}
                    fromchildprops={this.onPressButtonChildren}
                    phonestate={item.isphoneallow ? (require('../../assets/icon_phallow.png')) : (require('../../assets/icon_phnotallow.png'))}
                    status={item.number}

                />
            </TouchableOpacity>
        );
    };

    onPressButtonChildren = (value, index) => {
        var arr = this.state.ContactsList;
        arr[index].isphoneallow = !(arr[index].isphoneallow);
        this.setState({ ContactsList: arr });



    }

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
        var categorydataaa = this.props.route.params.categorydata.contactlist;
        var contactlist = []
        if (categorydataaa.length !== 0) {
            categorydataaa.map((item, index) => {
                var contactdata = {
                    "name": item.name,
                    "number": item.number,
                    "isphoneallow": item.isphoneallow == "1" ? true : false
                }
                let { isChecked } = this.state;
                isChecked[index] = true;
                this.setState({ isChecked: isChecked })
                contactlist.push(contactdata)
                this.state.selectedLists.push(contactdata)
            })

            this.setState({ ContactsList: contactlist }, () => console.log("??ContactListUpdated????" + this.state.ContactsList))

        }
        else {
            console.log("??bhrrrrr????")
            PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
                {
                    'title': 'Contacts',
                    'message': 'This app would like to view your contacts.'
                }
            ).then(() => {
                var contactlist = []
                Contacts.getAll()
                    .then((contacts) => {

                        contacts.map(function (obj) {
                            obj.isphoneallow = false;
                            obj.name = obj.displayName
                            obj.number = obj.phoneNumbers[0]?.number

                            // contactlist.push(obj)
                            // var obj1=JSON.parse(obj)
                            // console.log(obj)
                        });
                        console.log(contacts)
                        this.setState({ ContactsList: contacts })
                    })

            })


                .catch((err) => {
                    console.log(err);
                })
        }
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
