import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import OptionsMenu from "react-native-options-menu";
import moment from 'moment';
import Trans from '../Translation/translation';

class Request_items extends Component {

    onPressButtonChildren(value, item) {
        this.props.fromchildprops(value, item)
    }

    render() {
        console.log("this.props.item.design_status : " + this.props.item.design_status)
        return (
            <View style={styles.container} >
                <View style={{ flex: 9 }} >
                    <View style={styles.innercontainer}  >
                        <Image source={require('../../assets/icon_calendar.png')} style={styles.photo} />
                        <View style={styles.container_text}>
                            <Text style={styles.title}>
                                {this.props.title}
                            </Text>
                            <Text style={styles.description}>
                                {moment(this.props.description).format('DD/MM/YYYY')}
                            </Text>
                        </View>
                        {/* <Image source={require('../../assets/icon_option.png')}style={styles.leftphoto}/> */}

                    </View>
                </View>

                <View style={{ display: this.props.showMenu == true ? 'flex' : 'none'}}>
                    <OptionsMenu
                    
                        button={require('../../assets/icon_option.png')}
                        buttonStyle={{ width: 32, height: 15, margin: 5, resizeMode: "contain", justifyContent: 'flex-end' }}
                        destructiveIndex={2}
                        options={[Trans.translate('accept'), Trans.translate('reject'), Trans.translate('cancel')]}
                        actions={[() => this.onPressButtonChildren("accept", this.props.item), () => this.onPressButtonChildren("reject", this.props.item), () => this.onPressButtonChildren("cancel", this.props.item)]} />

                </View>

            </View>
        );
    }
    handleClick = () => {
        this.props.updateState();
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 10,
        marginTop: 20,
        marginBottom: 8,
        marginRight: 20,
        marginLeft: 20,
        borderRadius: 5,
        backgroundColor: '#FFF',
        elevation: 2,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
    },
    innercontainer: {
        flexDirection: 'row',
        padding: 10
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    container_text: {
        marginLeft: 23,
        flex: 8

    },
    description: {
        fontSize: 14,
        marginTop: 8,
        color: "#C9C9C9"
    },
    photo: {
        height: 29,
        width: 29,
        margin: 5,
        borderRadius: 2,
        resizeMode: 'contain',
        flex: 1
    },
    leftphoto: {
        height: 16,
        width: 5,
        margin: 5,
        borderRadius: 2,
        resizeMode: 'contain',
        justifyContent: 'flex-end',
        flex: 0.5
    },

});


export default Request_items;