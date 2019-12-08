import React from 'react';
import {
  SafeAreaView,
  View,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  CLIENT_ID,
  URL
} from '../actions/types';
import {connect} from 'react-redux';
import {itemsFetchData, fetchingItemsFromServer,installOffset} from '../actions/index';
import Row from './Row';

class ListDemo extends React.Component {
  static navigationOptions = {
    title: 'List of photos',
  };
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchData(`${URL}/?client_id=${CLIENT_ID}&page=${this.props.offset}`);
    this.props.installOffset(this.props.offset);

  }

  loadMoreData = () => {
    this.props.isFetchingProcess(true);
    this.props.fetchData(`${URL}/?client_id=${CLIENT_ID}&page=${this.props.offset}`);
    this.props.installOffset(this.props.offset);
    this.props.isFetchingProcess(false);
  }

  renderSeparator = () => {
    return (
      <View style={styles.separator}/>
    );
  };
  renderFooter() {
    return (
      //Footer View with Load More button
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={this.loadMoreData}
          //On Click of button calling loadMoreData function to load more data
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {this.props.isFetching ? (
            <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  }
/*  renderFooter = () => {
    if (!this.props.isLoading) {
      return null;
    }
    return (
      <View style={styles.footer}>
        <ActivityIndicator animating size="large"/>
      </View>
    );
  };*/
  render() {
    const {navigate} = this.props.navigation;
    if (this.props.isFailed) {
      return (
        <View style={styles.errorContainer}>
          <Text style={styles.errorMessage}>
            Sorry! There was an error loading the items
          </Text>
        </View>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.props.items}
          renderItem={({item}) => <Row data={item} navigate={navigate}/>}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={this.renderSeparator}
          ListFooterComponent={this.renderFooter.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    items: state.gallery.items,
    isFailed: state.gallery.isFailed,
    isLoading: state.gallery.isLoading,
    isFetching: state.gallery.isFetching,
    offset: state.gallery.offset,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: url => dispatch(itemsFetchData(url)),
    isFetchingProcess:(value) => dispatch(fetchingItemsFromServer(value)),
    installOffset:(offset) => dispatch(installOffset(offset)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
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
