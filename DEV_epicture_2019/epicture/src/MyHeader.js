import React from 'react';
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

const MyHeader = props => {
  return (
    <View style={styles.epictureHeader}>
      <Image
        style={styles.epictureIMG}
        source={require('../images/epicture.png')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  epictureHeader: {
    width: '60%',
    height: '13%',
    alignSelf: 'center',
  },
  epictureIMG: {
    width: '100%',
    height: '100%',
  },
});

export default MyHeader;
