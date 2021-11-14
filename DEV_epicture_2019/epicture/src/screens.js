import {Navigation} from 'react-native-navigation';
import Login from './Login';
import Home from './Home';
import Feed from './Feed';
import Search from './Search';
import Profile from './Profile';
import Upload from './Upload';
import Auth from './Auth';
import ProfileImages from './ProfileImages';
import SearchResult from './SearchResult';

export function registerScreens() {
  Navigation.registerComponent('Login', () => Login);
  Navigation.registerComponent('Feed', () => Feed);
  Navigation.registerComponent('Search', () => Search);
  Navigation.registerComponent('Home', () => Home);
  Navigation.registerComponent('Profile', () => Profile);
  Navigation.registerComponent('Upload', () => Upload);
  Navigation.registerComponent('Auth', () => Auth);
  Navigation.registerComponent('ProfileImages', () => ProfileImages);
  Navigation.registerComponent('SearchResult', () => SearchResult);
}
