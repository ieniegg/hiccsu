import React, {Component} from 'react';
import {
    View, StyleSheet,StatusBar,Dimensions
}from 'react-native';
import NavigationBar from '../../util/NavigationBar'
import {TabViewAnimated, TabBar} from 'react-native-tab-view'

import Vista from './home/vista'


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


    _heightCompute(height) {
        console.log(height)
        if (height > 0 && height < 94) {
            if (height <= 44) {
                this.setState({
                    tabBarHeight: 44 - height
                })
            } else {
                this.setState({
                    navigationBarHeight: 50 - height + 44
                })
            }
        }
    }

    _handleChangeTab = (index) => {
        this.setState({index})
    }

    _renderHeader = (props) => {
        return <TabBar style={{backgroundColor:'rgba(255,255,255,0.95)',width:window.width,position:'absolute',top:60}}
                       labelStyle={{color: '#000'}}
                       indicatorStyle={{backgroundColor: '#000'}} {...props} />
    }

    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                return <View style={[styles.page, {backgroundColor: '#ff4081'}]}/>;
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

                <NavigationBar
                    style={{backgroundColor:'rgba(255,255,255,0.95)',height:60,width:window.width,position:'absolute',zIndex:2}}
                    statusBar={{
                        barStyle: 'dark-content',
                        hidden: false,
                    }}
                    title={'广场'}
                    popEnabled={false}
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