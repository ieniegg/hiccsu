import HttpUtils from './HttpUtils'
import Storage from  './Storage'
import DeviceInfo from 'react-native-device-info'

export default class SyncUtils {

    //同步课程
    static syncCourse(force: boolean) {
        return new Promise((resolve, reject) => {
            HttpUtils.postJson('api/app/user/course/sync', {
                force: force
            }).then(res => {
                if (res.status === 10000 && res.course.length > 0) {
                    Storage.save({key: 'course', data: res.course})
                    resolve(res.course)
                } else {
                    reject(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }

    static syncConfig() {
        return new Promise((resolve, reject) => {
            HttpUtils.get('api/app/config/sync').then(res => {
                if (res.status === 10000) {
                    Storage.save({key: 'config', data: res.config})
                    resolve(res.config)
                } else {
                    reject(res)
                }
            }).catch(err => {
                reject(err)
            })
        })
    }


    //同步用户
    static syncUser() {
        return new Promise((resolve, reject) => {
            Storage.load({
                key: 'session',
            }).then(session => {
                HttpUtils.postJson('api/app/user/sync', {
                    session: session,
                    device: DeviceInfo.getUniqueID()
                }).then(res => {
                    if (res.status === 10000) {
                        Storage.save({key: 'session', data: res.session})
                        Storage.save({key: 'user', data: res.userinfo}).then(() => {
                            resolve(true, res.userinfo)
                        })
                    } else {
                        Storage.remove({
                            key: 'user'
                        }).then(() => {
                            resolve(false, null)
                        })
                    }
                }).catch(err => {
                    Storage.remove({
                        key: 'user'
                    })
                    resolve(false, null)
                })
            }).catch(err => {
                resolve(false, null)
            })

        })
    }
}
