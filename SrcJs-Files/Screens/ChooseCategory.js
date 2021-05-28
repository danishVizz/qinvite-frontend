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
export default class ChooseCategory extends Component {
    state = {
        contentLoading: false,
        categoriesdata: [],
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
            <SafeAreaView style={styles.container}>
                <View style={{ height: "65%", marginTop: 20 }}>
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
                        showsHorizontalScrollIndicator={false} />


                </View>
                {Deletealert}

                <View style={{ height: "20%" }}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('CreateCategory', { "categorydata": [] })} style={{ position: 'absolute', width: '100%', marginBottom: 5, bottom: 0 }}>
                        <CategoryComp innerright={null} lefticon={require('../../assets/icon_add.png')} title={Trans.translate('NewCategory')}></CategoryComp>
                    </TouchableOpacity>
                </View>
                <ButtonComp
                    onPress={() => this.onNextScreen()}
                    text={Trans.translate("Next")}
                    isloading={this.state.setLoginLoading}
                    style={{ backgroundColor: mycolor.pink, marginBottom: 10, marginLeft: 22, marginRight: 22 }}
                    textcolor={mycolor.white}
                    textstyle={{ color: mycolor.white }} />
            </SafeAreaView>
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

    onPressButtonChildren = (value, item) => {
        switch (value) {
            case 'view':
                this.props.navigation.navigate('CreateCategory', { "categorydata": item })
                break
            case 'delete':
                this.setState({ showalert: true, currentselected: item.id })
                break
            case 'edit':
                console.log("----EddittCat" + JSON.stringify(item))
                this.props.navigation.navigate('CreateCategory', { "categorydata": item })
                break
            default:
        }
    }
    createTwoButtonAlert = (message) =>
    Alert.alert(
      Trans.translate("packagedetails"),
     message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.props.navigation.navigate('UpgradePackage') }
      ]
    );

    onNextScreen() {
        var invitedata = Keys.invitealldata
        console.log("EventDataaaaa" + JSON.stringify(invitedata["Eventdata"]))
        let SelectedCategories = this.state.selectedLists;
        let count = 0;
        for (let i in SelectedCategories) {
            count = count + SelectedCategories[i].participants.length
        }

        if (this.state.selectedLists.length == 0)
            Alert.alert("No category selected")

        else if (count > invitedata["Eventdata"].package_details.package_people) {
            // Alert.alert("Alert", )
           this.createTwoButtonAlert("You have selected package with " + invitedata["Eventdata"].package_details.package_people + " invitation now your invitation limit exceed please upgrade your package")
        }
        else {
            console.log('??selected categories?? ' + JSON.stringify(this.state.selectedLists))

            invitedata = { "Eventdata": invitedata["Eventdata"], "PackageData": invitedata["PackageData"], "CategoriesData": { "SelectedCategories": this.state.selectedLists }, "ImageData": invitedata["ImageData"] }
            Keys.invitealldata = invitedata
            console.log(Keys.invitealldata["CategoriesData"])
            if (invitedata["ImageData"] == undefined || invitedata["ImageData"] == "")
                this.props.navigation.navigate('Todos')
            else
                this.props.navigation.navigate('SendEditor')

        }
    }
    componentDidMount() {
        // console.log("EVENT DATA")
        // console.log(Keys.invitealldata["Eventdata"])
        // this.getAllCategories()

        this.focusListener = this.props.navigation.addListener('focus', () => {
            console.log("Screen REFRESHED");
            this.getAllCategories()
        });
    }

    choosecategory = (item, index) => {
        let { isChecked } = this.state;
        isChecked[index] = !this.state.isChecked[index];
        console.log("BEFORE" + this.state.isChecked)
        this.setState({ isChecked: isChecked }, () => console.log("AFTER" + this.state.isChecked));
        if (isChecked[index] == true) {
            this.state.selectedLists.push(item)
        } else {
            this.state.selectedLists.pop(item)
        }
    }
    async getAllCategories() {
        this.logCallback("getallcategory :", this.state.contentLoading = true);
        var userdata = await Prefs.get(Keys.userData);
        var parsedata = JSON.parse(userdata)

        ApiCalls.getapicall("get_categories", "?user_id=" + parsedata.id).then(data => {
            this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false, this.state.isFetching = false);
            if (data.status == true) {
                this.setState({ isChecked: [],selectedLists:[] })
                let eventCategories = Keys.invitealldata["Eventdata"].categoriesList;
                this.setState({ categoriesdata: data.data })
                for (let i in data.data) {
                    for (let j in eventCategories) {
                        if (data.data[i].id == eventCategories[j].category_id) {
                            this.choosecategory(data.data[i], i);
                        }
                    }
                }
            } else {
                Alert.alert('Failed', data.message);
            }
        }, error => {
            this.logCallback("Something Went Wrong", this.state.contentLoading = false, this.state.isFetching = false);
            Alert.alert('Error', JSON.stringify(error));
        }
        )
    }

    async DeleteCategory(id) {
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
        console.log(log);
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