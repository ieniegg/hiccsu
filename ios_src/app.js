import React, {Component} from 'react'
import {Navigation} from 'react-native-navigation'
import SplashScreen from 'react-native-splash-screen'
import {registerScreens} from './screens'
import HttpUtils from '../util/HttpUtils'
import Storage from '../util/Storage'
import DeviceInfo from 'react-native-device-info'
registerScreens()

class App extends Component {
    constructor(props) {
        super(props)
        this.syncUser().then(() => {
            SplashScreen.hide()
            this.startApp()
        }).catch(() => {
            SplashScreen.hide()
            this.startApp()
        })
    }


    syncUser() {
        return new Promise((resolve, reject) => {
            Storage.load({
                key: 'session',
            }).then(session => {
                HttpUtils.postJson('api/app/user/sync', {
                    session: session,
                    device: DeviceInfo.getUniqueID()
                }).then(res => {
                    if (res.status === 10000) {
                        Storage.save({key: 'session', data: res.session})
                        Storage.save({key: 'user', data: res.userinfo}).then(() => {
                            resolve()
                        })
                    } else {
                        Storage.remove({
                            key: 'user'
                        }).then(() => {
                            resolve()
                        })
                    }
                }).catch(err => {
                    Storage.remove({
                        key: 'user'
                    })
                    reject(err)
                })
            }).catch(err => {
                reject(err)
            })

        })
    }

    startApp() {
        Navigation.startTabBasedApp({
            tabsStyle: {
                tabBarButtonColor: '#7e7e7e',
                tabBarSelectedButtonColor: '#000',
                tabBarTranslucent: true
            },
            tabs: [
                {
                    label: '广场',
                    screen: 'homeTabScreen',
                    icon: require('../res/images/main29.png'),
                    selectedIcon: require('../res/images/main_select29.png'),
                    title: '广场'
                },
                {
                    label: '查询',
                    screen: 'queryTabScreen',
                    icon: require('../res/images/query29.png'),
                    selectedIcon: require('../res/images/query_select29.png'),
                },
                {
                    label: '个人',
                    screen: 'userTabScreen',
                    icon: require('../res/images/user29.png'),
                    selectedIcon: require('../res/images/user_select29.png'),
                }
            ]
        })
    }
}
export default App