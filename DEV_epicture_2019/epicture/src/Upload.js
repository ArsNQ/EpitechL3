import React, { useState } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity, StyleSheet, Image, ScrollView, ImageBackground} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import api_functions from './api_functions';
import Icon from 'react-native-vector-icons/Entypo';
import ResponsiveImageView from 'react-native-responsive-image-view';
import MyHeader from './MyHeader';


const Button = (props) => {
    return (<TouchableOpacity onPress={props.onPress} style={{alignItems: 'center', justifyContent: 'center', ...props.style}}>
        <Icon name={props.icon} color={props.color} size={30} />
    </TouchableOpacity>)
}

const Upload = (props) => {
    const [image, setImage] = useState(null);
    const [sending, setSending] = useState(false);

    const sendImage = () => {
        if (image) {
            const data = {
                image: image.fileData,
                title: 'Upload from app'
            }
            console.log('api launched');
            setSending(true);
            api_functions.uploadImage(data, props.token).then((res) => {
                console.log(res);
                setSending(false);
            })
        }
    }

    const launchCamera = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchCamera(options, (response) => {
            if (response.didCancel)
                console.log('User cancelled image picker');
            else if (response.error)
                console.log('ImagePicker Error: ', response.error);
            else
                setImage({filePath: response, fileData: response.data, fileUri: response.uri });
        });
    }

    const launchImageLibrary = () => {
        let options = {
            storageOptions: {
                skipBackup: true,
                path: 'images',
            },
        };
        ImagePicker.launchImageLibrary(options, (response) => {
            if (response.didCancel)
                console.log('User cancelled image picker');
            else if (response.error)
                console.log('ImagePicker Error: ', response.error);
            else
                setImage({filePath: response, fileData: response.data, fileUri: response.uri });
        });

    }


    if (!image) {
        return (
            <View style={styles.container}>
                <MyHeader></MyHeader>
                <Text style={{textAlign: "center", marginTop: 75, fontSize: 21, fontWeight: 'bold'}}>Upload your image</Text>
                <Text style={{textAlign: "center", fontSize: 20}}>by clicking on the</Text>
                <Text style={{textAlign: "center", fontSize: 19, color: '#ff0000'}}>following buttons</Text>
                <View style={{ flexDirection: 'row'}}>
                    <View
                        style={{

                            position: 'relative',
                            marginLeft: '18%',
                            marginTop: 45,
                            width: 90,
                            height: 90,
                            backgroundColor: '#000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View style={{
                            position:'absolute',
                            height: 78,
                            width: 78,
                            backgroundColor: '#fff'
                        }} />
                        <View style={{
                            position:'absolute',
                            height: 65,
                            width: 65,
                            top: 0,
                            right: 0,
                            backgroundColor: '#fff'
                        }}  />
                        <View style={{
                            position:'absolute',
                            height: 65,
                            width: 65,
                            bottom: 0,
                            left: 0,
                            backgroundColor: '#fff'
                        }}  />
                        <Button icon="camera" onPress={() => launchCamera()} color='#ffffff' style={{width: 70, height: 70, color: '#fff', backgroundColor: '#FF0000'}} />
                    </View>
                    <View
                        style={{

                            position: 'relative',
                            marginLeft: '20%',
                            marginTop: 45,
                            width: 90,
                            height: 90,
                            backgroundColor: '#000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <View style={{
                            position:'absolute',
                            height: 78,
                            width: 78,
                            backgroundColor: '#fff'
                        }} />
                        <View style={{
                            position:'absolute',
                            height: 65,
                            width: 65,
                            bottom: 0,
                            right: 0,
                            backgroundColor: '#fff'
                        }}  />
                        <View style={{
                            position:'absolute',
                            height: 65,
                            width: 65,
                            top: 0,
                            left: 0,
                            backgroundColor: '#fff'
                        }}  />
                        <Button icon="image" onPress={() => launchImageLibrary()} color='#ffffff' style={{width: 70, height: 70, color: '#fff', backgroundColor: '#FF0000'}} />
                    </View>



                </View>
            </View>
        )
    } else if (sending) {
        return (
            <View>
                <Text>Loading...</Text>
                <Button icon="arrow-left" />
            </View>
        )
    }
    else {
        return (
            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.epictureHeader}>
                        <Image
                            style={styles.epictureIMG}
                            source={require('../images/epicture.png')}
                        />
                    </View>
                <Text style={{textAlign: "center", fontSize: 21, fontWeight: 'bold', marginTop: -30}}>Would you like to upload this photo?</Text>
                <Text style={{textAlign: "center", fontSize: 17,  marginTop: 5, fontStyle: 'italic'}}>click on the following button to go back</Text>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 16}}>
                    <Button icon="back" onPress={() => setImage(null)} color='#ffffff' style={{width: 120, height: 50, color: '#fff', backgroundColor: '#FF0000', borderRadius: 10,}} />
                </View>
                <View style={{ flexDirection: 'row'}}>
                </View>
                <View style={{marginTop: 18}}>
                    <ResponsiveImageView source={{uri: image.fileUri}} style={{...props.style}}>
                        {({ getViewProps, getImageProps }) => (
                            <View {...getViewProps()}>
                                <Image {...getImageProps()} />
                            </View>
                        )}
                    </ResponsiveImageView>
                    <View
                        style={{
                            position: 'relative',
                            top: 10,
                            width: 220,
                            height: 75,
                            backgroundColor: '#ff0000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginBottom: 170,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                        }}
                    >
                        <View style={{
                            position:'absolute',
                            height: 65,
                            width: 210,
                            backgroundColor: '#fff'
                        }} />
                        <View style={{
                            position:'absolute',
                            height: 40,
                            width: 180,
                            top: 0,
                            right: 0,
                            backgroundColor: '#fff'
                        }}  />
                        <View style={{
                            position:'absolute',
                            height: 40,
                            width: 180,
                            bottom: 0,
                            left: 0,
                            backgroundColor: '#fff'
                        }}  />
                        <Button icon="icloud" onPress={() => sendImage()} color='#ffffff' style={{width: 195, height: 50, color: '#fff', backgroundColor: '#000000'}} />
                    </View>
                </View>
                </View>
            </ScrollView>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1,
    },
    epictureHeader: {
        width: '60%',
        height: '13%',
        alignSelf: 'center',
    },
    epictureIMG: {
        width: '100%',
        marginTop: 5,
        height: '53%',
    },
    bigTitle: {
        fontSize: 30,
    },
});

export default Upload;