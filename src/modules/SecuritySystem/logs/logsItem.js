import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Divider } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';

class Item extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {created_at,updated_at,duration,type,logs} = this.props;

    return (
      <View style={{flex:1}}>
        <ScrollView style={{flex:1}}>
        <Card containerStyle={{ backgroundColor: '#fff', borderRadius: 30,elevation: 1,width:wp('87%'),
        height:hp('13%'),paddingTop:hp('1%'),justifyContent:'center'}}>
            <View style={{ flexDirection:'row',alignItems:'center'}}>
              {type === 'Door Status Logs' ?(
                <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'#795548'}}>Door Status:</Text>
              ):(
                <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'#795548'}}>Alarm:</Text>
              )}
              {type === 'Door Status Logs' ? (
                <>
                {logs === 1 ? (
                  <Text style={{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold', marginLeft: wp('3%') ,fontSize:hp('2%')}}>Open</Text>
                ):(
                  <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%'),fontSize:hp('2%') }}>Close</Text>
                )}
                </> 
              ): type === 'Smoke Alarm Logs' ? (
                <>
                {logs === true ? (
                  <Text style={{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold', marginLeft: wp('3%') ,fontSize:hp('2%')}}>ON</Text>
                ):(
                  <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%'),fontSize:hp('2%') }}>OFF</Text>
                )}
                </> 
              ):
            (
              <Text style ={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{logs}</Text>
            )}            
            </View>
            
            <View style={{ flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>From:</Text>
            <Text style ={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{created_at}</Text>
            </View>
            <View style={{ flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>To:</Text>
            <Text style ={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{updated_at}</Text>
            </View>
            <View style={{ flexDirection:'row'}}>
            <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>Duration:</Text>
            <Text style ={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{duration}</Text>
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