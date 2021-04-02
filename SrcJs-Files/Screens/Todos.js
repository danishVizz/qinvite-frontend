


import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import EventDetailsComp from '../Components/EventDetailsComp'
import mycolor from '../Constants/Colors';

export default class Todos extends Component {

render()
{   return (

<View style={styles.container}>
<EventDetailsComp
Onpress={()=>this.props.navigation.navigate('ChooseCategory')}
mainviewstyle={{backgroundColor:mycolor.offPink, height:120, borderWidth:1, borderRadius:8, borderColor:'#F54260', alignSelf:'center',justifyContent:'center', alignContent:'center'}}
imagestyle={{height:56,width:69,marginLeft:30,flex:3,alignSelf:'center'}}
title={'Invite Design'}
containerStyle = {{justifyContent:"center"}}
titlestyle={{alignItems:'center', marginLeft:10,flexDirection:'column', alignItems:'center', fontSize:22,fontWeight:'bold',color:mycolor.pink}}
lefticon={require('../../assets/icon_cards.png')}
></EventDetailsComp>
<EventDetailsComp
Onpress={()=>this.props.navigation.navigate('')}
mainviewstyle={{backgroundColor:mycolor.offPink, height:120, borderWidth:1, borderRadius:8,  borderColor:'#F54260'}}
imagestyle={{height:56,width:69,marginLeft:30,flex:3,alignSelf:'center'}}
title={'Guest list'}
containerStyle = {{justifyContent:"center"}}
titlestyle={{marginLeft:10,fontSize:22, fontWeight:'bold',color:mycolor.pink}}
lefticon={require('../../assets/icon_friends.png')}
></EventDetailsComp>
</View>

);

}


}
const styles = StyleSheet.create({
    container: {
        marginTop:40,
        marginLeft:20,
        marginRight:20,

    }});