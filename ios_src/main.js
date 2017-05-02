import React, {Component} from 'react'
import {Navigator} from 'react-native'
import Homepage from './pages/homepage'


function main() {

    class Root extends Component {

        renderScene(route, navigator) {
            let Component = route.component;
            return <Component {...route.params} navigator={navigator}/>
        }

        render() {
            return <Navigator
                initialRoute={{
                    component: Homepage
                }}
                renderScene={(route, navigator) => this.renderScene(route, navigator)}/>
        }
    }
    return <Root/>
}

module.exports = main;