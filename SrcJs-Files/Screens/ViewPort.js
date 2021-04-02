import { Component } from "react";
import React from 'react'
import { Button, ImageBackground, TextInput, TouchableOpacity } from "react-native";
import { Dimensions, View, Text } from "react-native";
import Draggable from 'react-native-draggable';
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
        pickercolor: tinycolor('#70c1b3').toHsl(),
        focusArr: [],
        fontcolor: '#247ba0f',
        fontsize: 15,
        issilderhow:false

    }

    render() {

        return (



            <SafeAreaView style={{ flex: 1, margin: 10 }}>
                {this.state.issilderhow &&<SlidersColorPicker
                    style={{ backgroundColor: 'red' }}
                    visible={this.state.modalVisible}
                    color={this.state.pickercolor}
                    returnMode={'hex'}
                    onCancel={() => this.setState({ modalVisible: false })}
                    onOk={colorHex => {
                        this.setState({
                            modalVisible: false,
                            issilderhow:false,
                            pickercolor: tinycolor(colorHex).toHsl()
                        });
                        this.setState({
                            recents: [
                                colorHex,
                                ...this.state.recents.filter(c => c !== colorHex).slice(0, 4)
                            ]
                        });
                    }}
                    swatches={this.state.recents}
                    swatchesLabel="RECENTS"
                    okLabel="Done"
                    cancelLabel="Cancel"
                />}

                <View style={{ backgroundColor: "red" }}>
                    {/* <Draggable x={200} y={200} renderColor='orange'>
                        <Text style={{ fontSize: 14, width: 120 }} > {this.state.eventName} </Text>
                    </Draggable>

                    <Draggable x={200} y={220} renderColor='red'>
                        <Text style={{ fontSize: 14, width: 120 }} >{this.state.eventLocation} </Text>
                    </Draggable>


                    <Draggable x={200} y={240} >
                        <Text style={{ fontSize: 14, width: 120 }} > {this.state.eventDesc} </Text>
                    </Draggable> */}


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

                        {/* <Draggable x={170} y={280} renderColor='green'>
                            <QRCode
                                style={{ alignSelf: 'flex-end' }}
                                size={100}
                                value="http://awesome.link.qr"
                            />
                        </Draggable> */}


                        {/* <DragTextEditor
                            minWidth={100}
                            minHeight={100}

                            x={WINDOW.width / 7}
                            y={WINDOW.height / 4}
                            FontColor={(this.state.isFocused) ?  'red'  :  'white' }
                         
                            LineHeight={15}
                            TextAlign={"left"}
                            LetterSpacing={0}
                            FontSize={15}
                            isDraggable={true}
                            isResizable={true}
                            TopRightAction={() => console.log("-Top Right Pressed")}
                            centerPress={() => this.onFocusChange()}
                            onTextChanged={(text) => console.log("Text contents =", text)}
                            onDragStart={() => console.log("-Drag Started")}
                            onDragEnd={() => console.log("- Drag ended")}
                            onDrag={() => console.log("- Dragging...")}
                            onResizeStart={() => console.log("- Resize Started")}
                            onResize={() => console.log("- Resizing...")}
                            onResizeEnd={() => console.log("- Resize Ended")}
                        /> */}
                        {/* <QRCode content='https://reactnative.com'/> */}


                        {this.state.textInput.map((value, index) => {
                            return value
                        })}



                    </ImageBackground>


                    {/* <TextInputComp
                        placeholder={Trans.translate('EventName')}
                        leftIcon={require('../../assets/icon_user.png')}
                        placeholderTextColor={mycolor.lightgray}
                        value={this.state.eventocation}
                        onChangeText={(eventname) => this.setState({ eventName: eventname })}
                    />
                    <TextInputComp
                        placeholder={Trans.translate('EventLocation')}
                        leftIcon={require('../../assets/icon_user.png')}
                        placeholderTextColor={mycolor.lightgray}
                        onChangeText={(eventloc) => this.setState({ eventLocation: eventloc })}
                    />
                    <TextInputComp
                        placeholder={Trans.translate('EventDesc')}
                        leftIcon={require('../../assets/icon_user.png')}
                        placeholderTextColor={mycolor.lightgray}
                        onChangeText={(eventdesc) => this.setState({ eventDesc: eventdesc })}
                    />

 */}

                </View>
                <View style={{ flex: 1, backgroundColor: 'greeen', flexDirection: 'column', backgroundColor: 'green' }}>
                    {/* <View style={{ flexDirection: 'row',backgroundColor:'red' }}>
                        <View style={{ flexDirection: 'row', flex: 1, height: 50, alignContent: 'center', alignSelf: 'center', marginTop: 30 }}>

                            <Text style={{ flex: 1, alignSelf: 'center', fontSize: 14, fontWeight: 'bold' }}>{Trans.translate('FontSettings')}</Text>

                            <InputSpinner
                                // style={styles.spinner}
                                type={"real"}
                                min={14}
                                inputStyle={{ height: 40 }}
                                step={1} s
                                skin='paper'
                                colorRight={mycolor.darkgray}
                                colorLeft={mycolor.darkgray}
                                onChange={(num) => {
                                    this.setState({ fontsize: num })
                                }}></InputSpinner>

                        </View>


                    </View> */}

                    <View style={{ flexDirection: 'row', marginTop: 20, height: 50, alignContent: 'center', alignSelf: 'center', backgroundColor: 'orange', margin: 10, borderRadius: 5 }}>

                        <Text style={{ flex: 1, alignSelf: 'center', fontSize: 14, fontWeight: 'bold', paddingLeft: 20 }}>{Trans.translate('FontSettings')}</Text>
                        <InputSpinner
                            // style={styles.spinner}
                            type={"real"}
                            min={14}
                            inputStyle={{ height: 40 }}
                            step={1} s
                            skin='paper'
                            colorRight={mycolor.darkgray}
                            colorLeft={mycolor.darkgray}
                            onChange={(num) => {
                                this.setState({ fontsize: num })
                            }}></InputSpinner>

                    </View>
                    <View style={{ flexDirection: 'row', height: 50, alignContent: 'center', alignSelf: 'center', backgroundColor: 'red', margin: 20, borderRadius: 5 }}>
                       <TouchableOpacity style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }} onPress={()=>this.setState({issilderhow:true})}> 
                        <Text style={{ width: "100%", textAlign: 'center', alignSelf: 'center', fontSize: 14, fontWeight: 'bold', }}>{Trans.translate('ColorSettings')}</Text>
                    </TouchableOpacity>
                    </View>

                    <Button s title='+' onPress={() => this.addTextInput(this.state.textInput.length, false, this.state.fontcolor, this.state.fontsize)} />
                </View>

            </SafeAreaView>

        );
    }


    onFocusChange = (index) => {
        // this.setState({ isFocused: !this.state.isFocused });
        console.log("isfocusout : ", index)
        // console.log(this.state.isFocused)

        // var arr = this.state.focusArr;
        // arr[index] = !(arr[index]);
        // this.setState({focusArr: arr});

        // console.log(this.state.focusArr);

        var textViewArr = this.state.textInput;
        // textViewArr.splice(0, 1);
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
        return (
            <DragTextEditor
                minWidth={100}
                minHeight={100}
                w={200}
                h={200}
                x={WINDOW.width / 4}
                y={WINDOW.height / 3}
                FontColor={color}
                LineHeight={15}
                TextAlign={"left"}
                LetterSpacing={0}
                FontSize={fontsize}
                isDraggable={true}
                isResizable={true}
                TopRightAction={() => console.log("-Top Right Pressed")}
                centerPress={() => this.onFocusChange(key)}
                onTextChanged={(text) => console.log("Text contents =", text)}
                onDragStart={() => console.log("-Drag Started")}
                onDragEnd={() => console.log("- Drag ended")}
                onDrag={() => console.log("- Dragging...")}
                onResizeStart={() => console.log("- Resize Started")}
                onResize={() => console.log("- Resizing...")}
                onResizeEnd={() => console.log("- Resize Ended")}
                key={key}

            />
        );
    }

    // renderDraggable() {
    //     return (
    //         <View style={styles.draggableContainer}>
    //             <Animated.View style={styles.circle}>
    //                 <Text style={styles.text}>Drag me!</Text>
    //             </Animated.View>
    //         </View>
    //     );
    // }
}
