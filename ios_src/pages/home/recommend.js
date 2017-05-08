import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
    Image,
    ListView
}from 'react-native'

import ParallaxScrollView from 'react-native-parallax-scroll-view'

import Storage from '../../../util/Storage'

export default class Recommend extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ds: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
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
                                          <Image style={{
                                              width: window.width,
                                              height: PARALLAX_HEADER_HEIGHT,
                                              resizeMode: Image.resizeMode.cover
                                          }} source={require('../../../res/images/user_bg.jpg')}/>
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
const PARALLAX_HEADER_HEIGHT = 240;
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
})