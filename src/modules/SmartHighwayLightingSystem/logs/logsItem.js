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

    const { logs, updated_at, created_at, duration ,type} = this.props;

    return (
      <View style={{flex:1}}>
        <ScrollView style={{flex:1}}>
          <Card containerStyle={{ backgroundColor: '#fff', borderRadius: wp('30%'),elevation: 1,width:wp('90%'),
          height:hp('15%'),justifyContent:'center',marginLeft:wp('2%')}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignItems:'center'}}>
              <View>
                <View style={{ flexDirection: 'row',alignItems:'center' }}>
                  {type === 'Segment Control Logs' ? (<Text style={styles.textStyle}>Segment Control: </Text>
                  ): type === 'Radar Mode Logs' ? (<Text style={styles.textStyle}>Radar Mode: </Text>
                  ): (<Text style={styles.textStyle}>Timer: </Text>)}
                  
                  {type ===  'Radar Mode Logs' ? (
              <>
              {logs === true ? (
                <Text style={{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold', marginLeft: wp('2%'),fontSize:hp('2%') }}>Enabled</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('2%') ,fontSize:hp('2%')}}>Disabled</Text>
              )}
              </>              
            ):  
            type === 'Segment Control Logs' ? (
              <>
              {logs === 2 ? (
                <Text style={{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold', marginLeft: wp('3%'),fontSize:hp('2%') }}>ON</Text>
              ):(
                <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%') ,fontSize:hp('2%')}}>OFF</Text>
              )}
              </>                          
            ):(
              <Text style={{ color: '#FFCA28', fontWeight: 'bold', marginLeft: wp('1%'),fontSize:hp('2%') }}>{logs}</Text>
            )}
               
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.textStyle}>From: </Text>
                  <Text style={{fontSize:hp('1.7%'),marginTop:hp('0.2%'),marginLeft:wp('1%')}}>{updated_at}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.textStyle}>To:</Text>
                  <Text style={{fontSize:hp('1.7%'),marginTop:hp('0.2%'),marginLeft:wp('1%')}}>{created_at}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.textStyle}>Duration: </Text>
                  <Text style={{fontSize:hp('1.7%'),marginTop:hp('0.2%'),marginLeft:wp('1%')}}>{duration}</Text>
                </View>
              </View>

              <LinearGradient colors={["#0575e6", "#0b5eca", "#0b47af", "#083194", "#021b79"]}
                style={{ height: 65, width:65, backgroundColor: '#00008B', borderRadius:32.5, justifyContent: 'center',alignSelf:'center' }}>
                <Icon
                  name="list-alt"
                  size={25}
                  style={[styles.Icon, { alignSelf: 'center', color: '#fff' }]}
                />
              </LinearGradient>
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
    fontSize:hp('1.8%')
  },
  Icon: { color: 'white' },
});