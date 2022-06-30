import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { colors, fonts } from '../../../styles';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { Card, Divider } from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import {
  updateIndividualRoutine,
  deleteRoutine,
} from '../../../redux/actions/geyserAction';
import { useDispatch, useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Item = props => {
  const dispatch = useDispatch();
  const {
    enable,
    from,
    to,
    id,
    _id,
    name,
    index,
    status,
    routineEnable,
  } = props;
  const [btnEnable, setBtnEnable] = useState(enable);
  const [mode, setMode] = useState('time');
  const [TimeFrom, setTimeFrom] = useState(new Date(from));   
  const [TimeTo, setTimeTo] = useState(new Date(to));
  const [ShowFrom, setShowFrom] = useState(false);
  const [ShowTo, setShowTo] = useState(false);
  const onPressRoutine = () => { 
    if (enable === true) {
      // console.log('time',mode)
      dispatch(updateIndividualRoutine(_id, TimeFrom, false, TimeTo));
    } else if (enable === false) {
      // console.log('time',TimeFrom)
      dispatch(updateIndividualRoutine(_id, TimeFrom, true, TimeTo));
    }
  };
  const openTimePicker = type => {
    if (type === 'from') {
      setShowFrom(true);
    } else if (type === 'to') {
      setShowTo(true);
    }
    setMode('time');
  };
  const onPickerChange = (event, selectedTime, type) => {
    console.log('change log', event, selectedTime, type);
    if (type === 'from') {
      const currentTime = selectedTime || TimeFrom;
      // console.log('Time',selectedTime,TimeFrom)
      setShowFrom(Platform.OS === 'ios');

      setTimeFrom(currentTime);
      // console.log('cuuentTime', currentTime)
      dispatch(updateIndividualRoutine(_id, currentTime, true, TimeTo));
    } else if (type === 'to') {
      const currentTime = selectedTime || TimeTo;
      //console.log('Time',selectedTime,Time)
      setShowTo(Platform.OS === 'ios');
      setTimeTo(currentTime);
      // console.log('cuuentTime', currentTime)
      dispatch(updateIndividualRoutine(_id, TimeFrom, true, currentTime));
    }
  };
  const onClickdelete = () => {
    dispatch(deleteRoutine(_id, id));
  };

  return (
    <View style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.titleView}>
        <Text style={{ color: '#0575e6', fontSize: hp('2%') }}>
          {name} - {index + 1}
        </Text>
        <TouchableOpacity onPress={() => onClickdelete()}>
          <Icon name="delete" size={18} style={{ marginTop: 4 }} />
        </TouchableOpacity>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View style={{ flexDirection: 'column', marginTop: hp('1%') }}>
          <Text style={styles.fromStyle}>From:</Text>
          <TouchableOpacity onPress={() => openTimePicker('from')}>
            <Text style={styles.textFrom}>{moment(from).format('HH:mm')}</Text>
            <Divider style={styles.divider} />
          </TouchableOpacity>
          {ShowFrom && (
            <DateTimePicker
              style={styles.TimePicker}
              testID="dateTimePicker"
              value={TimeFrom}
              mode={mode}
              // is12Hour={true}
              display="default"
              onChange={(event, value) => onPickerChange(event, value, 'from')}
            />
          )}
        </View>

        <View
          style={{
            flexDirection: 'column',
            marginTop: hp('1%'),
            marginHorizontal: wp('10%'),
          }}
        >
          <Text style={styles.fromStyle}>To:</Text>
          <TouchableOpacity onPress={() => openTimePicker('to')}>
            <Text style={styles.textFrom}>{moment(to).format('HH:mm')}</Text>
            <Divider style={styles.divider} />
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
              onChange={(event, value) => onPickerChange(event, value, 'to')}
            />
          )}
          {/* <Divider style={styles.divider}/> */}
        </View>
      </View>

      <View style={{ flexDirection: 'row' }}>
        <View
          style={{
            flexDirection: 'row',
            marginTop: hp('3%'),
            justifyContent: 'flex-end',
            marginRight: wp('5%'),
          }}
        >
          {enable === true ? (
            <TouchableOpacity
              style={{
                height: 25,
                width: 90,
                borderRadius: 15,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: wp('-3%'),
              }}
              onPress={() => onPressRoutine()}
            >
              <Text style={{ color: '#fff' }}>OFF</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{
                height: 25,
                width: 90,
                borderRadius: 15,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: wp('-3%'),
              }}
              onPress={() => onPressRoutine()}
            >
              <Text style={{ color: '#fff' }}>ON</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

export default Item;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // borderWidth:1,
    borderRadius: 6,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    padding: 13,
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  textStyle: {
    fontWeight: 'bold',
    fontSize: hp('1.8%'),
  },
  Icon: { color: 'white', alignSelf: 'center', fontSize: hp('2%') },
  textFrom: {
    fontSize: hp('1.5%'),
    color: 'grey',
    marginTop: hp('0.5%'),
    marginBottom: hp('-0%'),
  },
  fromStyle: { fontWeight: 'bold', fontSize: hp('1.5%') },
  divider: { color: '#000', height: 1 },
  TimePicker: { width: wp('20%'), marginTop: hp('1.5%') },
  TimePickerText: { color: '#000', fontWeight: 'bold', fontSize: 13 },
  TimePickerInput: {
    height: hp('2.5%'),
    borderColor: '#000',
    borderWidth: 0.1,
  },
  TimePickerIcon: { height: hp('10%') },
  TimePickerIcon1: { height: hp('0%'), width: wp('0%') },
});
