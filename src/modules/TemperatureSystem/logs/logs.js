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
        'Fan Status',
        'Fan Interval'
      ],
      fan: [
        'Fan One',
        'Fan Two',
        'Fan Three',
        'Fan Four'
      ],
      fans:[],
      fansObj:[],
      selectedType: 0,
      selectedTypeValue: 'Temperature',
      selectedFanType: 0,
      selectedFanTypeValue: 'Fan One',
      selectedFanId:null,
      selectedFan: 0,
      selectedFanValue: this.props.tempModule[0].fans[0].name,
      module: [],
      selectedModule: 0,
      selectedModuleValue: this.props.tempModule[0].name,
      sensorIndex: null,
      start_date: moment().subtract(3, 'days'),
      end_date: moment().add(1, 'day'),
      loading: false,
      Index:null,
      item:null
    }
}
async componentDidMount() {
    const { user, navigation ,tempModule} = this.props; 
    const {start_date,end_date,selectedModule} = this.state;   
    const done = await this.props.getSensors();
    if (done === 'done') {
        this.handleSensorData();
        this.getLogsData(selectedModule, start_date, end_date);
        this.handleFanData();
    } else {
        console.log('error');
    }
    this.focusListener = navigation.addListener('didFocus', async () => {
        const done = await this.props.getSensors(user.id);
        if (done === 'done') {
            this.handleSensorData();
            this.getLogsData(selectedModule, start_date, end_date);
            this.handleFanData();
        } else {
            console.log('error');
        }
    });
}
handleSensorData = () => {
    const { tempModule } = this.props;
    console.log('module',tempModule);
    const temp = [];
    tempModule.map(s => {
        temp.push(s.name);
    })
    this.setState({
        module: temp,
        selectedModule: 0,
        selectedModuleValue: tempModule[0].name
    })
}
handleFanData = () => {
  const { tempModule } = this.props;
  const {selectedModule,selectedFan} = this.state;
  // console.log('module',tempModule[selectedModule].fans);
  const temp = [];
  const tempObj = [];
  if(selectedModule !== -1){
    if(tempModule[selectedModule].fans.length > 0){
      tempModule[selectedModule].fans.map(s => {
        temp.push(s.name);
        tempObj.push(s);
    })
    }
  }
  this.setState({
    fans: temp,
    fansObj: tempObj,
    selectedFan: 0,
    selectedFanValue: tempModule[selectedModule].fans[0].name
})
  }
handleModuleChange = (index, value) => {
    // console.log('mannoooooo')
    const { tempModule } = this.props;
    const { selectedTypeValue, selectedModule, start_date, end_date } = this.state;
    const Index2 = tempModule.findIndex(s => s.name === value);    
    this.setState({
      selectedModule: index,
      selectedModuleValue: value,
      sensorIndex: Index2
    });
    this.getLogsData(index, start_date, end_date);
  }
handleTypeChange = async (index, value) => {
    const { start_date, end_date, selectedModule ,selectedFanId,fansObj} = this.state;
    const {tempModule} = this.props;
    await this.setState({
      selectedType: index,
      selectedTypeValue: value,
    });
    this.getLogsData(selectedModule, start_date, end_date);

    fansObj.map(f => {
      if(f !== undefined){
        if(value === 'Fan Interval'){
          this.setState({
            selectedFanId: f._id
          })
            this.props.getLogsFan(tempModule[selectedModule]._id,f._id,'fan_interval',start_date,end_date);
        } 
     }
    })
  }
handleFanChange =  (index,value) => {
  const {fansObj,selectedModule,start_date,end_date} = this.state;
  const {tempModule} = this.props;
  this.setState({
    selectedFanValue: value,
    selectedFan:index
  })
  fansObj.map(f => {
    if(f !== undefined){
      if(value === f.name){
        this.setState({
          selectedFanId: f._id
        })
          this.props.getLogsFan(tempModule[selectedModule]._id,f._id,'fan_interval',start_date,end_date);
      } 
   }
  })
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
    const { tempModule ,logs} = this.props;
    const { selectedTypeValue,selectedModule } = this.state;
    // console.log('fans',logs._id)
    let type2 ;

    if (selectedTypeValue === 'Temperature') {
      type2 = 'temperature'
      this.props.getLogs(tempModule[moduleIndex]._id,type2,start_date,end_date);
    }
    else if (selectedTypeValue === 'Fan Status') {
      type2 = 'fan_status'
      this.props.getLogs(tempModule[moduleIndex]._id,type2,start_date,end_date);
    }
    else if (selectedTypeValue === 'Fan Interval') {
      type2 = 'fan_interval'
      // this.handleFanChange();
    }
    // this.props.getLogs(tempModule[moduleIndex]._id,type2,start_date,end_date);
  }

  render() {
        const{module,selectedModule,selectedType,type,start_date,end_date,selectedTypeValue,fans,selectedFan,selectedFanValue}= this.state;
        const{tempModule,logs,logsLoading} = this.props;
        // console.log('logsss',logs)

    return (
      <View style={styles.container}>

        <View style={styles.filterView}>
          {selectedTypeValue === 'Fan Interval' ? (
            <View>
                <View>
            <Dropdown
              placeholder='Select Module...'
              // style={styles.Dropdown}
              items={module}
              selectedIndex={selectedModule}
              onSelect={(index, value) => this.handleModuleChange(index, value)}
            />
          </View>
        <View style={styles.inlineList}>
            <Dropdown
              placeholder='Select Type...'
              style={styles.Dropdown1}
              items={type}
              selectedIndex={selectedType}
              onSelect={(index, value) => this.handleTypeChange(index, value)}
            />
            <Dropdown
              placeholder='Select Fan...'
              style={styles.Dropdown1}
              items={fans}
              selectedIndex={selectedFan}
              onSelect={(value,index) => this.handleFanChange(value,index)}
            />
          </View>
            </View>
          ):(
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
          )}
      
         
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
  Dropdown: { width: wp('47%')},
  Dropdown1: { width: wp('42%')},
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
