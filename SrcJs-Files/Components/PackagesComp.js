import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

class  PackagesComp extends Component {
   
    render()
    {   return(
            <View>
            <TouchableOpacity style={styles.container}>
            <Image source={require('../../assets/icon_badge.png')} style={styles.photo} />
            <View style={styles.container_text}>
                <Text style={styles.title}>
                    {this.props.title}
                </Text>
                <Text style={styles.description}>
                    {this.props.invitationcount+' Invitations'}
                </Text>
                <Text style={{marginTop:4,fontSize:12}}>
                    {this.props.price+" QR Cost"}
                </Text>
            </View>
        
            </TouchableOpacity>
        </View> );
 }}; 

      
    
const styles = StyleSheet.create({
    container: {

        flexDirection: 'row',
        padding: 5,
        marginTop: 10,
        marginBottom: 10,
        marginRight:5,
        marginLeft:5,
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
    title: {
        fontSize: 22,
        fontWeight:'bold',
        color: '#000',
    },
    container_text: {
        marginLeft: 20,
        marginTop:10,
        flex: 8
       
    },
    description: {
        fontSize: 14,
        marginTop:5
    },
    photo: {
        height: 74,
        width: 52,
        margin:5,
        marginTop:10,
        resizeMode:'contain',
        flex: 2
    },
   
    
});


export default PackagesComp;