import React from 'react';
import {View, Text, StyleSheet, Image, TouchableHighlight} from 'react-native';

const Row = props => (
  <TouchableHighlight
    onPress={() =>
      props.navigate('ImageViewer', {
        remote: props.data.urls.regular,
      })
    }>
    {props.data.urls && (
      <View style={styles.container}>
        <Image source={{uri: props.data.urls.small}} style={styles.photo} />
        <Text style={styles.authorText}>{`Author: ${
          props.data.user.name
        }`}</Text>
      </View>
    )}
  </TouchableHighlight>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorText: {
    color: '#727882',
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 70,
    width: 70,
  },
});

export default Row;
