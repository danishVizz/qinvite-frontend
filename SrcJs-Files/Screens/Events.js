import React, { Component, useState } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Image, View, StyleSheet, Alert, Text } from 'react-native'
import Event_items from '../ListCustomviews/Event_items'
import FloatingButtonComp from '../Components/FloatingButtonComp';
import ApiCalls from '../Services/ApiCalls';
import Prefs from '../Prefs/Prefs';
import Keys from '../Constants/keys';
import Trans from '../Translation/translation';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import AlertComp from '../Components/AlertComp';
import NetworkUtils from "../Constants/NetworkUtils";
import Global from '../Constants/Global';

export default class Events extends Component {

  state = {
    EventAllData: [],
    contentLoading: false,
    showalert: false,
    isFetching: false,
    currentselected: false
  }

  _onPress() {
    this.props.onPressButtonChildren(this.props.item); //Change: passing prop onPressItem and calling _onPressItem
    // this.props.deleteAll()
  }

  render() {

    let Deletealert = (
      this.state.showalert ?
        <AlertComp
          alertbody={Trans.translate('Delethint')}
          alerttitle={Trans.translate('DeleteEvent')}
          onCancelPress={() => this.setState({ showalert: false })}
          onDeletePress={() => this.DeleteEvent(this.state.currentselected)}></AlertComp> : null
    );
    return (
      <View style={{ flex: 1, backgroundColor: mycolor.white }}>
        <FlatList
          contentContainerStyle={(this.props.type == "All" ? this.getallData().length : this.props.type == "Active" ? this.getActiveData().length : this.getCloseData().length) === 0 && {
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
          data = {this.state.EventAllData}
          renderItem={this.renderItem.bind(this)}
          horizontal={false}
          keyExtractor={(item) => item.id}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isFetching}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 80 }}></View>}
          ListEmptyComponent={this.noItemDisplay} />

        <View style={{ flexDirection: 'row', alignSelf: 'flex-end', position: "absolute", bottom: 20, right: 20 }}>
          <FloatingButtonComp imagesrc={require('../../assets/icon_event.png')} floatingclick={() => this.props.navigation.navigate("CreateEvent", { "eventdata": [] })}></FloatingButtonComp>
        </View>

        {Deletealert}

        {!this.state.isFetching && this.state.contentLoading && <View style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(52, 52, 52, 0.2)'
        }}>
          < ActivityIndicator size="large" color={mycolor.pink} />
        </View>}
      </View>
    )
  }

  getallData() {
    try {
      var filterarray = this.state.EventAllData
      return filterarray

    } catch {
      return this.state.EventAllData
    }

  }
  getActiveData() {
    try {
      var filterarray = this.state.EventAllData.filter(eventdata => eventdata.event_status == "1")
      return filterarray
    } catch {
      return this.state.EventAllData
    }
  }
  getCloseData() {
    try {
      var filterarray = this.state.EventAllData.filter(eventdata => eventdata.event_status == "2")
      return filterarray
    } catch {
      return this.state.EventAllData
    }
  }
  noItemDisplay = () => {
    return (
      <Text style={{ display: this.state.contentLoading ? 'none' : 'flex' }}>{Trans.translate('no_record_found')}</Text>
    )
  }
  componentDidMount() {
    console.log('Mounted');
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      console.log("Events Focused")
      this.getAllEvents();
    });

  }

  logCallback = (log, callback) => {
    console.log(log);
    this.setState({
      callback
    });
  }

  onRefresh() {
    this.setState({ isFetching: true, }, () => { this.getAllEvents() });
  }
  async getAllEvents() {
    const isConnected = await NetworkUtils.isNetworkAvailable()
    if (!isConnected) {
      Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
      return
    }
    this.logCallback("Getting Events....:", this.state.contentLoading = !(this.state.isFetching));
    var userdata = await Prefs.get(Keys.userData);
    var parsedata = JSON.parse(userdata)
    ApiCalls.getapicall("get_events", "?user_id=" + parsedata.id).then(data => {
      this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false, this.state.isFetching = false);
      if (data.status == true) {
        this.setState({ EventAllData: data.data })
      } else {
        // Alert.alert('Failed', data.message);
      }
    }, error => {
      this.logCallback("Something Went Wrong", this.state.contentLoading = false, this.state.isFetching = false);
      console.log(JSON.stringify(error))
      // Alert.alert('Error', JSON.stringify(error));
    }
    )
  }

  async DeleteEvent(id) {
    const isConnected = await NetworkUtils.isNetworkAvailable()
    if (!isConnected) {
      Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
      return
    }
    this.setState({ showalert: false })
    this.logCallback("DeleteEvent :", this.state.contentLoading = true);
    // var userdata = await Prefs.get(Keys.userData);
    // var parsedata = JSON.parse(userdata)
    console.log("Event-Idddd" + id)
    ApiCalls.deletapicall("delete_event", id).then(data => {
      this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
      if (data.status == true) {
        const newList = this.state.EventAllData.filter((item) => item.id !== id);
        this.setState({ EventAllData: newList })
      } else {
        Alert.alert('Failed', data.message);
      }
    }, error => {
      this.logCallback("Something Went Wrong", this.state.contentLoading = false);
      Alert.alert('Error', JSON.stringify(error));
    }
    )
  }

  renderItem({ item, index }) {
    return (
      <TouchableOpacity onPress={() => this.actionOnRow(item)}>
        <Event_items
          fromchildprops={this.onPressButtonChildren}
          item={item}
          image={item.image_url}
          title={item.event_name}
          description={item.event_address}
        />
      </TouchableOpacity>
    );
  };

  onPressButtonChildren = (value, item) => {
    console.log("EditEvent--" + JSON.stringify(item))
    switch (value) {
      case 'delete':
        this.setState({ showalert: true, currentselected: item.id })
        break
      case 'edit':
        this.props.navigation.navigate('CreateEvent',
          {
            "eventdata": item
          })

        this
        break
      default:
      // this.props.navigation.navigate('EventDetails')
    }
  }

  actionOnRow(itemdata, props) {
    console.log('Selected Item :' + itemdata.event_date);
    this.props.navigation.navigate('EventDetails', {
      "eventdata": itemdata

    })
  }

  successCallBackData = (data) => {
    console.log(data)// can get callback data here
  }

   deleteAll = async () => {
    const isConnected = await NetworkUtils.isNetworkAvailable()
    if (!isConnected) {
      Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
      return
    }
    this.logCallback("Getting Events....:", this.state.contentLoading = !(this.state.isFetching));
    console.log(this.state.contentLoading)
    let query = '?user_id=' + Global.userData.id
    ApiCalls.getGenericCall("delete_all_events", query).then(data => {
      console.log("DELETE ALL DATA")
      console.log(data)
      if (data.status == true) {
        this.setState({ EventAllData: data.data, contentLoading: false })
      } else {
        Alert.alert('Failed', data.message);
        this.setState({ contentLoading: false });
      }
    }, error => {
      // Alert.alert('Error', JSON.stringify(error));
      console.log(JSON.stringify(error))
    }
    )
  }

  deleteAllAlert = () => {

    Alert.alert(
      "Delete",
      Trans.translate('delete_all_events_msg'),
      [
        {
          text: Trans.translate('cancel'),
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: Trans.translate('Delete'), onPress: () => this.deleteAll() }
      ]
    );
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


