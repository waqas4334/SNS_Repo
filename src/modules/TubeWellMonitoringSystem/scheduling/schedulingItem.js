import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { colors, fonts } from '../../../styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Divider } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {updateRoutine} from '../../../redux/actions/tubewellAction';
import { useDispatch, useSelector } from 'react-redux';

const  Item = (props) => {
    const dispatch = useDispatch();
    const {enabel,from,to,id,_id,name,index} = props;
    const [mode, setMode] = useState('time');
    const [TimeFrom, setTimeFrom] = useState(new Date());
    const [TimeTo, setTimeTo] = useState(new Date());
    const [ShowFrom, setShowFrom] = useState(false);
    const [ShowTo, setShowTo] = useState(false);

const onPressRoutine= () => {
    if(enabel === true ){
        dispatch(updateRoutine(_id,false,TimeFrom,TimeTo));
    }
    else if(enabel === false){
        dispatch(updateRoutine(_id,true,TimeFrom,TimeTo));
    }
}
const openTimePicker = (type) => {
    if(type === 'from'){
        setShowFrom(true);
    }
    else if( type === 'to'){
        setShowTo(true);
    }
    setMode('time');
};
const onPickerChange = (event, selectedTime,type) => {
    if(type === 'from'){
        const currentTime = selectedTime || TimeFrom;
        //console.log('Time',selectedTime,Time)
        setShowFrom(Platform.OS === 'ios');
        setTimeFrom(currentTime);
        console.log('cuuentTime', currentTime)
        dispatch(updateRoutine(_id,true,currentTime,TimeTo));
    }
    else if(type === 'to'){
        const currentTime = selectedTime || TimeTo;
        //console.log('Time',selectedTime,Time)
        setShowTo(Platform.OS === 'ios');
        setTimeTo(currentTime);
        console.log('cuuentTime', currentTime)
        dispatch(updateRoutine(_id,true,TimeFrom,currentTime));
    }
};

    return (
      <View style={{flex:1}} keyboardShouldPersistTaps="handled">
        <ScrollView keyboardShouldPersistTaps="handled" >
          <View style={{marginTop:hp('3%'),flex:1}}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-around',alignItems:'center'}}>
                <View style={{flexDirection:'column'}}>
                    <Text style={{color:'#0575e6',fontSize:20}}>{name}</Text>
                    {/* <Text>{enabel}</Text> */}
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{flexDirection:'column',marginTop:hp('1%')}}>
                        <Text style={styles.fromStyle}>From:</Text>
                        <TouchableOpacity onPress={() => openTimePicker('from')}>
                        <Text style={styles.textFrom}>{moment(from).format('HH:mm')}</Text> 
                          <Divider style={styles.divider}/>
                        </TouchableOpacity>        
                        {ShowFrom &&  ( 
                                <DateTimePicker
                                style={styles.TimePicker}
                                testID="dateTimePicker"
                                value={TimeFrom}
                                mode={mode}
                                // is12Hour={true}
                                display="default"
                                onChange={(event, value) => onPickerChange(event, value,'from')}
                          />)}   
                        </View>

                        <View style={{flexDirection:'column',marginTop:hp('1%'),marginHorizontal:wp('10%')}}>
                        <Text style={styles.fromStyle}>To:</Text>
                        <TouchableOpacity onPress={() => openTimePicker('to')}>
                        <Text style={styles.textFrom}>{moment(to).format('HH:mm')}</Text>
                        <Divider style={styles.divider}/>
                        </TouchableOpacity>
                        {ShowTo && (
                                 <DateTimePicker
                                 style={styles.TimePicker}
                                 testID="dateTimePicker"
                                 value={TimeTo}
                                //  index={index}
                                 mode={mode}
                                //  is12Hour
                                 display="default"
                                 onChange={(event, value) => onPickerChange(event, value,'to')}
                               />
                            )}
                        {/* <Divider style={styles.divider}/> */}
                        </View>
                    </View>           
                </View>

                <View style={{flexDirection:'row',marginTop:hp('5%'),justifyContent:'flex-end',marginRight:wp('5%')}}>
                    {enabel === true ? (
                        <TouchableOpacity
                         style={{ height: 25, width: 60, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: wp('-3%') }}
                         onPress={() => onPressRoutine()}
                        >
                        <Text style={{ color: '#fff' }}>OFF</Text>
                        </TouchableOpacity>
                        
                    ):(
                        <TouchableOpacity
                        style={{ height: 25, width: 60, borderRadius: 15, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center', marginRight: wp('-3%') }}
                        onPress={() => onPressRoutine()}
                        >
                        <Text style={{ color: '#fff' }}>ON</Text>
                        </TouchableOpacity>
                    )} 
                </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }

export default Item;

const styles = StyleSheet.create({
  textStyle: {
    fontWeight: 'bold',
    fontSize:hp('1.8%')
  },
  Icon: { color: 'white' ,alignSelf:'center',fontSize:hp('2%')},
  textFrom:{fontSize:hp('1.5%'),color:'grey',marginTop:hp('0.5%'),marginBottom:hp('-0%')},
  fromStyle:{fontWeight:'bold',fontSize:hp('1.5%')},
  divider:{color:'#000',height:1},
  TimePicker: { width: wp('20%'), marginTop: hp('1.5%') },
  TimePickerText: { color: "#000", fontWeight: 'bold', fontSize: 13 },
  TimePickerInput: { height: hp('2.5%'), borderColor: '#000', borderWidth: 0.1 },
  TimePickerIcon: { height: hp('10%') },
  TimePickerIcon1: { height: hp('0%'), width: wp('0%') },
});