import React, {Component} from 'react'
import {
    Animated,
    View,
    Image,
    Text,
    Dimensions,
    StyleSheet,
}from 'react-native'

import {TabViewAnimated, TabViewPagerPan} from 'react-native-tab-view';
import Swiper from 'react-native-swiper'

const ALBUMS = {
    '课程表': require('../../res/assets/album-art-1.jpg'),
    '图书馆': require('../../res/assets/album-art-2.jpg'),
    '成绩': require('../../res/assets/album-art-3.jpg'),
};

const BACKGROUND = [
    require('../../res/assets/album-art-1.jpg'),
    require('../../res/assets/album-art-2.jpg'),
    require('../../res/assets/album-art-3.jpg')
]

const initialLayout = {
    height: 0,
    width: Dimensions.get('window').width,
};

export default class Query extends Component {

    static navigatorStyle = {
        navBarHidden: true,
        drawUnderNavBar: true,
        navBarTranslucent: true
    }

    constructor(props) {
        super(props)
        this.state = {
            viewRef: null,
            index: 0,
            routes: Object.keys(ALBUMS).map(key => ({key}))
        }
    }


    _buildCoverFlowStyle = ({layout, position, route, navigationState}) => {
        const {width} = layout;
        const {routes} = navigationState;
        const currentIndex = routes.indexOf(route);
        // Prepend '-1', so there are always at least 2 items in inputRange
        const inputRange = [-1, ...routes.map((x, i) => i)];
        const translateOutputRange = inputRange.map(i => {
            return width / 2 * (currentIndex - i) * -1;
        });
        const scaleOutputRange = inputRange.map(i => {
            if (currentIndex === i) {
                return 1;
            } else {
                return 0.7;
            }
        });
        const opacityOutputRange = inputRange.map(i => {
            if (currentIndex === i) {
                return 1;
            } else {
                return 0.3;
            }
        });

        const translateX = position.interpolate({
            inputRange,
            outputRange: translateOutputRange,
        });
        const scale = position.interpolate({
            inputRange,
            outputRange: scaleOutputRange,
        });
        const opacity = position.interpolate({
            inputRange,
            outputRange: opacityOutputRange,
        });

        return {
            transform: [{translateX}, {scale}],
            opacity,
        };
    };

    _handleChangeTab = index => {
        let number=1
        if (index<this.state.index){
            number=-1
        }
        this.setState({
            index
        }, () => {
            this.refs.swiper.scrollBy(number, true)
        })
    };

    _renderScene = props => {
        return (
            <Animated.View style={[styles.page, this._buildCoverFlowStyle(props)]}>
                <View style={styles.album}>
                    <Image source={ALBUMS[props.route.key]} style={styles.cover}/>
                </View>
                <Text style={styles.label}>{props.route.key}</Text>
            </Animated.View>
        );
    };

    _renderPager = props => {
        return <TabViewPagerPan {...props} />;
    };

    render() {
        return (
            <View style={{flex: 1}}>
                <Swiper ref="swiper"
                        index={this.state.index}
                        style={{
                            zIndex: -1,
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0
                        }}
                        showsButtons={false}>
                    <View style={{flex: 1}}>
                        <Image
                            source={BACKGROUND[0]} style={{
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                        }}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Image
                            source={BACKGROUND[1]} style={{
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                        }}/>
                    </View>
                    <View style={{flex: 1}}>
                        <Image
                            source={BACKGROUND[2]} style={{
                            width: Dimensions.get('window').width,
                            height: Dimensions.get('window').height,
                        }}/>
                    </View>
                </Swiper>
                <TabViewAnimated
                    style={[styles.container, this.props.style]}
                    navigationState={this.state}
                    renderPager={this._renderPager}
                    renderScene={this._renderScene}
                    onRequestChangeTab={this._handleChangeTab}
                    initialLayout={initialLayout}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        zIndex: 2,
        position: "absolute",
        top: 0, left: 0, bottom: 0, right: 0
    },
    page: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    album: {
        backgroundColor: '#000',
        width: 260,
        height: 360,
        elevation: 12,
        shadowColor: '#000000',
        shadowOpacity: 0.5,
        shadowRadius: 8,
        shadowOffset: {
            height: 8,
        },
    },
    cover: {
        width: 260,
        height: 360,
    },
    label: {
        margin: 16,
        backgroundColor: 'rgba(0,0,0,0)',
        color: '#fff',
    },
});
