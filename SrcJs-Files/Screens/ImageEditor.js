


import { ImageBackground, TextInput, InputAccessoryView, Keyboard, KeyboardAvoidingView, Button } from "react-native";

import ViewShot from "react-native-view-shot";
import Trans from "../Translation/translation";
import Video from 'react-native-video';
import Draggable from 'react-native-draggable';
import QRCode from 'react-native-qrcode-svg';
import mycolor from "../Constants/Colors";
import Keys from "../Constants/keys";
import React, { Component } from 'react';
import {
  Platform,
  View,
  Dimensions,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { DragTextEditor } from 'react-native-drag-text-editor';
import Slider from '@react-native-community/slider';
import HeaderComp from "../Components/HeaderComp";
import { ScrollView } from "react-native-gesture-handler";
const WINDOW = Dimensions.get('window');
const BACKGROUND = "https://images.unsplash.com/photo-1521288936840-032bc23139ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80";
const TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation."
const FONTDEF = 'Montserrat-Medium';
const BLACK = "#000";
const PINK = mycolor.pink;
const WHITE = "#FFF";
const COLORS = [
  "#002131",
  "#00486c",
  "#006d95",
  "#0ec0af",
  "#69d8cc",
  "#e9cec3",
  "#c3c3c3",
  "#FCFCFC",
  "#F54260",
  "#373232"
];
const LEFT = "left";
const RIGHT = "right";
const CENTER = "center";
const ALIGNS = [
  { name: 0, icon: require("../../assets/align-left.png") },
  { name: 1, icon: require("../../assets/align-center.png") },
  { name: 2, icon: require("../../assets/align-right.png") }
];
const PROCESSBUTTON = [
  { icon: require('../../assets/add-a-text.png'), name: "Add Text", id: 0 },
  { icon: require('../../assets/fontsize.png'), name: "Change Size", id: 1 },
  { icon: require('../../assets/divider.png'), name: "Letter Spacing", id: 2 },
  { icon: require('../../assets/split-vertical.png'), name: "Line Height", id: 3 },
  { icon: require('../../assets/align-center.png'), name: "Change Align", id: 4 },
  { icon: require('../../assets/add-color.png'), name: "Add Color", id: 5 },
];
const inputAccessoryViewID = 'uniqueID';
export default class ImageEditor extends Component {
  constructor(props) {
    super(props);
  };
  componentDidMount() {
    console.log("--------Image------" + Keys.invitealldata["ImageData"])
    this.setState({ imagedata: Keys.invitealldata["ImageData"] })
    this.addText()
  }
  state = {
    Lorem: TEXT,
    textID: 0,
    sizeOfText: 15,
    arrayTextData: [],
    defFont: FONTDEF,
    lineHegOfText: 0,
    textInAction: 0,
    sizeTracker: 15,
    letterSpcTracker: 0,
    imagedata: null,
    lineHegTracker: 0,
    letterSpcOfText: 0,
    pickedProcess: 0,
  }

  processPicker = () => {
    switch (this.state.pickedProcess) {
      case 1:
        return (
          <View style={styles.parentOfSlide}>
            <Slider
              value={this.state.sizeOfText}
              onValueChange={sizeOfText => {
                console.log(sizeOfText)
                this.fontSizing(sizeOfText);
              }}
              style={styles.slide}
              minimumValue={0}
              maximumValue={40}
              minimumTrackTintColor={PINK}
              maximumTrackTintColor={WHITE}
              thumbTintColor={PINK}
            />
            <Text style={{ fontSize: 25, flex: 1 }}>{this.state.sizeTracker.toFixed(0)}</Text>
          </View>
        );
      case 2:
        return (
          <View style={styles.parentOfSlide}>
            <Slider
              value={this.state.letterSpcOfText}
              onValueChange={letters => {
                this.setLetterSpacing(letters);
              }}
              style={styles.slide}
              minimumValue={0}
              maximumValue={10}
              minimumTrackTintColor={PINK}
              maximumTrackTintColor={WHITE}
              thumbTintColor={PINK}
            />
            <Text style={{ fontSize: 15, flex: 1 }}>{this.state.letterSpcTracker.toFixed(0)}</Text>
          </View>
        );
      case 3:
        return (
          <View style={styles.parentOfSlide}>
            <Slider
              value={this.state.lineHegOfText}
              onValueChange={heg => {
                this.setLineHeight(heg);
              }}
              style={styles.slide}
              minimumValue={0}
              maximumValue={20}
              minimumTrackTintColor={PINK}
              maximumTrackTintColor={WHITE}
              thumbTintColor={PINK}
            />
            <Text style={{ fontSize: 15, flex: 1 }}>{this.state.lineHegTracker.toFixed(0)}</Text>
          </View>
        );
      case 4:
        return ALIGNS.map((aligns, index) => {
          return (
            <TouchableOpacity key={index}
              onPress={() => this.alignPicker(aligns.name)}
              style={{ backgroundColor: WHITE }, [styles.touch]}>
              <Image style={styles.touchimage} source={aligns.icon} />
            </TouchableOpacity>
          );
        });
      case 5:
        return COLORS.map((varColor) => {
          return (
            <TouchableOpacity key={varColor} onPress={() => this.setColorToText(varColor)} style={[{ backgroundColor: varColor }, styles.colorTouch]}>
            </TouchableOpacity>
          );
        });

      default:
        return null;
    }
  }
  fontSizing(sizeValue) { //fontsave
    const index = this.state.textInAction;
    const markers = [...this.state.arrayTextData];
    markers[index].defFontSize = sizeValue;
    markers[index].defLineHeight = sizeValue;
    this.setState({
      arrayTextData: markers,
      lineHegOfText: sizeValue / 2,
      sizeTracker: sizeValue
    });
  }
  alignPicker = (alignValue) => {
    if (alignValue === 0) {
      const index = this.state.textInAction;
      const markers = [...this.state.arrayTextData];
      markers[index].defAlign = LEFT;
      this.setState({ arrayTextData: markers });
    }
    else if (alignValue === 1) {
      const index = this.state.textInAction;
      const markers = [...this.state.arrayTextData];
      markers[index].defAlign = CENTER;
      this.setState({ arrayTextData: markers });
    }
    else if (alignValue === 2) {
      const index = this.state.textInAction;
      const markers = [...this.state.arrayTextData];
      markers[index].defAlign = RIGHT;
      this.setState({ arrayTextData: markers });
    }
  }
  setLineHeight(valueofLine) { //fontsave
    const index = this.state.textInAction;
    const markers = [...this.state.arrayTextData];
    markers[index].defLineHeight = this.state.sizeOfText + valueofLine;
    this.setState({ arrayTextData: markers, lineHegTracker: this.state.sizeOfText + valueofLine });
  }

  setLetterSpacing(valueofLetter) { //fontsave
    const index = this.state.textInAction;
    const markers = [...this.state.arrayTextData];
    markers[index].defLetterSpacing = valueofLetter;
    this.setState({ arrayTextData: markers, letterSpcTracker: valueofLetter });
  }

  addText() { //text ekle array[]
    this.setState({ textID: this.state.textID + 1 })
    let DEFS = {
      defTextID: this.state.textID,
      defTextValue: this.state.Lorem,
      defFontFamily: FONTDEF,
      defAlign: 'center',
      defLetterSpacing: 0,
      defColor: '#000000',
      defLineHeight: this.state.sizeOfText,
      defFontSize: 15
    }
    this.setState({
      arrayTextData: [...this.state.arrayTextData, DEFS]
    });
  }
  removeText(c) { //kaldırılan text
    const filtered = [...this.state.arrayTextData].filter(x => x.defTextID !== c)
    this.setState({
      arrayTextData: filtered,
      textID: this.state.arrayTextData.length,
    });
  }
  setColorToText = (colorofArray) => {
    const index = this.state.textInAction;
    const markers = [...this.state.arrayTextData];
    markers[index].defColor = colorofArray;
    this.setState({ arrayTextData: markers });
  }

  processButtons = () => {
    return PROCESSBUTTON.map((buttons, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => buttons.id == 0 ? this.addText() : this.setState({ pickedProcess: buttons.id })}
          style={styles.touch}>
          <Image
            style={styles.touchimage}
            source={buttons.icon} />
        </TouchableOpacity>
      )
    });
  }

  render() {
    console.log("IMAGE")
    console.log(Keys.invitealldata["ImageData"])
    return (
      (Keys.invitealldata["ImageData"].indexOf('.mp4') > -1 || Keys.invitealldata["ImageData"].indexOf('.mov') > -1) ? this.videoModuleView() : this.cardModuleView()
    );
  }

  videoModuleView() {
    return (
      <View style={{ flex: 1, height: '100%' }}>
        <Video source={{ uri: Keys.invitealldata["ImageData"] }}   // Can be a URL or a local file.
          ref={(ref) => { this.player = ref }}     // Store reference
          onBuffer={this.onBuffer}                // Callback when remote video is buffering
          onError={this.videoError}
          controls={true}                   // Callback when video cannot be loaded
          style={styles.backgroundVideo} />
        <View style={{ position: 'absolute', bottom: 20, flex: 1 }}>
          {this.buttonsView()}
        </View>

      </View>)

  }

  cardModuleView = () => {
    let ADDED_TEXTS = this.state.arrayTextData.map((ID, index) => {
      return (
        <DragTextEditor
          key={index}
          minWidth={100}
          minHeight={100}
          w={200}
          h={200}
          x={WINDOW.width / 4}
          y={WINDOW.height / 3}
          FontColor={ID.defColor}
          LineHeight={ID.defLineHeight}
          TextAlign={ID.defAlign}
          LetterSpacing={ID.defLetterSpacing}
          FontSize={ID.defFontSize}
          TopRightAction={() => this.removeText(ID.defTextID)}
          centerPress={() => this.setState({ textInAction: ID.defTextID })}
          isDraggable={true}
          isResizable={true}
          PlaceHolder={Trans.translate("AddText")}
          onDragStart={() => console.log("-Drag Started")}
          onDragEnd={() => console.log("- Drag ended")}
          onDrag={() => console.log("- Dragging...")}
          onResizeStart={() => console.log("- Resize Started")}
          onResize={() => console.log("- Resizing...")}
          onResizeEnd={() => console.log("- Resize Ended")}
          inputAccessoryViewID={inputAccessoryViewID}
        />
      )
    });
    return (
      <View style={styles.parent}>
        {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
        <View style={{ flexGrow: 1 }}>
          <Image style={styles.background} source={{ uri: BACKGROUND }}>
          </Image>
          <View style={styles.process}>
            {this.processButtons()}
          </View>
          <View style={styles.process}>
            {this.processPicker()}
          </View>

          <View style={{ paddingRight: 10, paddingLeft: 10, marginTop: 50 }}>
            <ViewShot ref="viewShot" options={{ format: "jpg", quality: 1.0 }}>
              <ImageBackground
                resizeMode='contain'
                source={{ uri: Keys.invitealldata["ImageData"] == "" || Keys.invitealldata["ImageData"] == undefined ? this.props.route.params.imagedata : Keys.invitealldata["ImageData"] }}
                style={{ width: WINDOW.width - 20, height: WINDOW.height / 2, backgroundColor: '#fff' }}>
                {ADDED_TEXTS}
              </ImageBackground>
            </ViewShot>

          </View>
          <View style={{ position: 'absolute', bottom: 5, flex: 1 }}>
            {this.buttonsView()}
          </View>
        </View>
        {/* </ScrollView> */}
        {Platform.OS === 'ios' && <InputAccessoryView nativeID={inputAccessoryViewID}>
          <View style={{ backgroundColor: '#fff', alignItems: 'flex-end' }}>
            <Button
              style={{ alignSelf: 'flex-end' }}
              onPress={() => Keyboard.dismiss()}
              title="Done"
            />
          </View>

        </InputAccessoryView>}

      </View>
    )
  }

  buttonsView = () => {
    return (
      <View>
        <View style={{ flexDirection: 'row', height: 50, alignContent: 'center', alignSelf: 'center', backgroundColor: mycolor.pink, margin: 10, borderRadius: 5 }}>
          <TouchableOpacity style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }} onPress={() => this.saveImg()}>
            <Text style={{ color: 'white', width: "100%", textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>{Trans.translate('Save')}</Text>
          </TouchableOpacity>
        </View>
        {Keys.invitealldata["ImageData"] != "" && Keys.invitealldata["ImageData"] != undefined && <View style={{ flexDirection: 'row', height: 50, alignContent: 'center', alignSelf: 'center', backgroundColor: mycolor.pink, margin: 10, borderRadius: 5, position: 'absolute', bottom: 60 }}>
          <TouchableOpacity style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }} onPress={() => this.props.navigation.replace("Designer", { Type: "choose" })}>
            <Text style={{ color: 'white', width: "100%", textAlign: 'center', fontSize: 15, fontWeight: 'bold' }}>{Trans.translate('uploadnewdesign')}</Text>
          </TouchableOpacity>
        </View>}
      </View>
    )
  }

  onBuffer() {
    console.log("BUFFERING")
  }

  videoError(error) {
    console.log("VIDEO ERRROR")
    console.log(error)
  }

  saveImg() {
    if (Keys.invitealldata["ImageData"].indexOf('.mp4') > -1 || Keys.invitealldata["ImageData"].indexOf('.mov') > -1) {
      this.saveData(Keys.invitealldata["ImageData"])
      return
    }
    this.refs.viewShot.capture().then(uri => {
      console.log("do something with ", uri);
      this.saveData(uri)
    });
  }

  saveData(uri) {
    var invitedata = Keys.invitealldata
    invitedata = { "Eventdata": invitedata["Eventdata"], "PackageData": invitedata["PackageData"], "CategoriesData": invitedata['CategoriesData'], "ImageData": uri }
    Keys.invitealldata = invitedata

    if (Keys.invitealldata['CategoriesData'] == undefined || Keys.invitealldata['CategoriesData'] == "") {
      this.props.navigation.navigate('Todos');
    }
    else {
      this.props.navigation.navigate('SendEditor', { "imagedata": uri });
    }
  }
}
const styles = StyleSheet.create({
  parent: {
    justifyContent: "flex-start",
    alignItems: "center",
    height: '100%',
    flex: 1
  },
  touchimage: {
    width: 30,
    height: 30,
  },
  colorTouch: {
    width: 30,
    height: 30,
    marginLeft: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    borderColor: WHITE,
    borderWidth: 1,
  },
  touch: {
    flex: 1,
    marginLeft: 5,
    borderRadius: 5,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: WHITE,
    borderColor: "#fff",
    borderWidth: 1,
  },
  image: {
    width: 60,
    height: 60,
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    marginLeft: -15,
  },
  background: {
    position: "absolute",
    resizeMode: "cover",
    width: WINDOW.width,
    height: WINDOW.height,
    flexDirection: "column",
  },
  process: {
    width: WINDOW.width - 4,
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    margin: 2,
    marginTop: 30,
    borderColor: "#bfbfbf",
    elevation: Platform.OS === 'ios' ? 15 : 0,
    zIndex: Platform.OS === 'ios' ? 50 : 0,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-end",
    backgroundColor: "rgba(255,255,255,0.4)"
  },
  container: {
    width: WINDOW.width,
    height: Platform.OS === 'ios' ? 95 : 70,
    borderWidth: 1,
    borderColor: "#bfbfbf",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    marginBottom: 2,
    elevation: Platform.OS === 'ios' ? 10 : 0,
    zIndex: Platform.OS === 'ios' ? 100 : 0,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,255)"
  },
  text: {
    fontSize: 20,
    marginTop: Platform.OS === 'ios' ? 30 : 0,
    marginLeft: 10,
    color: "#000",
    alignSelf: "center"
  },
  slide: {
    flex: 6,
    marginRight: 20,
  },
  parentOfSlide: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  backgroundVideo: {
    // position: 'absolute',
    height: 500,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: mycolor.lightgray,
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
})