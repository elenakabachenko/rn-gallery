import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import ListDemo from './components/List';
import ImageViewer from './components/ImageViewer';

const MainNavigator = createStackNavigator({
  List: {screen: ListDemo},
  ImageViewer: {screen: ImageViewer},
});

export default createAppContainer(MainNavigator);
