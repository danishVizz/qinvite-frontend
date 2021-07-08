import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class EventDetailsComp extends Component {

    render() {
        return (
            <View>
                <TouchableOpacity onPress={this.props.Onpress} style={[styles.container, this.props.mainviewstyle || {}]}>
                    <Image source={this.props.lefticon} style={[styles.photo, this.props.imagestyle || {}]} />
                    <View style={[styles.container_text, this.props.containerStyle || {}]}>
                        <Text style={[styles.title, this.props.titlestyle || {}]}>
                            {this.props.title}
                        </Text>
                        <Text style={styles.description}>
                            {this.props.description}
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        padding: 5,
        marginTop: 5,
        marginBottom: 8,
        marginRight: 5,
        marginLeft: 5,
        elevation: 0.1,
        backgroundColor: '#FFF',
        alignItems: 'center'
    },
    title: {
        fontSize: 14,
        marginTop: 5,
        color: '#000',
    },
    container_text: {
        marginLeft: 10,
        flex: 8
    },
    description: {
        fontSize: 12,
        marginTop: 2
    },
    photo: {
        height: 36,
        width: 36,
        margin: 5,
        borderRadius: 2,
        resizeMode: 'contain',
        flex: 1
    },

});

export default EventDetailsComp;