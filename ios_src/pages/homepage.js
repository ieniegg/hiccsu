import React, {Component} from 'react';
import {
    View
}from 'react-native';
import SplashScreen from 'react-native-splash-screen'
export default class Homepage extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        setTimeout(() => {
            SplashScreen.hide();
        }, 10000)
    }


    render() {
        return (
            <View>

            </View>
        )
    }
}
