import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback } from 'react-native'

class Hole extends Component {
    render(){
        return(
            <TouchableWithoutFeedback 
                onPress = {() => {
                    this.props.handlePress(this.props.id)
                }}>
                <View style = {getStyle(this.props.properties)}>  
                </View>
            </TouchableWithoutFeedback>
        )
    }
}

let getStyle = (properties) => {

    return {
        width: 80,
        height: 80,
        position: 'absolute',
        top: properties.top,
        left: properties.left,
        borderRadius: 80/2,
        backgroundColor: properties.color
    }
}

export default Hole;