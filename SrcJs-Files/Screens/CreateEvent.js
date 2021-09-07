
import React, { Component } from 'react';
import { View, Text, StyleSheet, Alert, Keyboard } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Prefs from '../Prefs/Prefs';
import Keys from '../Constants/keys';
import TextInputComp from '../Components/TextInputComp';
import ButtonComp from '../Components/ButtonComp';
import mycolor from '../Constants/Colors';
import ApiCalls from '../Services/ApiCalls';
import Trans from '../Translation/translation'
import moment from "moment";
import mykeys from '../Constants/keys';
import DropDownPicker from 'react-native-dropdown-picker';
import DatePicker from 'react-native-date-picker'
import HeaderComp2 from '../Components/HeaderComp2';
import NetworkUtils from "../Constants/NetworkUtils";
import StatusBarComp from '../Components/StatusBarComp';
import { SafeAreaView } from 'react-native';

// const lastNameRef = useRef();
export default class CreateEvent extends Component {

  state = {
    eventname: '',
    eventdate: '',
    recpntistcount: 0,
    eventaddress: '',
    user: [],
    assignedReceptionists: [],
    editreceptionistarr: [],
    recdefdata: [],
    selelectedvalue: '',
    eventdata: {},
    eventid: '',
    paymentstatus: '',
    disabledropdown: false,
    buttontxt: Trans.translate('Next'),
    selectedvaluesarr: [],
    iseditevent: false,
    eventnameError: false,
    eventAddressError: false,
    selectedvaluesError: false,
    eventDateError: false,
    picker: false,
    isLoading: false,
    date: new Date(),
    mode: 'datetime',
    show: false,
    time: new Date(),
    loadDropDown: false,
    selectedReceptionist: []
  }

  render() {
    var dropdownList = [];
    let dec = this.state.recpntistcount;
    // if (this.state.selectedReceptionist.length > 0) {
    for (let i = 0; i < this.state.recpntistcount; i++) {
      dropdownList.push(this.receptionistDropdown(dec * 1000, i, this.state.selectedReceptionist))
      dec = dec - 1
    }
    // }

    return (
      <View style={styles.container}>
        {/* <StatusBar
          backgroundColor='#F54260'
        /> */}
        <StatusBarComp backgroundColor={mycolor.pink} />
        <HeaderComp2 textfonts={'bold'} fromleft={10} title={Trans.translate('CreateEvents')} textfonts={'normal'} textsize={16} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white' leftBtnClicked={() => this.props.navigation.goBack()} />

        <ScrollView>
          <View style={styles.innercontainer}>
            <Text style={{ fontSize: 14 }}>{Trans.translate("Eventname")}</Text>
            <TextInputComp
              placeholder={Trans.translate("Eventname")}
              placeholderTextColor={mycolor.lightgray}
              textinstyle={{ width: "100%" }}
              returnKeytype="next"
              OnsubmitEditing={() => this.eventaddress.focus()}
              value={this.state.eventname}
              onChangeText={(name) => this.setState({ eventname: name, eventnameError: false })}
            />
            {this.state.eventnameError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.eventNameErrortxt}</Text> : <View></View>}

            <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("Eventdatetime")}</Text>
            <View>
              <TextInputComp
                onPressEyeBtn={() => this.setState({ show: true })}
                placeholder={Trans.translate("Eventdatetime")}
                placeholderTextColor={mycolor.lightgray}
                textinstyle={{ paddingLeft: 0 }}
                inputref={(inputref) => { this.eventdateinput = inputref }}
                returnKeytype="next"
                OnsubmitEditing={() => this.eventaddress.focus()}
                blurOnSubmit={false}
                value={String(this.state.eventdate)}
                keyboardType={'numeric'}
                isEnable={false}
                rightImgStyle={{ tintColor: mycolor.darkgray, marginRight: 40 }}
                rightIcon={require('../../assets/icon_picker.png')}
                onChangeText={(date) => this.setState({ eventdate: date })}
              />
              {this.state.eventDateError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.eventDateErrortxt}</Text> : <View></View>}
              {this.state.show ? this.renderPicker() : <View></View>}

            </View>

            <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("Eventaddress")}</Text>
            <TextInputComp
              placeholder={Trans.translate("Eventaddress")}
              placeholderTextColor={mycolor.lightgray}
              textinstyle={{ width: "100%" }}
              returnKeytype="next"
              inputref={(inputref) => { this.eventaddress = inputref }}
              OnsubmitEditing={() => { this.eventreceptionist.focus() }}
              blurOnSubmit={false}
              value={this.state.eventaddress}
              onChangeText={(eventaddress) => this.setState({ eventaddress: eventaddress, eventAddressError: false })}
            />

            {this.state.eventAddressError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.eventAddressErrortxt}</Text> : <View></View>}
            <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("Recepionist")}</Text>

            <TextInputComp
              inputref={(input) => { this.eventreceptionist = input }}
              inputtype={'numeric'}
              returnKeytype="done"
              OnsubmitEditing={() => { Keyboard.dismiss() }}
              placeholderTextColor={mycolor.lightgray}
              textinstyle={{ width: "100%" }}
              isEnable={!(this.state.paymentstatus == 3)}
              value={String(this.state.recpntistcount)}
              onChangeText={(count) => this.setState({ recpntistcount: count, selectedvaluesarr: [], selectedReceptionist: [] }, () => console.log("COUNT : " + count))}
            />

            {
              dropdownList
            }

            {this.state.eventAddressError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.selectedvaluesErrortxt}</Text> : <View></View>}
            <View style={{ width: '100%', marginTop: 30, paddingBottom: '55%' }}>
              <ButtonComp textstyle={{ color: 'white' }} text={this.state.buttontxt}
                isloading={this.state.isLoading}
                textcolor={mycolor.white}
                textstyle={{ color: mycolor.white }}
                onPress={() => this.onSignupPress()}
              ></ButtonComp>
            </View>
          </View>
        </ScrollView>
      </View>

    );

  }

  componentDidMount() {
    console.log("EVENT_DAATAFOR EDIT", this.props.route.params.eventdata)
    this.state.eventdata = this.props.route.params.eventdata ?? []
    if (this.state.eventdata.length != 0) {
      let event_Date = this.state.eventdata.event_date
      this.setState({
        eventid: this.state.eventdata.id,
        eventname: this.state.eventdata.event_name,
        eventaddress: this.state.eventdata.event_address,
        eventdate: event_Date,
        // date: event_Date,
        recpntistcount: this.state.eventdata.no_of_receptionists,
        iseditevent: true,
        paymentstatus: this.state.eventdata.payment_status,
        buttontxt: Trans.translate('Edit'),
        selectedReceptionist: this.state.eventdata.receptionists
      }, () => this.updateSelectedVal(this.state.eventdata.receptionists))

      mykeys.invitealldata = { "ImageData": this.props.route.params.eventdata.event_card }
      console.log("CATEGORIESEDITDATADIDMOunt", this.props.route.params.eventdata.categories)
      mykeys.invitealldata = { "CategoriesData": this.props.route.params.eventdata.categories }


    }
    !(this.state.iseditevent && !(this.state.paymentstatus == 3)) && this.getAllReceptionists()
  }

  updateSelectedVal(receptionistdata) {
    console.log("this.state.user")
    console.log(receptionistdata)
    if (receptionistdata != undefined) {
      let arr = []
      receptionistdata.map((item, index) => {
        arr.push(item.id)
      })
      this.setState({ editreceptionistarr: receptionistdata })
      this.setState({ selectedvaluesarr: arr }, () => console.log(this.state.selectedvaluesarr))
    }
    console.log("updateSelectedVal END")
  }

  receptionistDropdown(key, dropdownIndex, receptionists) {
    console.log("RECEPTIONIST " + dropdownIndex)
    console.log(receptionists)
    return (
      Platform.OS === 'ios' ? <View style={{ zIndex: key }} key={key}>
        <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("ReceptionistName")}</Text>
        <DropDownPicker
          zIndex={key}
          items={this.state.user}
          containerStyle={{ height: 60, marginTop: 10 }}
          style={{ backgroundColor: '#fff', borderColor: mycolor.lightgray }}
          itemStyle={{
            justifyContent: 'flex-start',
          }}
          close={() => this.props.close}
          defaultValue={""}
          multiple={false}
          disabledropdown={this.state.iseditevent && this.state.paymentstatus == 3}
          disabled={this.state.iseditevent && this.state.paymentstatus == 3}
          placeholderStyle={{ color: mycolor.lightgray }}
          placeholder={receptionists != undefined && receptionists.length > 0 ? receptionists[dropdownIndex].first_name : Trans.translate('select_receptionists')} //{Trans.translate('select_receptionists')}
          dropDownStyle={{ backgroundColor: '#fafafa', height: 100 }}
          removeItem={(value => this.removeItem(value))}
          onChangeItemMultiple={item => this.setState({
          }, console.log("Multi......" + this.state.selectedCountries))}
          onChangeItem={(item, index) => this.updateUser(item, index, dropdownIndex)} />
      </View> :

        <View key={key}>
          <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("ReceptionistName")}</Text>
          <DropDownPicker
            items={this.state.user}
            containerStyle={{ height: 60, marginTop: 10 }}
            style={{ backgroundColor: '#fff', borderColor: mycolor.lightgray }}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            close={() => this.props.close}
            defaultValue={""}
            multiple={false}
            disabledropdown={this.state.iseditevent && this.state.paymentstatus == 3}
            disabled={this.state.iseditevent && this.state.paymentstatus == 3}
            placeholderStyle={{ color: mycolor.lightgray }}
            placeholder={receptionists != undefined && receptionists.length > 0 ? receptionists[dropdownIndex].first_name : Trans.translate('select_receptionists')} //{Trans.translate('select_receptionists')}
            dropDownStyle={{ backgroundColor: '#fafafa', height: 100 }}
            removeItem={(value => this.removeItem(value))}
            onChangeItemMultiple={item => this.setState({
            }, console.log("Multi......" + this.state.selectedCountries))}
            onChangeItem={(item, index) => this.updateUser(item, index, dropdownIndex)} />
        </View>
    )
  }

  logCallback = (log, callback) => {
    console.log(log);
    this.setState({
      callback
    });
  }

  async onSignupPress() {

    if (!this.checkIfArrayIsUnique(this.state.selectedvaluesarr)) {
      Alert.alert("Warning", "You have selected same Receptionist more than one time.")
      return
    }
    var check = this.checkforError()
    console.log("check : " + check);
    if (check) {
      return;
    }
    else {
      console.log('createEvent 2');
      var usersdata = await Prefs.get(mykeys.userData);
      var parsedata = JSON.parse(usersdata)
      var data = {
        "event_name": this.state.eventname,
        "event_date": this.state.eventdate,
        "event_address": this.state.eventaddress,
        "user_id": parsedata.id,
        "no_of_receptionists": this.state.recpntistcount,
        "receptionists": this.state.selectedvaluesarr,
        "event_card": this.props.route.params.eventdata.event_card,
        "package_details": this.props.route.params.eventdata.package_details,
        "event_id": this.state.eventid,
        "categoriesList": this.props.route.params.eventdata.categories
      }
      console.log("CATEGORIESEDITDATAONPress", data.categories)
      mykeys.invitealldata = { "Eventdata": data, "ImageData": data.event_card, "CategoriesData": this.props.route.params.eventdata.categories }

      if (!(this.state.iseditevent)) {
        this.createTwoButtonAlert(Trans.translate('designerhint'))
      }
      else {
        console.log('createEvent 3');
        this.CreateEvent()
      }
    }
  }

  checkIfArrayIsUnique(myArray) {
    return myArray.length === new Set(myArray).size;
  }

  createTwoButtonAlert = (message) =>
    Alert.alert(
      Trans.translate("alert"),
      message,
      [
        {
          text: "No",
          onPress: () => this.props.navigation.navigate('Packages', { "designer_id": null }),
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.props.navigation.navigate('Designer', { "Type": "selection" }) }
      ]
    );

  checkforError() {
    var anycheckfalse = false;
    if (this.state.eventname == "") {
      this.setState({
        eventNameErrortxt: Trans.translate("Eventnameisreq"),
        eventnameError: true
      })
      anycheckfalse = true;
    }
    if (this.state.eventaddress == "") {
      this.setState({
        eventAddressErrortxt: Trans.translate("EventAddressisreq"),
        eventAddressError: true
      })
      anycheckfalse = true;
    }
    if (this.state.eventdate == "") {
      this.setState({
        eventDateErrortxt: Trans.translate("EventDateisreq"),
        eventDateError: true
      })
      anycheckfalse = true;
    }

    if (this.state.phoneTxt == "" && this.state.isSelectedRB1) {
      this.setState({
        phoneerrortxt: Trans.translate("phoneerror"),
        phoneError: true
      })
      anycheckfalse = true;
    }

    if (this.state.selectedvaluesarr.length == 0) {
      Alert.alert(Trans.translate("alert"), Trans.translate('please_select_receptionist_msg'))
      anycheckfalse = true;
    }
    if (!(this.state.iseditevent) && this.state.selectedvaluesarr.length != this.state.recpntistcount) {
      Alert.alert(Trans.translate("alert"), Trans.translate('please_select_receptionistcount_msg'))
      anycheckfalse = true;
    }


    if (anycheckfalse) {
      return true;
    }

    return false;
  }

  async CreateEvent() {
    const isConnected = await NetworkUtils.isNetworkAvailable()
    if (!isConnected) {
      Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
      return
    }
    console.log("EVENT DATE : " + this.state.eventdate)
    console.log('createEvent 4');
    var apiname = ''
    var check = this.checkforError()
    if (check) {
      return;
    }
    console.log('createEvent 5');
    var usersdata = await Prefs.get(Keys.userData);
    var parsedata = JSON.parse(usersdata)
    var formadata = new FormData()
    formadata.append("event_name", this.state.eventname)
    formadata.append("event_date", moment(this.state.eventdate).format('YYYY-MM-DD HH:mm:ss')) // 
    formadata.append("event_address", this.state.eventaddress)
    formadata.append("user_id", parsedata.id)
    formadata.append("no_of_receptionists", this.state.recpntistcount)
    console.log("SELECTEDVALUESARR")
    console.log(this.state.selectedvaluesarr)
    this.state.selectedvaluesarr.map((item, index) => {
      formadata.append("receptionists[" + index + "]", this.state.selectedvaluesarr[index])
    });
    console.log("FORMDATA")
    console.log(formadata)
    if (this.state.iseditevent) {
      formadata.append("event_id", this.state.eventid)
      apiname = "edit_event"
    }
    else {
      apiname = "add_event"
    }
    console.log('createEvent 6');
    // console.log(apiname)
    this.logCallback('Creating Event', this.state.isLoading = true);
    ApiCalls.postApicall(formadata, apiname).then(data => {
      console.log("Status...." + data.status)
      this.logCallback("Response came", this.state.isLoading = false);
      if (data.status == true) {
        console.log('payment : ' + this.state.paymentstatus);
        if (this.state.paymentstatus == 3)
          this.props.navigation.replace('Todos')
        else {
          console.log("Eventttt" + mykeys.invitealldata["Eventdata"])
          this.props.navigation.navigate("Payment", { "event_data": mykeys.invitealldata["Eventdata"], "Type": "new" })
        }
      } else {
        Alert.alert('Failed', data.message);
      }
    }, error => {
      console.log("Error" + error)
      this.logCallback("Something Went Wrong", this.state.isLoading = false);
      // Alert.alert('Error', JSON.stringify(error));
      if (this.state.paymentstatus == 3)
        this.props.navigation.replace('Todos')
      else {
        this.props.navigation.navigate("Payment", { "event_data": mykeys.invitealldata["Eventdata"], "Type": "new" })
        // this.props.navigation.replace('Todos')
      }
    }
    )
  }

  async getAllReceptionists() {
    this.logCallback("getProducts :", this.state.isLoading = true);

    ApiCalls.getapicall("receptionists", "").then(data => {
      this.logCallback("Response came" + JSON.stringify(data), this.state.isLoading = false);
      if (data.status == true) {
        var receptionistsarr = []
        var editreceptionistarr = this.state.editreceptionistarr

        data.data.map((item, key) => {
          var isselected = false
          const index = editreceptionistarr.findIndex((e) => e.id === item.id);
          if (index != -1) {
            isselected = true
          }
          var receptionists = {
            label: item.first_name,
            value: item,
            selected: isselected
          }
          receptionistsarr.push(receptionists)
        })
        this.setState({ user: receptionistsarr, loadDropDown: true }, () => console.log(this.state.user))

      } else {
        Alert.alert('Failed', data.message);
      }
    }, error => {
      this.logCallback("Something Went Wrong", this.state.isLoading = false);
      Alert.alert('Error', JSON.stringify(error));
    }
    )
  }

  updateUser = (selectedvalue, selecedIndex, dropdownIndex) => {

    // if (this.state.recpntistcount < selectedvalue.length) {
    //   Alert.alert("You can select only " + this.state.recpntistcount + " receptionist")
    // }
    // else {
    //   this.setState({ selectedvaluesarr: selectedvalue }, () => console.log(this.state.selectedvaluesarr))
    // }
    console.log("SELECTED INDEX : ", selecedIndex)
    console.log("INDEX : ", dropdownIndex)
    console.log("Selected Value : ", selectedvalue.value.id)
    let tmp = this.state.selectedvaluesarr

    // if (!(this.state.selectedvaluesarr.includes(selectedvalue.value.id))) {
    // let user = this.state.user
    // console.log("BEFORE")
    // console.log(user)
    // user.map(item => item.selected = false)
    // console.log("After")
    // user[selecedIndex].selected = true
    // console.log(user)

    tmp[dropdownIndex] = selectedvalue.value.id
    this.setState({
      selectedvaluesarr: tmp,
      // user: user
    }, () => console.log("SELECTED RECEPTIONIST" + this.state.selectedvaluesarr))
    // } 
    // else {
    //   Alert.alert("", selectedvalue.label + " is already assigned.")
    // }
    tmp = null
  }

  removeItem = (values) => {
    console.log(values + "Hereeeee")
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;

    this.setState({ show: Platform.OS === 'ios' });
    if (event.type === 'neutralButtonPressed') {
      this.setState({ date: new Date(0) });
    } else {
      console.log("Selcted date " + currentDate)
      this.setState({ date: currentDate });

    }
  }

  renderPicker() {
    console.log("PICKER DATE : " + this.state.date);
    return (
      this.state.show && (<View style={{ marginTop: 20 }}>
        <DatePicker
          date={this.state.date}
          mode="datetime"
          minimumDate={moment().toDate()}
          onDateChange={(date) => this.setState({ date: date, eventdate: moment(date).format('ddd MMM DD YYYY HH:mm:ss') }, console.log("DATE : " + date))}
        />
        <View style={{ margin: 20 }}>
          <ButtonComp
            onPress={() => {
              this.setState({ show: false })
              console.log("CATEGORY DATA")
              console.log(this.props.route.params.eventdata.categories)
              this.state.iseditevent && this.props.route.params.eventdata.categories.length > 0 && Alert.alert(Trans.translate("alert"), Trans.translate('change_event_date_msg'))
            }}
            textstyle={{ color: 'white' }}
            text={Trans.translate("Ok")}></ButtonComp>
        </View>
      </View>
      )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: 'column'
  },

  innercontainer: {
    flex: 1,
    marginLeft: 33,
    marginRight: 33,
    marginTop: 33,

  }

});
