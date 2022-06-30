/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  YellowBox,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { withNavigation } from 'react-navigation';
import { useDispatch, useSelector } from 'react-redux';
import Item from './LogsItem';
import { Dropdown } from '../../../components';
import { fonts, colors } from '../../../styles';
import {
  getSensors,
  getFuelTableData,
} from '../../../redux/actions/fuelActions';

YellowBox.ignoreWarnings(['DatePickerAndroid']);

const LogsScreen = () => {
  const user = useSelector(state => state.auth.user);
  const sensors = useSelector(state => state.fuel.sensors);
  const loading = useSelector(state => state.fuel.loading);
  const logs = useSelector(state => state.fuel.logs);

  const dispatch = useDispatch();

  const [SensorArray, setSensorArray] = useState([]);
  const [SelectedSensor, setSelectedSensor] = useState(0);
  const [SelectedSensorValue, setSelectedSensorValue] = useState(
    sensors[0].name,
  );
  const [TypeArray, setTypeArray] = useState([
    'fillLevel',
    'doorstatus',
    'temperature',
    'genstatus',
    'theft',
  ]);
  const [SelectedType, setSelectedType] = useState(0);
  const [SelectedTypeValue, setSelectedTypeValue] = useState('fillLevel');
  const [StartDate, setStartDate] = useState(moment().subtract(1, 'days'));
  const [EndDate, setEndDate] = useState(moment().add(1, 'day'));

  const fetchSensorData = async () => {
    const result = await dispatch(getSensors(user.id));
    if (result === 'done') {
      handleSensorData();
    }
  };

  const fetchLogsData = async () => {
    const Index2 = sensors.findIndex(s => s.name === SelectedSensorValue);
    await dispatch(
      getFuelTableData(
        SelectedTypeValue,
        sensors[Index2]._id,
        StartDate,
        EndDate,
      ),
    );
  };

  useEffect(() => {
    fetchSensorData();
    fetchLogsData();
  }, []);

  const handleSensorData = async () => {
    const temp = [];

    // eslint-disable-next-line array-callback-return
    sensors.map(s => {
      temp.push(s.name);
    });
    setSensorArray(temp);
  };

  const handleSensorChange = (index, value) => {
    const Index2 = sensors.findIndex(s => s.name === value);

    setSelectedSensor(index);
    setSelectedSensorValue(sensors[Index2].name);

    if (SelectedTypeValue !== null) {
      dispatch(
        getFuelTableData(
          SelectedTypeValue,
          sensors[Index2]._id,
          StartDate,
          EndDate,
        ),
      );
    }
  };

  const handleTypeChange = (index, value) => {
    setSelectedType(index);
    setSelectedTypeValue(value);

    dispatch(
      getFuelTableData(value, sensors[SelectedSensor]._id, StartDate, EndDate),
    );
  };

  const handleStartDateChange = date => {
    setStartDate(date);

    dispatch(
      getFuelTableData(
        SelectedTypeValue,
        sensors[SelectedSensor]._id,
        date,
        EndDate,
      ),
    );
  };

  const handleEndDateChange = date => {
    setEndDate(date);

    dispatch(
      getFuelTableData(
        SelectedTypeValue,
        sensors[SelectedSensor]._id,
        StartDate,
        date,
      ),
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.filterView}>
        <Dropdown
          placeholder="Select Module"
          style={styles.Dropdown}
          items={SensorArray}
          selectedIndex={SelectedSensor}
          onSelect={(index, value) => handleSensorChange(index, value)}
        />

        <Dropdown
          placeholder="Select Sensor"
          style={styles.Dropdown}
          items={TypeArray}
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
            handleStartDateChange(date);
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
            handleEndDateChange(date);
          }}
        />
      </View>

      {loading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      ) : (
        <View>
          {logs.length > 0 ? (
            <View>
              {SelectedTypeValue === 'fillLevel' ? (
                <FlatList
                  data={logs}
                  renderItem={({ item }) => (
                    <Item
                      updated_at={item.updated_at}
                      created_at={item.created_at}
                      messagedata={item.fillLevel}
                      title={SelectedTypeValue}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : SelectedTypeValue === 'doorstatus' ? (
                <FlatList
                  data={logs}
                  renderItem={({ item }) => (
                    <Item
                      updated_at={item.updated_at}
                      created_at={item.created_at}
                      messagedata={item.door_status}
                      title={SelectedTypeValue}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : SelectedTypeValue === 'genstatus' ? (
                <FlatList
                  data={logs}
                  renderItem={({ item }) => (
                    <Item
                      updated_at={item.updated_at}
                      created_at={item.created_at}
                      messagedata={item.gen_status}
                      title={SelectedTypeValue}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : SelectedTypeValue === 'waterflow' ? (
                <FlatList
                  data={logs}
                  renderItem={({ item }) => (
                    <Item
                      updated_at={item.updated_at}
                      created_at={item.created_at}
                      messagedata={item.waterflow}
                      title={SelectedTypeValue}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : SelectedTypeValue === 'temperature' ? (
                <FlatList
                  data={logs}
                  renderItem={({ item }) => (
                    <Item
                      updated_at={item.updated_at}
                      created_at={item.created_at}
                      messagedata={item.temperature}
                      title={SelectedTypeValue}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : SelectedTypeValue === 'theft' ? (
                <FlatList
                  data={logs}
                  renderItem={({ item }) => (
                    <Item
                      updated_at={item.updated_at}
                      created_at={item.created_at}
                      messagedata={item.theft}
                      title={SelectedTypeValue}
                    />
                  )}
                  keyExtractor={(item, index) => index.toString()}
                />
              ) : null}
            </View>
          ) : (
            <View style={styles.TextView}>
              <Text style={styles.Text}>Sorry no matching records found</Text>
            </View>
          )}
        </View>
      )}
    </View>
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
