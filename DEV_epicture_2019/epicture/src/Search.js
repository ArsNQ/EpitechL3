import React, {useState} from 'react';
import MyHeader from './MyHeader';
import {SearchBar} from 'react-native-elements';

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import api_functions from './api_functions';
import MyImage from './myImage';
import {Navigation} from 'react-native-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

const Search = props => {
  const [search, setSearch] = useState('');
  const [data, setData] = useState();

  const updateSearch = query => {
    setSearch(query);
  };

  const goSearch = () => {
    if (search.length > 0) {
      console.log('search', search);
      api_functions.search({query: search, page: 0}).then(res => {
        setData(res.data.data);
        Navigation.showModal({
          stack: {
            children: [
              {
                component: {
                  name: 'SearchResult',
                  passProps: {
                    data: res.data.data,
                  },
                  options: {topBar: {visible: false, height: 0}},
                },
              },
            ],
          },
        });
        console.log('data', data);
      });
    } else {
      console.log('Empty search');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <MyHeader />
      <Text style={styles.bigTitle}>make the search in</Text>
      <Text style={styles.secondTitle}>the bar bellow</Text>
      <View style={{marginRight: 120}}>
        <View
          style={{
            position: 'relative',
            marginLeft: '10%',
            marginTop: 25,
            height: 100,
            width: 325,
            backgroundColor: '#ff0000',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              position: 'absolute',
              height: 85,
              width: 310,
              backgroundColor: '#fff',
            }}
          />
          <View
            style={{
              position: 'absolute',
              height: 80,
              width: 300,
              top: 0,
              right: 0,
              backgroundColor: '#fff',
            }}
          />
          <View
            style={{
              position: 'absolute',
              height: 80,
              width: 300,
              bottom: 0,
              left: 0,
              backgroundColor: '#fff',
            }}
          />
          <SearchBar
            placeholder="Search Here..."
            platform={'android'}
            lightTheme={true}
            onTextChange={query => setSearch(query)}
            value={search}
            searchIcon={null}
            onChangeText={value => {
              setSearch(value);
            }}
          />
        </View>

        <TouchableOpacity onPress={() => goSearch()}>
          <Icon name="search" color="white" size={35} style={styles.upLogo} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  upLogo: {
    backgroundColor: '#000000',
    justifyContent: 'center',
    paddingTop: 6,
    borderRadius: 10,
    marginLeft: 125,
    textAlign: 'center',
    marginTop: 10,
    height: 50,
    width: 120,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  bigTitle: {
    marginTop: 75,
    fontSize: 21,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  secondTitle: {
    marginBottom: 20,
    fontSize: 21,
    color: '#FF0000',
    textAlign: 'center',
  },
});

export default Search;
