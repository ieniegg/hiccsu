import React, {Component} from 'react'
import {
    View,
    Alert
}from 'react-native'

import CourseUtils from '../../../../util/CourseUtils'
import SyncUtils from '../../../../util/SyncUtils'

export default class Daily extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: [],
            now: []
        }
    }

    componentWillMount() {
        this._loadnNowCourse()
    }

    _loginTip(content) {
        Alert.alert(
            '提示',
            content,
            [
                {
                    text: '返回', onPress: () => {
                    this.props.navigator.pop()
                }, style: 'cancel'
                },
                {
                    text: '登录', onPress: () => {
                    this.props.navigator.push({screen: 'loginScreen', animated: true})
                }
                },
            ],
            {cancelable: false}
        )
    }

    _loadTodayCourse() {
        CourseUtils.getTodayCourse().then(res => {
            this.setState({
                course: res
            }, () => {
                this._loadnNowCourse()
            })
        }).catch(err => {
            this.props.navigator.showLightBox({
                screen: "loadingModal",
                passProps: {text: '尝试获取数据'}
            })
            SyncUtils.syncUser().then((res, user) => {
                this.props.navigator.dismissLightBox()
                if (res) {
                    SyncUtils.syncCourse().then(() => {
                        this._loadTodayCourse()
                    }).catch(err => {
                        Alert.alert(
                            '提示',
                            '课表数据不存在，请尝试与教务处同步'
                        )
                    })
                } else {
                    this._loginTip('课表数据不存在，请登录后获取')
                }
            })
        })
    }

    _loadnNowCourse() {
        CourseUtils.getNowCourses().then(res => {
            this.setState({
                now: res
            })
        })
    }

    render() {
        return (
            <View style={{flex: 1}}>
            </View>
        )
    }
}