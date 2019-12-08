import React from 'react';
import {StyleSheet} from 'react-native';
import {Provider} from 'react-redux';
import configureStore from './src/store/configureStore';
import Router from './src/Router';
/*import ListDemo from './src/components/List';
import ImageViewer from './src/components/ImageViewer';*/

const store = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
      </Provider>
    );
  }
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
