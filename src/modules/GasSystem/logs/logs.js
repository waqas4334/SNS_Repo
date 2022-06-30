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
        'Gas Status Logs',
        'Alarm Logs',
      ],
      selectedType: 0,
      selectedTypeValue: 'Gas Status Logs',
      module: [],
      selectedModule: 0,
      selectedModuleValue: this.props.gasModule[0].name,
      sensorIndex: null,
      start_date: moment().subtract(3, 'days'),
      end_date: moment().add(1, 'day'),
      loading: false,
      // logs:[],
    }
}
async componentDidMount() {
    const { user, navigation ,gasModule} = this.props; 
    const {start_date,end_date,selectedModule} = this.state;   
    const done = await this.props.getSensors();
    if (done === 'done') {
        this.handleSensorData();
        this.getLogsData(selectedModule, start_date, end_date);
    } else {
        console.log('error');
    }
    this.focusListener = navigation.addListener('didFocus', async () => {
        const done = await this.props.getSensors(user.id);
        if (done === 'done') {
            this.handleSensorData();
            this.getLogsData(selectedModule, start_date, end_date);
        } else {
            console.log('error');
        }
    });
}
handleSensorData = () => {
    const { gasModule } = this.props;
    // console.log('module',gasModule);
    const temp = [];
    gasModule.map(s => {
        temp.push(s.name);
    })
    this.setState({
        module: temp,
        selectedModule: 0,
        selectedModuleValue: gasModule[0].name
    })
}
handleModuleChange = (index, value) => {
    // console.log('mannoooooo')
    const { gasModule } = this.props;
    const { selectedTypeValue, selectedModule, start_date, end_date } = this.state;
    const Index2 = gasModule.findIndex(s => s.name === value);    
    this.setState({
      selectedModule: index,
      selectedModuleValue: value,
      sensorIndex: Index2
    });
    this.getLogsData(index, start_date, end_date);
  }
  handleTypeChange = async (index, value) => {
    const { start_date, end_date, selectedModule } = this.state;
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

  getLogsData = (moduleIndex,start_date, end_date) => {
    const { gasModule } = this.props;
    const { selectedTypeValue,selectedModule } = this.state;

    let type2 ;

    if (selectedTypeValue === 'Gas Status Logs') {
      type2 = 'gas_status'
    }
    else if (selectedTypeValue === 'Alarm Logs') {
      type2 = 'alarm_status'
    }
    // console.log('id',moduleIndex)
    this.props.getLogs(gasModule[moduleIndex]._id,type2,start_date,end_date);
  }

  render() {
        const{module,selectedModule,selectedType,type,start_date,end_date,selectedTypeValue}= this.state;
        const{gasModule,logs,logsLoading} = this.props;
        // console.log('logsss',logs.length)

    return (
      <View style={styles.container}>

        <View style={styles.filterView}>
        <View style={styles.inlineList}>
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

          <View style={[styles.inlineList, {marginTop:0}]}>
              <Text style={[styles.DatePickerText, { marginTop: 10 }]}>  Start: </Text>
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
                }}
                onDateChange={(date) => { this.startDateChange(date) }}
              />
              <Text style={[styles.DatePickerText, { marginTop: 10}]}>  End: </Text>
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
                }}
                onDateChange={(date) => { this.endDateChange(date) }}
              />
            </View>
          </View>

          <View style={styles.list}>
          {logsLoading ? (
            <View
              style={styles.loadingView}>
              <Bars size={15} color={colors.primary} />
            </View>
          ) : (
              <>
                {logs.length > 0 ? (
                 
                  <FlatList
                        data={logs}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) => 
                        <Item item={item} type={selectedTypeValue} />}
                        keyExtractor={(item, index) => index.toString()}
                      />
                
                ) : (
                    <View style={styles.loadingView}>
                      <Text style={styles.Text}>Sorry no result</Text>
                    </View>
                  )}
              </>
            )}
          </View>
          </View>
    );
  }
}

export default LogScreen;


const styles = StyleSheet.create({
  container:{
    flex:1,
    // alignItems: "center"
    paddingHorizontal:13,
  },
  filterView:{
    backgroundColor: colors.dullGrey,marginVertical:13,borderRadius:6,
  },
  inlineList:{
    flexDirection: 'row',marginVertical: 13,justifyContent:'space-evenly',borderRadius: 6
  },
  Dropdown: { width: wp('42%')},
  Dropdown1: { width: wp('47%')},
  list:{backgroundColor: colors.dullGrey,borderRadius:6, paddingBottom:13,flex:1},
  loadingView:{ height:"80%", alignItems: 'center', justifyContent: 'center' },

  DatePicker: { width: wp('37%') },
  DatePickerText: { color: "#000", fontWeight: 'bold', fontSize: 13, paddingTop: hp('0.3%') },
  DatePickerInput: { height: hp('2.5%'), borderColor: '#000' },
  DatePickerIcon: { top: hp('0%'), height: hp('10%') },
  DatePickerIcon1: { top: hp('0%'), marginRight: wp('3%'), height: hp('3%'), width: wp('4%') },
  DateText: { color: "#000", fontSize: 14 },
  
  TextView: {
    marginTop: hp('30%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  Text: { color: "#000", fontWeight: 'bold', fontSize: hp('2%') },
})
