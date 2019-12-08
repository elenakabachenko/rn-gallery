import React from 'react';
import {ImageBackground, StyleSheet, View, Text} from 'react-native';

export default class ImageViewer extends React.Component {

  static navigationOptions = {
    title: 'Image',
  };

  render() {
    const {navigation} = this.props;
    const remote = navigation.getParam('remote', null);
    return (
      <ImageBackground
        style={styles.background}
        source={{uri: remote}}
      />
    );
  }
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#ccc',
    flex: 1,
    resizeMode: 'cover',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
});

