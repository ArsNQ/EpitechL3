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

const ProfileImages = props => {
  const [images, setImages] = useState();

  const back = () => {
    Navigation.dismissAllModals();
  };

  useEffect(() => {
    fetch(
      `https://api.imgur.com/3/account/${props.props.account_username}/images`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${props.props.accessToken}`,
        },
      },
    )
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson.data);
        setImages(responseJson.data);
      })
      .catch(error => {
        console.error(error);
      });
  });

  console.log('profileimages props', props);
  const card = {card: {marginBottom: 20}};
  return (
    <SafeAreaView style={styles.container}>
      <MyHeader />
      <FlatList
        data={images}
        renderItem={({item, index, separators}) => (
          <View>
            <Card styles={card}>
              <CardImage>
                <Image
                  style={{
                    width: 350,
                    height: (item.height * 350) / item.width,
                  }}
                  source={{uri: item.link}}
                />
              </CardImage>
              <CardTitle>
                <Text style={styles.title}>{item.title}</Text>
              </CardTitle>
            </Card>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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

export default ProfileImages;
