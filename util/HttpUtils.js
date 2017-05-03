/**
 * Created by lizekun on 2017/3/29.
 */
export default class HttpUtils {



    static get(url) {
        return new Promise((resolve, reject) => {
            fetch('https://hi.diccsu.com/'+url, {
                credentials: 'include',
            })
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

    static postJson(url, data) {
        return new Promise((resolve, reject) => {
            fetch('https://hi.diccsu.com/'+url, {
                credentials: 'include',
                method: 'POST',
                header: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(response => response.json())
                .then(result => {
                    resolve(result);
                })
                .catch(error => {
                    reject(error);
                })
        })
    }

}