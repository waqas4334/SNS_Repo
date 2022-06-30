import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  AppState,
  Alert
} from 'react-native';

import { fonts, colors } from '../../styles';
import { Button } from '../../components';


export default class ShareScreen extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <View style={styles.container}>
        <Text>No Content for Share</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    alignItems: 'center'
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 20,
  }, 
  itemThreeContainer: {
    backgroundColor: colors.backgroundLight,
    padding: 10,
    borderRadius: 10,
    shadowColor: colors.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3.5,
    marginVertical: 8,
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
    borderRadius: 10,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: colors.white,
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: colors.primary,
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  dropdown: {
    marginTop: 13,
    marginBottom: 5,
  }

});
