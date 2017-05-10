import React, {Component} from 'react'
import {
    View,
    Image,
    Alert,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    ListView
}from 'react-native'

import {BlurView, VibrancyView} from 'react-native-blur'
import Icon from 'react-native-vector-icons/Octicons'
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import CourseUtils from '../../../../util/CourseUtils'
import SyncUtils from '../../../../util/SyncUtils'

export default class DailyCourse extends Component {
    constructor(props) {
        super(props)
        let date = new Date()
        let week = date.getDay()
        let millisecond = 1000 * 60 * 60 * 24
        let minusDay = week != 0 ? week - 1 : 6
        this.state = {
            date: new Date(),
            now: [],
            days: [
                new Date(date.getTime() - (minusDay * millisecond)),
                new Date(date.getTime() - ((minusDay - 1) * millisecond)),
                new Date(date.getTime() - ((minusDay - 2) * millisecond)),
                new Date(date.getTime() - ((minusDay - 3) * millisecond)),
                new Date(date.getTime() - ((minusDay - 4) * millisecond)),
                new Date(date.getTime() - ((minusDay - 5) * millisecond)),
                new Date(date.getTime() - ((minusDay - 6) * millisecond))
            ],
            today: new Date().getDate(),
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    static navigatorStyle = {
        navBarHidden: true,
        drawUnderNavBar: true,
        navBarTranslucent: true,
        tabBarHidden: true
    }

    componentDidMount() {
        this._loadTodayCourse()
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

    _loadTodayCourse(date = this.state.date, nowCourse = true) {
        CourseUtils.getTodayCourse(date).then(res => {
            console.log(date)
            console.log(res)
            this.setState({
                ds: this.state.ds.cloneWithRows(res)
            }, () => {
                if (nowCourse) {
                    this._loadnNowCourse()
                }
            })
        }).catch(err => {
            this.props.navigator.showLightBox({
                screen: "loadingModal",
                passProps: {text: '尝试获取数据'}
            })
            SyncUtils.syncUser().then((res, user) => {
                this.props.navigator.dismissLightBox()
                if (res) {
                    SyncUtils.syncCourse().then((course) => {
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


    _renderToday(day) {
        if (day.getDate() == this.state.today) {
            return (
                <View style={{width: 4, height: 4, backgroundColor: '#a10000', borderRadius: 2, marginTop: 5}}></View>
            )
        }
    }


    _changeDay(day) {
        this.setState({date: day})
        this._loadTodayCourse(day, false)
    }

    _getDayColor(day) {
        if (this.state.date.getDay() === day.getDay()) {
            return '#000'
        } else {
            return '#7e7e7e'
        }
    }


    _renderDay(week, day) {
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                <TouchableOpacity style={{flexDirection: 'column', alignItems: 'center'}} onPress={() => {
                    this._changeDay(day)
                }}>
                    <Text style={{color: this._getDayColor(day)}}>
                        {week}
                    </Text>
                    <Text style={{marginTop: 20, color: this._getDayColor(day)}}>
                        {day.getDate()}
                    </Text>
                    {this._renderToday(day)}
                </TouchableOpacity>
            </View>
        )
    }

    _renderDayList() {
        return (
            <View style={{
                height: 100,
                flexDirection: 'row',
                paddingTop: 20,
                borderBottomWidth: 1,
                borderBottomColor: '#eee'
            }}>
                {this._renderDay('周一', this.state.days[0])}
                {this._renderDay('周二', this.state.days[1])}
                {this._renderDay('周三', this.state.days[2])}
                {this._renderDay('周四', this.state.days[3])}
                {this._renderDay('周五', this.state.days[4])}
                {this._renderDay('周六', this.state.days[5])}
                {this._renderDay('周日', this.state.days[6])}
            </View>
        )
    }

    _renderCourseSelect(course) {
        if (this.state.now.length > 0) {
            if (course.Id === this.state.now[0].Id || course.Id === this.state.now[this.state.now.length - 1].Id) {
                return (
                    <View style={{width: 4, height: 90, backgroundColor: '#7e7e7e'}}>

                    </View>
                )
            } else {
                return (
                    <View style={{width: 4, height: 90, backgroundColor: '#eee'}}>

                    </View>
                )
            }
        }
    }

    _renderCourseItem(course) {
        return (
            <View style={{height: 90, borderBottomWidth: 0.5, borderBottomColor: '#eee', flexDirection: 'row'}}>
                <View>
                    {this._renderCourseSelect(course)}
                </View>
                <View style={{flex: 1, flexDirection: 'column', justifyContent: 'center', paddingLeft: 40}}>
                    <Text style={{fontSize: 16, fontWeight: '300'}}>
                        {course.Course}
                    </Text>
                    <View style={{marginTop: 10, flexDirection: 'row', alignItems: 'center'}}>
                        <Icon name="location" size={12}
                              color="#7e7e7e"/>
                        <Text style={{fontSize: 12, marginRight: 10}}>
                            {course.Position}
                        </Text>
                        <Icon name="clock" size={12}
                              color="#7e7e7e"/>
                        <Text style={{fontSize: 12}}>
                            {this._getTime(course.Number)}
                        </Text>
                    </View>
                    <Text style={{fontSize: 12, marginTop: 5, color: '#7e7e7e'}}>
                        {course.Teacher}
                    </Text>
                </View>
            </View>
        )
    }

    _renderNowCourse() {
        if (this.state.now.length > 0) {
            return (
                <View
                    style={{flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', padding: 20, zIndex: -1}}>
                    <Text style={{fontSize: 24, color: '#fff', fontWeight: '300'}}>{this.state.now[0].Course}</Text>
                    <Text style={{
                        fontSize: 14,
                        color: '#fff',
                        marginTop: 20
                    }}>{this._getTime(this.state.now[0].Number)}</Text>
                    <Text style={{fontSize: 14, color: '#fff'}}>{this.state.now[0].Position}</Text>
                    <Text style={{fontSize: 14, color: '#fff'}}>{this.state.now[0].Class}</Text>
                    <Text style={{fontSize: 14, color: '#fff'}}>{this.state.now[0].Teacher}</Text>

                </View>
            )
        } else {
            return (
                <View>

                </View>
            )
        }
    }

    _getTime(number) {
        switch (number) {
            case'0102':
                return '08:00 - 09:40'
            case '0304':
                return '10:00 - 11:40'
            case '0506':
                return '14:00 - 15:40'
            case '0708':
                return '16:00 - 17:40'
            case '0910':
                return '19:00 - 20:40'
            default:
                return ''
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
                <ListView dataSource={this.state.ds}
                          enableEmptySections={true}
                          renderHeader={() => (
                              this._renderDayList()
                          )}
                          renderRow={(row) => this._renderCourseItem(row)}
                          renderScrollComponent={props => (
                              <ParallaxScrollView
                                  headerBackgroundColor="#333"
                                  parallaxHeaderHeight={ PARALLAX_HEADER_HEIGHT }
                                  backgroundSpeed={10}
                                  renderBackground={() => (
                                      <View key="background">
                                          <Image style={{height: 300, width: Dimensions.get('window').width}}
                                                 source={require('../../../../res/images/daily_bg.jpg')}>
                                              <BlurView
                                                  style={{
                                                      zIndex: -1,
                                                      position: "absolute",
                                                      top: 0, left: 0, bottom: 0, right: 0,
                                                  }}
                                                  blurType="light"
                                                  blurAmount={5}
                                              />
                                          </Image>
                                      </View>
                                  )}
                                  renderForeground={() => (
                                      <View key="parallax-header" style={{flex: 1}}>
                                          <TouchableOpacity onPress={() => {
                                              this.props.navigator.pop()
                                          }}><Icon style={{
                                              backgroundColor: 'rgba(0,0,0,0)',
                                              paddingTop: 25,
                                              paddingLeft: 15
                                          }}
                                                   name="chevron-left" size={30}
                                                   color="#ffffff"/></TouchableOpacity>
                                          {this._renderNowCourse()}
                                      </View>
                                  )}
                              />
                          )}
                />

            </View>
        )
    }
}


const window = Dimensions.get('window')
const PARALLAX_HEADER_HEIGHT = 260
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#eee'
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
    avatar: {
        marginTop: 30,
        width: 100,
        height: 100,
        backgroundColor: '#fff',
        borderRadius: 100 / 2
    }
})