
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import TextInputComp from '../Components/TextInputComp';
import ButtonComp from '../Components/ButtonComp';
import StatusBarComp from '../Components/StatusBarComp';
import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation'
import ApiCalls from '../Services/ApiCalls'
import Keys from '../Constants/keys'
import Prefs from '../Prefs/Prefs'
import HeaderComp2 from '../Components/HeaderComp2';

const WINDOW = Dimensions.get('window');

export default class SendEditor extends Component {

  state = {
    eventname: '',
    eventdate: '',
    recpntistcount: 0,
    eventaddress: '',
    receptionistsarr: [],
    selectedvaluesarr: [],
    eventnameError: false,
    eventAddressError: false,
    selectedvaluesError: false,
    eventDateError: false,
    picker: false,
    date: new Date(),
    mode: 'date',
    show: false,
    time: new Date(),
    message: '',
    recepNameTxt: '',
    country: '',
    sendToAll: false,
    checkIcon: 'uncheckbox.png'
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBarComp backgroundColor={mycolor.pink} />
        {/* <StatusBar
          backgroundColor='#F54260'
        /> */}
        <HeaderComp2 textfonts={'bold'} fromleft={10} title={Trans.translate('SendInvites')}  textfonts={'normal'} textsize={16} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white' leftBtnClicked={() => this.props.navigation.goBack()} />
        <ScrollView>
          <View style={styles.subContainer}>
            <View style={styles.innercontainer}>
              {/* <Image style={{ backgroundColor: 'gray', width: '100%', height: 203, borderRadius: 6 }} source={require('../../assets/logo.png')}></Image> */}
              <Image resizeMode='contain' style={{ width: '100%', height: 300, borderRadius: 6, backgroundColor: 'white' }} source={{ uri: Keys.invitealldata["ImageData"] }}></Image>
              <Text style={{ fontSize: 14, marginTop: 15, color: mycolor.txtGray }}>{Trans.translate("message")}</Text>

              <TextInputComp
                style={{ height: 112 }}
                placeholder={Trans.translate("message")}
                placeholderTextColor={mycolor.lightgray}
                textinstyle={{ width: "100%" }}
                value={this.state.message}
                onChangeText={(message) => this.setState({ message: message, eventnameError: false })}
              />
              {this.state.eventnameError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.eventNameErrortxt}</Text> : <View></View>}

              <Text style={{ fontSize: 14, marginTop: 15, color: mycolor.txtGray }}>{Trans.translate("select_category")}</Text>

              <DropDownPicker
                items={this.state.receptionistsarr}
                defaultValue={this.state.country}
                containerStyle={{ height: 60, marginTop: 10 }}
                style={{ backgroundColor: '#fff', borderColor: mycolor.lightgray }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                multiple={false}
                placeholderStyle={{ color: mycolor.lightgray }}
                placeholder={Trans.translate('ChooseCategory')}
                dropDownStyle={{ backgroundColor: '#fafafa' ,height:100}}
                onChangeItem={(item => this.updateUser(item))} />


              <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ sendToAll: !(this.state.sendToAll) })}>
                  <Image style={{ width: 24, height: 24, backgroundColor: 'gray' }} source={this.state.sendToAll ? require('../../assets/icon_check.png') : require('../../assets/uncheckbox.png')}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 14, marginLeft: 7, color: mycolor.txtGray }}>{Trans.translate("send_to_all")}</Text>
              </View>

              <View style={{ width: '100%', marginTop: 30, marginBottom: 10 }}>
                <ButtonComp textstyle={{ color: 'white' }} text={Trans.translate('Preview')}
                  // onPress={() => this.props.navigation.navigate('Packages')}
                  onPress={() => this.CreateEvent()}
                ></ButtonComp>


              </View>
              {/* <View style={{ width: '100%', marginTop: 0}}>
              <ButtonComp textstyle={{ color: 'white' }} text={Trans.translate('Savepdf')}
                  // onPress={() => this.props.navigation.navigate('Packages')}
                  onPress={() => console.log("Hello")}
                ></ButtonComp>
              </View> */}
            </View>
          </View>
        </ScrollView>
      </View>
    );

  }
  updateUser = (selectedvalue, index) => {
    var item = {
      message: this.state.message,
      categoryid: selectedvalue.value
    }
    var messagesarray = this.state.selectedvaluesarr
    messagesarray.push(item)
    this.setState({ selectedvaluesarr: messagesarray, message: '' })
    console.log(this.state.selectedvaluesarr)
  }



  componentDidMount() {
    var receptionistsarr = []
    var receptionistdata = Keys.invitealldata["CategoriesData"].SelectedCategories
    console.log("reececefce" + receptionistdata)
    receptionistdata.map((item, key) => {
      var receptionists = {
        label: item.name,
        value: item.id,
        selected: true
      }
      receptionistsarr.push(receptionists)
    })
    this.setState({ receptionistsarr: receptionistsarr })
  }

  logCallback = (log, callback) => {
    console.log(log);
    this.setState({
      callback
    });
  }

  async CreateEvent() {
    var invitedata = Keys.invitealldata
    invitedata = { "Eventdata": invitedata["Eventdata"], "PackageData": invitedata["PackageData"], "CategoriesData": invitedata['CategoriesData'], "ImageData": Keys.invitealldata["ImageData"], "CategoriesMessages": this.state.selectedvaluesarr }
    Keys.invitealldata = invitedata
    this.props.navigation.navigate("PreviewInvite")

    //   this.logCallback("Creating Event :", this.state.contentLoading = true);
    //   var userdata = await Prefs.get(Keys.userData);
    //   var parsedata = JSON.parse(userdata);
    //   var alleventdata = Keys.invitealldata
    //   var formadata = new FormData()
    //   formadata.append("event_card", this.props.route.params.imagedata)
    //   formadata.append("event_name", alleventdata["Eventdata"].event_name)
    //   formadata.append("event_date", alleventdata["Eventdata"].event_date)
    //   formadata.append("event_address", alleventdata["Eventdata"].event_address)
    //   formadata.append("user_id", parsedata.id)
    //   formadata.append("package_id", alleventdata["PackageData"])

    //   var receptionists = alleventdata["Eventdata"].receptionists

    //   var categories = alleventdata["CategoriesData"].SelectedCategories

    //   receptionists.map((item, index) => {
    //     formadata.append("receptionists[" + index + "]", item.id)
    //   })
    //   categories.map((item, index) => {
    //     formadata.append("Categories[" + index + "]", item.id)
    //   })
    //   console.log("Formdataaaaa?????" + JSON.stringify(formadata))

    //   ApiCalls.postApicall(formadata, "add_event").then(data => {
    //     this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
    //     if (data.status == true) {
    //       this.props.navigation.navigate('CombineComp')
    //     } else {
    //       Alert.alert('Failed', data.message);
    //     }
    //   }, error => {
    //     this.logCallback("Something Went Wrong", this.state.contentLoading = false);
    //     Alert.alert('Error', JSON.stringify(error));
    //     this.props.navigation.navigate('CombineComp')
    //   }
    //   )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column'
  },

  subContainer: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.32,
    shadowRadius: 5.46,
    elevation: 9,
  },

  innercontainer: {
    flex: 1,
    marginLeft: 13,
    marginRight: 13,
    marginTop: 13,
  }

});
