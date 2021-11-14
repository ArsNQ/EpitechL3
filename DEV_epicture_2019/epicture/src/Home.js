import React, {Component} from 'react';
import MyHeader from './MyHeader';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TextInput,
  Image,
  Button,
  Item,
  View,
  Text,
  FlatList,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import api_functions from './api_functions';
import Icon from 'react-native-vector-icons/Feather';
import IconSec from 'react-native-vector-icons/MaterialCommunityIcons';
import MyImage from './myImage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gallery: [],
    };
    this.filter = 'hot';
  }

  componentDidMount() {
    api_functions
      .getGallery(this.filter)
      .then(res => {
        this.setState({gallery: res.data.data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  changeFilter(filter) {
    this.filter = filter;
    api_functions
      .getGallery(this.filter)
      .then(res => {
        this.setState({gallery: res.data.data});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    console.log('props = ', this.props);
    const {gallery} = this.state;
    console.log('gallery.lenght', gallery.length);
    if (gallery.length > 0) {
      console.log(gallery);
      gallery.forEach(elem => {
        if (!elem.images) {
          console.log(elem);
        }
      });
      return (
        <SafeAreaView style={styles.container}>
          <MyHeader />
          <View style={styles.HeadSec}>
            <TouchableOpacity
              onPress={() => this.changeFilter('hot')}
              style={styles.HotCont}>
              <IconSec
                name="fire"
                color="#FF0000"
                size={40}
                style={styles.upLogo}
              />
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  marginTop: 8,
                  marginLeft: 10,
                  fontSize: 20,
                }}>
                HOT
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.changeFilter('top')}
              style={styles.TopCont}>
              <Text
                style={{
                  fontWeight: 'bold',
                  color: 'black',
                  marginTop: 8,
                  marginRight: 10,
                  fontSize: 20,
                }}>
                TOP
              </Text>
              <Icon
                name="trending-up"
                color="#167bee"
                size={40}
                style={styles.upLogo}
              />
            </TouchableOpacity>
          </View>
          <FlatList
            data={gallery}
            renderItem={({item, index, separators}) => (
              <View>
                <MyImage item={item} appProps={this.props} />
              </View>
            )}
          />
        </SafeAreaView>
      );
    } else {
      return <Text>Loading</Text>;
    }
  }
}

const styles = StyleSheet.create({
  HeadSec: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  HotCont: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
  },
  TopCont: {
    flexDirection: 'row',
    paddingLeft: 30,
    paddingRight: 30,
  },
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  bigTitle: {
    fontSize: 30,
  },
  image: {
    height: 200,
    width: 360,
  },
});

export default Home;
