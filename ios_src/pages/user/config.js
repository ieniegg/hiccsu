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
import Storage from '../../../util/Storage'
import HttpUtils from '../../../util/HttpUtils'

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
    }

    _logout() {
        this.props.navigator.showLightBox({
            screen: "loadingModal",
            passProps: {text: '注销中'}
        })
        Storage.remove({key:'session'})
        Storage.remove({key:'user'}).then(()=>{
            HttpUtils.get('api/app/user/logout').then(res=>{
                this.props.navigator.dismissLightBox()
                DeviceEventEmitter.emit('userRefresh',{})
                this.props.navigator.pop()
            }).catch(err=>{
                this.props.navigator.dismissLightBox()
                this.props.navigator.pop()
            })
        })
    }

    _renderLogout() {
        if (this.props.user) {
            return (

                    <Cell  onPress={()=>{
                        this._logout()
                    }} title="注销登录" disclosure="chevron-right" icon="sign-out"/>

            )
        }
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle='dark-content'/>
                <ScrollView>
                    <View style={{height: 44}}/>
                    <CellGroup>
                        <Cell title="版本" onPress={() => {}} value="Beta 1.0 (Build 20170505)" icon="versions"/>
                        {
                            this._renderLogout()
                        }
                    </CellGroup>
                </ScrollView>
            </View>
        )
    }

}

