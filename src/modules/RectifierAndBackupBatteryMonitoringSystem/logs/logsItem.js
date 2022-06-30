/* eslint-disable camelcase */
/* eslint-disable react/prefer-stateless-function */
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card } from 'react-native-elements';

class Item extends React.Component {
  render() {
    const {start,end,duration,type,status,ac_voltage,createdAt,dc_inputVoltage,battery_voltagePercentage,battery_voltage} = this.props;

    return (
      <View style={{flex:1}}>
        <ScrollView style={{flex:1}}>
          <Card containerStyle={{ backgroundColor: '#fff', borderRadius: 30,elevation: 1,width:wp('87%'),
          height:hp('13%'),paddingTop:hp('1%'),justifyContent:'center'}}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
              {type=== 'Input Voltage' ? (
                <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'#795548',marginLeft:wp('1%')}}>Ac_Voltage</Text>
            ):type=== 'Output DC Voltage' ?(
              <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'#795548',marginLeft:wp('0.5%'),marginTop:hp('1%')}}>Dc_Voltage</Text>
            ):type=== 'Battery Bank Status' ?(
              <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'#795548',marginLeft:wp('1%')}}>Battery_Voltage</Text>
            ):(null)}
              {type=== 'Input Voltage' ? (
                <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{ac_voltage}</Text>
            ): type=== 'Output DC Voltage' ?(
              <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%'),marginTop:hp('1%')}}>{dc_inputVoltage}</Text>
            ):type=== 'Battery Bank Status' ?
            (<Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{battery_voltage}</Text>
            ):(null)}
            </View>
            
            <View style={{flexDirection:'row'}}>
              {type=== 'Battery Bank Status' ?
              (
                <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'#000'}}> Battery Percentage</Text>
              ):(null)}
              {type === 'Battery Bank Status' ? 
              (
                <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{battery_voltagePercentage}</Text>
              ):(null)}             
            </View>

            <View style={{ flexDirection:'row'}}>
              {type === 'Input Power Status' || type === 'Rectification Status'  || type === 'Input Voltage' || type=== 'Output DC Voltage'||
               type=== 'Battery Bank Status' || type === 'Bank Battery Connection status' ?(
                 <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'#000',marginLeft:-2}}> Status:</Text>
              ): type === 'Input Voltage'? (
                <Text style={{fontWeight:'bold',fontSize:hp('2%'),color:'#795548'}}>Ac Voltage:</Text>
              ):(
                null
              )}
              {type === 'Input Power Status' || type === 'Input Voltage' || type === 'Rectification Status' || type === 'Output DC Voltage' ? (
                <>
                  {status === "Up" ? (
                    <Text style={{ marginLeft: wp('1%'), color: 'green', fontWeight: 'bold', marginLeft: wp('3%') ,fontSize:hp('2%')}}>Up</Text>
                ):(
                  <Text style={{ marginLeft: wp('1%'), color: 'red', fontWeight: 'bold', marginLeft: wp('3%'),fontSize:hp('2%') }}>Down</Text>
                )}
                </> 
              ):
            (
              <Text style={{color:'green',fontSize:hp('2%'),marginLeft:wp('2%')}}>{status}</Text>
            )}            
            </View>
            

            <View style={{ flexDirection:'row'}}>
              {type === 'Input Power Status' || type === 'Rectification Status'  || type === 'Bank Battery Connection status'? (
                <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>StartTime:</Text>
              ):(<Text style={{fontWeight:'bold',fontSize:hp('2%'),marginLeft:wp('1%')}}>Time:</Text>)} 

              {type === 'Input Voltage' || type=== 'Output DC Voltage' || type=== 'Battery Bank Status'? (
                <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{createdAt}</Text>
              ):(
                <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{start}</Text>
              )}           
            </View>

            <View style={{ flexDirection:'row'}}>
              {type === 'Input Power Status' || type === 'Rectification Status' || type === 'Bank Battery Connection status'? (
                <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>EndTime:</Text>
              ):(
                null
              )}  

              {type === 'Input Power Status' || type === 'Rectification Status' || type === 'Bank Battery Connection status'? (
                <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{end}</Text>
              ):(
                null
              )}                    
            </View>

            <View style={{ flexDirection:'row'}}>
              {type === 'Input Power Status' || type === 'Rectification Status' || type === 'Bank Battery Connection status'? (
                <Text style={{fontWeight:'bold',fontSize:hp('2%')}}>Duration:</Text>
              ):(
                null
              )}
              {type === 'Input Power Status' || type === 'Rectification Status' || type === 'Bank Battery Connection status'? (
                <Text style={{color:'#000',fontSize:hp('2%'),marginLeft:wp('2%')}}>{duration}</Text>
              ):(
                null
              )}
            </View>
          </Card>
        </ScrollView>
      </View>
    );
  }
}
export default Item;