import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {fetchImages} from '../actions/images';
import Row from './Row';

class ListDemo extends React.Component {
  static navigationOptions = {
    title: 'List of images',
  };

  componentDidMount() {
    this.props.fetchImages();
  }

  renderFooter = () => {
    if (!this.props.isLoading) {
      return null;
    }
    return <ActivityIndicator style={{color: '#000'}} />;
  };

  loadMoreData = () => {
    const {
      fetchImages,
      isLoading,
      meta: {page},
    } = this.props;

    if (!isLoading) {
      fetchImages(page + 1);
    }
  };

  renderSeparator = () => {
    return <View style={styles.separator} />;
  };

  render() {
    const {navigation, isLoading, data} = this.props;
    const {navigate} = navigation;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          refreshing={isLoading}
          data={data}
          renderItem={({item}) => <Row data={item} navigate={navigate} />}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          onEndReached={this.loadMoreData}
          onEndReachedThreshold={1}
          ListFooterComponent={this.renderFooter}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = ({images: {data, isLoading, meta}}) => ({
  data,
  isLoading,
  meta,
});

export default connect(
  mapStateToProps,
  {fetchImages},
)(ListDemo);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  errorContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorMessage: {
    fontSize: 50,
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#CED0CE',
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#266c80',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});
