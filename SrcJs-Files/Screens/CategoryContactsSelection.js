import React, { Component } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Modal, View, StyleSheet, Alert, Text, Pressable } from 'react-native'
import NetworkUtils from "../Constants/NetworkUtils";
import Trans from '../Translation/translation'
import { StackActions } from '@react-navigation/native';
import HeaderComp2 from '../Components/HeaderComp2';
import Contacts from 'react-native-contacts';
import { PermissionsAndroid } from 'react-native'
import ContactsComp from '../Components/ContactsComp';
import StatusBarComp from '../Components/StatusBarComp';
import ApiCalls from "../Services/ApiCalls";
import Keys from "../Constants/keys";
import Prefs from "../Prefs/Prefs";
import { TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native';
import TextInputComp from '../Components/TextInputComp';
import { Platform } from 'react-native';
import Geocoder from 'react-native-geocoder';
import CountryData from 'country-data'
import GetLocation from 'react-native-get-location'
import Global from '../Constants/Global';
import TextComp from '../Components/TextComp';

var contactlist = []
let currentContact = {}
export default class CategoryContactsSelection extends Component {
    state = {
        ContactsList: [],
        isChecked: [],
        selectedLists: [],
        catdata: {},
        callingcode: "+974",
        isLoading: false,
        isphoneallowed: false,
        modalVisible: false
    }
    render() {
        return (
            <View style={{ flex: 1, backgroundColor: mycolor.white }}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                {/* <StatusBar
                    backgroundColor='#F54260'
                /> */}
                <HeaderComp2 textfonts={'bold'}
                    righttitle={Trans.translate('Resend')}
                    titlepos={'center'}
                    leftBtnClicked={() => this.props.navigation.goBack()}
                    title={Trans.translate('SelectInvites')}
                    righttitle={Trans.translate('Save')}
                    righttextfonts={'bold'}
                    rightBtnClicked={() => this.CreateCategoryCall()}
                    leftBtn={require('../../assets/icon_back.png')}></HeaderComp2>

                <View style={{ alignSelf: 'center', alignItems: "center" }}>
                    {this.state.isLoading && <ActivityIndicator size="large" color={mycolor.pink} />}
                </View>

                <View style={{ marginTop: 10, marginRight: 20, marginLeft: 20 }}>
                    <TextInputComp
                        tintcolor={mycolor.lightgray}
                        onChangeText={text => this.searchItems(text)}
                        leftIcon={require('../../assets/icon_search.png')}
                        textviewstyle={{ height: 40 }}></TextInputComp>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        data={this.state.ContactsList}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={(item, index) => String(index)}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false} />
                </View>

                <Modal
                    animationType="slide"
                    // transparent={true}
                    presentationStyle={'pageSheet'}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        // this.setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{ flex: 1 }}>
                        <HeaderComp2 textfonts={'bold'}
                            headerStyle={{ height: 70 }}
                            leftBtn={require('../../assets/icon_back.png')}
                            titlepos={'center'}
                            leftBtnClicked={() => this.setState({ modalVisible: false })}
                            title={Trans.translate('ChooseCategory')}></HeaderComp2>
                        <FlatList
                            data={this.filterCategories(this.props.route.params.categoriesArr)}
                            renderItem={this.categoryItem.bind(this)}
                            keyExtractor={(item, index) => String(index)}
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false} />
                    </View>
                </Modal>
            </View>

        );
    }

    searchItems = text => {

        var datatosearch = this.state.ContactsList
        if (text.length == 0) {

            this.setState({ ContactsList: this.state.ContactListReplicae })
            var orignallist = this.state.ContactsList
            var selectedlist = this.state.selectedLists
            return
        }

        let newData = datatosearch.filter((item, valindex) => {
            const itemData = `${item.name.toUpperCase()}`;
            const textData = text.toUpperCase();
            if (text.length > 0) {
                var index = itemData.indexOf(textData) > -1;
                return index
            }
        });
        this.setState({
            ContactsList: newData,
            value: text,
        });
    }

    logCallback = (log, callback) => {
        // console.log(log);
        this.setState({
            callback
        });
    }

    filterCategories = (categories) => {
        let tmp = categories.filter(obj => {
            if (this.props.route.params.categorydata.isphoneallowd == false) {
                return obj.phones == "1"
            } else {
                return obj.phones == "0"
            }
        })
        return tmp
    }

    async CreateCategoryCall() {
        const isConnected = await NetworkUtils.isNetworkAvailable()
        if (!isConnected) {
            Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
            return
        }
        var apiname = ''
        var usersdata = await Prefs.get(Keys.userData);
        var parsedata = JSON.parse(usersdata)
        // console.log("MYDATA" + parsedata.id)
        var formadata = new FormData()
        formadata.append("name", this.props.route.params.categorydata.categoryename)
        formadata.append("phones", this.props.route.params.categorydata.isphoneallowd ? "allowed" : "notallowed")
        formadata.append("people_per_qr", this.props.route.params.categorydata.invitaitoncount)
        formadata.append("user_id", parsedata.id)
        formadata.append("participants", JSON.stringify(this.state.selectedLists))
        formadata.append("event_id", Keys.invitealldata["Eventdata"].event_id)

        if (this.props.route.params.categorydata.iseditcategory) {
            formadata.append("id", this.props.route.params.categorydata.categoryid)
            apiname = "edit_category"
        }
        else {
            apiname = "add_category"
        }

        this.logCallback('Creating Package Start', this.state.isLoading = true);
        ApiCalls.postApicall(formadata, apiname).then(data => {
            this.logCallback("Response came", this.state.isLoading = false);
            if (data.status == true) {
                console.log("--ServerResponse----" + data)
                const popAction = StackActions.pop(2);
                this.props.navigation.dispatch(popAction);

            } else {
                Alert.alert('Failed', data.message);
                // this.props.navigation.push('ChooseCategory')
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.isLoading = false);
            // this.props.navigation.navigate('ChooseCategory')
            const popAction = StackActions.pop(2);
            this.props.navigation.dispatch(popAction);
            console.log(error)
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }

    isIconCheckedOrNot = (item, index) => {
        console.log(item)
        var data = Global.mergedContacts.find(function (obj) {
            return obj.number.replace(/\s/g, '') == item.number.replace(/\s/g, '');
        });

        if (item.isselected == false && data) {
            Alert.alert("Exist", "Contact already exists in " + data.category)
            return
        }

        var arr = this.state.ContactsList;
        arr[index].isselected = !(arr[index].isselected)
        this.setState({ ContactsList: arr });

        var contactdata = {
            "participant_id": item.id,
            "name": item.name,
            "number": item.number,
            "isselected": false,
            "isphoneallow": item.isphoneallow
        }
        if (this.state.ContactsList[index].isselected == true) {
            this.state.selectedLists.push(contactdata)
        } else {
            this.state.selectedLists.pop(contactdata)
        }
    }

    renderItem({ item, index, props }) {
        return (

            <TouchableOpacity style={{ backgroundColor: item.isSelected ? '#DDD' : '#FFF' }} onPress={() => this.isIconCheckedOrNot(item, index)}>
                <ContactsComp
                    isChecked={this.state.ContactsList[index].isselected}
                    imagepath={require('../../assets/icon_contact.png')}
                    contactname={item.name}
                    index={index}
                    isphonellow={item.isphoneallow}
                    fromchildprops={this.onPressButtonChildren}
                    phonestate={this.props.route.params.categorydata.isphoneallowd ? (require('../../assets/icon_phallow.png')) : (require('../../assets/icon_phnotallow.png'))}
                    status={item.number}
                />
            </TouchableOpacity>
        );
    };

    categoryItem({ item, index, props }) {
        console.log("ALL INDEXS : ", index)
        return (
            <TouchableOpacity style={{ backgroundColor: '#FFF', paddingVertical: 30, marginHorizontal: 20, borderBottomWidth: 0.5, borderBottomColor: '#E4E4E4' }} onPress={() => this.onPressCategory(item, index)}>
                <TextComp textStyle={{ fontSize: 18 }} text={item.name} />
            </TouchableOpacity>
        );
    };

    onPressCategory = (item, index) => {
        console.log("INDEX: ", index)
        console.log(item)
        console.log(currentContact)
        this.moveParticipant(item, index)
        this.setState({
            modalVisible: false
        })
    }

    async moveParticipant(categoryItem, index) {

        const isConnected = await NetworkUtils.isNetworkAvailable()
        if (!isConnected) {
            Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
            return
        }

        // let params = {
        //     participant_id: currentContact.participant_id,
        //     category_id: categoryItem.id, // where to move
        //     participant: {
        //         name: currentContact.name,
        //         number: currentContact.number,
        //         isphoneallow: currentContact.isphoneallow
        //     }
        // }

        let participant = {
            name: currentContact.name,
            number: currentContact.number,
            isphoneallow: currentContact.isphoneallow
        }

        var formadata = new FormData()
        formadata.append("participant_id", currentContact.participant_id)
        formadata.append("category_id", categoryItem.id)
        formadata.append("participant", JSON.stringify(participant))

        console.log("PARAMS")
        console.log(formadata)

        this.logCallback('Creating Package Start', this.state.isLoading = true);
        ApiCalls.postApicall(formadata, 'move_participant').then(data => {
            this.logCallback("Response came", this.state.isLoading = false);
            if (data.status == true) {
                console.log("--ServerResponse----" + data)
                let tmp = [...this.state.ContactsList]
                let selectedListTmp = [...this.state.selectedLists]
                var index1 = tmp.map(item => item.number).indexOf(currentContact.number);
                var index2 = selectedListTmp.map(item => item.number).indexOf(currentContact.number);
                tmp.splice(index1, 1)
                selectedListTmp.splice(index2, 1)
                console.log("tmp")
                console.log(tmp)
                this.setState({
                    ContactsList: tmp,
                    selectedLists: selectedListTmp
                })
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.isLoading = false);
            console.log(error)
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }

    onPressButtonChildren = (value, index) => {
        console.log("PARTICIPANT ID : ")
        console.log(this.state.ContactsList[index])
        let number = this.state.ContactsList[index].number.replace(/\s/g, '')
        var data = Global.mergedContacts.find(function (obj) {
            return obj.number.replace(/\s/g, '') == number;
        });

        if ((this.state.ContactsList[index].participant_id == "" || this.state.ContactsList[index].participant_id == undefined || this.state.ContactsList[index].participant_id == null) && data) {
            Alert.alert("Exist", "Contact already exists in " + data.category)
            return
        }
        Alert.alert(
            Trans.translate('move_contact'),
            Trans.translate('move_contact_msg'),
            [
                {
                    text: Trans.translate('cancel'),
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: Trans.translate('yes'), onPress: () => this.onMoveContactAlrt(this.state.ContactsList[index]) }
            ]
        );
        // return
        // var arr = this.state.ContactsList;
        // arr[index].isphoneallow = !(arr[index].isphoneallow);
        // this.setState({ ContactsList: arr });
    }

    onMoveContactAlrt(contact) {
        console.log(contact)
        currentContact = contact
        this.setState({ modalVisible: true })
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
    }

    successCallBackData = (data) => {
        // console.log(data)// can get callback data here
    }

    componentDidMount() {
        console.log('CATEGORY ARR')
        console.log(this.props.route.params.categoriesArr)
        console.log('EVENT ID : ' + Keys.invitealldata["Eventdata"].event_id)
        this.getCurrentLocation()
    }

    getContactList() {
        var categorydataaa = this.props.route.params.categorydata.contactlist;
        console.log("---Carrrrrr" + categorydataaa)
        var isphoneallow = this.props.route.params.categorydata.isphoneallowd
        var contactlist = []
        if (categorydataaa.length !== 0) {
            categorydataaa.map((item, index) => {
                var contactdata = {
                    "participant_id": item.id,
                    "name": item.name,
                    "number": item.number.startsWith("0") ? item.number.replace('0', this.state.callingcode) : item.number,
                    "isselected": true,
                    "isphoneallow": item.isphoneallow == "1" ? true : false
                }
                contactlist.push(contactdata)
                this.state.selectedLists.push(contactdata)

            })
            console.log("----SelectedValuesFrom Array" + JSON.stringify(this.state.selectedLists))
            this.setState({ ContactsList: contactlist, ContactListReplicae: contactlist }, () => console.log("??ContactListUpdated????" + JSON.stringify(this.state.ContactsList)))
        }

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
                    console.log("Fetched Contacts " + JSON.stringify(contacts))
                    var callingcode = this.state.callingcode
                    contacts.map(function (obj) {
                        var isselected = false
                        const index = categorydataaa.findIndex((e) => e.name === obj.displayName);
                        if (index != -1) {
                            isselected = true
                        }
                        obj.participant_id = "",
                            obj.isphoneallow = isphoneallow;
                        obj.name = (Platform.OS === "android") ? obj.displayName : obj.givenName
                        obj.isselected = isselected
                        obj.number = obj.phoneNumbers[0]?.number.replace(/\s/g, '')

                        let num = String(obj.phoneNumbers[0]?.number.replace(/\s/g, ''));
                        // console.log("TYPEOF 3: ", typeof (num));

                        if (num.startsWith("0")) {
                            obj.number = num.replace('0', callingcode);
                        }
                    });
                    contacts = contacts.filter(item => item.phoneNumbers[0]?.number != undefined)
                    contacts = this.state.ContactsList.concat(contacts);
                    let uniqueArray = this.getUniqueArray(contacts);


                    this.setState({ ContactsList: uniqueArray, ContactListReplicae: this.state.ContactsList.concat(contacts) })
                    // this.setState({ ContactsList: contacts, ContactListReplicae: this.state.ContactsList.concat(contacts)},console.log("---Contc"+JSON.stringify(this.state.ContactsList)))
                })
        })
            .catch((err) => {
                console.log(err);
            })
    }

    async getCurrentLocation() {
        GetLocation.getCurrentPosition({
            enableHighAccuracy: true,
            timeout: 15000,
        })
            .then(location => {
                console.log("latitude" + location.latitude);
                var locationvariables = {
                    lat: location.latitude,
                    lng: location.longitude
                };

                Geocoder.geocodePosition(locationvariables).then(res => {

                    var countrycode = res[0].countryCode
                    // console.log("Codeeeeee..."+countrycode)

                    // var callingcode=CountryData.countries[countrycode].countryCallingCodes;
                    console.log(CountryData.countries["PK"]);

                    var callingcode = CountryData.countries[countrycode]
                    // console.log("Calling Code "+JSON.stringify(callingcode.countryCallingCodes[0]))

                    this.setState({ callingcode: callingcode.countryCallingCodes[0] }, () => this.getContactList())

                })
                    .catch(err => console.log(err))

            })
            .catch(error => {
                const { code, message } = error;
                console.warn(code, message);
                this.getContactList()
            })
    }
    // }

    getUniqueArray(array) {
        var uniqueArray = [];
        if (array.length > 0) {
            uniqueArray[0] = array[0];
        }
        for (var i = 0; i < array.length; i++) {
            var isExist = false;
            for (var j = 0; j < uniqueArray.length; j++) {
                if (array[i].number == uniqueArray[j].number) {
                    isExist = true;
                    break;
                }
                else {
                    isExist = false;
                }
            }
            if (isExist == false) {
                uniqueArray[uniqueArray.length] = array[i];
            }
        }
        return uniqueArray;
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
