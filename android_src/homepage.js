import React, {Component} from 'react';
import {
    View,
    Image,
    StyleSheet
}from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import TabNavigator from 'react-native-tab-navigator'
import Home from './pages/home'
import Query from './pages/query'
import User from './pages/user'
export default class Homepage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedTab: 'tb_home'
        }
    }

    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000)
    }

    _changeTab(selectedTab) {
        this.setState({selectedTab: selectedTab})
    }

    _renderTab(Component, selectedTab, title, renderIcon, SelectedIcon) {
        return (
            <TabNavigator.Item
                selected={this.state.selectedTab === selectedTab}
                title={title}
                titleStyle={styles.title}
                selectedTitleStyle={styles.titleSelected}
                renderIcon={() => <Image style={styles.icon}
                                         source={renderIcon}/>}
                renderSelectedIcon={() => <Image style={styles.icon}
                                                 source={SelectedIcon}/>}
                onPress={() => this._changeTab(selectedTab)}>
                <Component {...this.props} />
            </TabNavigator.Item>
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <TabNavigator
                    tabBarStyle={{opacity: 0.9,}}
                    sceneStyle={{paddingBottom: 0}}
                >
                    {this._renderTab(Home, 'tb_home', '首页', require('../res/images/main.png'), require('../res/images/main_select.png'))}
                    {this._renderTab(Query, 'tb_query', '查询', require('../res/images/query.png'), require('../res/images/query_select.png'))}
                    {this._renderTab(User, 'tb_user', '个人', require('../res/images/user.png'), require('../res/images/user_select.png'))}
                </TabNavigator>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    icon: {
        height: 28,
        width: 28
    },
    title: {
        color: '#7e7e7e'
    },
    titleSelected: {
        color: '#000'
    }
})

