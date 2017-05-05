import React, {Component} from 'react';
import {
    View,
    ListView,
    TouchableOpacity,
    Dimensions,
    RefreshControl,
    DeviceEventEmitter
}from 'react-native';

import HttpUtils from '../../../util/HttpUtils'
import Toast, {DURATION} from 'react-native-easy-toast'

import VistaItem from './vista/item'

export default class Vista extends Component {

    constructor(props) {
        super(props)
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            loading: false,
            page: 1,
            cnt: 0,
            hasNext: false,
            pers: 10,
            refresh: false,
            ds
        }
        this._vista = [];
    }

    componentDidMount() {
        this._refreshVista()
    }

    _refreshVista() {
        this.setState({refresh: true})
        HttpUtils.postJson('/api/app/vista/list').then(res => {
            this.setState({refresh: false})
            if (res.status === 10000) {
                this._vista = res.vistas
                this.setState({
                    page: res.page,
                    hasNext: res.hasNext,
                    ds: this.state.ds.cloneWithRows(this._vista)
                })
            } else {
                this.refs.toast.show('随拍获取失败，请稍候再试')
            }
        }).catch(err => {
            console.log(err)
            this.setState({refresh: false})
            this.refs.toast.show('通讯失败，请重试')
        })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#333'
            }}>
                <ListView
                    enableEmptySections={true}
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width
                    }}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refresh}
                            onRefresh={() => this._refreshVista()}
                            tintColor="#e7e7e7"
                            title="刷新中"
                            titleColor="#e7e7e7"
                            progressBackgroundColor="#ffff00"
                        />
                    }
                    dataSource={this.state.ds}
                    contentInset={{top: 46, left: 0, bottom: 49, right: 0} }
                    renderRow={(row) => (
                        <TouchableOpacity onPress={() => {
                        }}>
                            <VistaItem vista={row}/>
                        </TouchableOpacity>
                    )}
                />
                <Toast ref="toast" position='top'  />
            </View>
        )
    }
}
