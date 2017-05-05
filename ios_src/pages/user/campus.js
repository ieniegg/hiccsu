import React, {Component} from 'react';
import {
    View,
    ScrollView,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
    DeviceEventEmitter
}from 'react-native';

import HttpUtils from '../../../util/HttpUtils'
import Toast, {DURATION} from 'react-native-easy-toast'
import CampusItem from './campus/item'

export default class UserCampus extends Component {
    constructor(props) {
        super(props)
    }


    render() {
        return (
            <View style={{
                marginTop:46,
                flex: 1,
                backgroundColor: '#fff'
            }}>
                <View style={{padding:20}}>
                    <CampusItem/>
                </View>
                <Toast ref="toast" position='top'  />
            </View>
        )
    }
}
