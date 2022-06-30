import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text,
  FlatList,
  YellowBox
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import moment from 'moment';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DatePicker from 'react-native-datepicker';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { withNavigation } from "react-navigation";
import { useDispatch, useSelector } from 'react-redux';
import Item from './LogsItem';
import { Dropdown } from '../../../components';
import { fonts, colors } from '../../../styles';
import {getSensors,getFuelMaintananceTableData} from '../../../redux/actions/fuelActions';

YellowBox.ignoreWarnings(['DatePickerAndroid']);

const LogsScreen = (props) => {

  const user = useSelector(state => state.auth.user);
  const sensors = useSelector(state => state.fuel.sensors);
  const loading = useSelector(state => state.fuel.loading);
  const logs = useSelector(state => state.fuel.maintananceLogs);

  const dispatch = useDispatch();
  const { navigation } = props;
  
  const [SensorArray, setSensorArray] = useState([]);
  const [Selected, setSelected] = useState(0);
  const [SelectedValue, setSelectedValue] = useState(sensors[0].name);
  const [StartDate,setStartDate] = useState(moment().subtract(1,'days'));
  const [EndDate,setEndDate] = useState(moment().add(1,'day'));

  const fetchSensorData = async () => {
    const result = await dispatch(getSensors('fuel', user.id));
    if (result === 'done') {
      handleSensorData();
    }
  };

  useEffect(() => {
    fetchSensorData();
    navigation.addListener('willFocus', async () => {
      fetchSensorData();
    });
  }, []);

  const handleSensorData = async () => {
    const temp = [];

    sensors.map(s => {
      temp.push(s.name);
    });
    const name = await sensors[0].name;
    setSensorArray(temp);
    setSelected(0);
    setSelectedValue(name);
  };

  const handleSensorChange = (index, value) => {
    setSelected(index);
    setSelectedValue(value);

    dispatch(getFuelMaintananceTableData('maintanance',sensors[index]._id,StartDate,EndDate));
  };

  const startDateChange = (date) => {
    setStartDate(date);

    dispatch(getFuelMaintananceTableData('maintanance',sensors[Selected]._id,date,EndDate));

  }
  const endDateChange = (date) => {
    setEndDate(date);

    dispatch(getFuelMaintananceTableData('maintanance', sensors[Selected]._id,StartDate,date));
  }

      return (
        <View style={styles.container}>            
        
          <View style={styles.filterView}>          
            <Dropdown
              placeholder='Select Module'
              style={styles.Dropdown}         
              items={SensorArray}
              selectedIndex={Selected}
              onSelect={(index,value) => handleSensorChange(index,value)}
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
                  dateIcon: styles.DatePickerIcon
                  
                  // ... You can check the source to find the other keys.
                }}
              onDateChange={(date) => {startDateChange(date)}}
            />
            <Text style={[styles.DatePickerText,{marginLeft: wp('4%')}]}>End: </Text>
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
                  dateIcon: styles.DatePickerIcon
                  ,                  
                  // ... You can check the source to find the other keys.
                }}
              onDateChange={(date) => {endDateChange(date)}}
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
                    <FlatList                
                      data={logs}                               
                      renderItem={({item}) => <Item maintenance={item.maintanance} runningtime={item.running_time} performedAt={item.performed_at} />}
                      keyExtractor={(item, index) => index.toString()}
                    />      
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
export default withNavigation(LogsScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    width: wp('100%')
  },
  filterView: {
    alignItems: 'center',
    // flexDirection: 'row',
    marginBottom: hp('1.5%'),
    marginTop: hp('1.5%'),
  },
  datePickerView:{
    alignItems: 'center',
    flexDirection: 'row',
    // marginBottom: hp('10%') 
  },

  DatePicker:{width: wp('37%'), marginLeft:wp('1%')},
  DatePickerText:{marginLeft: wp('3%'), color: colors.gray,fontWeight:'bold'},
  DatePickerInput:{marginLeft: wp('0%'),height:hp('3%')},
  DatePickerIcon: {top: hp('0%'), marginLeft: wp('0%')},
  Dropdown:{ width: wp('80%'),height: hp('4%'), alignSelf: 'center', marginTop: hp('1.5%')},

  TextView:{marginTop: hp('30%'),alignItems: 'center', justifyContent: 'center'},
  Text:{color: colors.gray, fontWeight:'bold',fontSize: hp('2%')}
  
});
