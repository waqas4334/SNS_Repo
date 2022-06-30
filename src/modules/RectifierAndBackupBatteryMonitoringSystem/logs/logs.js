import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Bubbles } from 'react-native-loader';
import moment from 'moment';
import { Dropdown } from '../../../components';
import { colors } from '../../../styles';
import Item from './logsItem';
import { getModule, getLogs } from '../../../redux/actions/rectifierAction';

const LogScreen = () => {
    const user = useSelector(state => state.auth.user);
    const module = useSelector(state => state.rectifier.module);
    const logs = useSelector(state => state.rectifier.logs);
    const logsLoading = useSelector(state => state.rectifier.logsLoading);

    const dispatch = useDispatch();
    const [type, setType] = useState([
        'Input Power Status',
        'Input Voltage',
        'Rectification Status',
        'Output DC Voltage',
        'Bank Battery Connection status',
        'Battery Bank Status'
    ]);
    const [moduleArray, setModuleArray] = useState([]);
    const [selectedModule, setSelectedModule] = useState(0);
    const [selectedModuleValue, setSelectedModuleValue] = useState(null);
    const [selectedType, setSelectedType] = useState(0);
    const [selectedTypeValue, setSelectedTypeValue] = useState('Input Power Status');
    const [startDate, setStartDate] = useState(moment().subtract(3, 'days'));
    const [endDate, setEndDate] = useState(moment().add(1, 'day'));

    const handleModuleData = async () => {
      const data = await dispatch(getModule(user.id));
      if (data === 'done') {
          handleRectifierData();
      }
  }
  
    useEffect(() => {
        handleModuleData();
        console.log('date',selectedModule, selectedTypeValue,startDate,endDate)
        // dispatch(getLogs(module[selectedModule]._id,selectedTypeValue,startDate,endDate))
        getLogsData(selectedModule, selectedTypeValue, startDate, endDate);
    }, []);
   
    const handleRectifierData = () => {
        const temp = [];
        module.map(s => {
            temp.push(s.name);
        })
        setModuleArray(temp);
        setSelectedModule(0);
        setSelectedModuleValue(module[0].name);
    }
    const handleModuleChange = (index, value) => {
        setSelectedModule(index);
        setSelectedModuleValue(value);
        getLogsData(index, selectedTypeValue, startDate, endDate);
    }
    const handleTypeChange = (index, value) => {
        setSelectedType(index);
        setSelectedTypeValue(value);
        getLogsData(selectedModule, value, startDate, endDate);
    }
    const startDateChange = (date) => {
        setStartDate(date)
        getLogsData(selectedModule, selectedTypeValue, date, endDate);
    };
    const endDateChange = (date) => {
        setEndDate(date);
        getLogsData(selectedModule, selectedTypeValue, startDate, date);
    };
    const getLogsData = async (moduleIndex, type, sDate, eDate) => {
        let type2 = 'Input Power Status';

        if (type === 'Input Power Status') {
            type2 = 'ac_logs'
            // status
        }
        else if (type === 'Input Voltage') {
            type2 = 'ac_intervals'
            // ac_voltage
        }
        else if (type === 'Rectification Status') {
            type2 = 'rec_logs'
            // status
        }
        else if (type === 'Output DC Voltage') {
            type2 = 'rec_intervals'
            // dc_inputVolatge
        }
        else if (type === 'Bank Battery Connection status') {
            type2 = 'battery_logs'
        }
        else if (type === 'Battery Bank Status') {
            type2 = 'battery_intervals'
            // battery_voltage, battery_voltagePercentage
        }
        if (moduleIndex !== -1) {
            dispatch(getLogs(module[moduleIndex]._id, type2, sDate, eDate));
        }

    }
    if (selectedModuleValue === null && selectedModule === -1) {
        return (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Bubbles size={15} color={colors.primary} />
          </View>
        );
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row' }}>
          <Dropdown
            placeholder='Select Sensor...'
            style={styles.Dropdown}
            items={moduleArray}
            selectedIndex={selectedModule}
            onSelect={(index, value) => handleModuleChange(index, value)}
          />
          <Dropdown
            placeholder='Select Type...'
            style={styles.Dropdown1}
            items={type}
            selectedIndex={selectedType}
            onSelect={(index, value) => handleTypeChange(index, value)}
          />

        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: hp('1.5%'), marginLeft: wp('2%'), fontWeight: 'bold', color: '#000080' }}>Start:</Text>
            <DatePicker
              style={{ marginLeft: wp('1%'), width: wp('30%') }}
              date={startDate}
              mode="date"
              display="default"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                            dateText: styles.dateTextPicker,
                            dateInput: styles.dateInputPicker,
                            dateIcon: styles.dateIconPicker
                        }}
              onDateChange={(date) => { startDateChange(date) }}
            />
            <Icon
              name="calendar"
              style={[styles.Icon, { alignSelf: 'center', color: '#000080', marginLeft: wp('-2%') }]}
            />
          </View>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ marginTop: hp('1.5%'), fontWeight: 'bold', color: '#000080' }}>End:</Text>
            <DatePicker
              style={{ marginLeft: wp('1%'), marginRight: wp('3%'), width: wp('30%') }}
              date={endDate}
              mode="date"
              display="default"
              placeholder="select date"
              format="YYYY-MM-DD"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                            dateText: styles.dateTextPicker,
                            dateInput: styles.dateInputPicker,
                            dateIcon: styles.dateIconPicker
                        }}
              onDateChange={(date) => { endDateChange(date) }}
            />
            <Icon
              name="calendar"
              style={[styles.Icon, { alignSelf: 'center', color: '#000080', marginLeft: wp('-5%') }]}
            />
          </View>
        </View>
        {logsLoading ? (
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Bubbles size={15} color={colors.primary} />
          </View>
            ) : (
              <View style={{ backgroundColor: '#fff' }}>
                {logs.length > 0 ? (
                  <View style={{ backgroundColor: '#fff', marginHorizontal: wp('3%'), marginVertical: hp('0.5%'), paddingBottom: hp('12%') }}>
                    <FlatList
                      data={logs}
                      renderItem={({ item }) => (
                        <Item
                          status={item.status}
                          end={item.end}
                          start={item.start}
                          duration={item.duration}
                          dc_inputVoltage={item.dc_inputVoltage}
                          createdAt={item.createdAt}
                          ac_voltage={item.ac_voltage}
                          battery_voltagePercentage={item.battery_voltagePercentage}
                          battery_voltage={item.battery_voltage}
                          type={selectedTypeValue}
                        />
                                      )}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                        ) : (
                          <View style={styles.TextView}>
                            <Text style={styles.Text}>Please Select Log Type</Text>
                          </View>
                            )}
              </View>
                )}
      </View>
    )
}

export default LogScreen;

const styles = StyleSheet.create({
    dateTextPicker: { fontSize: 13, color: '#000080' },
    dateIconPicker: { width: wp('0%'), height: hp('0%') },
    dateInputPicker: { height: hp('3%'), borderRadius: 5 },
    Icon: { fontSize: hp('2.5%'), color: 'white' },
    TextView: {
        marginTop: hp('30%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
    Dropdown: { width: wp('39%'), height: hp('4%'), marginTop: hp('1.5%'), marginLeft: wp('0.5%'), padding: 0 },
    Dropdown1: { width: wp('60%'), height: hp('4%'), marginTop: hp('1.5%'), marginLeft: wp('0.5%')},
})