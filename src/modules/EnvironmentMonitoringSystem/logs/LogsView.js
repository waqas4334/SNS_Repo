/* eslint-disable array-callback-return */
/* eslint-disable arrow-body-style */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  YellowBox,
  SafeAreaView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import { Bars } from 'react-native-loader';
import { withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Item from './LogsItem';
import { Dropdown } from '../../../components';
import { colors } from '../../../styles';
import { getSensors, getLogs } from '../../../redux/actions/envActions';

YellowBox.ignoreWarnings(['DatePickerAndroid']);

const LogsScreen = props => {
  const user = useSelector(state => state.auth.user);
  const sensors = useSelector(state => state.env.envSensors);
  const logs = useSelector(state => state.env.logs);
  const logsLoading = useSelector(state => state.env.logsLoading);

  const dispatch = useDispatch();
  const { navigation } = props;

  const [ModuleArray, setModuleArray] = useState([]);
  const [LogTypeArray] = useState(['pm1', 'pm2_5', 'pm10']);
  const [SelectedModule, setSelectedModule] = useState(0);
  const [, setSelectedModuleValue] = useState(sensors[0]?.name);
  const [SelectedType, setSelectedType] = useState(0);
  const [SelectedTypeValue, setSelectedTypeValue] = useState('pm1');
  const [StartDate, setStartDate] = useState(moment().subtract(7, 'days'));
  const [EndDate, setEndDate] = useState(moment().add(1, 'day'));

  useEffect(() => {
    dispatch(getSensors(user.id));
    handleSensorData();

    navigation.addListener('didFocus', async () => {
      dispatch(getSensors(user.id));
      handleSensorData();
    });

    // const Index2 = sensors.findIndex(s=> s.name === SelectedModuleValue);
    dispatch(
      getLogs(
        SelectedTypeValue,
        sensors[SelectedModule]._id,
        StartDate,
        EndDate,
      ),
    );
  }, []);

  const handleSensorData = async () => {
    const temp = [];

    sensors.map(s => {
      temp.push(s.name);
    });
    const name = await sensors[0].name;
    setModuleArray(temp);
    setSelectedModule(0);
    setSelectedModuleValue(name);
  };

  const handleSensorChange = (index, value) => {
    setSelectedModule(index);
    setSelectedModuleValue(value);
  };

  const handleTypeChange = (index, value) => {
    setSelectedType(index);
    setSelectedTypeValue(value);

    dispatch(getLogs(value, sensors[SelectedModule]._id, StartDate, EndDate));
  };

  const startDateChange = date => {
    setStartDate(date);
    dispatch(
      getLogs(SelectedTypeValue, sensors[SelectedModule]._id, date, EndDate),
    );
  };

  const endDateChange = date => {
    setEndDate(date);
    dispatch(
      getLogs(SelectedTypeValue, sensors[SelectedModule]._id, StartDate, date),
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.filterView}>
        <Dropdown
          placeholder="Select Module"
          style={styles.Dropdown}
          items={ModuleArray}
          selectedIndex={SelectedModule}
          onSelect={(index, value) => handleSensorChange(index, value)}
        />

        <Dropdown
          placeholder="Select Sensor"
          style={styles.Dropdown}
          items={LogTypeArray}
          selectedIndex={SelectedType}
          onSelect={(index, value) => handleTypeChange(index, value)}
        />
      </View>
      <View style={styles.datePickerView}>
        <Text style={styles.DatePickerText}>Start: </Text>
        <DatePicker
          style={styles.DatePicker}
          date={StartDate}
          mode="date"
          display="default"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: styles.DatePickerInput,
            dateIcon: styles.DatePickerIcon,

            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            startDateChange(date);
          }}
        />
        <Text style={[styles.DatePickerText, { marginLeft: wp('4%') }]}>
          End:{' '}
        </Text>
        <DatePicker
          style={styles.DatePicker}
          date={EndDate}
          mode="date"
          display="default"
          placeholder="select date"
          format="YYYY-MM-DD"
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateInput: styles.DatePickerInput,
            dateIcon: styles.DatePickerIcon,
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            endDateChange(date);
          }}
        />
      </View>

      {logsLoading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          {logs.length > 0 ? (
            <View>
              <FlatList
                data={logs}
                renderItem={({ item }) => (
                  <Item
                    updated_at={item.updated_at}
                    created_at={item.createdAt}
                    messagedata={item.logs}
                    duration={item.duration}
                    title={SelectedTypeValue}
                  />
                )}
                keyExtractor={(item, index) => index.toString()}
              />
            </View>
          ) : (
            <View style={styles.TextView}>
              <Text style={styles.Text}>Sorry no matching records found</Text>
            </View>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default withNavigation(LogsScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: wp('100%'),
  },
  Dropdown: {
    width: wp('45%'),
    height: hp('5%'),
    marginHorizontal: wp('2.5%'),
  },
  filterView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: hp('1.5%'),
    marginTop: hp('1.5%'),
  },
  datePickerView: {
    alignItems: 'center',
    flexDirection: 'row',
    // marginBottom: hp('10%')
  },

  DatePicker: { width: wp('37%'), marginLeft: wp('1%') },
  DatePickerText: {
    marginLeft: wp('3%'),
    color: colors.gray,
    fontWeight: 'bold',
  },
  DatePickerInput: { marginLeft: wp('0%'), height: hp('3%') },
  DatePickerIcon: { top: hp('0%'), marginLeft: wp('0%') },

  TextView: {
    marginTop: hp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
});
