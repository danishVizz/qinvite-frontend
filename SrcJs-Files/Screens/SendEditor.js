
import React, { Component } from 'react';
import { render } from 'react-dom';
import { View, Text, StyleSheet, Image, StatusBar, Dimensions, Alert } from 'react-native';
import { ScrollView, TextInput, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';
import TextInputComp from '../Components/TextInputComp';
import ButtonComp from '../Components/ButtonComp';
import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation'


const WINDOW = Dimensions.get('window');
export default class SendEditor extends Component {

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
    time: new Date(),

    recepNameTxt: '',
    country: '',
    sendToAll: false,
    checkIcon: 'uncheckbox.png'
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          backgroundColor='#F54260'
        />

        {/* <HeaderComp textfonts={'bold'} fromleft={10} title={Trans.translate('CreateEvents')}  textfonts={'normal'} textsize={16} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white'  /> */}

        <ScrollView>
          <View style={styles.subContainer}>
            <View style={styles.innercontainer}>
              {/* <Image style={{ backgroundColor: 'gray', width: '100%', height: 203, borderRadius: 6 }} source={require('../../assets/logo.png')}></Image> */}
              <Image resizeMode='contain' style={{ width: '100%', height: 300, borderRadius: 6 }} source={{uri: 'file://' + this.props.route.params.imgUrl}}></Image>
              <Text style={{ fontSize: 14, marginTop: 15, color: mycolor.txtGray }}>{Trans.translate("ReceptionistName")}</Text>

              <TextInputComp
                style={{ height: 112 }}
                placeholder={Trans.translate("message")}
                placeholderTextColor={mycolor.lightgray}
                textinstyle={{ width: "100%" }}
                onChangeText={(name) => this.setState({ eventname: name, eventnameError: false })}
              />
              {this.state.eventnameError ? <Text style={{ fontSize: 12, marginTop: 10, color: "red" }}>{this.state.eventNameErrortxt}</Text> : <View></View>}

              <Text style={{ fontSize: 14, marginTop: 15, color: mycolor.txtGray }}>{Trans.translate("select_category")}</Text>
              <DropDownPicker
                items={[
                  { label: 'Family', value: 'family' },
                  { label: 'Friend', value: 'friend' },
                  { label: 'Relative', value: 'relative' },
                ]}
                defaultValue={this.state.country}
                containerStyle={{ height: 60, marginTop: 10 }}
                style={{ backgroundColor: '#fff', borderColor: mycolor.lightgray }}
                itemStyle={{
                  justifyContent: 'flex-start',

                }}
                placeholderStyle={{ color: mycolor.lightgray }}
                placeholder="Family"
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => this.setState({
                  country: item.value
                })}
              />
              <View style={{ flexDirection: 'row', marginTop: 15, alignItems: 'center' }}>
                <TouchableOpacity onPress={() => this.setState({ sendToAll: !(this.state.sendToAll) })}>
                  <Image style={{ width: 24, height: 24, backgroundColor: 'gray' }} source={this.state.sendToAll ? require('../../assets/icon_check.png') : require('../../assets/uncheckbox.png')}></Image>
                </TouchableOpacity>
                <Text style={{ fontSize: 14, marginLeft: 7, color: mycolor.txtGray }}>{Trans.translate("send_to_all")}</Text>
              </View>

              <View style={{ width: '100%', marginTop: 30, marginBottom: 30 }}>
                <ButtonComp textstyle={{ color: 'white' }} text={Trans.translate('SendInvites')}
                  // onPress={() => this.props.navigation.navigate('Packages')}
                  onPress={() => Alert.alert("Coming Soon")}
                ></ButtonComp>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );

  }

  componentDidMount() {
    // Alert.alert(this.props.route.params.imgUrl);
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
