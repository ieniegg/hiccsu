import React, {Component} from 'react';
import {
    View,
    ListView,
    TouchableOpacity,
    Dimensions,
    Text,
    RefreshControl,
    ActivityIndicator,
    DeviceEventEmitter
}from 'react-native';

import HttpUtils from '../../../util/HttpUtils'
import Toast, {DURATION} from 'react-native-easy-toast'
import PullToRefreshListView from 'react-native-smart-pull-to-refresh-listview'

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
            loadingText: '下拉刷新',
            ds
        }
        this._vista = [];
    }

    componentDidMount() {
        this._refreshVista()
    }

    _loadVista() {
        HttpUtils.postJson('api/app/vista/list', {
            page: this.state.page + 1
        }).then(res => {
            this._pullToRefreshListView.endLoadMore(!res.hasNext)
            if (res.status === 10000) {
                this._vista = this._vista.concat(res.vistas)
                this.setState({
                    page: res.page,
                    hasNext: res.hasNext,
                    ds: this.state.ds.cloneWithRows(this._vista)
                })
            } else {
                this.refs.toast.show('加载失败，请稍候再试')
            }
        }).catch(err => {
            this._pullToRefreshListView.endLoadMore()
            this.refs.toast.show('通讯失败，请重试')
        })
    }

    _refreshVista() {
        HttpUtils.postJson('api/app/vista/list', {
            page: 1
        }).then(res => {
            this._pullToRefreshListView.endRefresh()
            this._pullToRefreshListView.endLoadMore(!res.hasNext)
            if (res.status === 10000) {
                this._vista = res.vistas
                this.setState({
                    page: res.page,
                    hasNext: res.hasNext,
                    ds: this.state.ds.cloneWithRows(this._vista)
                })
                this.refs.toast.show('加载完成')
            } else {
                this.refs.toast.show('随拍获取失败，请稍候再试')
            }
        }).catch(err => {
            this._pullToRefreshListView.endRefresh()
            this.refs.toast.show('通讯失败，请重试')
        })
    }

    render() {
        return (
            <View style={{
                flex: 1,
                backgroundColor: '#333'
            }}>
                <PullToRefreshListView
                    autoLoadMore={true}
                    enableEmptySections={true}
                    style={{
                        flex: 1,
                        width: Dimensions.get('window').width
                    }}
                    ref={ (component) => this._pullToRefreshListView = component }
                    viewType={PullToRefreshListView.constants.viewType.listView}
                    dataSource={this.state.ds}
                    pageSize={10}
                    renderHeader={this._renderHeader}
                    renderFooter={this._renderFooter}
                    onRefresh={() => {
                        this._refreshVista()
                    }}
                    onLoadMore={() => {
                        this._loadVista()
                    }}
                    enabledPullUp={!this.state.hasNext}
                    pullUpDistance={35}
                    pullUpStayDistance={50}
                    pullDownDistance={35}
                    pullDownStayDistance={50}

                    renderRow={(row) => (
                        <TouchableOpacity onPress={() => {
                        }}>
                            <VistaItem vista={row}/>
                        </TouchableOpacity>
                    )}
                />
                <Toast ref="toast" position='top'/>
            </View>
        )
    }

    _renderHeader = (viewState) => {
        let {pullState, pullDistancePercent} = viewState
        let {refresh_none, refresh_idle, will_refresh, refreshing,} = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)
        switch (pullState) {
            case refresh_none:
                return (
                    <View
                        style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333',}}>
                        <Text style={{color:'#fff'}}>下拉刷新</Text>
                    </View>
                )
            case refresh_idle:
                return (
                    <View
                        style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333',}}>
                        <Text style={{color:'#fff'}}>下拉刷新</Text>
                    </View>
                )
            case will_refresh:
                return (
                    <View
                        style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333',}}>
                        <Text style={{color:'#fff'}}>释放刷新</Text>
                    </View>
                )
            case refreshing:
                return (
                    <View style={{
                        flexDirection: 'row',
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#333',
                    }}>
                        {this._renderActivityIndicator()}<Text style={{color:'#fff'}}>刷新中</Text>
                    </View>
                )
        }
    }

    _renderFooter = (viewState) => {
        let {pullState, pullDistancePercent} = viewState
        let {load_more_none, load_more_idle, will_load_more, loading_more, loaded_all,} = PullToRefreshListView.constants.viewState
        pullDistancePercent = Math.round(pullDistancePercent * 100)
        switch (pullState) {
            case load_more_none:
                return (
                    <View
                        style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333',}}>
                        <Text style={{color:'#fff'}}>上拉加载更多</Text>
                    </View>
                )
            case load_more_idle:
                return (
                    <View
                        style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333',}}>
                        <Text style={{color:'#fff'}}>上拉加载更多</Text>
                    </View>
                )
            case will_load_more:
                return (
                    <View
                        style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333',}}>
                        <Text style={{color:'#fff'}}>释放加载更多</Text>
                    </View>
                )
            case loading_more:
                return (
                    <View style={{
                        flexDirection: 'row',
                        height: 35,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: '#333',
                    }}>
                        {this._renderActivityIndicator()}<Text style={{color:'#fff'}}>加载中</Text>
                    </View>
                )
            case loaded_all:
                return (
                    <View
                        style={{height: 35, justifyContent: 'center', alignItems: 'center', backgroundColor: '#333',}}>
                        <Text style={{color:'#fff'}}>没有更多了</Text>
                    </View>
                )
        }
    }

    _renderActivityIndicator() {
        return ActivityIndicator ? (
            <ActivityIndicator
                style={{marginRight: 10,}}
                animating={true}
                color={'#fff'}
                size={'small'}/>
        ) : Platform.OS == 'android' ?
            (
                <ProgressBarAndroid
                    style={{marginRight: 10,}}
                    color={'#fff'}
                    styleAttr={'Small'}/>

            ) : (
                <ActivityIndicatorIOS
                    style={{marginRight: 10,}}
                    animating={true}
                    color={'#fff'}
                    size={'small'}/>
            )
    }


}
