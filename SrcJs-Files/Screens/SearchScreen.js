import React, { Component } from "react";


import { View,SafeAreaView, StatusBar, Image, StyleSheet, TouchableOpacity } from 'react-native';
import mycolor from "../Constants/Colors";
import { FlatList } from "react-native-gesture-handler";
import ApiCalls from "../Services/ApiCalls";
import { SearchBar } from 'react-native-elements';
import keys from "../Constants/keys";
import Event_items from "../ListCustomviews/Event_items";



export default class SearchScreen extends Component {
  state = {
    search: '',
    loading: false,
    Data: []
  };

  updateSearch = (s) => {
    this.setState({ search: s });
    console.log(s + s.length)
    if (s.length >= 3) {
      this.setState({ loading: true });
      this.onSearch(s);
    }
  };

  render() {

    const { search } = this.state;

    let searchView =
      (
        <SafeAreaView style={{marginTop:30}}>
          {/* <HeaderComp></HeaderComp> */}
          <SearchBar
            searchIcon={{ name: "west", onPress: () => this.Onbackpress() }}
            containerStyle={{ backgroundColor: 'white', borderBottomWidth: 1.5, borderTopWidth: 0, borderBottomColor: mycolor.lightgray }}
            inputContainerStyle={{ backgroundColor: 'white' }}
            inputStyle={{ includeFontPadding: false, fontSize: 16 }}
            placeholder="Type Here..."
            showLoading={this.state.loading}
            loadingProps={{ color: mycolor.themecolor }}
            onChangeText={(search) => this.updateSearch(search)}
            value={search}
          />
          <FlatList
            data={this.state.Data}
            renderItem={this.searchitem}
            keyExtractor={(item) => item.product_code}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
          />
        </SafeAreaView>
      )

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar backgroundColor={mycolor.pink} />
        {searchView}
      </SafeAreaView>
    );
  }

  onSearch(s) {
    ApiCalls.searchapicall("search", s).then(data => {
      console.log("Response came");
      if (data.status == true) {
        console.log(data);
        this.setState({
          loading: false,
          Data: data.data
        })
      } else {
        this.setState({
          loading: false,
        })
        
      }
    }, error => {
      console.log(error);
    }
    )
  }

  searchitem = ({ item, index }) => {
    return (
      //   <Event_items
      //   fromchildprops={this.onPressButtonChildren}
      //   item={item}
      //   image={item.image_url}
      //   title={item.event_name}
      //   description={item.event_address}
      // />

      <TouchableOpacity onPress={() => this.actionOnRow(item)}>
        <Event_items
          fromchildprops={this.onPressButtonChildren}
          item={this.state.Data}
          image={item.image_url}
          title={item.event_name}
          description={item.event_address}
        />
      </TouchableOpacity>
    )
  }

  onPressButtonChildren = (value, item) => {
    switch (value) {
      case 'delete':
        this.DeleteEvent(item.id)
        break
      case 'edit':
        var newitem = {
          "eventid": item.id,
          "eventname": item.event_name,
          "eventaddress": item.event_address,
          "eventdate": item.event_date,
          "no_of_receptionists": item.no_of_receptionists,
          "receptionists": item.receptionists
        }
        this.props.navigation.navigate('CreateEvent', {"eventdata": newitem})
        break
      default:
      // this.props.navigation.navigate('EventDetails')
    }

    // console.log("working" + value+" "+ item.id)
    //press button chilldren 
  }

  // googlePlacesInput = () => {
  //   return (
  //     <View>
  //       <HeaderComp
  //         title={Trans.translate("Address")}
  //         leftBtn={require('../../../assets/backBtn.png')}
  //         leftBtnClicked={() => this.props.navigation.goBack()}
  //         rightBtnClicked={() => this.props.navigation.navigate('SearchScreen')}
  //       />
  //       <Divider></Divider>

  //       <GooglePlacesAutocomplete
  //         placeholder={Trans.translate('search')}
  //         onPress={(data, details = null) => {
  //           console.log(data, details);
  //         }}
  //         query={{
  //           key: keys.apiKey,
  //           language: 'en',
  //         }}
  //         onFail={(error) => this.onError(error)}
  //       />

  //     </View>
  //   );
  // };

  onPress(item) {
    var productData = {
      _id: item._id,
      product_detail: item
    }
    this.props.navigation.navigate('ProductDetails', {
      productData: productData
    })
  }

  onError(error) {
    console.error(error);
    Snackbar.show({
      text: error,
      duration: Snackbar.LENGTH_SHORT,
    });
  }

  Onbackpress() {

    // this.props.route.params.searchCallback({ "place": "Pakistan" });
    //  this.props.route.params.searchCallback({ "place": "Pakistan" });
    this.props.navigation.goBack();
  }
}

const style = StyleSheet.create({
  containerView: {
    flex: 1,
    backgroundColor: 'white',
  },
});
