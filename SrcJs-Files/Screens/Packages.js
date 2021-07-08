import React, { Component } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, View, StyleSheet, Alert, ActivityIndicator, StatusBar } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/core';
import ButtonComp from '../Components/ButtonComp';
import Trans from '../Translation/translation';
import { SafeAreaView } from 'react-native-safe-area-context';
import PackagesComp from '../Components/PackagesComp';
import ApiCalls from '../Services/ApiCalls';
import HeaderComp from '../Components/HeaderComp';
import StatusBarComp from '../Components/StatusBarComp';
import Prefs from '../Prefs/Prefs';
import mykeys from '../Constants/keys';
import { TouchableOpacity } from 'react-native';
import moment from "moment";
import NetworkUtils from "../Constants/NetworkUtils";

export class Packages extends Component {
  state = {
    packagesdata: [],
    contentLoading: false,
    selectedItem: null,
    isFetching: false,
    showLoaderView: false
  }

  render() {
    try {
      const data = this.props.route.params.data || 'none'
      data.selectedItem = this.state.selectedItem;
      console.log(data)
    } catch {
      const data = 'none'
      console.log(data)
    }

    return (
      <View style={{ flex: 1, backgroundColor: mycolor.white }}>
        <StatusBarComp backgroundColor={mycolor.pink} />
        {/* <StatusBar
          backgroundColor={mycolor.pink}
        /> */}
        <View style={{ flex: 8 }}>

          <HeaderComp textfonts={'bold'} fromleft={10} title={Trans.translate('Packages')} textfonts={'bold'} textsize={18} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white' leftBtnClicked={() => this.props.navigation.goBack()} />

          {/* <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {this.state.contentLoading && <ActivityIndicator size="large" color={mycolor.pink} />}
          </View> */}

          <FlatList
            data={this.state.packagesdata}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item) => item.id}
            onRefresh={() => this.onRefresh()}
            refreshing={this.state.isFetching}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} />


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
            {this.state.contentLoading && < ActivityIndicator size="large" color={mycolor.pink} />}
          </View>
        </View>
        <View style={{ flex: 1.5 }}>
          <ButtonComp style={styles.button} textstyle={{ color: 'white', fontSize: 16, fontWeight: 'bold' }} text={Trans.translate('CreatOwnPackage')}
            onPress={() => this.props.navigation.navigate('CreatePackage', {designer_id: this.props.route.params.designer_id})}
          ></ButtonComp>
        </View>
        {this.state.showLoaderView && <View style={{ position: 'absolute', width: '100%', height: '100%', backgroundColor: 'rgba(52, 52, 52, 0.8)', justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={mycolor.pink} />
        </View>}
      </View>
    );
  }

  onRefresh() {
    this.setState({ isFetching: true, }, () => { this.getAllPackages() });
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity style={this.state.selectedItem === item.id ? {
        marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, borderColor: mycolor.pink, borderWidth: 2, borderRadius: 5, opacity: this.props.route.name == 'PackagesTab' ? 0.5 : 1
      } : {
        marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, backgroundColor: mycolor.white, opacity: this.props.route.name == 'PackagesTab' ? 0.5 : 1
      }}
        onPress={() => this.actionOnRow(item)}
        disabled={this.props.route.name == 'PackagesTab' ? true : false}>
        <PackagesComp
          // toggle={() => this.onToggle(index)}
          image={item.package_name}
          title={item.package_name}
          price={item.package_price}
          invitationcount={item.package_people}
        />
      </TouchableOpacity>
    );
  }

  actionOnRow(itemdata) {
    console.log('Selected Item :' + itemdata.package_name);
    // alert(itemdata.package_name)
    this.setState({ selectedItem: itemdata.id });
    this.createTwoButtonAlert(Trans.translate('packageselectionhint'))

  }

  createTwoButtonAlert(message) {
    console.log("AlertCreateTwoButton", "I am Here")
    Alert.alert(
      Trans.translate("alert"),
      message,
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => this.CreateEvent() }
      ]
    );
  }

  componentDidMount() {
    console.log('Mounted');
    this.setState({ isLoading: true })
    this.getAllPackages();
  }




  logCallback = (log, callback) => {
    console.log(log);
    this.setState({
      callback
    });
  }


  async getAllPackages() {
    const isConnected = await NetworkUtils.isNetworkAvailable()
    if (!isConnected) {
      Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
      return
    }
    this.logCallback("getProducts :", this.state.contentLoading = !(this.state.isFetching));
    var userdata = await Prefs.get(mykeys.userData);
    var parsedata = JSON.parse(userdata)

    ApiCalls.getapicall("get_packages", "?user_id=" + parsedata.id).then(data => {
      this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false, this.state.isFetching = false);
      if (data.status == true) {
        this.setState({ packagesdata: data.data })
        this.setState({ isLoading: false })
        // this.setState({ productData: data.data });
        // this.logCallback(this.state.productData, this.state.contentLoading = false);
        //   Alert.alert('Success', data.message);
      } else {
        Alert.alert('Failed', data.message);
      }
    }, error => {
      this.logCallback("Something Went Wrong", this.state.contentLoading = false, this.state.isFetching = false);
      Alert.alert('Error', JSON.stringify(error));
    }
    )
  }

  async CreateEvent() {
    const isConnected = await NetworkUtils.isNetworkAvailable()
    if (!isConnected) {
      Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
      return
    }
    var invitedata = mykeys.invitealldata
    var apiname = 'add_event'
    var usersdata = await Prefs.get(mykeys.userData);

    var parsedata = JSON.parse(usersdata)
    console.log("UserData")
    console.log(invitedata)
    var formadata = new FormData()
    formadata.append("event_name", invitedata["Eventdata"].event_name)
    formadata.append("event_date", String(moment(invitedata["Eventdata"].event_date).format("YYYY-MM-DD HH:mm:ss")))
    formadata.append("event_address", invitedata["Eventdata"].event_address)
    formadata.append("user_id", parsedata.id)
    formadata.append("package_id", this.state.selectedItem)
    formadata.append("no_of_receptionists", invitedata["Eventdata"].no_of_receptionists)
    invitedata["Eventdata"].receptionists.map((item, index) => {
      formadata.append("receptionists[" + index + "]", invitedata["Eventdata"].receptionists[index])
    });
    console.log("PACKAGES FORMDATA")
    console.log(formadata)

    this.logCallback('Creating Event', this.state.showLoaderView = true);
    ApiCalls.postApicall(formadata, apiname).then(data => {

      this.logCallback("Response came", this.state.showLoaderView = false);
      if (data.status == true) {
        console.log(JSON.stringify(data))

        var invitedata = mykeys.invitealldata
        var eventdata = invitedata["Eventdata"]
        eventdata.event_id = data.data.id
        eventdata.package_details = data.data.package_details

        invitedata = { "Eventdata": eventdata, "PackageData": this.state.selectedItem }
        mykeys.invitealldata = invitedata
        console.log("PATH 01")
        console.log(this.props.route.params)
        console.log("DESIGNER ID : ", this.props.route.params.designer_id)
        if ((this.props.route.params.designer_id == null || this.props.route.params.designer_id == undefined)) {
          console.log("PATH 02")
          this.props.navigation.navigate('Payment', { "event_data": mykeys.invitealldata["Eventdata"], "Type": "new" })
        } else {
          console.log("PATH 03")
          this.SendRequestDesigners()
        }


      } else {
        Alert.alert('Failed', data.message);
      }
    }, error => {
      this.logCallback("Something Went Wrong", this.state.contentLoading = false);
      // this.props.navigation.navigate('Payment', { "event_id": data.data.id })
      // Alert.alert('Error', JSON.stringify(error));
    }
    )
  }

  async SendRequestDesigners() {
    const isConnected = await NetworkUtils.isNetworkAvailable()
    if (!isConnected) {
      Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
      return
    }
    this.logCallback("getAllDesigner :", this.state.contentLoading = true);
    var userdata = await Prefs.get(mykeys.userData);
    var parsedata = JSON.parse(userdata);

    var formadata = new FormData()
    formadata.append("user_id", parsedata.id)
    console.log("PATH 04")
    formadata.append("designer_id", this.props.route.params.designer_id)
    formadata.append("event_id", mykeys.invitealldata["Eventdata"].event_id)

    ApiCalls.postApicall(formadata, "request_designer").then(data => {
      this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
      if (data.status == true) {
        console.log("Response Came " + JSON.stringify(data))
        // this.props.navigation.navigate('Packages')
        this.props.navigation.navigate('Payment', { "event_data": mykeys.invitealldata["Eventdata"], "Type": "new" })
      } else {
        Alert.alert('Failed', data.message);
      }
    }, error => {
      this.logCallback("Something Went Wrong", this.state.contentLoading = false);
      Alert.alert('Error', JSON.stringify(error));
    }
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },

  list: {
    flex: 8
  },
  button: {
    marginLeft: 33, marginRight: 33, marginTop: 20,
    marginTop: 33,
    marginBottom: 57
  },

});
;

export default Packages;