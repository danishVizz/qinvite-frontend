import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import mycolor from '../Constants/Colors';

class  CategoryComp extends Component {
   
    render()
    {   return(
            <View>
            <TouchableOpacity onPress={this.props.Onpress} style={[styles.container , this.props.containerstyle || {}]} >
            <Image source={this.props.lefticon} style={[styles.photo,this.props.imagestyle || {}]} />
            <View style={[styles.container_text,this.props.containerStyle || {}]}>
                <Text style={ [styles.title,this.props.titlestyle || {}]}>
                    {this.props.title}
        </Text>
            </View>
            <Image source={this.props.innerright} style={[styles.checkboxphoto,this.props.innerrightimagestyle || {}]} />
            <Image source={this.props.righticon} style={[styles.optionphoto,this.props.rightimagestyle || {}]} />
            </TouchableOpacity>
        </View>
        );
 }}; 

      
    
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginLeft:20,marginRight:20,
        marginBottom:20,
        height:70,
        elevation:0.1,
        justifyContent:'center',
        borderWidth:1,
        backgroundColor: mycolor.lightwhite,
        borderRadius:5,borderColor:mycolor.lightgray
    },
    title: {
        fontSize: 21,
        color: '#000',
        fontWeight:'bold'
      
    },
    container_text: {
        marginLeft: 10,
        flex: 8,
        justifyContent:'center',
     
       
    },
  
    photo: {
        flex:2,
        height: 27,
        width: 37,
        margin:5,
        marginLeft:21,
        borderRadius:2,
        resizeMode:'contain',
        alignSelf:'center',
    
    },

    checkboxphoto: {
        height: 13,
        width: 17,
        margin:5,
        resizeMode:'contain',
        alignSelf:'center',
        flex: 1
    },

    optionphoto: {
        height: 16,
        width: 4,
        margin:5,
        resizeMode:'contain',
        alignSelf:'center',
        flex: 1
    },
    
});


export default CategoryComp;