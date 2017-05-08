import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ListView,
    StyleSheet,
    StatusBar,
    TouchableOpacity,
    DeviceEventEmitter
}from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import Icon from 'react-native-vector-icons/Octicons'
import Storage from '../../util/Storage'
import {TabViewAnimated, TabBar} from 'react-native-tab-view'
import {BlurView, VibrancyView} from 'react-native-blur'


import Campus from './user/campus'

export default class User extends Component {

    static navigatorStyle = {
        navBarHidden: true,
        drawUnderNavBar: true,
        navBarTranslucent: true
    }


    constructor(props) {
        super(props)
        this.state = {
            user: {},
            index: 0,
            routes: [
                {key: '1', title: '我的'},
                {key: '2', title: '活动'},
                {key: '3', title: '随拍'}
            ]
        }
    }

    componentWillMount() {
        this._loadUser()
        this.subscription = DeviceEventEmitter.addListener('userRefresh', (user) => {
            this.setState({user: user})
        })
    }

    componentWillUnmount() {
        this.subscription.remove()
    }


    _handleChangeTab = (index) => {
        this.setState({index})
    }

    _renderHeader = (props) => {
        return <TabBar
            style={{backgroundColor: 'rgba(255, 255, 255, 0)', width: window.width, position: 'absolute'}}
            labelStyle={{color: '#fff'}}
            indicatorStyle={{backgroundColor: '#fff'}} {...props} />
    }

    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                return <Campus {...this.props} user={this.state.user}  />;
            case '2':
                return <View style={[styles.page]}/>;
            case '3':
                return <View style={[styles.page]}/>;
            default:
                return null;
        }
    }

    _loadUser() {
        Storage.load({
            key: 'user',
        }).then(ret => {
            this.setState({user: ret})
        }).catch(err => {
            this.setState({user: {}})
        });
    }

    _renderUsername() {
        if (!this.state.user.Nickname) {
            return (
                <TouchableOpacity onPress={() => {
                    this._toLogin()
                }}>
                    <Text style={{
                        backgroundColor: 'rgba(0,0,0,0)',
                        color: '#fff',
                        marginTop: 20,
                        fontSize: 16
                    }}>点击登陆或注册</Text>
                </TouchableOpacity>
            )
        } else {
            return (
                <Text style={{
                    backgroundColor: 'rgba(0,0,0,0)',
                    color: '#fff',
                    marginTop: 20,
                    fontSize: 16
                }}>{this.state.user.Nickname}</Text>
            )
        }


    }

    _toLogin() {
        this.props.navigator.push({
            screen: 'loginScreen',
            animated: true
        })
    }


    render() {
        return (
            <View style={{flex: 1}}>
                <StatusBar barStyle='light-content'/>
                <ParallaxScrollView
                    headerBackgroundColor="#333"
                    parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                    backgroundSpeed={10}
                    renderBackground={() => (
                        <View key="background">
                            <BlurView
                                style={{
                                    zIndex: 1,
                                    position: "absolute",
                                    top: 0, left: 0, bottom: 0, right: 0,
                                }}
                                blurType="light"
                                blurAmount={5}
                            />
                            <Image style={{
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT,
                                resizeMode: Image.resizeMode.cover
                            }} source={require('../../res/images/user_bg.jpg')}/>
                            <View style={{
                                position: 'absolute',
                                top: 0,
                                width: window.width,
                                height: PARALLAX_HEADER_HEIGHT
                            }}/>
                        </View>
                    )}
                    renderForeground={() => (
                        <View key="parallax-header" style={ styles.parallaxHeader }>
                            <View style={{
                                width: window.width,
                                marginRight: 25,
                                justifyContent: 'flex-end',
                                flexDirection: 'row'
                            }}>
                                <TouchableOpacity onPress={() => {
                                    this.props.navigator.push({
                                        screen: 'UserConfigScreen',
                                        animated: true,
                                        title: '更多',
                                        passProps: {user: this.state.user},
                                        backButtonTitle: ''
                                    })
                                }}>
                                    <Icon style={{backgroundColor: 'rgba(0,0,0,0)'}} name="three-bars" size={24}
                                          color="#ffffff"/>
                                </TouchableOpacity>
                            </View>
                            <Image source={{uri: this.state.user.Avatar}} style={ styles.avatar }/>
                            {this._renderUsername()}
                        </View>
                    )}
                >
                    <View style={{height: window.height, marginTop: -46}}>
                        <TabViewAnimated
                            lazy={true}
                            style={styles.container}
                            navigationState={this.state}
                            renderHeader={this._renderHeader}
                            renderScene={this._renderScene}
                            onRequestChangeTab={this._handleChangeTab}
                        />
                    </View>
                </ParallaxScrollView>
            </View>
        )
    }

}

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 300;
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: window.width,
        height: PARALLAX_HEADER_HEIGHT
    },
    parallaxHeader: {
        alignItems: 'center',
        flexDirection: 'column',
        paddingTop: 25
    },
    avatar: {
        marginTop: 30,
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 100 / 2
    }
});

