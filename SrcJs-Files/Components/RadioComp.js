import React, { Component } from 'react'
import { StyleSheet, TouchableOpacity, Text } from 'react-native'
import { View } from 'react-native-animatable'
import PropTypes from 'prop-types'
import mycolor from '../Constants/Colors'

const DEFAULT_SIZE_MULTIPLIER = 0.7
const DEFAULT_OUTER_BORDER_WIDTH_MULTIPLIER = 0.2

export default class RadioButtonComp extends Component {
  static propTypes = {
    size: PropTypes.number,
    isSelected : PropTypes.bool
  }

  state = {
    isSelected:  this.props.isSelected,
    outcolor : !this.props.isSelected ? mycolor.lightgray : mycolor.pink
  }

  static defaultProps = {
    size: 10,
    innerColor: mycolor.pink,
    outerColor: mycolor.lightgray,
    isSelected: false,
  }
  
  render() {
    const {size} = this.props
    const outerStyle = {
      borderColor: !this.props.isSelected ? mycolor.lightgray : mycolor.pink ,
      width: size + size * DEFAULT_SIZE_MULTIPLIER,
      height: size + size * DEFAULT_SIZE_MULTIPLIER,
      borderRadius: (size + size * DEFAULT_SIZE_MULTIPLIER) / 2,
      borderWidth: 1
    }

    const innerStyle = {
      width: size,
      height: size,
      borderRadius: size / 2,
      backgroundColor:  mycolor.pink
    }

    return (
      <TouchableOpacity onPress={this.props.onPress}>
      <View style={{ flexDirection: "row",alignItems:"center" , marginBottom:15}}>
        <View style={[styles.radio, outerStyle]}>
          {this.props.isSelected ? <View style={innerStyle} {...this.props} /> : null}
        </View>
        <Text style={{marginLeft:10,fontSize:12,color:mycolor.textdarkgray,includeFontPadding:false}}>{this.props.text}</Text>
      </View>
      </TouchableOpacity>
    )
  }


}


const styles = StyleSheet.create({
  radio: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  }
})
