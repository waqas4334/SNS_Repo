/* eslint-disable no-nested-ternary */
import React from 'react';
import { View, Text, ScrollView, StyleSheet,ActivityIndicator } from 'react-native';
import {
    VictoryPie,
    VictoryChart,
    VictoryCandlestick,
    VictoryLine,
    VictoryBoxPlot,
    VictoryBar,
    VictoryTheme,
    VictoryAxis
} from 'victory-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import { Dropdown } from '../../../components';
import { colors, fonts } from '../../../styles';
import Icon from 'react-native-vector-icons/Entypo';

class ChartsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            module: [],
            selectedModule: 0,
            selectedModuleValue: this.props.sensors[0].name,
            type: [
              'Fill Level Chart',
              'Tank Lid Status Chart',
              'Door Status Chart',
              'Hydro Pump Status Chart',
              'PH Value Chart',
              'TDS Value Chart',
              'Force Hydro Pump Status Chart',
              'Smoke Alarm Status Chart',
              'Line Current Chart',
              'Priming Chart',
              'Pump Vibration Chart'
            ],
            selectedType: -1,
            selectedTypeValue: null,
            range: ['Past Week', 'Past Month', 'Year Chart'],
            selectedRange: 0,
            selectedRangeValue: 'Past Week',
        }
    }

    async componentDidMount() {
        const { user, sensors } = this.props;
        const done = await this.props.getSensors(user.id);
        if (done === 'done') {
            this.handleSensorData();
        }
    }

    handleSensorData = () => {
        const { sensors } = this.props;
        const temp = [];
        sensors.map(s => {
            temp.push(s.name);
        })
        this.setState({
            module: temp,
            selectedModule: 0,
            selectedModuleValue: sensors[0].name
        })
    }

    handleModuleChange = (index, value) => {
        const { selectedTypeValue, selectedRangeValue } = this.state;
        const i = sensors.findIndex(s => s.name === value)
        this.setState({
            selectedModule: index,
            selectedModuleValue: value
        })
        this.getChartData(i, selectedTypeValue, selectedRangeValue);
    }

    handleTypeChange = (index, value) => {
        const { selectedModule, selectedRangeValue } = this.state;
        this.setState({
            selectedType: index,
            selectedTypeValue: value,
        });
        this.getChartData(selectedModule, value, selectedRangeValue);
    };

    handleRangeChange = (index, value) => {
        const { selectedModule, selectedTypeValue } = this.state;
        this.setState({
            selectedRange: index,
            selectedRangeValue: value,
        });
        this.getChartData(selectedModule, selectedTypeValue, value);
    };

    getChartData = (module, type, range) => {
        const { sensors } = this.props;

        let range2 = 'week';
        let type2 = 'fillLevel';

        if (type === 'Fill Level Chart') {
          type2 = 'fillLevel'
      }
      else if (type === 'Tank Lid Status Chart') {
          type2 = 't_lid'
      }
      else if (type === 'Door Status Chart') {
          type2 = 'door_status'
      }
      else if (type === 'Force Hydro Pump Status Chart') {
          type2 = 'force-motor'
      }
      else if (type === 'PH Value Chart') {
          type2 = 'ph'
      }
      else if (type === 'TDS Value Chart') {
          type2 = 'tds'
      }
      else if (type === 'Smoke Alarm Status Chart') {
          type2 = 'alarm'
      }
      else if (type === 'Hydro Pump Status Chart') {
          type2 = 'motor'
      }
      else if (type === 'Line Current Chart') {
        type2 = 'Ia'
    }
      else if (type === 'Priming Chart') {
          type2 = 'volve'
      }
      else if (type === 'Pump Vibration Chart') {
          type2 = 'vib'
      }
      if (range === 'Past Week') {
        range2 = 'week'
    }
    else if (range === 'Past Month') {
        range2 = 'month'
    }
    else if (range === 'Year Chart') {
        range2 = 'year'
    }

        if (sensors[module] !== undefined) {
            this.props.getCharts(type2,range2, sensors[module]._id);
        }
    };

    render() {
        const { selectedRangeValue, module, selectedModule, selectedType, selectedRange, type, range, selectedTypeValue } = this.state;
        const { user, sensors, charts, chartsLoading, highest } = this.props;
        console.log('charts', charts);
       

        let width = null;
        switch (selectedRangeValue) {
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

        return (
          <View style={{ flex: 1 }}>
            <Dropdown
              placeholder='Select Module...'
              style={[styles.Dropdown, { width: wp('93%'), height: hp('4%'), marginTop: hp('2%'), marginLeft: wp('3%') }]}
              items={module}
              selectedIndex={selectedModule}
              onSelect={(index, value) => this.handleModuleChange(index, value)}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: hp('2%') }}>
              <Dropdown
                placeholder='Select Chart Type...'
                style={styles.Dropdown1}
                items={type}
                selectedIndex={selectedType}
                onSelect={(index, value) => this.handleTypeChange(index, value)}
              />
              <Dropdown
                placeholder='Select Chart Range..'
                style={styles.Dropdown}
                items={range}
                selectedIndex={selectedRange}
                onSelect={(index, value) => this.handleRangeChange(index, value)}
              />
            </View>

            {chartsLoading ? (
              <View
                style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
              >
                <ActivityIndicator size={15} color={colors.primary} />
              </View>
                ) : (
                  <View style={{flex:1,backgroundColor:'#fff'}}>
                  <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                    {selectedTypeValue === 'Fill Level Chart' ? (
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                     <Icon name='dot-single' size={30} color='#2196f3'/>
                      <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                      <Text>Average FillLevel</Text>
                      </View>
                    ): selectedTypeValue === 'Tank Lid Status Chart' ?(
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                      <Icon name='dot-single' size={30} color='#2196f3'/>
                      <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                      <Text>Tank Lid Open Count</Text>
                      </View>
                    ):
                    selectedTypeValue === 'Door Status Chart' ?(
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                      <Icon name='dot-single' size={30} color='#2196f3'/>
                      <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                      <Text>Door Open Count</Text>
                      </View>
                    ):                  
                    selectedTypeValue === 'Hydro Pump Status Chart' ?(
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                     <Icon name='dot-single' size={30} color='#2196f3'/>
                      <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                      <Text>Running Hours</Text>
                      </View>
                    ): 
                    selectedTypeValue === 'PH Value Chart' ?(
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                      <Icon name='dot-single' size={30} color='#2196f3'/>
                      <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                      <Text>Average</Text>
                      </View>
                    ):selectedTypeValue === 'TDS Value Chart' ?(
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                      <Icon name='dot-single' size={30} color='#2196f3'/>
                      <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                      <Text>Average</Text>
                      </View>
                    ):selectedTypeValue === 'Force Hydro Pump Status Chart' ?(
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                      <Icon name='dot-single' size={30} color='#2196f3'/>
                      <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                      <Text>Running Hours</Text>
                      </View>
                    ):selectedTypeValue === 'Smoke Alarm Status Chart' ?(
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                      <Icon name='dot-single' size={30} color='#2196f3'/>
                      <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                      <Text>Alarm Count</Text>
                      </View>
                    ):selectedTypeValue === 'Line Current Chart' ?(
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                      <Icon name='dot-single' size={30} color='#2196f3'/>
                      <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                      <Text>Average Line Current</Text>
                      </View>
                    ):selectedTypeValue === 'Priming Chart' ?(
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                      <Icon name='dot-single' size={30} color='#2196f3'/>
                      <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                      <Text>Valve Open Count</Text>
                      </View>
                    ):selectedTypeValue === 'Pump Vibration Chart' ?(
                      <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                      <Icon name='dot-single' size={30} color='#2196f3'/>
                      <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                      <Text>Abnormal Count</Text>
                      </View>
                    ):(null)}
                      {(selectedTypeValue === 'Fill Level Chart'|| selectedTypeValue === 'Tank Lid Status Chart'|| selectedTypeValue === 'Door Status Chart'
                      || selectedTypeValue === 'Hydro Pump Status Chart' || selectedTypeValue === 'PH Value Chart' || selectedTypeValue === 'TDS Value Chart'
                      || selectedTypeValue === 'Force Hydro Pump Status Chart' || selectedTypeValue === 'Smoke Alarm Status Chart' || selectedTypeValue === 'Line Current Chart'
                      || selectedTypeValue === 'Priming Chart' || selectedTypeValue === 'Pump Vibration Chart') 
                      && selectedRangeValue === 'Past Week' ? (
                          <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                          <Icon name='dot-single' size={30} color='#2196f3'/>
                          <Text style={{alignItems:'center',fontWeight:'bold'}}>X-axis:</Text>
                          <Text>Week</Text>
                          </View>
                      ): selectedRangeValue === 'Past Month' ? (
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                          <Icon name='dot-single' size={30} color='#2196f3'/>
                          <Text style={{alignItems:'center',fontWeight:'bold'}}>X-axis:</Text>
                          <Text>Month</Text>
                          </View>
                      ):selectedRangeValue === 'Year Chart' ? (
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                         <Icon name='dot-single' size={30} color='#2196f3'/>
                          <Text style={{alignItems:'center',fontWeight:'bold'}}>X-axis:</Text>
                          <Text>Year</Text>
                          </View>
                      ):(null)}
                    </View>
                  <ScrollView horizontal style={styles.background}>
                    {selectedTypeValue === 'Fill Level Chart'  || selectedTypeValue === 'PH Value Chart' || selectedTypeValue === 'TDS Value Chart' 
                    || selectedTypeValue === 'Line Current Chart'? (
                      <ScrollView horizontal style={styles.chartView}>
                        <View style={{backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginRight:-20}}>
                                    <Text style={{ fontWeight:'bold', marginRight:hp('2%'),
                                      transform: [{ rotate: '270deg'}]}}>Y-axis</Text>
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
                            dependentAxis
                            style={{
                                                    axis: { stroke: '#756f6a' },
                                                    axisLabel: styles.AxisLabel,
                                                    grid: {
                                                        stroke: ({ tick }) => (tick > 0.5 ? 'blue' : '#e6e6e6'),
                                                    },
                                                    ticks: { stroke: 'grey', size: 5 },
                                                    tickLabels: styles.TickLabels,
                                                }}
                          />
                          <VictoryAxis
                            style={{
                                                    axis: { stroke: '#756f6a' },
                                                    axisLabel: styles.AxisLabel,
                                                    // grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "#9b9b9b"},
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
                        <View style={{marginBottom:1,marginHorizontal:wp('50%'),marginTop:hp('1.5%')}}>
                                    <Text style={{fontWeight:'bold'}}>X-axis</Text>
                                    </View> 
                                    </View>
                      </ScrollView>
                                ) : selectedTypeValue === 'Force Hydro Pump Status Chart' ||
                                selectedTypeValue === 'Smoke Alarm Status Chart' || selectedTypeValue === 'Hydro Pump Status Chart' || 
                                selectedTypeValue === 'Door Status Chart' || selectedTypeValue === 'Tank Lid Status Chart' 
                                || selectedTypeValue === 'Priming Chart' || selectedTypeValue === 'Pump Vibration Chart'? (
                                  <ScrollView horizontal style={styles.chartView}>
                                    <View style={{backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginRight:-20}}>
                                    <Text style={{ fontWeight:'bold', marginRight:hp('2%'),
                                      transform: [{ rotate: '270deg'}]}}>Y-axis</Text>
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
                                        dependentAxis
                                        style={{
                                                        axis: { stroke: '#756f6a' },
                                                        axisLabel: styles.AxisLabel,
                                                        grid: {
                                                            stroke: ({ tick }) => (tick > 0.5 ? '#756f6a' : '#e6e6e6'),
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
                                                            stroke: ({ tick }) => (tick > 0.5 ? '#756f6a' : '#e6e6e6'),
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
                                      />
                                    </VictoryChart>
                                    <View style={{marginBottom:1,marginHorizontal:wp('50%'),marginTop:hp('1.5%')}}>
                                    <Text style={{fontWeight:'bold'}}>X-axis</Text>
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

        )
    }
}

export default ChartsScreen;

const styles = StyleSheet.create({
    Dropdown: { width: wp('30%'), height: hp('4.5%'), marginTop: hp('1.5%') ,backgroundColor:'#fff'},
    Dropdown1: { width: wp('63%'), height: hp('4.5%'), marginTop: hp('1.5%') ,backgroundColor:'#fff'},
    AxisLabel: { fontSize: hp('5%'), padding: wp('10%') },
    TickLabels: { fontSize: hp('1.2%'), padding: wp('3%') },
    background: { backgroundColor: '#f1f1f8', flex: 1, paddingHorizontal: hp('0%'), },
    TextView: { alignItems: 'center', justifyContent: 'center', marginLeft: wp('30%'), },
    Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%') },
    chartView: { backgroundColor: colors.white, paddingHorizontal: wp('2%'), paddingVertical: hp('5%') },
})