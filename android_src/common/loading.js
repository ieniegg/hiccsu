import React, {Component} from 'react';
import {
    View,Text,ActivityIndicator
}from 'react-native';

export default class Loading extends Component {

    constructor(props) {
        super(props)
        this.state = { viewRef: null }
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
                backgroundColor:'rgba(0,0,0,0)',
                flexDirection:'column',
                justifyContent:'center',
                alignItems:'center'
            }}>
                <View style={{
                    flexDirection:'column',
                    justifyContent:'center',
                    alignItems:'center',
                    borderRadius:8,
                    height:120,
                    width:180
                }}>
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
