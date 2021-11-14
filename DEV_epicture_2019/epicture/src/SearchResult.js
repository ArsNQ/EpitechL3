import React, {useState, useEffect} from 'react';
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
import AutoHeightImage from 'react-native-auto-height-image';
import {
  Card,
  CardImage,
  CardTitle,
  CardContent,
  CardAction,
} from 'react-native-card-view';
import api_functions from './api_functions';
import Icon from 'react-native-vector-icons/Feather';
import MyHeader from './MyHeader';
import {Navigation} from 'react-native-navigation';
import MyImage from './myImage';

const SearchResult = props => {
  console.log('prpprpr', props);
  const back = () => {
    Navigation.dismissAllModals();
  };

  const card = {card: {marginBottom: 20}};
  return (
    <SafeAreaView style={styles.container}>
      <MyHeader />
      <TouchableOpacity onPress={() => back()}>
        <Text style={styles.upLogo}>NEW SEARCH</Text>
      </TouchableOpacity>
      <FlatList
        data={props.data}
        renderItem={({item, index, separators}) => (
          <View>
            <MyImage item={item} appProps={props} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({

  upLogo: {
    backgroundColor: '#000000',
    color: 'white',
    borderRadius: 10,
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 102,
    textAlign: 'center',
    paddingTop: 7,
    height: 40,
    width: 150,
    marginBottom: 15,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  back: {
    top: 105,
    left: 50,
    bottom: 50,
    fontSize: 20,
    marginLeft: '15%',
  },
  image_bloc: {
    height: 'auto',
    width: 360,
  },
  title: {
    fontWeight: 'bold',
  },
  up: {
    color: 'black',
    marginTop: 15,
  },
  cardContent: {
    flexDirection: 'row',
    marginTop: -30,
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
});

export default SearchResult;
