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

    const { logs, updated_at, created_at, duration, type } = this.props;

    return (
      <View style={{ flex: 1, marginBottom: hp('2%') }}>
        <Card containerStyle={{
          width: wp('90%'), height: hp('15%'), borderTopLeftRadius: 25,
          borderBottomRightRadius: 25, elevation: 1,justifyContent:'center'
        }}
        >
          <View style={{ marginTop: hp('1%'), flexDirection: 'row' }}>
            {type === 'Fill Level Logs' ? (
              <Text style={styles.text}>FillLevel: </Text>
            ) : type === 'Tank Lid Status Logs' ||  type === 'Force Hydro Pump Status Logs'  || type === 'Hydro Pump Maintenance Logs' || type === 'Smoke Alarm Status Logs' ||
             type === 'Door Status Logs' || type === 'Filter Maintenance Logs' || type === 'Hydro Pump Status Logs' || type === 'Main Line Status Logs'  ? (
               <Text style={styles.text}>Status: </Text>
            ): type === 'TDS Value Logs' || type === 'PH Value Logs'   ?
            (
              <Text style={styles.text}>Value: </Text>
            ):type === 'Priming Logs' ? (
              <Text style={styles.text}>Priming: </Text>
            ):type === 'Priming Level Logs' ? (
              <Text style={styles.text}>Priming Level: </Text>
            ):type === 'Pump Vibration Logs' ? (
              <Text style={styles.text}>Pump Vibration: </Text>
            ):type ===  'Line Current Status Logs' ? (
              <Text style={styles.text}>Current: </Text>
            ): type === 'Abnormal Current Logs' ? (
              <Text style={styles.text}>Abnormal: </Text>
            ):
            (null)}

            {type === 'Tank Lid Status Logs' || type === 'Door Status Logs' ? (
              <>
                {logs === 1 ? (
                  <Text style={styles.greenText}>Open</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>Close</Text>
              )}
              </>              
            ):  
            type === 'Hydro Pump Status Logs'  || type === 'Force Hydro Pump Status Logs' ? (
              <>
                {logs === 1 ? (
                  <Text style={styles.greenText}>ON</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>OFF</Text>
              )}
              </>    
            ):
            type === 'Priming Logs'  ? (
              <>
                {logs === 1 ? (
                  <Text style={styles.greenText}>Valve Open</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>Valve Closed</Text>
              )}
              </>              
            ):
            type === 'Priming Level Logs'  ? (
              <>
                {logs === 1 ? (
                  <Text style={styles.greenText}>Filled</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>Un-Filled</Text>
              )}
              </>              
            ):
            type === 'Pump Vibration Logs' || type === 'Abnormal Current Logs' ? (
              <>
                {logs === 1 ? (
                  <Text style={styles.greenText}>Ab-Normal</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>Normal</Text>
              )}
              </>              
            ):
             type === 'Smoke Alarm Status Logs'    ? (
               <>
                 {logs === true ? (
                   <Text style={styles.greenText}>ON</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>OFF</Text>
              )}
               </>   
            ):
            type === 'Phase Logs'  || type === 'Main Line Status Logs' ? (
              <>
                {logs === true ? (
                  <Text style={styles.greenText}>Power Up</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') }}>Power Down</Text>
              )}
              </> 
            ): (
              <Text style={{ marginLeft: wp('1%'), color: '#083194', fontWeight: 'bold', marginLeft: wp('3%') }}>{logs}</Text>
            )}
            
          </View>

          <View style={{ flexDirection: 'row', marginTop: hp('0.5%') }}>
            {type === 'Filter Maintenance Logs' || type === 'Hydro Pump Maintenance Logs' ? (
              <Text style={styles.text}>Running Time: </Text>
            ) : (
              <Text style={{ marginLeft: wp('4%'), fontWeight: 'bold', color: '#114EC0' }}> Duration: </Text>
              )}
            <Text style={{ marginLeft: wp('1%'), color: '#000' }}>{duration}</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: hp('0.5%') }}>
            {type === 'Filter Maintenance Logs' || type === 'Hydro Pump Maintenance Logs' ? (
              <Text style={{ marginLeft: wp('4%'), fontWeight: 'bold', color: '#114EC0' }}> Performed At: </Text>
            ) : (
              <Text style={{ marginLeft: wp('4%'), fontWeight: 'bold', color: '#114EC0' }}> From: </Text>
              )}
            <Text style={{ marginLeft: wp('1%'), color: '#000' }}>{created_at}</Text>
          </View>

          {type === 'Filter Maintenance Logs' || type === 'Hydro Pump Maintenance Logs' ? (null) : (
            <View style={{ flexDirection: 'row' }}>
              <Text style={{ marginLeft: wp('4%'), fontWeight: 'bold', color: '#114EC0' }}> To: </Text>
              <Text style={{ marginLeft: wp('1%'), color: '#000' }}>{updated_at}</Text>
            </View>
          )}


          {/* <View style={{flexDirection:'row'}}>
              <Text style={{marginLeft:wp('4%'),fontWeight:'bold',color:'#114EC0'}}> Duration: </Text>
              {/* <Text style={{marginLeft:wp('1%'),color:'#000'}}>{duration}</Text> */}
          {/* </View> */}
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
  greenText:{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold', marginLeft: wp('3%') }
});



