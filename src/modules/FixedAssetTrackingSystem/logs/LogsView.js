import React from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  AppState,
  Alert,
  YellowBox
} from 'react-native';

import { fonts, colors } from '../../../styles';
import { Dropdown } from '../../../components';
import moment from 'moment';
import Item from './LogsItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { withNavigation } from "react-navigation";
YellowBox.ignoreWarnings(['DatePickerAndroid']);

class LogsScreen extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        type: '',
        //logtype: 'status',
        dashboardarray:[],
        logtypearray: [],
        sensorarray: [],
        selected1: 0,
        selectedValue1 : this.props.coldchain[0].name,
        selected2: 0,
        selectedValue2 : 'location',
        startDate: moment().subtract(7,'days'),
        endDate: moment().add(1,'day'),
        displayedDate: moment(),
        logs : [],
    }
  }

  async componentDidMount () {
    const {user,coldchain} = this.props;
    const{selectedValue2,selected1,startDate,endDate} = this.state;
    let done = null;

    const temp = []

    user.dashboards.forEach(d => {
      temp.push(d.title);
    })
    this.setState({
      dashboardarray :  temp
    });

    done = await this.props.getColdChainSensors(user.id,'fa');

    if (done === 'done'){
      this.handleSensorData();  
    }

    await this.props.getColdChainTableData(selectedValue2,coldchain[selected1]._id,startDate, endDate);
    
  }

  setDates = dates => {
    this.setState({
      ...dates
    });
  };

  handleSensorData = () => {
    const {coldchain} = this.props;

    const temp = [];

    coldchain.map(s=> {
      temp.push(s.name);
    })
    
    this.setState({
      sensorarray : temp
    })
  }

  handleSensorChange = async (index,value) => {

    const {coldchain,user} = this.props;
    const {selectedValue,type,selectedValue2,startDate, endDate} = this.state;

    const Index2 = coldchain.findIndex(s=> s.name === value);
    this.setState({
      selected1: Index2,
      selectedValue1: coldchain[Index2].name
    });

    if(selectedValue2 !== null){
      await this.props.getColdChainTableData(selectedValue2,coldchain[Index2]._id,startDate, endDate);
    }

  }

  handleTypeChange = async (index,value) => {
    
    const {coldchain} = this.props;   
    const {type,selected1,selectedValue1, startDate,endDate} = this.state;

    this.setState({
      selected2: index,
      selectedValue2: value
    });

    await this.props.getColdChainTableData(value,coldchain[selected1]._id,startDate,endDate);
  }

  startDateChange = async (date) => {
    const {coldchain} = this.props;
    const {selected1,selectedValue2,startDate,endDate} = this.state;
    this.setState({
      startDate: date
    })

    await this.props.getColdChainTableData(selectedValue2,coldchain[selected1]._id,date,endDate);

  }
  endDateChange = async (date) => {
    const {coldchain} = this.props;
    const {selected1,selectedValue2,startDate} = this.state;

    this.setState({
      endDate: date
    })

    await this.props.getColdChainTableData(selectedValue2, coldchain[selected1]._id,startDate,date);
  }

  render() {
    const{assetTrackingData,logs, loading} = this.props;
    const {sensorarray,selectedValue1,selectedValue2,endDate} = this.state;
    
    return (
      <View style={styles.container}>            
        
          <View style = {styles.filterView}>          
            <Dropdown
              placeholder = 'Select Module'
              style={styles.Dropdown}         
              items={sensorarray}
              selectedIndex={this.state.selected1}
              onSelect={(index,value) => this.handleSensorChange(index,value)}
            />
          
            <Dropdown
              placeholder = 'Select Sensor'
              style={styles.Dropdown}         
              items={assetTrackingData}
              selectedIndex={this.state.selected2}
              onSelect={(index,value) => this.handleTypeChange(index,value)}
            />
                       
          </View>
          <View style={styles.datePickerView}>
            <Text style={styles.DatePickerText}>Start: </Text>
          <DatePicker
                style={styles.DatePicker}
                date={this.state.startDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                display="default"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: styles.DatePickerInput,
                  dateIcon: styles.DatePickerIcon
                  
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.startDateChange(date)}}
          />
          <Text style={[styles.DatePickerText,{marginLeft: wp('4%')}]}>End: </Text>
          <DatePicker
                style={styles.DatePicker}
                date={this.state.endDate}
                mode="date"
                placeholder="select date"
                format="YYYY-MM-DD"
                display="default"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateInput: styles.DatePickerInput,
                  dateIcon: styles.DatePickerIcon      
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => {this.endDateChange(date)}}
            />
            </View>
            
            {loading ? (
              <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
                <Bars size={15} color={colors.primary} />
              </View>
            ) : (
              <View>
                {logs.length > 0 ? (
                  <View>
                  {selectedValue2 === 'status' ? (
                  <FlatList                
                    data={ logs }                               
                    renderItem={({item}) => <Item updated_at={item.updated_at} created_at={item.created_at} 
                    messagedata={item.status} title= {this.state.selectedValue2}/>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : selectedValue2 === 'temperature' ? (
                  <FlatList                
                    data={ logs }                               
                    renderItem={({item}) => <Item updated_at={item.updated_at} created_at={item.created_at} 
                    messagedata={item.temperature} title= {this.state.selectedValue2}/>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                ) : (
                  <FlatList                
                    data={ logs }                               
                    renderItem={({item}) => <Item updated_at={item.updated_at} created_at={item.created_at} 
                    messagedata={item.location} title= {this.state.selectedValue2}/>}
                    keyExtractor={(item, index) => index.toString()}
                  />
                )
                } 
                  </View>
                ):(
                  <View style={styles.TextView}>
                    <Text style={styles.Text}>Sorry no matching records found</Text>
                  </View>
                )}              
              </View>
            )}
      </View>
    );
  }
}
export default withNavigation(LogsScreen)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: wp('100%')
  },
  Dropdown: { width: wp('45%'), height: hp('5%'), marginHorizontal:wp('2.5%')},
  filterView: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: hp('1.5%'),
    marginTop: hp('1.5%'),
  },
  datePickerView:{
    alignItems: 'center',
    flexDirection: 'row', 
  },

  DatePicker:{width: wp('37%'), marginLeft:wp('1%')},
  DatePickerText:{marginLeft: wp('3%'), color: colors.gray,fontWeight:'bold'},
  DatePickerInput:{marginLeft: wp('0%'),height:hp('3%')},
  DatePickerIcon: {top: hp('0%'), marginLeft: wp('0%')},

  TextView:{marginTop: hp('30%'),alignItems: 'center', justifyContent: 'center'},
  Text:{color: colors.gray, fontWeight:'bold',fontSize: hp('2%')}
  
});
