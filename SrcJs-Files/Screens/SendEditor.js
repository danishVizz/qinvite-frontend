
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, Alert, Keyboard } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import Video from 'react-native-video';
import TextInputComp from '../Components/TextInputComp';
import ButtonComp from '../Components/ButtonComp';
import StatusBarComp from '../Components/StatusBarComp';
import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation'
import ApiCalls from '../Services/ApiCalls'
import Keys from '../Constants/keys'
import Prefs from '../Prefs/Prefs'
import HeaderComp2 from '../Components/HeaderComp2';
import { ActivityIndicator } from 'react-native';

const WINDOW = Dimensions.get('window');

export default class SendEditor extends Component {

  constructor(props) {
    super(props)
    console.log("RUNNNN")
    this.uriArr = Keys.invitealldata["ImageData"].split('.')
    this.ext = this.uriArr[this.uriArr.length - 1].toLowerCase()
    this.type = 'photo'
    if (this.ext == 'mp4' || this.ext == 'mov') {
      this.type = 'video'
    }
  }

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

  onBuffer() {
    console.log("BUFFERING")
  }

  videoError(error) {
    console.log("VIDEO ERRROR")
    console.log(error)
  }

  render() {
    console.log("VIDEO PATH")
    console.log(Keys.invitealldata["ImageData"])

    return (
      <View style={styles.container}>
        <StatusBarComp backgroundColor={mycolor.pink} />
        {/* <StatusBar
          backgroundColor='#F54260'
        /> */}
        <HeaderComp2 textfonts={'bold'} fromleft={10} title={Trans.translate('SendInvites')} textfonts={'normal'} textsize={16} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white' leftBtnClicked={() => this.props.navigation.goBack()} />
        <ScrollView>
          <View style={styles.subContainer}>
            <View style={styles.innercontainer}>
              {/* <Image style={{ backgroundColor: 'gray', width: '100%', height: 203, borderRadius: 6 }} source={require('../../assets/logo.png')}></Image> */}
              {this.type == 'photo' && <Image resizeMode='contain' style={{ width: '100%', height: 300, borderRadius: 6, borderColor: mycolor.lightgray, backgroundColor: 'white', borderWidth: 1 }} source={{ uri: Keys.invitealldata["ImageData"] }}></Image>}
              {this.type == 'video' && <Video source={{ uri: Keys.invitealldata["ImageData"] }}   // Can be a URL or a local file.
                ref={(ref) => {
                  this.player = ref
                }}                                      // Store reference
                onBuffer={this.onBuffer}                // Callback when remote video is buffering
                onError={this.videoError}
                controls={true}              // Callback when video cannot be loaded
                style={styles.backgroundVideo} />}
              <Text style={{ fontSize: 14, marginTop: 15, color: mycolor.txtGray }}>{Trans.translate("message")}</Text>
              <TextInputComp
                style={{ height: 112 }}
                placeholder={Trans.translate("message")}
                placeholderTextColor={mycolor.lightgray}
                textinstyle={{ width: "100%" }}
                value={this.state.message}
                returnKeyType='done'
                
                OnsubmitEditing={Keyboard.dismiss}
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
                dropDownStyle={{ backgroundColor: '#fafafa', height: 100 }}
                onChangeItem={(item => this.updateUser(item))}
              />

              <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ sendToAll: !(this.state.sendToAll) })}>
                  <Image style={{ width: 24, height: 24, backgroundColor: 'gray' }} source={this.state.sendToAll ? require('../../assets/icon_checked.png') : require('../../assets/uncheckbox.png')}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 14, marginLeft: 7, color: mycolor.txtGray }}>{Trans.translate("send_to_all")}</Text>
              </View>

              <View style={{ width: '100%', marginTop: 30, marginBottom: 10,paddingBottom:'5%'}}>
                <ButtonComp textstyle={{ color: 'white' }} text={Trans.translate('Preview')}
                  // onPress={() => this.props.navigation.navigate('Packages')}
                  onPress={() => this.CreateEvent()}
                ></ButtonComp>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );

  }
  updateUser = (selectedvalue, index) => {
    console.log("UPDATE USER")
    console.log(selectedvalue)
    let tmp = [...this.state.receptionistsarr]
    const listIndex = this.state.receptionistsarr.indexOf(selectedvalue)
    if (this.state.message != "") {
      let obj = { ...selectedvalue, icon: () => <Image style={{ width: 10, height: 10 }} source={require('../../assets/green_tick.png')} /> }
      // selectedvalue.label = selectedvalue.label + " (" + this.state.message + ")"
      tmp[listIndex] = obj
    } else {
      Alert.alert('Alert', 'Please add message first')
      return
    }

    var item = {
      message: this.state.message,
      categoryid: selectedvalue.value,
      categoryname: selectedvalue.label,

    }
    var messagesarray = this.state.selectedvaluesarr
    let ind = messagesarray.findIndex((item) => item.categoryid === selectedvalue.value);

    if (ind != -1) { messagesarray[ind] = item }
    else {
      messagesarray.push(item)
    }

    this.setState({ selectedvaluesarr: messagesarray, receptionistsarr: tmp })
    console.log("SelectedCategoryForMessages")
    console.log(this.state.selectedvaluesarr)
  }

  componentDidMount() {
    console.log("CategoriesData")
    console.log(Keys.invitealldata["CategoriesData"])
    var receptionistsarr = []
    var receptionistdata = Keys.invitealldata["CategoriesData"]
    receptionistdata.map((item, key) => {
      var receptionists = {
        label: item.name,
        value: item.id,
        selected: true,
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
    if (this.state.sendToAll) {
      var messagesarray = []
      this.state.receptionistsarr.map((item) => {
        console.log("Message Item is " + item.value + " " + this.state.message)
        var messageitem = {
          message: this.state.message,
          categoryid: item.value,
          categoryname: item.label
        }
        messagesarray.push(messageitem)
      })
      this.setState({ selectedvaluesarr: messagesarray, message: '' })
      console.log(messagesarray)
    } else {

    }
    console.log(JSON.stringify(this.state.selectedvaluesarr))
    var invitedata = Keys.invitealldata
    invitedata = { "Eventdata": invitedata["Eventdata"], "PackageData": invitedata["PackageData"], "CategoriesData": invitedata['CategoriesData'], "ImageData": Keys.invitealldata["ImageData"], "CategoriesMessages": this.state.selectedvaluesarr }
    Keys.invitealldata = invitedata
    this.props.navigation.navigate("PreviewInvite")
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
  },
  backgroundVideo: {
    // position: 'absolute',
    height: 300,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: mycolor.lightgray,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },

});
