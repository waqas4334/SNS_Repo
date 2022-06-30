import React from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from '../../../components';
import { colors } from '../../../styles';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import Item from './logsItem';


class LogScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: [
        'Temperature',
        'Geyser Status',
        'Burner Status',
      ],
      selectedType: 0,
      selectedTypeValue: 'Temperature',
      module: [],
      selectedModule: 0,
      selectedModuleValue: this.props.geyserModule[0].name,
      sensorIndex: null,
      start_date: moment().subtract(7, 'days'),
      end_date: moment().add(1, 'day')
    }
  }

  async componentDidMount() {
    const { user, navigation,geyserModule } = this.props;  
    const {start_date,end_date,selectedModuleValue} = this.state;   
        const done = await this.props.getSensors(user.id);
        if (done === 'done') {
            this.handleSensorData();
        } else {
            console.log('error');
        }
        this.focusListener = navigation.addListener('didFocus', async () => {
            const done = await this.props.getSensors(user.id);
            if (done === 'done') {
                this.handleSensorData();
            } else {
                console.log('error');
            }
        });
    const Index = geyserModule.findIndex(s => s.name === selectedModuleValue);
    // console.log('Index',Index)
    this.getLogsData(Index, start_date, end_date);

  }

  handleSensorData = () => {
    const { geyserModule } = this.props;
    const temp = [];
    geyserModule.map(s => {
      temp.push(s.name);
    })
    this.setState({
      module: temp,
      // selectedModule: 0,
      // selectedModuleValue: geyserModule[0].name
    })
  }

  handleModuleChange = (index, value) => {
    const { geyserModule } = this.props;
    const { selectedTypeValue, selectedModule, start_date, end_date } = this.state;
    const Index2 = geyserModule.findIndex(s => s.name === value);
    this.setState({
      selectedModule: index,
      selectedModuleValue: value,
      sensorIndex: Index2
    });
    this.getLogsData(index, start_date, end_date);
  }

  handleTypeChange = async (index, value) => {
    const { start_date, end_date, selectedModule } = this.state;
    // const Index = sensors.findIndex(s => s.name === selectedModuleValue);
    await this.setState({
      selectedType: index,
      selectedTypeValue: value,
    });
    this.getLogsData(selectedModule, start_date, end_date);
  }

  startDateChange = (date) => {
    const { selectedModule, end_date } = this.state;
    this.setState({
      start_date: date,
    });
    this.getLogsData(selectedModule, date, end_date,);
  };

  endDateChange = (date) => {
    const { selectedModule, start_date } = this.state;
    this.setState({
      end_date: date,
    });
    this.getLogsData(selectedModule, start_date, date);
  };

  getLogsData = (moduleIndex,sDate, eDate) => {
    const { geyserModule } = this.props;
    const { selectedTypeValue,selectedModule,start_date,end_date } = this.state;

    let type2 ;

    if (selectedTypeValue === 'Temperature') {
      type2 = 'temperature'
    }
    else if (selectedTypeValue === 'Geyser Status') {
      type2 = 'geyser_status'
    }
    else if (selectedTypeValue === 'Burner Status') {
      type2 = 'burner_status'
    }
    console.log('id',type2)
    this.props.getLogs(geyserModule[moduleIndex]._id,type2,sDate,eDate);
    // this.props.getLogs(type2, sensors[moduleIndex]._id, sDate, eDate);
  }

  render() {
        const{module,selectedModule,selectedType,type,start_date,end_date,selectedTypeValue}= this.state;
        const{user,geyserModule,geyserLoading,logs,logsLoading} = this.props;
        // console.log('logsss',selectedTypeValue);


    return (
      <View style={{ flex: 1 }}>
         
        <View>
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
                date={start_date}
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
                date={end_date}
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
          </View>
          {logsLoading ? (
            <View
              style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
              <Bars size={15} color={colors.primary} />
            </View>
          ) : (
              <View style={{ flex: 1 }}>
                {logs.length > 0 ? (
                  <View style={{flex:1}}> 
                  <FlatList
                        data={logs}
                        renderItem={({ item }) => 
                        <Item temperature={item.temperature}  status={item.status}  start={item.start} end={item.end} duration={item.duration} type={selectedTypeValue} />}
                        keyExtractor={(item, index) => index.toString()}
                      />
                </View>
                ) : (
                    <View style={styles.TextView}>
                      <Text style={styles.Text}>Sorry no result</Text>
                    </View>
                  )}
              </View>
            )}
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
  Dropdown: { width: wp('65%'), height: hp('4%'), marginTop: hp('1.5%'), marginLeft: wp('1%')},
  Dropdown1: { width: wp('32%'), height: hp('4%'), marginTop: hp('1.5%'), marginLeft: wp('1%')},
  TextView: {
    marginTop: hp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
})
