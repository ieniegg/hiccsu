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
                if (res.status === 10000) {
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
                            resolve(true)
                        })
                    } else {
                        Storage.remove({
                            key: 'user'
                        }).then(() => {
                            resolve(false)
                        })
                    }
                }).catch(err => {
                    Storage.remove({
                        key: 'user'
                    })
                    resolve(false)
                })
            }).catch(err => {
                resolve(false)
            })

        })
    }
}
