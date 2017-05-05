import React, {Component} from 'react';
import {
    View,
    Image,
    Text,
    Dimensions
}from 'react-native';

import {BlurView, VibrancyView} from 'react-native-blur'
import Icon from 'react-native-vector-icons/Octicons'

export default class CampusItem extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <View style={{
                height: 100, backgroundColor: '#fff', shadowColor: '#000000',
                shadowOpacity: 0.3,
                shadowRadius: 2,
                shadowOffset: {
                    height: 2,
                }
            }}>
                <View style={{flexDirection:'row'}}>
                    <View style={{width:80}}>
                        <BlurView
                            style={{
                                justifyContent:'center',alignItems:'center',
                                zIndex: 1,
                                position: "absolute",
                                top: 0, left: 0, bottom: 0, right: 0,
                            }}
                            blurType="light"
                            blurAmount={5}
                        >
                            <Icon style={{backgroundColor: 'rgba(0,0,0,0)'}} name="credit-card" size={24}
                                  color="#ffffff"/>
                        </BlurView>
                        <Image  source={require('../../../../res/images/register_bg.jpg')}
                                style={{width:80,height:100}} />

                    </View>
                    <View style={{flex:1,justifyContent:'center',alignItems:'flex-start',padding:10}}>
                        <Text style={{fontSize:16}}>教务处账号绑定</Text>
                        <Text style={{fontSize:12,color:'#7e7e7e',marginTop:5}}>可使用成绩查询、课表查询功能</Text>
                    </View>
                </View>
            </View>
        )
    }
}
