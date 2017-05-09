import Storage from  './Storage'
import SyncUtils from './SyncUtils'
export default class ConfigUtils{
    static getConfig(){
        return new Promise((resolve,reject)=>{
            Storage.load({key:'config'}).then(res=>{
                resolve(res)
            }).catch(
                SyncUtils.syncConfig().then(res=>{
                    resolve(res)
                }).catch(err=>{
                    reject(err)
                })
            )
        })
    }
}