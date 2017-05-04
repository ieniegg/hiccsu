import { Navigation } from 'react-native-navigation';

import Home from '../pages/home';
import Query from '../pages/query';
import User from '../pages/user';
import Login from '../pages/login'

export function registerScreens() {
    Navigation.registerComponent('homeTabScreen', () => Home);
    Navigation.registerComponent('queryTabScreen', () => Query);
    Navigation.registerComponent('userTabScreen', () => User);
    Navigation.registerComponent('loginScreen', () => Login);
}