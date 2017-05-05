import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    Dimensions
}from 'react-native';

import Icon from 'react-native-vector-icons/Octicons'
import Moment from 'moment'

export default class VistaItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <Image
                source={{uri: this.props.vista.Image}}
                style={{width: Dimensions.get('window').width, height: 240, backgroundColor: '#7e7e7e'}}>
                <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.2)'}}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginTop: 5,
                        marginRight: 10
                    }}>
                        <Icon style={{backgroundColor: 'rgba(0,0,0,0)'}} name="clock" size={16}
                              color="#ffffff"/>
                        <View>
                            <Text style={{color: '#fff', fontSize: 16, marginLeft: 5}}>{Moment(this.props.vista.CreateTime).format('YYYY-MM-DD HH:mm')}</Text>
                        </View>

                    </View>
                    <View
                        style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            height: 50,
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}>
                        <Icon style={{backgroundColor: 'rgba(0,0,0,0)'}} name="location" size={24}
                              color="#ffffff"/>
                        <Text style={{color: '#fff', fontSize: 18, marginLeft: 5}} > {this.props.vista.Position.Describe?this.props.vista.Position.Describe:"长沙学院附近"}</Text>
                    </View>
                </View>
            </Image>
        )
    }
}
