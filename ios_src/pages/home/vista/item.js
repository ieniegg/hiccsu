import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    Dimensions
}from 'react-native';

import Icon from 'react-native-vector-icons/Octicons'
import Moment from 'moment'
import AniImage from '../../../../util/AniImage'

export default class VistaItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View>
                <AniImage
                    inputRange={[0, 100]}
                    outputRange={[0, 1]}
                    url={this.props.vista.Image}
                    style={{width: Dimensions.get('window').width, height: 260, backgroundColor: '#7e7e7e'}}>
                </AniImage>
                <View style={{
                    flex: 1,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    right: 0,
                    bottom: 0
                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        marginTop: 10,
                        marginRight: 10
                    }}>
                        <Icon style={{backgroundColor: 'rgba(0,0,0,0)'}} name="clock" size={14}
                              color="#ffffff"/>
                        <View>
                            <Text style={{color: '#fff', fontSize: 14, marginLeft: 5}}>
                                {Moment(this.props.vista.CreateTime).format('MM月DD日 HH:mm')}
                            </Text>
                        </View>

                    </View>
                    <View
                        style={{
                            padding: 10,
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0,0,0,0.4)',
                            height: 40,
                            position: 'absolute',
                            left: 0,
                            right: 0,
                            bottom: 0
                        }}>
                        <Icon style={{backgroundColor: 'rgba(0,0,0,0)'}} name="location" size={22}
                              color="#ffffff"/>
                        <Text style={{color: '#fff', fontSize: 16, marginLeft: 5}}>
                            {this.props.vista.Position.Describe ? this.props.vista.Position.Describe : "长沙学院附近"}
                        </Text>
                    </View>
                </View>
            </View>

        )
    }
}
