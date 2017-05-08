import { Navigation } from 'react-native-navigation';

import Home from '../pages/home';
import Query from '../pages/query';
import User from '../pages/user';
import UserConfig from '../pages/user/config'
import Student from '../pages/user/campus/student'
import Login from '../pages/login'
import Loading from '../common/loading'

export function registerScreens() {
    Navigation.registerComponent('homeTabScreen', () => Home)
    Navigation.registerComponent('queryTabScreen', () => Query)
    Navigation.registerComponent('userTabScreen', () => User)
    Navigation.registerComponent('UserConfigScreen', () => UserConfig)
    Navigation.registerComponent('studentScreen', () => Student)
    Navigation.registerComponent('loginScreen', () => Login)
    Navigation.registerComponent('loadingModal', () => Loading)

}