/**
 * Created by lizekun on 2017/3/29.
 */
import Storage from 'react-native-storage';
import {AsyncStorage} from 'react-native';

export default new Storage({
    size: 1000,
    storageBackend: AsyncStorage,
    defaultExpires: null,
    enableCache: true
})