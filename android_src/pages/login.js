import React, {Component} from 'react';
import {
    View,
    Image,
    Dimensions,
    ScrollView,
    TextInput,
    TouchableOpacity,
    DeviceEventEmitter,
    AsyncStorage
}from 'react-native';
import Button from 'react-native-button'
import Toast, {DURATION} from 'react-native-easy-toast'

import HttpUtils from '../../util/HttpUtils'
import DeviceInfo from 'react-native-device-info'
import Storage from '../../util/Storage'

export default class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            viewRef: null,
            mobile: '',
            password: ''
        }
    }

    static navigatorStyle = {
        navBarHidden: true,
        drawUnderNavBar: true,
        navBarTranslucent: true,
        tabBarHidden: true,
    }

    _login() {
        if (!this.state.mobile || !this.state.password) {
            this.refs.toast.show('内容填写不完整')
            return
        }
        this.props.navigator.showLightBox({
            screen: "loadingModal",
            passProps: {text: '登陆中'}
        })
        HttpUtils.postJson('api/app/user/login', {
            mobile: this.state.mobile,
            password: this.state.password,
            device: DeviceInfo.getUniqueID()
        }).then(res => {
            this.props.navigator.dismissLightBox()
            if (res.status === 10000) {
                Storage.save({key: 'session', data: res.session})
                Storage.save({key: 'user', data: res.userinfo}).then(rej => {
                    DeviceEventEmitter.emit('userRefresh', res.userinfo)
                })
                this.props.navigator.pop({animated: true})
            } else {
                this.refs.toast.show('手机号或密码错误')
            }
        }).catch(err => {
            this.props.navigator.dismissLightBox()
            this.refs.toast.show('通讯错误，请重试')
        })

    }

    render() {
        return (
            <View style={{flex: 1}}>
                <Image style={{width: window.width, height: window.height, resizeMode: Image.resizeMode.cover}}
                       source={require('../../res/images/register_bg.jpg')}>
                    <View style={{
                        width: window.width,
                        marginLeft: 10,
                        marginTop: 30,
                        justifyContent: 'flex-start',
                        flexDirection: 'row'
                    }}>
                        <TouchableOpacity onPress={() => {
                            this.props.navigator.pop({
                                animated: true
                            })
                        }}>
                            <Image style={{width: 25, height: 25, resizeMode: Image.resizeMode.contain}}
                                   source={require('../../res/images/ic_close_white_36pt.png')}/>
                        </TouchableOpacity>
                    </View>

                    <ScrollView scrollEnabled={false} style={{flex: 1, flexDirection: 'column'}}>
                        <View style={{
                            justifyContent: 'center',
                            flexDirection: 'row',
                            marginTop: 40,
                        }}>
                            <Image style={{width: 160, height: 60, resizeMode: Image.resizeMode.contain}}
                                   source={require('../../res/images/logo_light.png')}/>
                        </View>
                        <View style={{
                            marginTop: 60,
                            paddingLeft: 50,
                            paddingRight: 50,
                        }}>
                            <TextInput
                                underlineColorAndroid="rgba(0,0,0,0)"
                                maxLength={11}
                                enablesReturnKeyAutomatically={true}
                                placeholderTextColor="#7e7e7e"
                                clearButtonMode="while-editing"
                                returnKeyType="next"
                                placeholder="手机号"
                                keyboardType="numbers-and-punctuation"
                                blurOnSubmit={true}
                                style={{
                                    height: 46,
                                    borderRadius: 23,
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255,255,255,0.9)'
                                }}
                                onChangeText={(text) => this.setState({mobile: text})}
                                value={this.state.mobile}
                                onSubmitEditing={() => {
                                    this._passwordInput.focus();
                                }}
                            />
                            <TextInput
                                underlineColorAndroid="rgba(0,0,0,0)"
                                ref={(c) => this._passwordInput = c}
                                secureTextEntry={true}
                                placeholderTextColor="#7e7e7e"
                                clearButtonMode="while-editing"
                                returnKeyType="done"
                                placeholder="密码"
                                blurOnSubmit={true}
                                style={{
                                    marginTop: 20,
                                    height: 46,
                                    borderRadius: 23,
                                    textAlign: 'center',
                                    backgroundColor: 'rgba(255,255,255,0.9)'
                                }}
                                onChangeText={(text) => this.setState({password: text})}
                                value={this.state.password}
                            />
                        </View>
                        <View style={{
                            marginTop: 120,
                            paddingLeft: 50,
                            paddingRight: 50,
                        }}>
                            <Button
                                onPress={() => {
                                    this._login()
                                }}
                                containerStyle={{
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    width: '100%',
                                    height: 46,
                                    borderRadius: 23,
                                    borderWidth: 1,
                                    borderColor: '#ffffff',
                                    overflow: 'hidden',
                                    backgroundColor: 'rgba(0,0,0,0)'
                                }}
                                style={{fontSize: 18, color: '#fff'}}>
                                登录
                            </Button>

                        </View>

                    </ScrollView>
                </Image>
                <Toast ref="toast"/>
            </View>
        )
    }

}

const window = Dimensions.get('window');

