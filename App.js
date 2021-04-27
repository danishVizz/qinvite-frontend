import React, { Component, useReducer } from 'react';
import { StyleSheet, Text, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LandingScreen from './SrcJs-Files/Screens/Login';
import SignUpScreen from './SrcJs-Files/Screens/Signup'
import Event_items from './SrcJs-Files/ListCustomviews/Event_items'
import CreateEvent from './SrcJs-Files/Screens/CreateEvent'
import SendEditor from './SrcJs-Files/Screens/SendEditor'
import Todos from './SrcJs-Files/Screens/Todos'
import Events from './SrcJs-Files/Screens/Events'
import ChooseCategory from './SrcJs-Files/Screens/ChooseCategory'
import EventDetails from './SrcJs-Files/Screens/EventDetails'
import CreateCategory from './SrcJs-Files/Screens/CreateCategory'
import ContactListing from './SrcJs-Files/Screens/ContactListing'
import PreviewInvite from './SrcJs-Files/Screens/PreviewInvite'
import CreatePackage from './SrcJs-Files/Screens/CreatePackage'
import UploadMedia from './SrcJs-Files/Screens/UploadMedia'
import Designer from './SrcJs-Files/Screens/Designer'
import ReceivedDesign from './SrcJs-Files/Screens/ReceivedDesign'
import DesignerDetails from './SrcJs-Files/Screens/DesignerDetails'
import ForgotPass from './SrcJs-Files/Screens/ForgotPass'
import SplashScreen from './SrcJs-Files/Screens/SplashScreen'
import Profile from './SrcJs-Files/Screens/Profile'
import ViewPort from './SrcJs-Files/Screens/ViewPort'
import CategoryContactsSelection from './SrcJs-Files/Screens/CategoryContactsSelection'
import GuestList from './SrcJs-Files/Screens/GuestList'
import WeddingDetails from './SrcJs-Files/Screens/WeddingDetails'
import ScannerScreen from './SrcJs-Files/Screens/ScannerScreen'
import Reception from './SrcJs-Files/Screens/Reception'
import Packages from './SrcJs-Files/Screens/Packages'
import TabNavComp from './SrcJs-Files/Components/TabNavComp'
import CombineComp from './SrcJs-Files/Components/CombineComp'
import DatetimePickerComp from './SrcJs-Files/Components/DatetimePickerComp'
import Trans from './SrcJs-Files/Translation/translation';
import * as RNLocalize from "react-native-localize";
import mycolor from './SrcJs-Files/Constants/Colors';
import SearchScreen from './SrcJs-Files/Screens/SearchScreen';
import ImageEditor from './SrcJs-Files/Screens/ImageEditor';
import { render } from 'react-dom';
import UploadDesign from './SrcJs-Files/Screens/DesignerScreens/UploadDesign';
import RequestDetails from './SrcJs-Files/Screens/DesignerScreens/RequestDetails';
import DesignerRequests from './SrcJs-Files/Screens/DesignerScreens/DesignerRequests';
import mykeys from './SrcJs-Files/Constants/keys';
import Prefs from './SrcJs-Files/Prefs/Prefs';
import Payment from './SrcJs-Files/Screens/Payment';

const RootStack = createStackNavigator();
function handleLocalizationChange() {
  Trans.setI18nConfig();
  // useReducer(x => x + 1, 0);
};


export default class App extends Component {
  constructor(props) {
    super(props)
    Trans.setI18nConfig("en");
    // RNLocalize.addEventListener("change", handleLocalizationChange());
    // RNLocalize.removeEventListener("change", handleLocalizationChange());
  }

  state = {
    userRole: '',
    screen: ''
  }

  render() {


    return (
      <NavigationContainer>
        <RootStack.Navigator initialRouteName={"ChooseCategory"}>
          {/* <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown:false}} /> */}
          <RootStack.Screen name="LandingScreen" component={LandingScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="RequestDetails" component={RequestDetails} options={{ headerShown: false }} />
          <RootStack.Screen name="ImageEditor" component={ImageEditor} options={{ headerShown: false }} />
          <RootStack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="SignUpScreen" component={SignUpScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="Event_items" component={Event_items} options={{ headerShown: false }} />
          <RootStack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
          <RootStack.Screen name="Events" component={Events} options={{ headerShown: false }} />
          <RootStack.Screen name="TabNavComp" component={TabNavComp} options={{ headerShown: false }} />
          <RootStack.Screen name="CombineComp" component={CombineComp} options={{ headerShown: false }} />
          <RootStack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
          <RootStack.Screen name="ContactListing" component={ContactListing} options={{ headerShown: false }} />
          <RootStack.Screen name="PreviewInvite" component={PreviewInvite} options={{ headerShown: false }} />
          <RootStack.Screen name="UploadMedia" component={UploadMedia} options={{ headerShown: false }} />
          <RootStack.Screen name="CreatePackage" component={CreatePackage} options={{ headerShown: false }} />
          <RootStack.Screen name="Designer" component={Designer} options={{ headerShown: false }} />
          <RootStack.Screen name="DesignerDetails" component={DesignerDetails} options={{ headerShown: false }} />
          <RootStack.Screen name="ViewPort" component={ViewPort} options={{ headerShown: false }} />
          <RootStack.Screen name="SearchScreen" component={SearchScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="ForgotPass" component={ForgotPass} options={{ headerShown: false }} />
          <RootStack.Screen name="UploadDesign" component={UploadDesign} options={{ headerShown: false }} />
          <RootStack.Screen name="CategoryContactsSelection" component={CategoryContactsSelection} options={{ headerShown: false }} />
          <RootStack.Screen name="DatetimePickerComp" component={DatetimePickerComp} options={{ headerShown: false }} />
          <RootStack.Screen name="CreateEvent" component={CreateEvent} options={{ headerShown: false, title: Trans.translate('CreateEvents'), headerTitleAlign: 'center', headerTintColor: mycolor.white, headerStyle: { backgroundColor: mycolor.pink }, headerTitleStyle: { fontWeight: 'normal' } }} />
          <RootStack.Screen name="SendEditor" component={SendEditor} options={{ headerShown: false, title: Trans.translate('editor'), headerTitleAlign: 'center', headerTintColor: mycolor.white, headerStyle: { backgroundColor: mycolor.pink }, headerTitleStyle: { fontWeight: 'normal' } }} />
          <RootStack.Screen name="EventDetails" component={EventDetails} options={{ headerShown: false, title: Trans.translate('EventDetails'), headerTitleAlign: 'center', headerTintColor: mycolor.white, headerStyle: { backgroundColor: mycolor.pink }, headerTitleStyle: { fontWeight: 'normal' } }} />
          <RootStack.Screen name="Todos" component={Todos} options={{ headerShown: false, title: Trans.translate('todos'), headerTitleAlign: 'center', headerTintColor: mycolor.white, headerStyle: { backgroundColor: mycolor.pink }, headerTitleStyle: { fontWeight: 'normal' } }} />
          <RootStack.Screen name="Packages" component={Packages} options={{ headerShown: false }} />
          <RootStack.Screen name="ChooseCategory" component={ChooseCategory} options={{ headerShown: true, title: Trans.translate('ChooseCategory'), headerTitleAlign: 'center', headerTintColor: mycolor.white, headerStyle: { backgroundColor: mycolor.pink }, headerTitleStyle: { fontWeight: 'normal' } }} />
          <RootStack.Screen name="CreateCategory" component={CreateCategory} options={{ headerShown: true, title: Trans.translate('CreateCategory'), headerTitleAlign: 'center', headerTintColor: mycolor.white, headerStyle: { backgroundColor: mycolor.pink }, headerTitleStyle: { fontWeight: 'normal' } }} />
          <RootStack.Screen name="GuestList" component={GuestList} options={{ headerShown: false }} />
          <RootStack.Screen name="Reception" component={Reception} options={{ headerShown: false }} />
          <RootStack.Screen name="WeddingDetails" component={WeddingDetails} options={{ headerShown: false }} />
          <RootStack.Screen name="ScannerScreen" component={ScannerScreen} options={{ headerShown: false }} />
          <RootStack.Screen name="DesignerRequests" component={DesignerRequests} options={{ headerShown: false }} />
          <RootStack.Screen name="ReceivedDesign" component={ReceivedDesign} options={{ headerShown: false }} />
          {/* <RootStack.Screen name="Home" component={Home} options={{headerShown:false}} /> */}
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }

  // componentDidMount() {
  //   this.getUserData();
  // }

  // async getUserData() {
  //   var userData = await Prefs.get(mykeys.userData);
  //   console.log("userData 1");
  //   var parsedData = JSON.parse(userData);
  //   console.log(parsedData);
  //   this.setState({
  //     userRole: parsedData.role,
  //   }, () => this.redirectPage());
  // }

  // redirectPage() {
  //   var screen = '';
  //   switch (this.state.userRole) {
  //     case "0":
  //     case "2":
  //       // this.props.navigation.navigate('CombineComp');
  //       screen = 'CombineComp';
  //       this.setState({screen: 'CombineComp'});
  //       break;
  //     case "4":
  //       // this.props.navigation.navigate('Reception');
  //       screen = 'Reception';
  //       this.setState({screen: 'Reception'});
  //       break;
  //     case "5":
  //       // this.props.navigation.navigate('DesignerRequests');
  //       screen = 'DesignerRequests';
  //       this.setState({screen: 'DesignerRequests'});
  //       break;
  //     default:
  //       screen = 'SplashScreen';
  //       this.setState({screen: 'SplashScreen'});
  //       // Alert.alert("", Trans.translate('not_auth_msg'));
  //   }
  //   return screen;
  // }

  async redirectComp() {
    var key = await Prefs.get(mykeys.accessToken);
    var lang = await Prefs.get(mykeys.language) || "enr"
    Trans.setI18nConfig(lang);
    this.forceUpdate();
    console.log("key : " + key)
    if (key == null) {
      this.setState({
        isSignedin: false,
        // isLoading: false
      })
    } else {
      this.setState({
        isSignedin: true,
        // isLoading: false
      })
    }
  }
}


