import React, {Component} from 'react';
import {
    View,
    Text,
    Dimensions,
    ScrollView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    DeviceEventEmitter
}from 'react-native';
import {Cell, CellGroup} from 'react-native-cell-components';
import Storage from '../../../../util/Storage'
import HttpUtils from '../../../../util/HttpUtils'

export default class Student extends Component {

    static navigatorStyle = {
        tabBarHidden: true,
        navBarTextColor: '#000000',
        drawUnderNavBar: true,
        navBarButtonColor: '#000000',
        navBarTranslucent: true
    }


    constructor(props) {
        super(props)
    }

    _startBind () {

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle='dark-content'/>
                <ScrollView>
                    <View style={{height: 44}}/>

                </ScrollView>
            </View>
        )
    }

}

