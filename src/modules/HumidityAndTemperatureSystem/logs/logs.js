/* eslint-disable linebreak-style */
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Bars, Bubbles } from 'react-native-loader';
import moment from 'moment';
import { Dropdown } from '../../../components';
import { colors } from '../../../styles';
import Item from './logsItem';
import { getModule ,getLogs} from '../../../redux/actions/humidity';

const LogScreen = () => {
    const user = useSelector(state => state.auth.user);
    const module = useSelector(state => state.humidity.module);
    const logs = useSelector(state =>state.humidity.logs);
    const logsLoading = useSelector(state =>state.humidity.logsLoading);

    const dispatch = useDispatch();
    const [type, setType] = useState([
        'Temperature',
        'Humidity',
    ]);
    
    const [moduleArray, setModuleArray] = useState([]);
    const [selectedModule, setSelectedModule] = useState(0);
    const [selectedModuleValue, setSelectedModuleValue] = useState(null);
    const [selectedType, setSelectedType] = useState(0);
    const [selectedTypeValue, setSelectedTypeValue] = useState('Temperature');
    const [startDate, setStartDate] = useState(moment().subtract(2, 'days'));
    const [endDate, setEndDate] = useState(moment().add(1, 'day'));


    const handleModuleData = async () => {
        const data = await dispatch(getModule(user.id));
        if (data === 'done') {
            handleHumidityData();
        }
    }
    useEffect(() => {
        handleModuleData();
        getLogsData(selectedTypeValue, selectedModule, startDate, endDate);
    }, []);
    const handleHumidityData = () => {
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
        getLogsData(selectedTypeValue, index, startDate, endDate);
    }
    const handleTypeChange = (index, value) => {
        setSelectedType(index);
        setSelectedTypeValue(value);
        getLogsData(value, selectedModule, startDate, endDate);
    }
    const startDateChange = (date) => {
        setStartDate(date)
        getLogsData(selectedTypeValue, selectedModule, date, endDate);
    };
    const endDateChange = (date) => {
        setEndDate(date);
        getLogsData(selectedTypeValue, selectedModule, startDate, date);
    };
    const getLogsData = async (type, moduleIndex, sDate, eDate) => {
        let type2 = 'Temperature';

        if (type === 'Temperature') {
            type2 = 'temperature'
        }
        else if (type === 'Humidity') {
            type2 = 'humidity'
        }
        if (moduleIndex !== -1) {
            dispatch(getLogs(type2, module[moduleIndex]._id, sDate, eDate));
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
            placeholder='Select Module...'
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
              <View style={{  backgroundColor:'#fff'}}>
                {logs.length > 0 ? (
                  <View style={{ backgroundColor: '#fff', marginHorizontal: wp('3%'), marginVertical: hp('0.5%'), paddingBottom: hp('12%') }}>
                    <FlatList
                      data={logs}
                      renderItem={({ item }) => 
                        <Item temperature={item.temperature} humidity={item.humidity} updated_at={item.updated_at} created_at={item.created_at} duration={item.duration} type={selectedTypeValue} />}
                      keyExtractor={(item, index) => index.toString()}
                    />
                  </View>
                        ) : (
                          <View style={styles.TextView}>
                            <Text style={styles.Text}>No Logs</Text>
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
    Dropdown: { width: wp('66%'), height: hp('4%'), marginTop: hp('1.5%'), marginLeft: wp('1.5%') },
    Dropdown1: { width: wp('30%'), height: hp('4%'), marginTop: hp('1.5%'), marginLeft: wp('1%') },
})