import React, {Component} from 'react';
import {
    View, StyleSheet
}from 'react-native';
import NavigationBar from '../../util/NavigationBar'
import {TabViewAnimated, TabBar} from 'react-native-tab-view'


export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            index: 0,
            routes: [
                {key: '1', title: '推荐'},
                {key: '2', title: '活动'},
                {key: '3', title: '失物'},
            ]
        }
    }

    _handleChangeTab = (index) => {
        this.setState({index})
    }

    _renderHeader = (props) => {
        return <TabBar style={{backgroundColor:'#ffffff'}} labelStyle={{color:'#000'}} indicatorStyle={{backgroundColor:'#000'}} {...props} />
    }

    _renderScene = ({route}) => {
        switch (route.key) {
            case '1':
                return <View style={[styles.page, {backgroundColor: '#ff4081'}]}/>;
            case '2':
                return <View style={[styles.page, {backgroundColor: '#673ab7'}]}/>;
            case '3':
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
                <NavigationBar title={'广场'}
                               popEnabled={false}
                               style={{backgroundColor: '#ffffff'}}
                />
                <TabViewAnimated
                    style={styles.container}
                    navigationState={this.state}
                    renderScene={this._renderScene}
                    renderHeader={this._renderHeader}
                    onRequestChangeTab={this._handleChangeTab}
                />
            </View>
        )
    }
}


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