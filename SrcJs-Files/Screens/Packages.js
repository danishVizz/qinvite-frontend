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
import HeaderComp2 from '../Components/HeaderComp2';
import HeaderComp from '../Components/HeaderComp';



export class Packages extends Component {
  state = {
    packagesdata: [],
    contentLoading: false,
    selectedItem: null
  }

  render() {
    // const {data} = this.props.route.data
    try {
      const data = this.props.route.params.data || 'none'
      data.selectedItem = this.state.selectedItem;
      console.log(data)
    } catch {
      const data = 'none'
      console.log(data)
    }

    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: mycolor.white }}>
          <StatusBar
          backgroundColor={mycolor.pink}
        />
        <View style={{ flex: 8 }}>
      
   <HeaderComp textfonts={'bold'} fromleft={10} title={Trans.translate('Packages')}  textfonts={'bold'} textsize={18} titlepos="center" />

      

          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {this.state.contentLoading && <ActivityIndicator size="large" color={mycolor.pink} />}
          </View>
          <FlatList
            data={this.state.packagesdata}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={(item) => item._id}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false} />
        </View>
        <View style={{ flex: 1.5 }}>
          <ButtonComp style={styles.button} textstyle={{ color: 'white', fontSize: 16, fontWeight: 'bold' }} text={Trans.translate('CreatOwnPackage')}
            onPress={() => this.props.navigation.navigate('CreatePackage')}
          ></ButtonComp>
        </View>
      </SafeAreaView>
    );
  }


  renderItem({ item, index }) {
    return (
      <TouchableWithoutFeedback style={this.state.selectedItem === item.id ? {
        marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, borderColor: mycolor.pink, borderWidth: 2, borderRadius: 5
      } : {
        marginTop: 5, marginBottom: 5, marginLeft: 20, marginRight: 20, backgroundColor: mycolor.white
      }}
        onPress={() => this.actionOnRow(item)}>
        <PackagesComp
          // toggle={() => this.onToggle(index)}
          image={item.package_name}
          title={item.package_name}
          price={item.package_price}
          invitationcount={item.package_people}
        />
      </TouchableWithoutFeedback>
    );
  };

  componentDidMount() {
    console.log('Mounted');
    this.setState({ isLoading: true })
    this.getAllPackages();
  }
  

  actionOnRow(itemdata) {
    console.log('Selected Item :' + itemdata.package_name);
    // alert(itemdata.package_name)
    this.setState({ selectedItem: itemdata.id });
    this.props.navigation.navigate('Todos')
  }
  logCallback = (log, callback) => {
    console.log(log);
    this.setState({
      callback
    });
  }


  async getAllPackages() {
    this.logCallback("getProducts :", this.state.contentLoading = true);
    // var userdata = await Prefs.get(Keys.userData);
    // var parsedata = JSON.parse(userdata)

    ApiCalls.getapicall("get_packages", "232132132").then(data => {
      this.logCallback("Response came" + JSON.stringify(data), this.state.contentLoading = false);
      if (data.status == true) {
        this.setState({ packagesdata: data.data })
        this.setState({ isLoading: false })
        // this.setState({ productData: data.data });
        console.log('productDataaaaaaaaaaaaaa');
        // this.logCallback(this.state.productData, this.state.contentLoading = false);
        //   Alert.alert('Success', data.message);
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