  /* eslint-disable no-nested-ternary */
/* eslint-disable default-case */
import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {
  VictoryPie,
  VictoryChart,
  VictoryCandlestick,
  VictoryLine,
  VictoryBoxPlot,
  VictoryBar,
  VictoryTheme,
  VictoryAxis,
  VictoryLabel,
  VictoryClipContainer,
} from 'victory-native';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Overlay } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';
import moment from 'moment';
import { colors, fonts } from '../../../styles';
import { Dropdown } from '../../../components';
import {
  getFuelChartData,
  getSensors,
} from '../../../redux/actions/fuelActions';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 }
];

const ChartsScreen = props => {
  const [SensorArray, setSensorArray] = useState([]);
  const [SelectedSensor, setSelectedSensor] = useState(-1);
  const [SelectedSensorValue, setSelectedSensorValue] = useState(null);

  const [TypeArray, setTypeArray] = useState([
    'Fill Level Chart',
    'Door Status',
    'Temperature',
    'Gen Status',
  ]);
  const [SelectedType, setSelectedType] = useState(-1);
  const [SelectedTypeValue, setSelectedTypeValue] = useState(null);

  const [RangeArray, setRangeArray] = useState([
    'Past Week',
    'Past Month',
    'Year Chart',
  ]);
  const [SelectedRange, setSelectedRange] = useState(0);
  const [SelectedRangeValue, setSelectedRangeValue] = useState('Past Week');
  const [visible, setVisible] = useState(false);
  const [StartDate, setStartDate] = useState(moment().subtract(1, 'days'));
  const [EndDate, setEndDate] = useState(moment().add(1, 'day'));

  const dispatch = useDispatch();

  const user = useSelector(state => state.auth.user);
  const sensors = useSelector(state => state.fuel.sensors);
  const loading = useSelector(state => state.fuel.loading);
  const charts = useSelector(state => state.fuel.charts);
  const highest = useSelector(state => state.fuel.highest);
  const y = useSelector(state => state.fuel.y);

  const fetchSensorData = async () => {
    const result = await dispatch(getSensors('fuel', user.id));
    if (result === 'done') {
      await handleSensorData();
    }
  };

  useEffect(() => {
    fetchSensorData();
  }, []);

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const handleSensorData = async () => {
    const temp = [];

    // eslint-disable-next-line array-callback-return
    sensors.map(s => {
      temp.push(s.name);
    });
    setSensorArray(temp);
    setSelectedSensor(0);
  };

  const handleSensorChange = (index, value) => {
    const Index2 = sensors.findIndex(s => s.name === value);
    setSelectedSensor(Index2);
    setSelectedSensorValue(value);

    getChartData(SelectedTypeValue, SelectedRangeValue, Index2);
  };

  const handleTypeChange = (index, value) => {
    setSelectedType(index);
    setSelectedTypeValue(value);

    getChartData(value, SelectedRangeValue, SelectedSensor);
  };

  const handleRangeChange = (index, value) => {
    setSelectedRange(index);
    setSelectedRangeValue(value);

    getChartData(SelectedTypeValue, value, SelectedSensor);
  };

  const handleStartDateChange = date => {
    setStartDate(date);
  };

  const handleEndDateChange = date => {
    setEndDate(date);
  };

  const getChartData = (type, range, module) => {
    let range2 = 'week';
    let type2 = 'fillLevel';

    switch (type) {
      case 'Fill Level Chart':
        type2 = 'fillLevel';
        break;
      case 'Door Status':
        type2 = 'doorStatus';
        break;
      case 'Temperature':
        type2 = 'temperature';
        break;
      case 'Gen Status':
        type2 = 'genStatus';
        break;
    }

    switch (range) {
      case 'Past Week':
        range2 = 'week';
        break;
      case 'Past Month':
        range2 = 'month';
        break;
      case 'Year Chart':
        range2 = 'year';
        break;
    }

    if (sensors[module] !== undefined && range === 'Year Chart') {
      const start = moment().subtract(364, 'days');
      const end = moment();

      dispatch(getFuelChartData(type2, range2, sensors[module]._id, start, end));
    } else

    if (sensors[module] !== undefined) {
      dispatch(getFuelChartData(type2, range2, sensors[module]._id));
    }
  };

  let width = null;
  switch (SelectedRangeValue) {
    case 'Past Week':
      width = wp('125%');
      break;
    case 'Past Month':
      width = wp('460%');
      break;
    case 'Year Chart':
      width = wp('200%');
      break;
  }
console.log('chartsssss',highest)
  return (
    <View style={styles.container} bounces={false}>
      <View style={{marginHorizontal: wp('2%')}}> 
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <Dropdown
            placeholder="Select Module"
            style={styles.Dropdown1}
            items={SensorArray}
            selectedIndex={SelectedSensor}
            onSelect={(index, value) => handleSensorChange(index, value)}
          />
          <Dropdown
            placeholder="Chart Type"
            style={styles.Dropdown2}
            items={TypeArray}
            selectedIndex={SelectedType}
            onSelect={(index, value) => handleTypeChange(index, value)}
          />
        </View>
        <View style={styles.titleView}>
          <TouchableOpacity
            style={{borderWidth: 1, padding:1, borderRadius:5, borderColor: colors.primary,width:wp('20%'),paddingLeft:wp('2%')}}
            onPress={toggleOverlay}
          >
            <Text style={{color: colors.primary}}>Filters</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <View style={{flex:1, justifyContent:'center', alignItems:'center',paddingHorizontal: wp('12.5%')}}>
          <Text style={{fontWeight:'bold', fontSize: 18, marginBottom: hp('4%')}}>Filters</Text>
          <Text style={{fontWeight:'bold',alignSelf: 'flex-start',fontSize: 12,marginBottom: hp('2%')}}>Standard: </Text>
          <Dropdown
            placeholder="Chart Range"
            style={styles.Dropdown2}
            items={RangeArray}
            selectedIndex={SelectedRange}
            onSelect={(index, value) => handleRangeChange(index, value)}
          />

          <Text style={{fontWeight:'bold',alignSelf: 'flex-start',fontSize: 12,marginVertical: hp('1%'), marginTop: hp('6%')}}>Custom: </Text>

          <View style={{flexDirection:'row', marginTop:hp('1%')}}>
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
          </View>

          <View style={{flexDirection:'row',marginTop:hp('1%')}}>
            <Text style={styles.DatePickerText}>End: </Text>
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
          <TouchableOpacity 
            style={{marginTop: hp('10%'),backgroundColor: colors.primary,alignItems:'center',justifyContent:'center',padding:6,paddingHorizontal: wp('18%')}}
            onPress={toggleOverlay}
          >
            <Text style={{color:colors.white,fontWeight:'bold'}}>OK</Text>
          </TouchableOpacity>
        </View>
      </Overlay>


      {loading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      ) : (

        <ScrollView horizontal style={styles.background}>
          {SelectedTypeValue === 'Fill Level Chart' ||
          SelectedTypeValue === 'Temperature' ? (
            <ScrollView horizontal style={styles.chartView}>
              {/* <VictoryChart theme={VictoryTheme.material} width={width} >
                <VictoryLine
                  style={{
                    data: { stroke: "#c43a31" },
                    parent: { border: "1px solid #ccc"}
                  }}
                  data={charts}
                />
                <VictoryAxis dependentAxis tickValues={y} domain={[0,3]} offsetY={200} />
                <VictoryAxis />
              </VictoryChart>  */}
              <VictoryChart
                width={width}
                height={hp('55%')}
                theme={VictoryTheme.material}
                // domainPadding={{ x: 10}}
                padding={50}
                domain={{ y: [0, 55]}}
                // domain={{ y: [0, highest] }}
              >
                <VictoryAxis
                  // domain={{x: [0, 100], y: [0, 10]}}
                  dependentAxis
                  padding={10}
                  // tickLabelComponent={<VictoryLabel dy={2} />}
                  // invertAxis
                  // tickValues={y}
                  // domain={[0,3]} 
                  // offsetY={200}
                  style={{
                    // axis: { stroke: '#756f6a' },
                    axisLabel: styles.AxisLabel,
                    // grid: {
                    //   stroke: ({ tick }) => (tick > 0.5 ? 'red' : '#e6e6e6'),
                    // },
                    // ticks: { stroke: 'grey', size: 5 },
                    tickLabels: styles.TickLabels,
                  }}
                />
                <VictoryAxis
                  style={{
                    // axis: { stroke: '#756f6a' },
                    axisLabel: styles.AxisLabel,
                    // grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "#9b9b9b"},
                    // ticks: { stroke: 'grey', size: 2 },
                    tickLabels: styles.TickLabels,
                  }}
                />
                <VictoryLine
                  domain={{ y: [0, highest]}}
                  data={charts}
                  interpolation="natural"
                  style={{
                    data: {
                      stroke: '#2196f3',
                      strokeWidth: 1.5,
                      strokeLinecap: 'round',
                    },
                    parent: { border: "1px solid #ccc"}
                  }}
                  animate={{
                    duration: 2000,
                    onLoad: { duration: 1500 },
                  }}
                />
              </VictoryChart>
            </ScrollView>
          ) : SelectedTypeValue === 'Door Status' ||
            SelectedTypeValue === 'Gen Status' ? (
              <ScrollView horizontal style={styles.chartView}>
                <VictoryChart
                  width={width}
                  height={hp('55%')}
                  theme={VictoryTheme.material}
                  domainPadding={{ x: 10, y: 55 }}
                  padding={50}
                  domain={{ y: [0, highest] }}
                >
                  <VictoryAxis
                    dependentAxis
                    style={{
                    axis: { stroke: '#756f6a' },
                    axisLabel: styles.AxisLabel,
                    grid: {
                      stroke: ({ tick }) => (tick > 0.5 ? 'red' : '#e6e6e6'),
                    },
                    ticks: { stroke: 'grey', size: 5 },
                    tickLabels: styles.TickLabels,
                  }}
                  />
                  <VictoryAxis
                    style={{
                    axis: { stroke: '#756f6a' },
                    axisLabel: styles.AxisLabel,
                    grid: {
                      stroke: ({ tick }) => (tick > 0.5 ? 'red' : '#e6e6e6'),
                    },
                    ticks: { stroke: 'grey', size: 5 },
                    tickLabels: styles.TickLabels,
                  }}
                  />
                  <VictoryBar
                    style={{ data: { fill: '#4f44b6', width: wp('3%') } }}
                  // barWidth={50}
                    animate
                    alignment="start"
                    data={charts}
                    // x="x"
                    // y="y"
                  />
                </VictoryChart>
              </ScrollView>
          ) : (
            <View style={styles.TextView}>
              <Text style={styles.Text}>Please Select Chart Type</Text>
            </View>
          )}
        </ScrollView>
      )}
    </View>
  );
};
export default ChartsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Dropdown1: {
    width: wp('45%'),
    height: hp('4%'),
    alignSelf: 'center',
    marginTop: hp('1.5%'),
  },
  Dropdown2: {
    width: wp('47%'),
    height: hp('4%'),
    marginTop: hp('1.5%'),
    // marginLeft: wp('5%'),
  },
  titleView: {
    // paddingHorizontal: wp('20%'),
    justifyContent:'center',
    backgroundColor: colors.white,
    height:hp('5%'),
    paddingLeft:wp('76%'),
    marginTop: hp('0.5%')
  },
  background: {
    backgroundColor: '#f1f1f8',
    flex: 1,
    paddingHorizontal: hp('0%'),
  },
  chartView: {
    // marginTop: hp('0%'),
    // borderRadius: wp('2%'),
    backgroundColor: colors.white,
    // alignItems: 'center',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('8%'),
  },
  AxisLabel: { fontSize: hp('5%'), padding: wp('10%') },
  TickLabels: { fontSize: hp('1.2%'), padding: wp('3%') },

  TextView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('30%'),
  },
  Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
  DatePicker: { width: wp('37%'), marginLeft: wp('1%') },
  DatePickerText: {
    marginLeft: wp('3%'),
    color: colors.gray,
    fontWeight: 'bold',
    marginTop: hp('1.5%'),
  },
  DatePickerInput: { marginLeft: wp('0%'), height: hp('3%') },
  DatePickerIcon: { marginLeft: wp('0%') },
});
