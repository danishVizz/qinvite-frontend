
import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, Image, StatusBar, Picker, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderComp from '../Components/HeaderComp';
import TextInputComp from '../Components/TextInputComp';
import ButtonComp from '../Components/ButtonComp';
import mycolor from '../Constants/Colors';
import ApiCalls from '../Services/ApiCalls';
import Trans from '../Translation/translation'
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from "moment";
export default class CreateEvent extends Component {



  state = {
    eventname: '',
    eventdate: '',
    recpntistcount: 0,
    eventaddress: '',
    user: [],
    selelectedvalue: '',
    selectedvaluesarr: [],
    eventnameError: false,
    eventAddressError: false,
    selectedvaluesError: false,
    eventDateError: false,
    picker: false,
    date: new Date(),
    mode: 'date',
    show: false,
    time: new Date()

  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor='#F54260'
        />

        {/* <HeaderComp textfonts={'bold'} fromleft={10} title={Trans.translate('CreateEvents')}  textfonts={'normal'} textsize={16} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white'  /> */}

        <ScrollView>
          <View style={styles.innercontainer}>
            <Text style={{ fontSize: 14 }}>{Trans.translate("Eventname")}</Text>

            <TextInputComp
              placeholder={Trans.translate("Eventname")}
              placeholderTextColor={mycolor.lightgray}
              textinstyle={{ width: "100%" }}
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
                value={this.state.date}
                keyboardType={'numeric'}
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
              onChangeText={(eventaddress) => this.setState({ eventaddress: eventaddress, eventAddressError: false })}
            />
            {this.state.eventAddressError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.eventAddressErrortxt}</Text> : <View></View>}


            <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("Recepionist")}</Text>

            <TextInputComp
              placeholder={'0'}
              inputtype={'numeric'}
              placeholderTextColor={mycolor.lightgray}
              textinstyle={{ width: "100%" }}
              onChangeText={(count) => this.setState({ recpntistcount: count })}
            />

            <Text style={{ fontSize: 14, marginTop: 30 }}>{Trans.translate("ReceptionistName")}</Text>
            <View style={{ marginTop: 10, borderColor: mycolor.lightgray, borderRadius: 5, borderWidth: 1 }}>
              <Picker
                selectedValue={this.state.selelectedvalue}
                style={{ height: 60, width: "100%" }}
                // onValueChange={(modeValue, modeIndex) => this.setState({ mode: modeValue })}>
                onValueChange={(modeValue, modeIndex) => this.updateUser(modeValue)}>

                {this.state.user.map((item, key) => (
                  <Picker.Item label={item.first_name} value={item.first_name} key={key} />)
                )}

              </Picker>
            </View>
            {this.state.eventAddressError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.selectedvaluesErrortxt}</Text> : <View></View>}


            <View style={{ width: '100%', marginTop: 30, marginBottom: 30 }}>
              <ButtonComp textstyle={{ color: 'white' }} text={Trans.translate('Next')}
                // onPress={() => this.props.navigation.navigate('Packages')}
                onPress={() => this.onSignupPress()}
              ></ButtonComp>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );

  }

  componentDidMount() {
    this.getAllReceptionists()
  }

  logCallback = (log, callback) => {
    console.log(log);
    this.setState({
      callback
    });
  }

  onSignupPress() {
    var check = this.checkforError()
    if (check) {
      return;
    }
    else {
      var newitem = {
        "eventname": this.state.eventname,
        "eventaddress": this.state.eventaddress,
        "eventdate": this.state.date,
        "receptionists": this.state.selectedvaluesarr
      }
      this.props.navigation.navigate('Packages',
        {
          "data": newitem
        }
      )

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
    if (this.state.selectedvaluesarr.length == 0) {
      this.setState({
        selectedvaluesErrortxt: Trans.translate("Receptionistisreq"),
        selectedvaluesError: true
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


    if (anycheckfalse) {
      return true;
    }

    return false;
  }

  async getAllReceptionists() {
    this.logCallback("getProducts :", this.state.contentLoading = true);
    // var userdata = await Prefs.get(Keys.userData);
    // var parsedata = JSON.parse(userdata)
    ApiCalls.getapicall("receptionists", "").then(data => {
      this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
      if (data.status == true) {
        this.setState({ user: data.data })
      } else {
        Alert.alert('Failed', data.message);
      }
    }, error => {
      this.logCallback("Something Went Wrong", this.state.contentLoading = false);
      Alert.alert('Error', JSON.stringify(error));
    }
    )
  }

  updateUser = (selectedvalue) => {
    if (this.state.recpntistcount == this.state.selectedvaluesarr.length)
      Alert.alert("Receptionist selection limit fullfilled")
    else {
      this.setState({ selelectedvalue: selectedvalue })
      this.setState({ selectedvaluesarr: this.state.selectedvaluesarr.concat(selectedvalue) })
    }
    console.log("Array values " + this.state.selectedvaluesarr)
  }

  onChange = (event, selectedValue) => {
    this.setState({ show: (Platform.OS === 'ios') })
    if (this.state.mode == 'date') {
      const currentDate = selectedValue || new Date();
      this.setState({ date: moment(currentDate).format("YYYY-MM-D") })
      // setDate(currentDate);
      this.setState({ mode: 'time' })
      // setMode('time');
      this.setState({ show: (Platform.OS !== 'ios') })
      // setShow(Platform.OS !== 'ios'); // to show the picker again in time mode
      console.log("" + this.state.date)
      this.setState({ eventDateError: false })
      this.setState({ eventdate: currentDate })

    } else {
      const selectedTime = selectedValue || new Date();
      var selecteddatetime = new Date(selectedTime)
      this.setState({ time: selecteddatetime.getHours() + ":" + selecteddatetime.getMinutes() })
      this.setState({ date: this.state.date + ":" + this.state.time })
      // setTime(selectedTime);
      this.setState({ show: (Platform.OS === 'ios') })
      // setShow(Platform.OS === 'ios');
      // setMode('date');
      this.setState({ mode: 'date' })
      console.log("Time " + this.state.time)
      this.setState({ eventdate: selecteddatetime })
      this.setState({ eventDateError: false })

    }
  };


  renderPicker() {
    // if (this.state.picker) {
    return (
      <DateTimePicker
        testID="dateTimePicker"
        timeZoneOffsetInMinutes={-5}
        value={new Date()}
        mode={this.state.mode}
        is24Hour={false}
        display="default"
        onChange={this.onChange}
      />
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