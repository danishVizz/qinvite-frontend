import { Component } from "react";
import React from 'react'
import { Button, ImageBackground, TextInput, TouchableOpacity, Alert } from "react-native";
import { Dimensions, View, Text } from "react-native";
import Draggable from 'react-native-draggable';
import ViewShot from "react-native-view-shot";
import { SafeAreaView } from "react-native";
import QRCode from 'react-native-qrcode-svg';
import Trans from "../Translation/translation";
import { SlidersColorPicker } from 'react-native-color'
import { DragTextEditor } from 'react-native-drag-text-editor';
import tinycolor from 'tinycolor2';
import InputSpinner from "react-native-input-spinner";
import mycolor from "../Constants/Colors";
const WINDOW = Dimensions.get('window');


export default class Viewport extends Component {
    state = {
        eventName: '',
        eventLocation: '',
        eventDesc: '',
        textInput: [],
        isFocused: false,
        modalVisible: true,
        recents: ['#247ba0', '#70c1b3', '#b2dbbf', '#f3ffbd', '#ff1654'],
        pickercolor: "#FFF",
        focusArr: [],
        fontcolor: "#FFF",
        fontsize: 15,
        issilderhow: false,
        selectedTxtViewIndex: 0
    }

    render() {

        return (
            <SafeAreaView style={{ flex: 1, margin: 10 }}>
                {this.state.issilderhow && <SlidersColorPicker
                    style={{ backgroundColor: 'red' }}
                    visible={this.state.modalVisible}
                    color={this.state.pickercolor}
                    returnMode={'hex'}
                    onCancel={() => this.setState({ modalVisible: false })}
                    onOk={colorHex => {
                        this.setState({
                            modalVisible: false,
                            issilderhow: false,
                            pickercolor: colorHex,
                            fontcolor: colorHex
                        }, () => this.onFocusChange(this.state.selectedTxtViewIndex));
                        this.setState({

                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                        console.log("picker color : " + this.state.pickercolor);
                    }}
                    swatches={this.state.recents}
                    swatchesLabel="RECENTS"
                    okLabel="Done"
                    cancelLabel="Cancel"
                />}

                <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                    <View style={{ backgroundColor: "red" }}>
                        <ImageBackground
                            source={require('../../assets/icon_carddesign.jpg')}
                            style={{
                                backgroundColor: 'white',
                                height: 400,
                                width: '100%',
                                borderRadius: 5,
                                borderColor: 'white',
                                alignContent: 'center',
                                alignSelf: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative', // because it's parent
                            }}
                            resizeMode='cover'>
                            {this.state.textInput.map((value, index) => {
                                return value
                            })}
                        </ImageBackground>
                    </View>
                </ViewShot>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', marginTop: 20, height: 50, alignContent: 'center', alignSelf: 'center', backgroundColor: 'orange', margin: 10, borderRadius: 5 }}>

                        <Text style={{ flex: 1, alignSelf: 'center', fontSize: 14, fontWeight: 'bold', paddingLeft: 20 }}>{Trans.translate('FontSettings')}</Text>
                        <InputSpinner
                            // style={styles.spinner}
                            type={"real"}
                            min={14}
                            disabled={this.state.textInput.length == 0 ? true : false}
                            inputStyle={{ height: 40 }}
                            step={1}
                            skin='paper'
                            colorRight={mycolor.darkgray}
                            colorLeft={mycolor.darkgray}
                            onChange={(num) => {
                                this.setState({ fontsize: num }, () => this.onFocusChange(this.state.selectedTxtViewIndex))
                            }}></InputSpinner>

                    </View>
                    <View style={{ flexDirection: 'row', height: 50, alignContent: 'center', alignSelf: 'center', backgroundColor: 'red', margin: 20, borderRadius: 5 }}>
                        <TouchableOpacity disabled={this.state.textInput.length == 0 ? true : false} style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }} onPress={() => this.setState({ issilderhow: true })}>
                            <Text style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }}>{Trans.translate('ColorSettings')}</Text>
                        </TouchableOpacity>

                    </View>
                    <TouchableOpacity style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }} onPress={() => this.saveImg()}>
                        <Text style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }}>Done</Text>
                    </TouchableOpacity>
                    {/* <View style={{ flexDirection: 'row', height: 50, alignContent: 'center', alignSelf: 'center', backgroundColor: 'red', margin: 20, borderRadius: 5 }}>
                        <TouchableOpacity style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }} onPress={() => this.saveImg()}>
                            <Text style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }}>Done</Text>
                        </TouchableOpacity>
                    </View> */}
                    <Button title='+' onPress={() => this.addTextInput(this.state.textInput.length, false, this.state.fontcolor, this.state.fontsize)} />
                </View>

            </SafeAreaView>

        );
    }


    onFocusChange = (index) => {
        console.log("isfocusout : ", index)
        this.setState({ selectedTxtViewIndex: index });
        this.updateTextView(index);
    }

    updateTextView(index) {
        console.log("isfocusout : ", index)
        var textViewArr = this.state.textInput;
        textViewArr[index] = this.makeTextView(index, true);
        this.setState({ textInput: textViewArr });
    }

    addTextInput = (key, isNew, fontcolor, fontsize) => {
        console.log("addTextInput()");
        let textInput = this.state.textInput;
        console.log("key is" + key)
        // var arr = this.state.focusArr;
        // arr.push(false);
        // this.setState({focusArr: arr});
        if (isNew == false) {
            textInput.push(this.makeTextView(key, false, fontcolor, fontsize));
            this.setState({ textInput });
        }


        // if (isNew == false) {

        // }


        // console.log(textInput[0].props.FontColor);
        // textInput[0].props. = "red";
    }

    makeTextView(key, isNew, color, fontsize) {
        console.log(this.state.pickercolor);

        return (
            <DragTextEditor
                minWidth={100}
                minHeight={100}
                w={200}
                h={200}
                x={WINDOW.width / 4}
                y={WINDOW.height / 3}
                FontColor={this.state.pickercolor}//{color}
                LineHeight={15}
                TextAlign={"left"}
                LetterSpacing={0}
                FontSize={this.state.fontsize}
                isDraggable={true}
                isResizable={true}
                TopRightAction={() => console.log("-Top Right Pressed")}
                centerPress={() => this.onFocusChange(key)}
                onTextChanged={(text) => console.log("Text contents =", text)}
                onDragStart={() => console.log("-Drag Started")}
                onDragEnd={(x, y) => Alert.alert("Points" ,x+", "+y)}
                onDrag={() => console.log("- Dragging...")}
                onResizeStart={() => console.log("- Resize Started")}
                onResize={() => console.log("- Resizing...")}
                onResizeEnd={(width) => Alert.alert("Dimensions" ,width)}
                key={key}
                returnKeyType={'done'}
                onSubmitEditing={() => { Keyboard.dismiss() }}

            />
        );
    }

    saveImg() {
        this.refs.viewShot.capture().then(uri => {
            console.log("do something with ", uri);
            // Alert.alert(uri);
            this.props.navigation.navigate('SendEditor', { imgUrl: uri });
        });
    }
}
