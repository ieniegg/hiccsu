import React, {Component} from 'react'
import {
    View, StyleSheet, Dimensions, StatusBar,DeviceEventEmitter
}from 'react-native'
import {TabViewAnimated, TabBar} from 'react-native-tab-view'

import Vista from './home/vista'
import Recommend from './home/recommend'
import SyncUtiles from '../../util/SyncUtils'

export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            routes: [
                {key: '1', title: '推荐'},
                {key: '2', title: '活动'},
                {key: '3', title: '随拍'},
                {key: '4', title: '失物'},
            ]
        }
    }


    componentWillMount() {
        this.subscription = DeviceEventEmitter.addListener('userRefresh', (user) => {
            SyncUtiles.syncCourse(true)
        })
    }

    componentWillUnmount() {
        this.subscription.remove()
    }

    static navigatorStyle = {
        drawUnderNavBar: true,
        navBarTranslucent: false,
        navBarNoBorder: true,
        navBarHideOnScroll: false,
        statusBarTextColorScheme: 'dark',
        statusBarTextColorSchemeSingleScreen: 'dark',
        drawUnderTabBar: true,
        statusBarHideWithNavBar: true
    };

    _handleChangeTab = (index) => {
        this.setState({index})
    }

    _renderHeader = (props) => {
        return <TabBar
            style={{backgroundColor: 'rgba(255, 255, 255, 1)'}}
            labelStyle={{color: '#000'}}
            indicatorStyle={{backgroundColor: '#000'}} {...props} />
    }

    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                return <Recommend {...this.props}/>;
            case '2':
                return <View style={[styles.page, {backgroundColor: '#673ab7'}]}/>;
            case '3':
                return <Vista {...this.props} />;
            case '4':
                return <View style={[styles.page, {backgroundColor: '#44b549'}]}/>;
            default:
                return null;
        }
    }

    render() {
        return (
            <View style={{
                flex: 1
            }}>
                <StatusBar
                    barStyle="dark-content"
                />
                <TabViewAnimated
                    lazy={true}
                    style={styles.container}
                    navigationState={this.state}
                    renderHeader={this._renderHeader}
                    renderScene={this._renderScene}
                    onRequestChangeTab={this._handleChangeTab}
                />
            </View>
        )
    }
}

const window = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
})