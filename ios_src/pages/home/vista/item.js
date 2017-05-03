import React, {Component} from 'react';
import {
    View,
    Image,
    Dimensions
}from 'react-native';


export default class VistaItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Image
                source={{uri: this.props.vista.Image}}
                style={{width: Dimensions.get('window').width, height: 200, backgroundColor: '#7e7e7e'}}>
                <View style={{flex:1,backgroundColor:'rgba(0,0,0,0.2)'}}>

                </View>
            </Image>
        )
    }
}
