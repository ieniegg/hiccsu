import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ScrollView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    DeviceEventEmitter
}from 'react-native';
import {Cell, CellGroup} from 'react-native-cell-components';
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import Icon from 'react-native-vector-icons/FontAwesome'
import Storage from '../../../util/Storage'

export default class UserConfig extends Component {

    static navigatorStyle = {
        tabBarHidden: true,
        navBarTextColor: '#000000',
        drawUnderNavBar: true,
        navBarButtonColor: '#000000',
        navBarTranslucent: true
    }


    constructor(props) {
        super(props)
        this.state = {
            user: {}
        }
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle='dark-content'/>
                <ScrollView
                    contentInset={{top: 44, left: 0, bottom: 0, right: 0}}
                >
                    <CellGroup>
                        <Cell title="Package" icon="code" value="react-native-cell-components" />
                    </CellGroup>
                </ScrollView>
            </View>
        )
    }

}

