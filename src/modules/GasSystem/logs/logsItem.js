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
    const {  item,type} = this.props;
    // console.log('halooo',item)
    return (
      <Card containerStyle={styles.container}>
        <View>
        {type === 'Gas Status Logs' ? (
          <>
          <View style={styles.inlineList}>
            <Text style={styles.text}>Gas Status: </Text>
            <Text>{item.gas}</Text>
            </View>
            <View style={styles.inlineList}>
            <Text style={styles.text}>Time: </Text>
            <Text>{item.created}</Text>
            </View>
            </>
            
            ) : type === 'Alarm Logs'  ? (
              <>
              <View style={styles.inlineList}>
              <Text style={styles.text}> Alarm Status:</Text>
              <Text>{item.alarm}</Text>
              </View>
               <View style={styles.inlineList}>
              <Text style={styles.text}>Time: </Text>
              <Text>{item.created}</Text>
              </View>
              </>
             )
              :(null)}
            
        </View>
      </Card>
    );
  }
}
export default Item;

const styles = StyleSheet.create({

  container:{
    backgroundColor:"#fff",
    borderRadius:6,
  },
  inlineList:{
    flexDirection:'row'
  },
  text:{ fontWeight: 'bold', color: '#114EC0',marginBottom:6 },


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
 
  greenText:{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold' }
});



