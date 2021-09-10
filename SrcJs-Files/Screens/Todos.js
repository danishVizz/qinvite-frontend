
import React, { Component } from 'react';
import { View, Text, StyleSheet, Modal, Dimensions, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import Keys from '../Constants/keys'
import EventDetailsComp from '../Components/EventDetailsComp'
import mycolor from '../Constants/Colors';
import Trans from '../Translation/translation';
import HeaderComp2 from '../Components/HeaderComp2';
import StatusBarComp from '../Components/StatusBarComp';
import { CommonActions } from '@react-navigation/native';
import mykeys from '../Constants/keys';



const { width } = Dimensions.get("window");
export default class Todos extends Component {
    state = {
        imagedatadstatus: '',
        categoriestatus: '',
        inviteDesignColor: mycolor.offPink,
        guestlistColor: mycolor.offPink,
        modalVisible: false
    }
    render() {
        return (
            <View>
                <StatusBarComp backgroundColor={mycolor.pink} />
                <HeaderComp2 textfonts={'bold'} fromleft={10} title={Trans.translate('todos')} textfonts={'normal'} textsize={16} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white' leftBtnClicked={() => this.onBackpress()} />
                <View style={styles.container}>
                    <EventDetailsComp
                        //  backgroundColor: Keys.invitealldata["ImageData"] == "" || Keys.invitealldata["ImageData"] == undefined ? mycolor.offPink : "#C5FFE6"
                        Onpress={() => this.onPressInviteDesign()}
                        mainviewstyle={{ backgroundColor: this.state.inviteDesignColor, height: 120, borderWidth: 1, borderRadius: 8, borderColor: '#F54260', alignSelf: 'center', justifyContent: 'center', alignContent: 'center' }}
                        imagestyle={{ height: 56, width: 69, marginLeft: 30, flex: 3, alignSelf: 'center' }}
                        title={Trans.translate('invite_design')}
                        containerStyle={{ justifyContent: "center" }}
                        titlestyle={{ alignItems: 'center', marginLeft: 10, flexDirection: 'column', alignItems: 'center', fontSize: 22, fontWeight: 'bold', color: mycolor.pink }}
                        lefticon={require('../../assets/icon_cards.png')}
                    ></EventDetailsComp>
                    {/* backgroundColor: Keys.invitealldata["Event"] == "" || Keys.invitealldata["CategoriesData"] == undefined ?  mycolor.offPink : "#C5FFE6" */}
                    <EventDetailsComp
                        // Onpress={() => this.props.navigation.navigate('ChooseCategory')}
                        Onpress={() => this.setModalVisible(true)}
                        mainviewstyle={{ backgroundColor: this.state.guestlistColor, height: 120, borderWidth: 1, borderRadius: 8, borderColor: '#F54260' }}
                        imagestyle={{ height: 56, width: 69, marginLeft: 30, flex: 3, alignSelf: 'center' }}
                        title={Trans.translate('guestlist')}
                        containerStyle={{ justifyContent: "center" }}
                        titlestyle={{ marginLeft: 10, fontSize: 22, fontWeight: 'bold', color: mycolor.pink }}
                        lefticon={require('../../assets/icon_friends.png')}
                    ></EventDetailsComp>
                </View>
                <View style={styles.centeredView}>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.modalVisible}
                        onRequestClose={() => { this.setModalVisible(false) }}>
                        <SafeAreaView>
                            <HeaderComp2 textfonts={'bold'} fromleft={10} title={Trans.translate('ChooseCategory')} textfonts={'normal'} textsize={16} titlepos="center" leftBtn={require('../../assets/icon_back.png')} lefttintColor='white' leftBtnClicked={() => this.setModalVisible(false)} />
                        </SafeAreaView>
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={this.onSelection.bind(this, "whatsapp")}>
                                    <Text style={styles.title}>{Trans.translate("whatsappinvitations")}</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.modalView}>
                                <TouchableOpacity onPress={this.onSelection.bind(this, "pdf")}>
                                    <Text style={styles.title}>{Trans.translate("pdfinvitations")}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>

            </View>
        );
    }



    onSelection = (type) => {
        this.setState({ modalVisible: false })
        mykeys.SELECTED_MAINCATEGORY = type
        this.props.navigation.navigate('ChooseCategory')
    }

    setModalVisible = (visible) => {
        console.log({ visible })
        this.setState({ modalVisible: visible });
    }


    componentDidMount() {
        this.focusListener = this.props.navigation.addListener('focus', () => {
            console.log("LOCAL IMAGE-DATA")
            console.log(Keys.invitealldata["ImageData"])
            console.log("LOCAL CATEGORY-DATA")
            console.log(Keys.invitealldata["CategoriesData"])
            let inviteColor = ''
            let guestColor = ''
            if (Keys.invitealldata["ImageData"] != "" && Keys.invitealldata["ImageData"] !== undefined) {
                inviteColor = '#d8ffd8'
            }
            console.log("TYPE OF: " + typeof Keys.invitealldata["ImageData"])
            if (Keys.invitealldata["CategoriesData"] !== undefined && Keys.invitealldata["CategoriesData"].length != 0) {
                guestColor = '#d8ffd8'
            }
            this.setState({ imagedatadstatus: Keys.invitealldata["ImageData"], categoriestatus: Keys.invitealldata["CategoriesData"], guestlistColor: guestColor, inviteDesignColor: inviteColor }, () => console.log(Keys.invitealldata["ImageData"]))
        });

    }

    onBackpress() {
        const resetAction = CommonActions.reset({
            index: 0,
            routes: [{ name: 'CombineComp' }],
        });
        this.props.navigation.dispatch(resetAction);
    }

    onPressInviteDesign() {
        console.log("IMAGE DATA");
        console.log(Keys.invitealldata["ImageData"]);
        if (Keys.invitealldata["ImageData"] == "" || Keys.invitealldata["ImageData"] == undefined) {
            console.log("DUMMY TEXT")
            this.props.navigation.navigate('Designer', { "Type": "invitedesign" })
        } else {
            if (Keys.invitealldata["ImageData"].indexOf('.mp4') > -1 || Keys.invitealldata["ImageData"].indexOf('.mov') > -1) {
                if (Keys.invitealldata['CategoriesData'] == undefined || Keys.invitealldata['CategoriesData'] == "") {
                    this.props.navigation.navigate('ChooseCategory');
                }
                else {
                    // this.props.navigation.navigate('SendEditor');
                    this.props.navigation.navigate('ImageEditor');
                }

            } else {
                this.props.navigation.navigate('ImageEditor');
            }
        }
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        marginLeft: 20,
        marginRight: 20,
    },
    centeredView: {
        flex: 1,

        alignItems: "center",
        backgroundColor: 'white',

    },
    modalView: {
        marginTop: 20,
        backgroundColor: mycolor.lightPink,
        borderRadius: 10,
        padding: 25,
        width: 250,
        justifyContent: 'center',
        alignItems: "center",
        // shadowColor: mycolor.lightPink,
        // shadowOffset: {
        //     width: 0,
        //     height: 1
        // },
        // shadowOpacity: 0.15,
        // shadowRadius: 2,
        // elevation: 2
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: mycolor.pink

    }
});