import React, {Component} from 'react';
import {
    View,Text,ActivityIndicator
}from 'react-native';

import {BlurView, VibrancyView} from 'react-native-blur'

export default class Loading extends Component {

    constructor(props) {
        super(props)
    }


    static navigatorStyle = {
        navBarHidden: true,
        drawUnderNavBar: true,
        navBarTranslucent: true,
        tabBarHidden: true,
    };

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor:'rgba(0,0,0,0)'
            }}>
                <View style={{
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:8,
                    height:120,
                    width:180
                }}>
                    <BlurView
                    style={{
                        borderRadius:8,
                        position: "absolute",
                        top: 0, left: 0, bottom: 0, right: 0,
                    }}
                    blurType="light"
                    blurAmount={20}
                />
                    <View>
                        <ActivityIndicator
                            color="#000"
                            size="large"
                        />
                    </View>
                    <View style={{paddingTop:10}}>
                        <Text>{this.props.text}</Text>
                    </View>
                </View>
            </View>
        )
    }
}
