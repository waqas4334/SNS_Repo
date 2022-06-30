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
        {type === 'Temperature' ? (
          <>
          <View style={styles.inlineList}>
            <Text style={styles.text}>Temperature: </Text>
            <Text>{item.temperature}</Text>
            </View>
            <View style={styles.inlineList}>
            <Text style={styles.text}>Time: </Text>
            <Text>{item.created}</Text>
            </View>
            </>
            
            ) : type === 'Fan Status'  ? (
              <>
            <View style={styles.inlineList}>
              <Text style={styles.text}>Status: </Text>
              <Text style={{color:item.fan_status === 'On' ? 'green':'red',fontWeight:'bold',marginLeft:wp('3%')}}>{item.fan_status}</Text>
              </View>
               <View style={styles.inlineList}>
              <Text style={styles.text}>Time: </Text>
              <Text>{item.created}</Text>
              </View>
              </>
             ): type === 'Fan Interval'  ? (
              <>
              <View style={styles.inlineList}>
              <Text style={styles.text}>Status: </Text>
              <Text style={{color:item.status === 'On' ? 'green':'red',fontWeight:'bold',fontSize:16}}>{item.status}</Text>
              </View>
               <View style={styles.inlineList}>
              <Text style={styles.text}>Start Time: </Text>
              <Text>{item.start_time}</Text>
              </View>
              <View style={styles.inlineList}>
              <Text style={styles.text}>End Time: </Text>
              <Text>{item.end_time}</Text>
              </View>
              <View style={styles.inlineList}>
              <Text style={styles.text}>Duration: </Text>
              <Text>{item.duration}</Text>
              </View>
              </>)
              :(null)}           
        </View>
      </Card>
    );
  }
}
export default Item;

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:"#fff",
    borderRadius:6,
  },
  inlineList:{
    flexDirection:'row',
    padding: 5,
  },
  text:{ fontWeight: 'bold', color: '#114EC0',marginBottom:6 },
  title: {
    fontFamily: fonts.primaryRegular,
    fontSize: hp('1.8%'),
    color: '#000',
  },
  greenText:{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold' }
});



