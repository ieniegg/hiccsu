import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    Dimensions
}from 'react-native';

import {BlurView, VibrancyView} from 'react-native-blur'
import Icon from 'react-native-vector-icons/Octicons'

export default class CampusItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{}}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={{fontSize: 14, textAlign: 'center', color: '#7e7e7e'}}>{this.props.title}</Text>
                    <Text  style={{fontSize: 16, textAlign: 'center', color: '#000',marginTop:8}}>
                        {this.props.content}
                        </Text>
                    <View style={{flex:1,borderColor:'#eee',borderWidth:0.5,marginTop:20,marginBottom:30}} />
                </View>
            </View>
        )
    }
}
