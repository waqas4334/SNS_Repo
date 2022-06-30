/* eslint-disable react/prefer-stateless-function */
/* eslint-disable camelcase */
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from 'react-native-elements';

class Item extends React.Component {

  render() {

    const {created_at,updated_at,duration,temperature,type,humidity} = this.props;

    return (
      <View style={{flex:1}}>
        <ScrollView style={{flex:1}}>
          <Card containerStyle={{ backgroundColor: '#fff', borderRadius: 30,elevation: 1,width:wp('87%'),
          height:hp('15%'),justifyContent:'center'}}>
            <View style={{ flexDirection:'row',alignItems:'center'}}>
              {type === 'Temperature' ?(
                <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'red'}}>Temperature:</Text>
              ):(
                <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'red'}}>Humidity:</Text>
              )}
              {type === 'Temperature' ? (
                <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{temperature}</Text>
              ):(
                <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{humidity}</Text>
              )}            
            </View>
            
            <View style={{ flexDirection:'row'}}>
              <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>From:</Text>
              <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{created_at}</Text>
            </View>
            <View style={{ flexDirection:'row'}}>
              <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>To:</Text>
              <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{updated_at}</Text>
            </View>
            <View style={{ flexDirection:'row'}}>
              <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>Duration:</Text>
              <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{duration}</Text>
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
export default Item;

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    fontSize:hp('2%')
  },
  Icon: { fontSize: hp('3.5%'), color: 'white' },
});