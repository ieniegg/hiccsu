import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    ListView,
    Text,
    TouchableOpacity
}from 'react-native'

import ParallaxScrollView from 'react-native-parallax-scroll-view'
import {BlurView, VibrancyView} from 'react-native-blur'

import CourseUtils from '../../../util/CourseUtils'

export default class Recommend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
            now: []
        }
    }


    componentWillMount() {
        this._timer = setInterval(() => {
            this._loadnNowCourse()
        }, 1000 * 60)
        this._loadnNowCourse()
    }

    componentWillUnmount() {
        if (this._timer) {
            clearInterval(this._timer)
        }
    }

    _loadnNowCourse() {
        CourseUtils.getNowCourses().then(res => {
            this.setState({
                now: res
            })
        })
    }

    _renderNowCourse() {
        if (this.state.now.length > 0) {
            return (
                <TouchableOpacity style={{flex: 1, marginTop: 20}} onPress={() => {
                    this.props.navigator.push({
                        screen: 'DailyCourseScreen',
                        animated: true,
                        passProps: {user: this.props.user},
                    })
                }}>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'flex-start',
                        padding: 30,
                        zIndex: -1
                    }}>
                        <Text style={{fontSize: 24, color: '#fff', fontWeight: '300'}}>{this.state.now[0].Course}</Text>
                        <Text style={{fontSize: 14, color: '#fff'}}>{this._getTime(this.state.now[0].Number)}</Text>
                        <Text style={{fontSize: 14, color: '#fff'}}>{this.state.now[0].Position}</Text>
                    </View>
                </TouchableOpacity>
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
            <View style={{flex: 1, backgroundColor: '#eee'}}>
                <ListView dataSource={this.state.ds}
                          renderRow={(row) => {
                              <View>

                              </View>
                          }}
                          renderScrollComponent={props => (
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
                                              blurType="dark"
                                              blurAmount={5}
                                          />
                                          <Image style={{
                                              width: window.width,
                                              height: PARALLAX_HEADER_HEIGHT,
                                              resizeMode: Image.resizeMode.cover
                                          }} source={require('../../../res/images/now_bg.jpg')}/>
                                          <View style={{
                                              position: 'absolute',
                                              top: 0,
                                              width: window.width,
                                              height: PARALLAX_HEADER_HEIGHT
                                          }}/>

                                      </View>
                                  )}
                                  renderForeground={() => (
                                      <View key="parallax-header" style={{flex: 1, paddingTop: 25}}>
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

const window = Dimensions.get('window');
const PARALLAX_HEADER_HEIGHT = 180;
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