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
import Icon from 'react-native-vector-icons/Entypo';

const data = [
  { quarter: 1, earnings: 13000 },
  { quarter: 2, earnings: 16500 },
  { quarter: 3, earnings: 14250 },
  { quarter: 4, earnings: 19000 },
];

const ChartsScreen = props => {
  const [SensorArray, setSensorArray] = useState([]);
  const [SelectedSensor, setSelectedSensor] = useState(-1);
  const [SelectedSensorValue, setSelectedSensorValue] = useState(null);

  const [TypeArray, setTypeArray] = useState([
    'Fill Level Chart',
    'Fuel Tank Lid Status',
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
    const result = await dispatch(getSensors(user.id));
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
      case 'Fuel Tank Lid Status':
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

      dispatch(
        getFuelChartData(type2, range2, sensors[module]._id, start, end),
      );
    } else if (sensors[module] !== undefined) {
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
  console.log('chartsssss', highest);
  return (
    <View style={styles.container} bounces={false}>
      <View>
        <Dropdown
          placeholder="Select Module"
          style={styles.Dropdown1}
          items={SensorArray}
          selectedIndex={SelectedSensor}
          onSelect={(index, value) => handleSensorChange(index, value)}
        />
        <View style={styles.titleView}>
          <Dropdown
            placeholder="Chart Type"
            style={styles.Dropdown2}
            items={TypeArray}
            selectedIndex={SelectedType}
            onSelect={(index, value) => handleTypeChange(index, value)}
          />
          <Dropdown
            placeholder="Chart Range"
            style={styles.Dropdown2}
            items={RangeArray}
            selectedIndex={SelectedRange}
            onSelect={(index, value) => handleRangeChange(index, value)}
          />
        </View>
      </View>
      {loading ? (
        <View
          style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
        >
          <Bars size={15} color={colors.primary} />
        </View>
      ) : (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <View
            style={{ flexDirection: 'row', justifyContent: 'space-around' }}
          >
            {SelectedTypeValue === 'Fill Level Chart' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp('4%'),
                }}
              >
                <Icon name="dot-single" size={30} color="#2196f3" />
                <Text style={{ alignItems: 'center', fontWeight: 'bold' }}>
                  Y-axis:
                </Text>
                <Text>Avergae FillLevel</Text>
              </View>
            ) : SelectedTypeValue === 'Temperature' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp('4%'),
                }}
              >
                <Icon name="dot-single" size={30} color="#2196f3" />
                <Text style={{ alignItems: 'center', fontWeight: 'bold' }}>
                  Y-axis:
                </Text>
                <Text>Average Temperature</Text>
              </View>
            ) : SelectedTypeValue === 'Gen Status' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp('4%'),
                }}
              >
                <Icon name="dot-single" size={30} color="#2196f3" />
                <Text style={{ alignItems: 'center', fontWeight: 'bold' }}>
                  Y-axis:
                </Text>
                <Text>Gen On Count</Text>
              </View>
            ) : SelectedTypeValue === 'Fuel Tank Lid Status' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp('4%'),
                }}
              >
                <Icon name="dot-single" size={30} color="#2196f3" />
                <Text style={{ alignItems: 'center', fontWeight: 'bold' }}>
                  Y-axis:
                </Text>
                <Text>Fuel Tank Lid Status</Text>
              </View>
            ) : null}
            {(SelectedTypeValue === 'Fill Level Chart' ||
              SelectedTypeValue === 'Fuel Tank Lid Status' ||
              SelectedTypeValue === 'Temperature' ||
              SelectedTypeValue === 'Gen Status') &&
            SelectedRangeValue === 'Past Week' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp('4%'),
                  marginLeft: wp('5%'),
                }}
              >
                <Icon name="dot-single" size={30} color="#2196f3" />
                <Text style={{ alignItems: 'center', fontWeight: 'bold' }}>
                  X-axis:
                </Text>
                <Text>Week</Text>
              </View>
            ) : SelectedRangeValue === 'Past Month' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp('4%'),
                }}
              >
                <Icon name="dot-single" size={30} color="#2196f3" />
                <Text style={{ alignItems: 'center', fontWeight: 'bold' }}>
                  X-axis:
                </Text>
                <Text>Month</Text>
              </View>
            ) : SelectedRangeValue === 'Year Chart' ? (
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: hp('4%'),
                }}
              >
                <Icon name="dot-single" size={30} color="#2196f3" />
                <Text style={{ alignItems: 'center', fontWeight: 'bold' }}>
                  X-axis:
                </Text>
                <Text>Year</Text>
              </View>
            ) : null}
          </View>
          <ScrollView horizontal={true} style={styles.background}>
            {SelectedTypeValue === 'Fill Level Chart' ||
            SelectedTypeValue === 'Temperature' ? (
              <ScrollView horizontal={true} style={styles.chartView}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: -20,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginRight: hp('2%'),
                      transform: [{ rotate: '270deg' }],
                    }}
                  >
                    Y-axis
                  </Text>
                </View>
                <View>
                  <VictoryChart
                    width={width}
                    height={hp('45%')}
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 10, y: 70 }}
                    padding={50}
                    domain={{ y: [0, highest] }}
                  >
                    <VictoryAxis
                      dependentAxis={true}
                      style={{
                        axis: { stroke: '#756f6a' },
                        axisLabel: styles.AxisLabel,
                        grid: {
                          stroke: ({ tick }) =>
                            tick > 0.5 ? 'red' : '#e6e6e6',
                        },
                        ticks: { stroke: 'grey', size: 5 },
                        tickLabels: styles.TickLabels,
                      }}
                    />
                    <VictoryAxis
                      style={{
                        axis: { stroke: '#756f6a' },
                        axisLabel: styles.AxisLabel,
                        //grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "#9b9b9b"},
                        ticks: { stroke: 'grey', size: 2 },
                        tickLabels: styles.TickLabels,
                      }}
                    />
                    <VictoryLine
                      data={charts}
                      interpolation="natural"
                      style={{
                        data: {
                          stroke: '#2196f3',
                          strokeWidth: 1.5,
                          strokeLinecap: 'round',
                        },
                      }}
                      animate={{
                        duration: 2000,
                        onLoad: { duration: 1500 },
                      }}
                    />
                  </VictoryChart>
                  <View
                    style={{
                      marginBottom: 1,
                      marginHorizontal: wp('50%'),
                      marginTop: hp('1.5%'),
                    }}
                  >
                    <Text style={{ fontWeight: 'bold' }}>X-axis</Text>
                  </View>
                </View>
              </ScrollView>
            ) : SelectedTypeValue === 'Fuel Tank Lid Status' ||
              SelectedTypeValue === 'Gen Status' ? (
              <ScrollView horizontal={true} style={styles.chartView}>
                <View
                  style={{
                    backgroundColor: '#fff',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: -20,
                  }}
                >
                  <Text
                    style={{
                      fontWeight: 'bold',
                      marginRight: hp('2%'),
                      transform: [{ rotate: '270deg' }],
                    }}
                  >
                    Y-axis
                  </Text>
                </View>
                <View>
                  <VictoryChart
                    width={width}
                    height={hp('45%')}
                    theme={VictoryTheme.material}
                    domainPadding={{ x: 10, y: 55 }}
                    padding={50}
                    domain={{ y: [0, highest] }}
                  >
                    <VictoryAxis
                      dependentAxis={true}
                      style={{
                        axis: { stroke: '#756f6a' },
                        axisLabel: styles.AxisLabel,
                        grid: {
                          stroke: ({ tick }) =>
                            tick > 0.5 ? 'red' : '#e6e6e6',
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
                          stroke: ({ tick }) =>
                            tick > 0.5 ? 'red' : '#e6e6e6',
                        },
                        ticks: { stroke: 'grey', size: 5 },
                        tickLabels: styles.TickLabels,
                      }}
                    />
                    <VictoryBar
                      style={{ data: { fill: '#4f44b6', width: wp('3%') } }}
                      //barWidth={50}
                      animate
                      alignment="start"
                      data={charts}
                    />
                  </VictoryChart>
                  <View
                    style={{
                      marginBottom: 1,
                      marginHorizontal: wp('50%'),
                      marginTop: hp('1.5%'),
                    }}
                  >
                    <Text style={{ fontWeight: 'bold' }}>X-axis</Text>
                  </View>
                </View>
              </ScrollView>
            ) : (
              <View style={styles.TextView}>
                <Text style={styles.Text}>Please Select Chart Type</Text>
              </View>
            )}
          </ScrollView>
        </View>
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
    width: wp('80%'),
    height: hp('4%'),
    alignSelf: 'center',
    marginTop: hp('1.5%'),
  },
  Dropdown2: {
    width: wp('43%'),
    height: hp('4%'),
    marginTop: hp('1%'),
    marginLeft: wp('5%'),
  },
  titleView: {
    alignItems: 'center',
    paddingTop: hp('1%'),
    paddingBottom: hp('1%'),
    flexDirection: 'row',
    backgroundColor: colors.white,
  },
  background: {
    backgroundColor: '#f1f1f8',
    flex: 1,
    paddingHorizontal: hp('0%'),
  },
  chartView: {
    //marginTop: hp('0%'),
    //borderRadius: wp('2%'),
    backgroundColor: colors.white,
    //alignItems: 'center',
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('5%'),
  },
  AxisLabel: { fontSize: hp('5%'), padding: wp('10%') },
  TickLabels: { fontSize: hp('1.2%'), padding: wp('3%') },

  TextView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('30%'),
  },
  Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
});
