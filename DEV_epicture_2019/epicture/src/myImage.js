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

const MyImage = props => {
  const [ups, setUps] = useState();
  const [downs, setDowns] = useState();
  const [url, setUrl] = useState();
  const [title, setTitle] = useState();
  const [views, setViews] = useState();
  const [commentCount, setCommentCount] = useState();
  const [height, setHeight] = useState();
  const [width, setWidth] = useState();

  useEffect(() => {
    setUps(props.item.ups);
    setDowns(props.item.downs);
    setTitle(props.item.title);
    setViews(props.item.views);
    setCommentCount(props.item.comment_count);
    if (!props.item.images) {
      setUrl(props.item.link);
      setHeight(props.item.height);
      setWidth(props.item.width);
    } else if (
      props.item.images[0].type.includes('jpeg') ||
      props.item.images[0].type.includes('png')
    ) {
      setUrl(props.item.images[0].link);
      setHeight(props.item.images[0].height);
      setWidth(props.item.images[0].width);
    } else {
      setUrl('empty');
    }
  }, [props]);

  const onUpButton = (token, item) => {
    let image_id = '';
    if (item.is_album == true) {
      image_id = item.images[0].id;
    } else {
      image_id = item.id;
    }
    console.log('up', token);
    api_functions
      .voteImage(token, image_id, 'up')
      .then(res => {
        setUps(ups + 1);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onDownButton = (token, item) => {
    let image_id = '';
    if (item.is_album == true) {
      image_id = item.images[0].id;
    } else {
      image_id = item.id;
    }
    console.log('up', token);
    api_functions
      .voteImage(token, image_id, 'down')
      .then(res => {
        setDowns(downs + 1);
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (url != 'empty' && height != null && width != null) {
    const card = {card: {marginBottom: 20}};
    return (
      <View style={styles.container}>
        <Card styles={card}>
          <CardImage>
            <Image
              style={{width: 350, height: (height * 350) / width}}
              source={{uri: url}}
            />
          </CardImage>
          <CardTitle>
            <Text style={styles.title}>{title}</Text>
          </CardTitle>
          <View style={styles.containerCard}>
            <CardContent>
              <View style={styles.cardContent}>
                <TouchableOpacity
                  onPress={() =>
                    onUpButton(props.appProps.accessToken, props.item)
                  }>
                  <Icon
                    name="thumbs-up"
                    color="green"
                    size={30}
                    style={styles.upLogo}
                  />
                  <Text style={styles.up}>{ups}</Text>
                </TouchableOpacity>
              </View>
            </CardContent>
            <CardContent>
              <View style={styles.cardContent}>
                <TouchableOpacity
                  onPress={() =>
                    onDownButton(props.appProps.accessToken, props.item)
                  }>
                  <Icon
                    name="thumbs-down"
                    color="red"
                    size={30}
                    style={styles.upLogo}
                  />
                  <Text style={styles.up}>{downs}</Text>
                </TouchableOpacity>
              </View>
            </CardContent>
            <CardContent>
              <View style={styles.cardContent}>
                <Icon
                  name="message-circle"
                  color="black"
                  size={30}
                  style={styles.upLogo}
                />
                <Text style={styles.up}>{commentCount}</Text>
              </View>
            </CardContent>
            <CardContent>
              <View style={styles.cardContent}>
                <Icon
                  name="eye"
                  color="black"
                  size={30}
                  style={styles.upLogo}
                />
                <Text style={styles.up}>{views}</Text>
              </View>
            </CardContent>
          </View>
        </Card>
      </View>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
  },
  image_bloc: {
    height: 'auto',
    width: 360,
  },
  title: {
    fontWeight: 'bold',
  },
  containerCard: {
    flexDirection: 'row',
  },
  upLogo: {
    paddingLeft: 8,
    paddingRight: 8,
    textAlign: 'center',
    justifyContent: 'center',
  },
  up: {
    marginTop: 7,
    fontWeight: 'bold',
    textAlign: 'center',
    justifyContent: 'center',
  },
  cardContent: {
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
  },
  card: {
    borderWidth: 1,
    borderColor: 'black',
    borderStyle: 'solid',
  },
});

export default MyImage;
