/* eslint-disable camelcase */
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Card } from 'react-native-elements';
import { colors, fonts } from '../../../styles';

const Item =(props)=>{
  const { created_at, messagedata, title,duration } = props;

  return (
    <View style={styles.container}>
      <Card containerStyle={styles.cardMainContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>{title}: </Text>
          <Text style={styles.valueText}>{messagedata}</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title}>Duration: </Text>
          <Text style={styles.valueText}>{duration}</Text>
        </View>

        <View style={{ flexDirection: 'row' }}>
          <Text style={styles.title} numberOfLines={1}>
            At:{' '}
          </Text>
          <Text style={[styles.dates]} numberOfLines={1}>
            {created_at}
          </Text>
        </View>
      </Card>
    </View>
  );
}

export default Item;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    paddingVertical: 10,
  },
  cardMainContainer: {
    padding: 8,
    paddingLeft: 20,
    borderRadius: 10,
    marginVertical: hp('-1.3%'),
    marginHorizontal: wp('3%'),
    backgroundColor: colors.white,
    borderColor: colors.white,
    elevation: 5,
    shadowColor: colors.background,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.8%'),
    color: colors.gray,
    fontWeight: 'bold',
  },
  valueText: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.8%'),
    color: '#617ae1',
  },
  dates: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.5%'),
    color: colors.lightGray,
    marginTop: 2.4,
  },
});
