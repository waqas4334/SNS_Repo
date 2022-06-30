/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, fonts } from '../../../styles';

class Item extends React.Component {

  render() {
    const { message, date } = this.props;

    return (
      <View
        style={styles.itemThreeContainer}
      >
        <View style={styles.itemThreeSubContainer}>
          <View style={styles.itemThreeContent}>
            <View>
              <Text style={styles.itemThreeSubtitle} numberOfLines={2}>
                {message}
              </Text>
              <Text style={styles.itemThreeSubtitle} numberOfLines={1}>
                {date}
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default Item;

const styles = StyleSheet.create({
  itemThreeContainer: {
    padding: 10,
    borderRadius: 10,
    shadowColor: colors.background,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginVertical: 8,
    marginHorizontal: 8,
    backgroundColor: '#115293',
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
    paddingVertical: 3,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#e3e3e3',
  },
});
