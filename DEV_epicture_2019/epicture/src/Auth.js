import React, {useState} from 'react';
import {Text} from 'react-native';
import {WebView} from 'react-native-webview';
import {Navigation} from 'react-native-navigation';

const Auth = () => {
  const uri =
    'https://api.imgur.com/oauth2/authorize?client_id=49f02dc10a47476&response_type=token';
  const [show, setShow] = useState(true);

  const parse_query_string = query => {
    let vars = query.split('&');
    let query_string = {};
    query_string.accessToken = vars[0]
      .split('#')[1]
      .substring(13, vars[0].length);
    for (let i = 1; i < vars.length; i++) {
      let pair = vars[i].split('=');
      let key = decodeURIComponent(pair[0]);
      let value = decodeURIComponent(pair[1]);
      if (typeof query_string[key] === 'undefined') {
        query_string[key] = decodeURIComponent(value);
      } else if (typeof query_string[key] === 'string') {
        let arr = [query_string[key], decodeURIComponent(value)];
        query_string[key] = arr;
      } else {
        query_string[key].push(decodeURIComponent(value));
      }
    }
    return query_string;
  };

  const _onNavigationStateChange = webViewState => {
    if (
      webViewState.url.includes('https://m.imgur.com/#access_token=') === true
    ) {
      setShow(false);
      let infos = parse_query_string(webViewState.url);
      Navigation.setRoot({
        root: {
          bottomTabs: {
            id: 'BottomTabsId',
            children: [
              {
                component: {
                  name: 'Home',
                  passProps: infos,
                  options: {
                    bottomTab: {
                      text: 'Home',
                      icon: require('../images/home.png'),
                    },
                  },
                },
              },
              {
                component: {
                  name: 'Search',
                  passProps: infos,
                  options: {
                    bottomTab: {
                      text: 'Search',
                      icon: require('../images/search.png'),
                    },
                  },
                },
              },
              {
                component: {
                  name: 'Profile',
                  passProps: infos,
                  options: {
                    bottomTab: {
                      text: 'Profile',
                      icon: require('../images/profile.png'),
                    },
                  },
                },
              },
              {
                component: {
                  name: 'Upload',
                  passProps: infos,
                  options: {
                    bottomTab: {
                      text: 'Upload',
                      icon: require('../images/upload.png'),
                    },
                  },
                },
              },
            ],
            options: {
              bottomTabs: {
                activeTintColor: 'red',
                backgroundColor: '#FFFFFF',
                borderTopWidth: 0,
                shadowOffset: {width: 5, height: 3},
                shadowColor: 'black',
                shadowOpacity: 0.5,
                elevation: 5,
              },
            },
          },
        },
      });
      console.log(infos);
    }
  };

  if (show === true) {
    return (
      <WebView
        source={{uri: uri}}
        onNavigationStateChange={_onNavigationStateChange.bind(this)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        incognito={false}
        startInLoadingState={false}
      />
    );
  } else {
    return <Text>LOGGED</Text>;
  }
};

export default Auth;
