/* eslint-disable no-nested-ternary */
/* eslint-disable react/prefer-stateless-function */
/* eslint-disable camelcase */
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Divider } from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import { colors, fonts } from '../../../styles';

class Item extends React.Component {
  render() {

    const { status, start, end, duration, type ,temperature} = this.props;

    return (
      <View style={{ flex: 1, marginBottom: hp('2%') }}>
        <Card containerStyle={{
          width: wp('90%'), height: hp('15%'), borderTopLeftRadius: 25,
          borderBottomRightRadius: 25, elevation: 1,justifyContent:'center'
        }}
        >
          <View style={{ marginTop: hp('1%'), flexDirection: 'row' }}>
            {type === 'Temperature' ? (
              <Text style={styles.text}>Temperature: </Text>
            ) : type === 'Geyser Status' ||  type === 'Burner Status' ? (
               <Text style={styles.text}>Status: </Text>
            ):(null)}

            {type === 'Geyser Status'? (
              <>
                {status === 'ON' ? (
                  <Text style={styles.greenText}>ON</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>Off</Text>
              )}
              </>                 
            ):
            type === 'Burner Status'  ? (
              <>
                {status === 'ON' ? (
                  <Text style={styles.greenText}>ON</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>OFF</Text>
              )}
              </>                         
            ): (
              <Text style={{ marginLeft: wp('1%'), color: '#083194', fontWeight: 'bold', marginLeft: wp('3%') }}>{temperature}</Text>
            )}
            
          </View>

          <View style={{ flexDirection: 'row', marginTop: hp('0.5%') }}>
            {type === 'Temperature' || type === 'Geyser Status' || type === 'Burner Status'? (
              <Text style={{ marginLeft: wp('4%'), fontWeight: 'bold', color: '#114EC0' }}> Duration: </Text>
              ):(null)}
            <Text style={{ marginLeft: wp('1%'), color: '#000' }}>{duration}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: hp('0.5%') }}>
            {type === 'Temperature' || type === 'Geyser Status' || type === 'Burner Status'? (
              <Text style={{ marginLeft: wp('4%'), fontWeight: 'bold', color: '#114EC0' }}> Start: </Text>
              ):(null)}
            <Text style={{ marginLeft: wp('1%'), color: '#000' }}>{start}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: hp('0.5%') }}>
            {type === 'Temperature' || type === 'Geyser Status' || type === 'Burner Status'? (
              <Text style={{ marginLeft: wp('4%'), fontWeight: 'bold', color: '#114EC0' }}> End: </Text>
              ):(null)}
            <Text style={{ marginLeft: wp('1%'), color: '#000' }}>{end}</Text>
          </View>
        </Card>
      </View>
      // {/* </LinearGradient> */}


    );
  }
}
export default Item;

const styles = StyleSheet.create({
  itemThreeContainer: {
    backgroundColor: 'transparent',
    padding: wp('3%'),
    borderRadius: wp('2.5%'),
    // width:wp('100%'),
    // shadowColor: colors.background,
    shadowOffset: {
      width: wp('0%'),
      height: hp('1%'),
    },
    // shadowOpacity: 0.25,
    // shadowRadius: wp('10%'),
    // elevation: wp('1%'),
    // marginVertical: hp('0.5%'),
    // marginHorizontal:wp('2%'),
  },
  itemThreeSubContainer: {
    flexDirection: 'row',
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: wp('2%'),
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.8%'),
    color: '#000',
    marginLeft: wp('15%')
  },
  itemThreeSubtitle: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.5%'),
    color: colors.whiteOne,
    marginTop: hp(0.3)
  },
  title: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.8%'),
    color: '#000',

  },
  text:{ marginLeft: wp('4.5%'), fontWeight: 'bold', color: '#114EC0' },
  greenText:{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold' }
});



