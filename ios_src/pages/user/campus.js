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
                marginTop: 46,
                flex: 1,
                backgroundColor: '#fff'
            }}>
                <View style={{padding: 30}}>
                    <TouchableOpacity onPress={()=>{
                        this.props.navigator.push({
                            screen: 'studentScreen',
                            animated: true,
                            title: '学生绑定',
                            passProps: {user: this.props.user},
                            backButtonTitle: ''
                        })
                    }}>
                    <CampusItem title="学生绑定"
                                content={this.props.user.Number ? this.props.user.Number : '暂未绑定'}/>
                    </TouchableOpacity>
                    <CampusItem title="手机号绑定"
                                content={this.props.user.Mobile ? this.props.user.Mobile : '暂未绑定'}/>
                    <CampusItem title="失误招领设置"
                                content="不通知"/>
                </View>
                <Toast ref="toast" position='top'/>
            </View>
        )
    }
}
