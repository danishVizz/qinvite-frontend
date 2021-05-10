
import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, Image, StatusBar, Picker, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Prefs from '../Prefs/Prefs';
import Keys from '../Constants/keys';
import TextInputComp from '../Components/TextInputComp';
import ButtonComp from '../Components/ButtonComp';
import mycolor from '../Constants/Colors';
import ApiCalls from '../Services/ApiCalls';
import Trans from '../Translation/translation'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
import mykeys from '../Constants/keys';
import DropDownPicker from 'react-native-dropdown-picker';
import MultiSelect from "react-multi-select-component";
import DatePicker from 'react-native-date-picker'
// import Snackbar from 'react-native-snackbar';
import HeaderComp2 from '../Components/HeaderComp2';
import StatusBarComp from '../Components/StatusBarComp';

export default class CreateEvent extends Component {

  state = {
    eventname: '',
    eventdate: '',
    recpntistcount: 0,
    eventaddress: '',
    user: [],
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
    loadDropDown: false
  }


  render() {
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
              value={this.state.eventaddress}
              onChangeText={(eventaddress) => this.setState({ eventaddress: eventaddress, eventAddressError: false })}
            />

            {this.state.eventAddressError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.eventAddressErrortxt}</Text> : <View></View>}
            <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("Recepionist")}</Text>

            <TextInputComp
              inputtype={'numeric'}
              placeholderTextColor={mycolor.lightgray}
              textinstyle={{ width: "100%" }}
              isEnable={!(this.state.iseditevent)}
              value={String(this.state.recpntistcount)}
              onChangeText={(count) => this.setState({ recpntistcount: count, selectedvaluesarr: [] })}
            />

            <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("ReceptionistName")}</Text>

            {/* <View style={{ marginTop: 10, borderColor: mycolor.lightgray, borderRadius: 5, borderWidth: 1 }}>
              <Picker
                selectedValue={this.state.selelectedvalue}
                style={{ height: 60, width: "100%" }}
                // onValueChange={(modeValue, modeIndex) => this.setState({ mode: modeValue })}>
                onValueChange={(modeValue, modeIndex) => this.updateUser(modeValue, modeIndex)}>

                {this.state.user.map((item, key) => (
                  <Picker.Item label={item.first_name} value={item.first_name} key={key} />)
                )}

              </Picker>
            </View> */}

            {this.state.loadDropDown ?

            // <View style={{zIndex: 100}}>
              <DropDownPicker
                items={this.state.user}
                containerStyle={{ height: 60, marginTop: 10 }}
                style={{ backgroundColor: '#fff', borderColor: mycolor.lightgray }}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                close={() => this.props.close}
                defaultValue={""}
                // disabled={this.state.disabledropdown}
                multiple={true}
                disabledropdown={(this.state.iseditevent)}
                disabled={(this.state.iseditevent)}
                // multipleText={"%d items have been selected."}
                placeholderStyle={{ color: mycolor.lightgray }}
                placeholder={Trans.translate('select_receptionists')}
                dropDownStyle={{ backgroundColor: '#fafafa', height: 100 }}
                removeItem={(value => this.removeItem(value))}
                onChangeItemMultiple={item => this.setState({
                }, console.log("Multi......" + this.state.selectedCountries))}
                onChangeItem={(item, index) => this.updateUser(item, index)} />
                // </View>
              :
              null
            }

            {this.state.eventAddressError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.selectedvaluesErrortxt}</Text> : <View></View>}


            <View style={{ width: '100%', marginTop: 30, marginBottom: 30 }}>
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
    this.state.eventdata = this.props.route.params.eventdata ?? []
    console.log(moment(this.state.eventdata.event_date).format('ddd MMM DD HH:mm:ss'))
    if (this.state.eventdata.length != 0) {
      let event_Date=moment(this.state.eventdata.event_date).format('ddd MMM DD HH:mm:ss');// 2021-05-07 01:51:29
      this.setState({
        eventid: this.state.eventdata.id,
        eventname: this.state.eventdata.event_name,
        eventaddress: this.state.eventdata.event_address,
        eventdate: event_Date,
        // date: event_Date,
        recpntistcount: this.state.eventdata.no_of_receptionists,
        iseditevent: true,
        paymentstatus: this.state.eventdata.payment_status,
        buttontxt: Trans.translate('Edit')
      }, () => this.updateSelectedVal(this.state.eventdata.receptionists))

      mykeys.invitealldata = {"ImageData": this.props.route.params.eventdata.event_card}

    }
    this.getAllReceptionists()
  }

  updateSelectedVal(receptionistdata) {
    console.log("this.state.user")
    console.log(receptionistdata)
    if (receptionistdata != undefined) {
      receptionistdata.map((item, index) => {
        this.setState({ selectedvaluesarr: this.state.selectedvaluesarr.concat(item.id) })
        // receptionistsarr.push(receptionists
      })
      this.setState({ editreceptionistarr: receptionistdata }, () => console.log("Editarratlenght" + this.state.editreceptionistarr[1].id))
    }

  }

  logCallback = (log, callback) => {
    console.log(log);
    this.setState({
      callback
    });
  }

  async onSignupPress() {
    console.log('createEvent 2');
    var check = this.checkforError()
    console.log("check : " + check);
    if (check) {
      return;
    }
    else {
      var usersdata = await Prefs.get(Keys.userData);
      var parsedata = JSON.parse(usersdata)
      var data = {
        "event_name": this.state.eventname,
        "event_date": this.state.date,
        "event_address": this.state.eventaddress,
        "user_id": parsedata.id,
        "no_of_receptionists": this.state.recpntistcount,
        "receptionists": this.state.selectedvaluesarr,
        "event_card": this.props.route.params.eventdata.event_card,
        "event_id": this.state.eventid,
        "categoriesList": this.props.route.params.eventdata.categories
      }
      mykeys.invitealldata = { "Eventdata": data,"ImageData": data.event_card   }
      if (!(this.state.iseditevent)) {
        this.props.navigation.navigate('Packages')
      }
      else {
      
        this.CreateEvent()
      }
    }

  }

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
    // if (this.state.selectedvaluesarr.length == 0) {
    //   this.setState({
    //     selectedvaluesErrortxt: Trans.translate("Receptionistisreq"),
    //     selectedvaluesError: true
    //   })
    //   anycheckfalse = true;
    // }
    if (this.state.phoneTxt == "" && this.state.isSelectedRB1) {
      this.setState({
        phoneerrortxt: Trans.translate("phoneerror"),
        phoneError: true
      })
      anycheckfalse = true;
    }


    if (anycheckfalse) {
      return true;
    }

    return false;
  }

  async CreateEvent() {
    console.log(this.state.selectedvaluesarr)
    var apiname = ''
    var check = this.checkforError()
    if (check) {
      return;
    }
    var usersdata = await Prefs.get(Keys.userData);
    var parsedata = JSON.parse(usersdata)
    var formadata = new FormData()
    formadata.append("event_name", this.state.eventname)
    formadata.append("event_date", this.state.date)
    formadata.append("event_address", this.state.eventaddress)
    formadata.append("user_id", parsedata.id)
    formadata.append("no_of_receptionists", this.state.recpntistcount)
    this.state.selectedvaluesarr.map((item, index) => {
      formadata.append("receptionists[" + index + "]", this.state.selectedvaluesarr[index])
    });
    if (this.state.iseditevent) {
      formadata.append("event_id", this.state.eventid)
      apiname = "edit_event"
    }
    else {
      apiname = "add_event"
    }

    console.log(apiname)
    this.logCallback('Creating Event', this.state.isLoading = true);
    ApiCalls.postApicall(formadata, apiname).then(data => {

      this.logCallback("Response came", this.state.isLoading = false);
      if (data.status == true) {
        console.log('payment : ' + this.state.paymentstatus);
        if (this.state.paymentstatus == 3)
          this.props.navigation.replace('Todos')
        else {
          this.props.navigation.navigate("Payment", { "event_id": this.state.eventid })
          // this.props.navigation.replace('Todos')
        }


      } else {
        Alert.alert('Failed', data.message);
      }
    }, error => {
      console.log("Error"+error)
      this.logCallback("Something Went Wrong", this.state.isLoading = false);
      Alert.alert('Error', JSON.stringify(error));
    }
    )
  }


  async getAllReceptionists() {
    this.logCallback("getProducts :", this.state.contentLoading = true);

    ApiCalls.getapicall("receptionists", "").then(data => {
      this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
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
      this.logCallback("Something Went Wrong", this.state.contentLoading = false);
      Alert.alert('Error', JSON.stringify(error));
    }
    )
  }

  updateUser = (selectedvalue, index) => {

    if (this.state.recpntistcount < selectedvalue.length) {
      Alert.alert("You can select only " + this.state.recpntistcount + " receptionist")
    }
    else {
      this.setState({ selectedvaluesarr: selectedvalue }, () => console.log(this.state.selectedvaluesarr))
    }

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
      this.setState({ date: currentDate });

    }
  }

  // onChange = (event, selectedValue) => {

  //   this.setState({ show: (Platform.OS === 'ios') })
  //   const currentDate = selectedValue || new Date();

  //   if (this.state.mode == 'date') {
  //     const currentDate = selectedValue || new Date();
  //     this.setState({ date: moment(currentDate).format("YYYY-MM-D") })
  //     // setDate(currentDate);
  //     // this.setState({ mode: 'time' })
  //     // setMode('time');
  //     this.setState({ show: (Platform.OS !== 'ios') })
  //     // setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
  //     console.log("" + this.state.date)
  //     this.setState({ eventDateError: false })
  //     this.setState({ eventdate: currentDate })

  //   } else {
  //     const selectedTime = selectedValue || new Date();
  //     var selecteddatetime = new Date(selectedTime)
  //     this.setState({ time: selecteddatetime.getHours() + ":" + selecteddatetime.getMinutes() })
  //     this.setState({ date: this.state.date + ":" + this.state.time })
  //     // setTime(selectedTime);
  //     this.setState({ show: (Platform.OS === 'ios') })
  //     // setShow(Platform.OS === 'ios');
  //     // setMode('date');
  //     this.setState({ mode: 'date' })
  //     console.log("Time " + this.state.time)
  //     this.setState({ eventdate: selecteddatetime })
  //     this.setState({ eventDateError: false })
  //   }
  // }

  renderPicker() {
    console.log("PICKER DATE : "+this.state.date);
    return (
      this.state.show && (<View style={{ marginTop: 20 }}>
        <DatePicker
          date={this.state.date}
          mode="datetime"
          onDateChange={(date) => this.setState({ date: date, eventdate: moment(date).format('ddd MMM DD HH:mm:ss') })}
        />
        <View style={{ margin: 20 }}>
          <ButtonComp
            onPress={() => this.setState({ show: false })}
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
    marginTop: 33
  }

});
