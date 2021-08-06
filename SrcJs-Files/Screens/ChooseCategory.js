import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, FlatList, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import mycolor from '../Constants/Colors';
import ApiCalls from '../Services/ApiCalls';
import CategoryComp from '../Components/CategoryComp'
import Trans from '../Translation/translation'
import { Alert } from 'react-native';
import { ActivityIndicator } from 'react-native';
import Prefs from '../Prefs/Prefs'
import Keys from '../Constants/keys'
import ButtonComp from '../Components/ButtonComp';
import AlertComp from '../Components/AlertComp';
import NetworkUtils from "../Constants/NetworkUtils";
import Global from '../Constants/Global';
import HeaderComp2 from '../Components/HeaderComp2';
import StatusBarComp from '../Components/StatusBarComp';
import mykeys from '../Constants/keys';

export default class ChooseCategory extends Component {
    state = {
        contentLoading: false,
        categoriesdata: [],
        messageSent: 0,
        invites: 0,
        isChecked: [],
        selectedLists: [],
        currentselected: '',
        showalert: false,
        isFetching: false
    }
    render() {
        let Deletealert = (
            this.state.showalert ?
                <AlertComp
                    alertbody={Trans.translate('Delethint')}
                    alerttitle={Trans.translate('DeleteCategory')}
                    onCancelPress={() => this.setState({ showalert: false })}
                    onDeletePress={() => this.DeleteCategory(this.state.currentselected)}></AlertComp> : null
        );

        return (
            <View style={styles.container}>
                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp2 textfonts={'bold'} fromleft={10} title={Trans.translate('ChooseCategory')} textfonts={'normal'} textsize={16} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white' leftBtnClicked={() => this.props.navigation.goBack()} />
                <TouchableOpacity style={{ height: 50, width: 200, borderRadius: 5, alignSelf: 'center', justifyContent: 'center', alignItems: 'center', backgroundColor: mycolor.pink, marginTop: 10 }} onPress={() => this.props.navigation.navigate('ContactStatus')}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>{Trans.translate('invitations') + this.state.messageSent + "/" + this.state.invites}</Text>
                </TouchableOpacity>
                <View style={{ marginTop: 20, height: '100%' }}>
                    <View style={{
                        zIndex: -100,
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        {!this.state.isFetching && this.state.contentLoading && < ActivityIndicator size="large" color={mycolor.pink} />}
                    </View>

                    <FlatList
                        data={this.state.categoriesdata}
                        renderItem={this.renderItem.bind(this)}
                        keyExtractor={(item) => item.id}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        ListEmptyComponent={() => this.noItemDisplay()} />
                </View>
                {Deletealert}

                <View style={{ height: "20%", marginTop: 'auto' }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateCategory', { "categorydata": [], "categoriesArr": this.state.categoriesdata })} style={{ position: 'absolute', width: '100%', marginBottom: 5, bottom: 0 }}>
                        <CategoryComp innerright={null} lefticon={require('../../assets/icon_add.png')} title={Trans.translate('NewCategory')}></CategoryComp>
                    </TouchableOpacity>
                </View>
                <ButtonComp
                    onPress={() => this.onNextScreen()}
                    text={mykeys.SELECTED_MAINCATEGORY == "whatsapp" ? Trans.translate("Next") : Trans.translate('Savepdf')}
                    isloading={this.state.setLoginLoading}
                    style={{ backgroundColor: mycolor.pink, marginBottom: 10, marginLeft: 22, marginRight: 22 }}
                    textcolor={mycolor.white}
                    textstyle={{ color: mycolor.white }} />
            </View>
        );
    }

    renderItem({ item, index }) {
        return (
            <TouchableOpacity onPress={() => this.choosecategory(item, index)}>
                <CategoryComp lefticon={require('../../assets/icon_category.png')}
                    title={item.name}
                    count={item.participants.length}
                    innerright={null}
                    item={item}
                    containerstyle={this.state.isChecked[index] ? { backgroundColor: mycolor.lightPink } : {}}
                    fromchildprops={this.onPressButtonChildren}
                    righticon={null}></CategoryComp>
            </TouchableOpacity>
        );
    }

    onRefresh() {
        this.setState({ isFetching: true, }, () => { this.getAllCategories() });
    }

    noItemDisplay = () => {
        return (
            !this.state.contentLoading && <View style={{ paddingHorizontal: 50, justifyContent: 'center', alignItems: 'center', height: 400 }}>
                <Text style={{ textAlign: 'center' }}>{Trans.translate('no_data_found')}</Text>
            </View>
        )
    }

    onPressButtonChildren = (value, item) => {
        switch (value) {
            case 'delete':
                this.setState({ showalert: true, currentselected: item.id })
                break
            case 'edit':
                this.props.navigation.navigate('CreateCategory', { "categorydata": item, "categoriesArr": this.state.categoriesdata })
                break
            default:
        }
    }
    createTwoButtonAlert = (message) =>
        Alert.alert(
            Trans.translate("packagedetails"),
            message,
            [{
                text:Trans.translate("cancel"),
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text:Trans.translate("Ok"), onPress: () => this.props.navigation.navigate('UpgradePackage') }
            ]
        );

    onNextScreen() {
        if (mykeys.SELECTED_MAINCATEGORY == "whatsapp") {
            var invitedata = Keys.invitealldata
            let SelectedCategories = this.state.selectedLists;
            let count = 0;
            for (let i in SelectedCategories) {
                count = count + (SelectedCategories[i].participants.length * SelectedCategories[i].people_per_qr)
            }

            if (this.state.selectedLists.length == 0)
                Alert.alert("No category selected")

            else if (count > invitedata["Eventdata"].package_details.package_people) {
                // Alert.alert("Alert", )
                this.createTwoButtonAlert("You have selected package with " + invitedata["Eventdata"].package_details.package_people + " invitation now your invitation limit exceed please upgrade your package")
            }
            else {

                invitedata = { "Eventdata": invitedata["Eventdata"], "PackageData": invitedata["PackageData"], "CategoriesData": this.state.selectedLists, "ImageData": invitedata["ImageData"] }
                Keys.invitealldata = invitedata
                if (invitedata["ImageData"] == undefined || invitedata["ImageData"] == "")
                    this.props.navigation.navigate('Todos')
                else
                    this.props.navigation.navigate('SendEditor')

            }
        }
        else {
            this.pdfAlert(Trans.translate('pdfcategoryhint'))
        }
    }

    pdfAlert = (message) =>
        Alert.alert(
            Trans.translate("alert"),
            message,
            [{
                text: Trans.translate("cancel"),
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel"
            },
            { text:Trans.translate("Ok"), onPress: () => this.props.navigation.goBack() }
            ]
        );

    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            this.getAllCategories()
        });
    }

    choosecategory = (item, index) => {
        let { isChecked } = this.state;
        isChecked[index] = !this.state.isChecked[index];
        this.setState({ isChecked: isChecked });
        if (isChecked[index] == true) {
            this.state.selectedLists.push(item)
        } else {
            this.state.selectedLists.pop(item)
        }
    }

    async getAllCategories() {
        const isConnected = await NetworkUtils.isNetworkAvailable()
        if (!isConnected) {
            Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
            return
        }
        this.logCallback("getallcategory :", this.state.contentLoading = true);
        var userdata = await Prefs.get(Keys.userData);
        var parsedata = JSON.parse(userdata)

        // ApiCalls.getapicall("get_categories", "?user_id=" + parsedata.id + "&event_id=" + Keys.invitealldata["Eventdata"].event_id).then(data => {
        ApiCalls.getapicall("get_categories", "?event_id=" + Keys.invitealldata["Eventdata"].event_id + "&category_type=" + Keys.SELECTED_MAINCATEGORY).then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false, this.state.isFetching = false);
            if (data.status == true) {
                this.setState({ isChecked: [], selectedLists: [] })
                let eventCategories = Keys.invitealldata["Eventdata"].categoriesList;
                console.log("EVENT CATEGORIES")
                console.log(eventCategories)
                this.mergeContacts(data.data.categories)
                this.setState({ categoriesdata: data.data.categories, messageSent: data.data.message_sent, invites: data.data.invites })
                let arr = []
                console.log("CategoriesData")
                console.log(Keys.invitealldata["CategoriesData"])
                if (eventCategories == undefined) {
                    // arr = Keys.invitealldata["CategoriesData"].SelectedCategories
                    arr = Keys.invitealldata["CategoriesData"]
                } else {
                    arr = eventCategories
                }
                for (let i in data.data.categories) {
                    for (let j in arr) {
                        if (data.data.categories[i].id == arr[j].id) {
                            this.choosecategory(data.data.categories[i], i);
                        }
                    }
                }
            } else {
                // Alert.alert('Failed', data.message);
                Global.mergedContacts = []
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.contentLoading = false, this.state.isFetching = false);
            Global.mergedContacts = []
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }

    mergeContacts(contacts) {
        let allContacts = [];
        for (let i = 0; i < contacts.length; i++) {
            for (let j = 0; j < contacts[i].participants.length; j++) {
                let item = {
                    category: contacts[i].name,
                    number: contacts[i].participants[j].number
                }
                allContacts.push(item)
            }
        }
        Global.mergedContacts = []
        Global.mergedContacts = allContacts;
        console.log("MERGED CONTACTS")
        console.log(Global.mergedContacts)
    }

    async DeleteCategory(id) {
        const isConnected = await NetworkUtils.isNetworkAvailable()
        if (!isConnected) {
            Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
            return
        }
        this.setState({ showalert: false })
        this.logCallback("DeleteEvent :", this.state.contentLoading = true);
        ApiCalls.deletapicall("delete_category", id).then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
            if (data.status == true) {
                const newList = this.state.categoriesdata.filter((item) => item.id !== id);
                this.setState({ categoriesdata: newList })
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.contentLoading = false);
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }

    logCallback = (log, callback) => {
        // console.log(log);
        this.setState({
            callback
        });
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
});