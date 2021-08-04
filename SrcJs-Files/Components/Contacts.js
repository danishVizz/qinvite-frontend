import React, { Component, useState } from 'react';
import mycolor from '../Constants/Colors'
import { FlatList, Image, View, StyleSheet, Alert, Text } from 'react-native'
import Event_items from '../ListCustomviews/Event_items'
import FloatingButtonComp from './FloatingButtonComp';
import ApiCalls from '../Services/ApiCalls';
import Prefs from '../Prefs/Prefs';
import Keys from '../Constants/keys';
import Trans from '../Translation/translation';
import { ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native';
import ConversationComp from './ConversationComp';
import NetworkUtils from "../Constants/NetworkUtils";
import moment from 'moment';

export default class Contacts extends Component {

  state = {
    EventAllData: [],
    contentLoading: false,
    showalert: false,
    isFetching: false,
    currentselected: false
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: mycolor.white }}>
        <FlatList
          contentContainerStyle={this.getLength(this.props.type) == 0 && {
            flexGrow: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
          data={this.filterData(this.props.type)}
          renderItem={this.renderItem.bind(this)}
          horizontal={false}
          keyExtractor={(item) => item.id}
          refreshing={this.state.isFetching}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={<View style={{ height: 80 }}></View>}
          ListEmptyComponent={this.noItemDisplay} />

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

  filterData(type) {
    switch (type) {
      case 'all':
        return this.props.participants
      case 'seen':
        return this.props.participants.filter(obj => obj.status == '3')
      case 'delivered':
        return this.props.participants.filter(obj => obj.status == '2')
      case 'sent':
        return this.props.participants.filter(obj => obj.status == '1')
      case 'pending':
        return this.props.participants.filter(obj => obj.status == '0')
    }
  }

  getLength(type) {
    switch (type) {
      case 'all':
        return this.props.participants.length
      case 'seen':
        return this.props.participants.filter(obj => obj.status == '3').length
      case 'delivered':
        return this.props.participants.filter(obj => obj.status == '2').length
      case 'sent':
        return this.props.participants.filter(obj => obj.status == '1').length
      case 'pending':
        return this.props.participants.filter(obj => obj.status == '0').length
    }
  }

  noItemDisplay = () => {
    return (
      <Text style={{ display: this.state.contentLoading ? 'none' : 'flex' }}>{Trans.translate('no_record_found')}</Text>
    )
  }

  componentDidMount() {
    console.log("PARTICIPANTS")
    console.log(this.props.participants)
  }

  async getAllEvents() {
    const isConnected = await NetworkUtils.isNetworkAvailable()
    if (!isConnected) {
      Alert.alert(Trans.translate("network_error"), Trans.translate("no_internet_msg"))
      return
    }

    var userdata = await Prefs.get(Keys.userData);
    var parsedata = JSON.parse(userdata)
    ApiCalls.getapicall("get_events", "?user_id=" + parsedata.id).then(data => {
      if (data.status == true) {
        this.setState({ EventAllData: data.data })
      } else {
        // Alert.alert('Failed', data.message);
      }
    }, error => {
      Alert.alert('Error', JSON.stringify(error));
    }
    )
  }

  renderItem({ item, index, props }) {
    console.log("inex: " + item.invitation_date);
    var status = ''
    if (item.status == "0") { status = "Pending" }
    else if (item.status == "1") { status = "Message Sent" }
    else if (item.status == "2") { status = "Message Delivered" }
    else if (item.status == "3") { status = "Message Seen" }
    else if (item.status == "5") { status = "Not Sent" }
    else if (item.status == "6") { status = "Non-Whatsapp" }
    return (
      <ConversationComp
        contact={item.number}
        imagepath={require('../../assets/icon_contact.png')}
        contactname={item.name}
        status={status}
        time={String(moment(item.invitation_date).format("hh:mm A"))}
      />
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


