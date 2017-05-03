import { Navigation } from 'react-native-navigation';

import Home from '../pages/home';
import Query from '../pages/query';
import User from '../pages/user';

export function registerScreens() {
    Navigation.registerComponent('homeTabScreen', () => Home);
    Navigation.registerComponent('queryTabScreen', () => Query);
    Navigation.registerComponent('userTabScreen', () => User);
}