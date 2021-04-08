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
        pickercolor: "#ff1654",
        focusArr: [],
        fontcolor: "#FFF",
        fontsize: 15,
        issilderhow: false,
        selectedTxtViewIndex: 0,
        imagedata: null,
        isChanged: false,
        counter: 0
    }

    render() {
        // const imagedata=

        return (
            <SafeAreaView style={{ flex: 1, margin: 10 }}>
                {this.state.issilderhow ? <SlidersColorPicker
                    style={{ backgroundColor: 'red' }}
                    visible={this.state.issilderhow}
                    color={this.state.pickercolor}
                    returnMode={'hex'}
                    onCancel={() => this.setState({ issilderhow: false })}
                    onOk={colorHex => {

                        this.setState({
                            isChanged: true,
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
                        console.log("picker-color : " + this.state.pickercolor);
                    }}
                    swatches={this.state.recents}
                    swatchesLabel="RECENTS"
                    okLabel="Done"
                    cancelLabel="Cancel"
                /> : null}

                <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
                    <View style={{ backgroundColor: "red", borderRadius: 5, borderColor: mycolor.pink, borderWidth: 2 }}>
                        <ImageBackground
                            source={{ uri: this.state.imagedata }}
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
                            resizeMode='contain'>
                            {this.state.textInput.map((value, index) => {
                                return value.comp
                            })}
                        </ImageBackground>
                    </View>
                </ViewShot>
                <View style={{ flex: 1, flexDirection: 'column' }}>
                    <View style={{ flexDirection: 'row', marginTop: 20, height: 50, alignContent: 'center', alignSelf: 'center', backgroundColor: mycolor.pink, margin: 10, borderRadius: 5 }}>

                        <Text style={{ color: 'white', flex: 1, alignSelf: 'center', fontSize: 12, fontWeight: 'bold', paddingLeft: 20 }}>{Trans.translate('FontSettings')}</Text>
                        <InputSpinner
                            // style={styles.spinner}
                            type={"real"}
                            min={14}
                            disabled={this.state.textInput.length == 0 ? true : false}
                            inputStyle={{ height: 40, backgroundColor: mycolor.pink, color: "white" }}
                            step={1}
                            skin='paper'
                            fontSize={10}
                            style={{ backgroundColor: mycolor.pink }}
                            colorRight={mycolor.darkgray}
                            colorLeft={mycolor.darkgray}
                            onChange={(num) => {
                                this.setState({ fontsize: num, isChanged: true }, () => this.onFocusChange(this.state.selectedTxtViewIndex))
                            }}></InputSpinner>

                    </View>
                    <View style={{ flexDirection: 'row', height: 50, alignContent: 'center', alignSelf: 'center', backgroundColor: "#44C4A1", margin: 10, borderRadius: 5 }}>
                        <TouchableOpacity disabled={this.state.textInput.length == 0 ? true : false} style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }} onPress={() => this.setState({ issilderhow: true }, console.log(this.state.issilderhow))}>
                            <Text style={{ color: 'white', width: "100%", textAlign: 'left', paddingLeft: 20, fontSize: 12, fontWeight: 'bold', }}>{Trans.translate('ColorSettings')}</Text>
                        </TouchableOpacity>

                    </View>


                    <View style={{ flexDirection: 'row', height: 50, alignContent: 'center', alignSelf: 'center', backgroundColor: "#A3A3B1", margin: 10, borderRadius: 5 }}>

                        <TouchableOpacity style={{ width: "100%", textAlign: 'center', alignSelf: 'center' }} onPress={() => this.addTextInput(this.state.textInput.length, false, this.state.fontcolor, this.state.fontsize)}>
                            <Text style={{ color: 'white', width: "100%", paddingLeft: 20, alignSelf: 'center', fontSize: 12, fontWeight: 'bold', }}>{Trans.translate('AddText')}</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{ flexDirection: 'row', height: 50, alignContent: 'center', alignSelf: 'center', backgroundColor: mycolor.pink, margin: 10, borderRadius: 5 }}>
                        <TouchableOpacity disabled={this.state.textInput.length == 0 ? true : false} style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }} onPress={() => this.setState({ issilderhow: true, modalVisible: true }, console.log(this.state.issilderhow))}>
                            <Text style={{ color: 'white', width: "100%", textAlign: 'center', fontSize: 15, fontWeight: 'bold', }}>{Trans.translate('Save')}</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </SafeAreaView>

        );
    }
    componentDidMount() {
        this.setState({ imagedata: this.props.route.params.imagedata })
        console.log('imageuri' + this.state.imagedata)

    }

    onFocusChange = (index) => {
        console.log("ONFOCUSEDCHANGED-INDEX.....: ", index)

        if (this.state.isChanged == true) {
            this.updateTextView(index);
            this.setState({
                isChanged: false
            });
        }
        this.setState({
            selectedTxtViewIndex: index,
        });

    }

    updateTextView(index) {
        console.log("ONUPDATETEXTVIEW-INDEX.... : ", index)
        var textViewArr = this.state.textInput;
        // var i = this.getCompIndex("key_"+index);
        textViewArr[index].comp = this.makeTextView(textViewArr[index].key, index);
        this.setState({ textInput: textViewArr });


    }

    addTextInput = (key, isNew) => {
        console.log("ONADDNEW_KEY.... " + key);
        let textInput = this.state.textInput;
        console.log("key is" + isNew)
        this.setState({ counter: this.state.counter + 1 })
        // var arr = this.state.focusArr;
        // arr.push(false);
        // this.setState({focusArr: arr});
        if (isNew == false) {
            console.log("PUSHING...");
            var obj = {
                comp: this.makeTextView("key_" + this.state.counter, key),
                // key: "key_"+this.state.counter
                key: this.state.counter
            }
            textInput.push(obj);
            this.setState({ textInput, counter: this.state.counter + 1 }, () => console.log(this.state.textInput));
        }
        console.log("length -> " + this.state.textInput.length);
    }

    getCompIndex(requiredKey) {
        var i = 0;
        for (let obj of this.state.textInput) {
            if (requiredKey == obj.key) {
                return i;
            }
        }
        return -1;
    }

    makeTextView(key, index) {
        console.log("MAKETEXTVIEW-INDEX... " + index);
        console.log("MAKETEXTVIEW-KEY... " + key);
        console.log(this.state.pickercolor);

        return (
            <DragTextEditor
                minWidth={100}
                minHeight={200}
                w={200}
                h={200}
                x={WINDOW.width / 4}
                y={WINDOW.height / 3}
                FontColor={this.state.pickercolor}
                LineHeight={25}
                TextAlign={"center"}
                LetterSpacing={0}
                PlaceHolder={"Enter Here"}
                FontSize={this.state.fontsize}
                isDraggable={true}
                isResizable={true}
                TopRightAction={() => this.removeText(index)}
                centerPress={() => this.onFocusChange(index)}
                onTextChanged={(text) => console.log("Text contents=", text)}
                onDragStart={() => console.log("-Drag Started")}
                onDragEnd={(x, y) => console.log("Points", x + ", " + y)}
                onDrag={() => console.log("---Dragging...")}
                onResizeStart={() => console.log("Resize Started")}
                onResize={() => console.log("- Resizing...")}
                onResizeEnd={(width) => console.log("Dimensions", width)}
                key={"key_" + key}
                returnKeyType={'done'}
                onSubmitEditing={() => { Keyboard.dismiss() }}
            />
        );
    }

    removeText(c) { //kaldırılan text
        const filtered = [...this.state.arrayTextData].filter(x => x.defTextID !== c)
        this.setState({
            arrayTextData: filtered,
            textID: this.state.arrayTextData.length,
        });
    }


    deleteTxtinput(index) {
        console.log("index : ", index);
        var arr = this.state.textInput;
        if (arr.length == 1) {
            arr = [];
        } else {
            arr.splice(index, 1);
        }

        console.log("arr length : " + arr.length);
        this.setState({ textInput: arr });
    }

    saveImg() {
        this.refs.viewShot.capture().then(uri => {
            console.log("do something with ", uri);
            // Alert.alert(uri);
            this.props.navigation.navigate('SendEditor', { imgUrl: uri });
        });
    }


    
}
