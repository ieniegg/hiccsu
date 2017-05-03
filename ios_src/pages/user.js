import React, {Component} from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    ListView,
    StyleSheet,
    StatusBar
}from 'react-native';
import ParallaxScrollView from 'react-native-parallax-scroll-view'

import Icon from 'react-native-vector-icons/FontAwesome'

export default class User extends Component {

    constructor(props) {
        super(props)
        this.state = {
            dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        }
    }

    static navigatorStyle = {
        navBarHidden:true,
        drawUnderNavBar: true,
        navBarTranslucent: true
    };

    render() {
        return (
        <View style={{flex:1}}>
            <StatusBar barStyle='light-content' />
            <ListView
                ref="ListView"
                style={styles.container}
                dataSource={ this.state.dataSource }
                renderRow={(rowData) => (
                    <View>
                    </View>
                )}
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
                                }} source={require('../../res/images/user_bg.jpg')}/>
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
                                <View  style={{
                                    width:window.width,
                                    marginRight: 20,
                                    marginRight: 20,
                                    justifyContent: 'flex-end',
                                    flexDirection: 'row'
                                }}>
                                    <Icon style={{backgroundColor: 'rgba(0,0,0,0)'}}  name="cog" size={24} color="#ffffff"/>
                                </View>
                                <Image style={ styles.avatar } />
                                <Text style={{backgroundColor:'rgba(0,0,0,0)',color:'#fff',marginTop:20,fontSize:16}}>用户名</Text>
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
        backgroundColor: 'black'
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
        flex: 1,
        flexDirection: 'column',
        paddingTop: 25
    },
    avatar: {
        marginTop:15,
        width:100,
        height:100,
        backgroundColor:'#fff',
        borderRadius: 100 / 2
    }
});

