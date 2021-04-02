

import React, { Component } from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import {Image} from 'react-native'
export default class Floatingbutton extends Component
{
    render()
    {
        return(
<TouchableOpacity
   style={{
       borderWidth:1,
       alignItems:'center',
       justifyContent:'center',
       width:70,
       position: 'absolute',                                          
       bottom: 10,                                                    
       right: 10,
       height:70,
       backgroundColor:'red'   ,
       borderRadius:100,
     }}
 >
     <Image source={this.props.imagesrc} style={{height:50,width:50}}></Image>
   {/* <Image source={this.props} style={{height:30,width:30}}/> */}
  </TouchableOpacity>

        );
    }
}