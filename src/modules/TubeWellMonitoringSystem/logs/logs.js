import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from '../../../components';
import Item from './logsItem';
import { colors } from '../../../styles';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';


class LogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: [
        'Fill Level Logs',
        'Tank Lid Status Logs',
        'Door Status Logs',
        'Hydro Pump Status Logs',
        'Force Hydro Pump Status Logs',
        'PH Value Logs',
        'TDS Value Logs',
        'Smoke Alarm Status Logs',
        'Filter Maintenance Logs',
        'Hydro Pump Maintenance Logs',
        'Abnormal Current Logs',
        'Line Current Status Logs',
        'Main Line Status Logs',
        'Priming Logs',
        'Priming Level Logs',
        'Pump Vibration Logs'
      ],

      selectedType: 0,
      selectedTypeValue: 'Fill Level Logs',
      module: [],
      selectedModule: 0,
      selectedModuleValue: this.props.sensors[0].name,
      sensorIndex: null,
      startDate: moment().subtract(7, 'days'),
      endDate: moment().add(1, 'day')
    }
  }

  async componentDidMount() {
    const { user, sensors } = this.props;
    const { selectedTypeValue, selectedModuleValue, startDate, endDate } = this.state;
    const done = await this.props.getSensors(user.id);
    if (done === 'done') {
      this.handleSensorData();
    }
    else {
      console.log('error');
    }
    const Index = sensors.findIndex(s => s.name === selectedModuleValue);
    // this.props.getLogs(selectedTypeValue,sensors[Index]._id,startDate,endDate);
    this.getLogsData(Index, startDate, endDate);

  }

  handleSensorData = () => {
    const { sensors } = this.props;
    const temp = [];
    sensors.map(s => {
      temp.push(s.name);
    })
    this.setState({
      module: temp,
      // selectedModule: 0,
      // selectedModuleValue: sensors[0].name
    })
  }

  handleModuleChange = (index, value) => {
    const { sensors } = this.props;
    const { selectedTypeValue, selectedModuleValue, startDate, endDate } = this.state;
    const Index2 = sensors.findIndex(s => s.name === value);
    this.setState({
      selectedModule: index,
      selectedModuleValue: value,
      sensorIndex: Index2
    });
    this.getLogsData(index, startDate, endDate);
  }

  handleTypeChange = async (index, value) => {
    const { startDate, endDate, selectedModule } = this.state;
    // const Index = sensors.findIndex(s => s.name === selectedModuleValue);
    await this.setState({
      selectedType: index,
      selectedTypeValue: value,
    });
    this.getLogsData(selectedModule, startDate, endDate);
  }

  startDateChange = (date) => {
    const { selectedModule, endDate } = this.state;
    this.setState({
      startDate: date,
    });
    this.getLogsData(selectedModule, date, endDate,);
  };

  endDateChange = (date) => {
    const { selectedModule, startDate } = this.state;
    this.setState({
      endDate: date,
    });
    this.getLogsData(selectedModule, startDate, date);
  };

  getLogsData = (moduleIndex, sDate, eDate) => {
    const { sensors } = this.props;
    const { selectedTypeValue } = this.state;

    let type2 = 'fillLevel';

    if (selectedTypeValue === 'Fill Level Logs') {
      type2 = 'fillLevel'
    }
    else if (selectedTypeValue === 'Tank Lid Status Logs') {
      type2 = 't_lid'
    }
    else if (selectedTypeValue === 'Door Status Logs') {
      type2 = 'door_status'
    }
    else if (selectedTypeValue === 'Force Hydro Pump Status Logs') {
      type2 = 'force-motor'
    }
    else if (selectedTypeValue === 'Hydro Pump Status Logs') {
      type2 = 'motor'
    }
    else if (selectedTypeValue === 'PH Value Logs') {
      type2 = 'ph'
    }
    else if (selectedTypeValue === 'TDS Value Logs') {
      type2 = 'tds'
    }
    else if (selectedTypeValue === 'Smoke Alarm Status Logs') {
      type2 = 'alarm'
    }
    else if (selectedTypeValue === 'Filter Maintenance Logs') {
      type2 = 'w_maintanance'
    }
    else if (selectedTypeValue === 'Hydro Pump Maintenance Logs') {
      type2 = 'm_maintanance'
    }
    else if (selectedTypeValue === 'Abnormal Current Logs') {
      type2 = 'abnormal'
    }
    else if (selectedTypeValue === 'Main Line Status Logs') {
      type2 = 'phase_down'
    } 
    else if (selectedTypeValue === 'Line Current Status Logs') {
      type2 = 'Ia'
    }
    else if (selectedTypeValue === 'Priming Logs') {
      type2 = 'volve'
    }
    else if (selectedTypeValue === 'Priming Level Logs') {
      type2 = 'plvl'
    }
    else if (selectedTypeValue === 'Pump Vibration Logs') {
      type2 = 'vib'
    }
    //  console.log('type',type2);
    this.props.getLogs(type2, sensors[moduleIndex]._id, sDate, eDate);
  }

  render() {
    const { user, sensors, Logs, logsLoading } = this.props;
    const { startDate, endDate, module, type, selectedModuleValue, selectedTypeValue, DATA, selectedModule, selectedType } = this.state;
    console.log('logs',sensors);


    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row' }}>
            <Dropdown
              placeholder='Select Module...'
              style={styles.Dropdown}
              items={module}
              selectedIndex={selectedModule}
              onSelect={(index, value) => this.handleModuleChange(index, value)}
            />
            <Dropdown
              placeholder='Select Type...'
              style={styles.Dropdown1}
              items={type}
              selectedIndex={selectedType}
              onSelect={(index, value) => this.handleTypeChange(index, value)}
            />
          </View>

          <View style={{ flexDirection: 'row', marginHorizontal: wp('2%') }}>
            <View style={{ backgroundColor: 'transparent', flexDirection: 'row', marginTop: hp('1%'), borderTopRightRadius: 40, borderTopLeftRadius: 40 }}>
              <Text style={[styles.DatePickerText, { marginTop: hp('1.5%') }]}>  Start: </Text>
              <DatePicker
                style={styles.DatePicker}
                date={startDate}
                mode="date"
                display="default"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: styles.DatePickerInput,
                  dateIcon: styles.DatePickerIcon1,
                  dateText: styles.DateText
                  ,
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.startDateChange(date) }}
              />
            </View>
            <View style={{ backgroundColor: 'transparent', flexDirection: 'row', marginTop: hp('1%'), borderTopRightRadius: 40, borderTopLeftRadius: 40 }}>
              <Text style={[styles.DatePickerText, { marginTop: hp('1.5%') }]}>  End: </Text>
              <DatePicker
                style={styles.DatePicker}
                date={endDate}
                mode="date"
                display="default"
                placeholder="select date"
                format="YYYY-MM-DD"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: styles.DatePickerInput,
                  dateIcon: styles.DatePickerIcon1,
                  dateText: styles.DateText
                  ,
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.endDateChange(date) }}
              />
            </View>
          </View>

          {logsLoading ? (
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Bars size={15} color={colors.primary} />
            </View>
          ) : (
              <View style={{ flex: 1 }}>
                {Logs.length > 0 ? (
                  <View style={{ flex: 1, backgroundColor: '#fff' }}>
                    { selectedTypeValue === 'Filter Maintenance Logs' ||
                      selectedTypeValue === 'Hydro Pump Maintenance Logs' ? (
                        <FlatList
                        data={Logs}
                        renderItem={({ item }) => <Item logs={item.logs} created_at={item.performed_at} duration={item.running_time} type={selectedTypeValue} />}
                        keyExtractor={(item, index) => index.toString()}
                      />
                      ):
                       (
                        <FlatList
                        data={Logs}
                        renderItem={({ item }) =>  <Item logs={item.logs} updated_at={item.updated_at} created_at={item.created_at} duration={item.duration}  type={selectedTypeValue}/>}
                        keyExtractor={(item, index) => index.toString()}
                      />
                       )}
                  </View>
                ) : (
                    <View style={styles.TextView}>
                      <Text style={styles.Text}>Sorry no result</Text>
                    </View>
                  )}
              </View>
            )}
        </View>
      </View>
    );
  }
}

export default LogScreen;


const styles = StyleSheet.create({
  DatePicker: { width: wp('37%') },
  DatePickerText: { color: "#000", fontWeight: 'bold', fontSize: 13, paddingTop: hp('0.3%') },
  DatePickerInput: { height: hp('2.5%'), borderColor: '#000' },
  DatePickerIcon: { top: hp('0%'), height: hp('10%') },
  DatePickerIcon1: { top: hp('0%'), marginRight: wp('3%'), height: hp('3%'), width: wp('4%') },
  DateText: { color: "#000", fontSize: 14 },
  Dropdown: { width: wp('35%'), height: hp('4%'), marginTop: hp('1.5%'), marginLeft: wp('1%')},
  Dropdown1: { width: wp('62%'), height: hp('4%'), marginTop: hp('1.5%'), marginLeft: wp('1%')},
  TextView: {
    marginTop: hp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
})

 // switch (type) {
    //   case 'Fill Level Logs':
    //     type2 = 'fillLevel';
    //     break;
    //   case 'Tank Lid Status Logs':
    //     type2 = 't_lid';
    //     break;
    //   case 'Door Status Logs':
    //     type2 = 'door_status';
    //     break;
    //   case 'Force Hydro Pump Status Logs':
    //     type2 = 'force-motor';
    //     break;
    //   case 'PH Value Logs':
    //     type2 = 'ph';
    //     break;
    //   case 'TDS Value Logs':
    //     type2 = 'tds';
    //     break;
    //   case 'Smoke Alarm Status Logs':
    //     type2 = 'alarm';
    //     break;
    //   case 'Hydro Pump Maintenance Logs':
    //     type2 = 'm_maintanance';
    //     break;
    //   case 'Phase Logs':
    //     type2 = 'phase-down';
    //     break;
    //   case 'Line Current Status Logs':
    //     type2 = 'abnormal';
    //     break;
    // }