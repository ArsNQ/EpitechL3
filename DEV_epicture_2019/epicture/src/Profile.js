import React, {useState, Component} from 'react';
import MyHeader from './MyHeader';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  View,
  Header,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import api_functions from './api_functions';
import Icon from 'react-native-vector-icons/Entypo';
import {Navigation} from 'react-native-navigation';

function convertTimeStamp(timeStamp) {
  var a = new Date(timeStamp * 1000);
  var months = [
    'January',
    'Febuary',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time = date + ' ' + month + ' ' + year;
  return time;
}

class Profile extends Component {
  cover = '';
  constructor(props) {
    super(props);
    this.state = {
      cover: 'cover',
      avatar: 'avatar',
      bio: 'bio',
      created: 'created',
      notoriety: 'notoriety',
    };
  }

  seeMyImages() {
    console.log('seeMyImages' + this.props.componentId);
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: 'ProfileImages',
              passProps: {
                props: this.props,
              },
              options: {topBar: {visible: false, height: 0}},
            },
          },
        ],
      },
    });
  }

  componentDidMount() {
    console.log('profile props' + this.props);
    api_functions
      .getProfile(this.props.account_username)
      .then(res => {
        console.log(res.data.data);
        console.log('cover', res.data.data.cover);
        this.setState({cover: res.data.data.cover});
        this.setState({avatar: res.data.data.avatar});
        this.setState({bio: res.data.data.bio});
        this.setState({created: convertTimeStamp(res.data.data.created)});
        this.setState({notoriety: res.data.data.reputation_name});
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    const {cover} = this.state;
    const {avatar} = this.state;
    const {bio} = this.state;
    const {created} = this.state;
    const {notoriety} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <MyHeader />
        <Image style={styles.stretch} source={{uri: cover}} />
        <View style={styles.avatarContainer}>
          <Image style={styles.avatar} source={{uri: avatar}} />
        </View>
        <ScrollView style={styles.scroll}>
          <Text style={styles.bigTitle}>{this.props.account_username}</Text>
          <Text style={styles.bio}>{bio}</Text>
          <Text style={styles.member}>Member since </Text>
          <Text style={styles.created}>{created}</Text>
          <Text style={styles.Notoriety}>Notoriety </Text>
          <Text style={styles.neutral}>{notoriety}</Text>
          <TouchableOpacity
            onPress={() => this.seeMyImages()}
            style={styles.myImages}>
            <Icon name="images" color="red" size={30} />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  bigTitle: {
    fontSize: 30,
    top: 50,
    marginLeft: '15%',
    marginTop: '8%',
    fontWeight: 'bold',
    color: '#FF0000',
  },
  stretch: {
    top: 0,
    width: '100%',
    height: 170,
    resizeMode: 'stretch',
  },
  avatarContainer: {
    top: 190,
    borderRadius: 60,
    left: '33%',
    position: 'absolute',
    shadowColor: '#0000',
    shadowOffset: {
      width: 6,
      height: 12,
    },
    shadowOpacity: 0.78,
    shadowRadius: 16.0,
    elevation: 24,
  },
  avatar: {
    width: 125,
    height: 125,
    borderRadius: 75,
  },
  secondTitle: {
    fontSize: 20,
    top: 140,
    left: 20,
    textDecorationLine: 'underline',
  },
  bio: {
    top: 60,
    fontSize: 15,
    fontStyle: 'italic',
    marginLeft: '15%',
    marginRight: '15%',
  },
  created: {
    top: 80,
    fontSize: 20,
    marginLeft: '15%',
  },
  member: {
    top: 75,
    fontSize: 20,
    color: '#FF0000',
    fontWeight: 'bold',
    marginLeft: '15%',
  },
  Notoriety: {
    top: 90,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF0000',
    marginLeft: '15%',
  },
  neutral: {
    top: 95,
    fontSize: 20,
    marginLeft: '15%',
  },
  myImages: {
    top: 105,
    fontSize: 20,
    marginLeft: '15%',
    marginBottom: 150
  },
});

export default Profile;
