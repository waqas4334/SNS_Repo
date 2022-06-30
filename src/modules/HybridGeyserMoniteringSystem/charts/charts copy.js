import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet,ActivityIndicator,Platform } from 'react-native';
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
import { useDispatch, useSelector } from 'react-redux';
import { getCharts, getSensors } from '../../../redux/actions/hybridgeyserAction';


const ChartsScreen = () => {
    const user = useSelector(state => state.auth.user);
    const geyserModule = useSelector(state => state.geyser.geyserModule);
    const geyserLoading = useSelector(state => state.geyser.geyserLoading);
    const charts = useSelector(state => state.geyser.charts);
    const chartsLoading = useSelector(state => state.geyser.chartsLoading);
    const highest = useSelector(state => state.geyser.highest);
    const dispatch = useDispatch();  

    const [dialogVisible1, setDialogVisible1] = useState(false);
    const [dialogVisible2, setDialogVisible2] = useState(false);
    const [moduleArray, setModuleArray] = useState([]);

    const [selectedModule, setSelectedModule] = useState(-1);
    const [selectedModuleValue, setSelectedModuleValue] = useState(null);

    const [type, setType] = useState( [
        'Temperature',
        'Burner Status',
        'Geyser Status'])
    const [selectedType, setSelectedType] = useState(-1);
    const [selectedTypeValue, setSelectedTypeValue] = useState(null);

    const [range, setRange] =  useState(['Past Week', 'Past Month', 'Year Chart'])
    const [selectedRange, setSelectedRange] = useState(0);
    const [selectedRangeValue, setSelectedRangeValue] = useState('Past Week');

    const [mode, setMode] = useState('time');

    useEffect(() => {
        handleSegmentData();
    }, []);
    const handleSegmentData = async () => {
        const data = await dispatch(getSensors(user.id));
        // console.log('data',data);
        if (data === 'done') {
            handleSensorData();
        }       
    }
    const handleSensorData = () => {
        const temp = [];
        geyserModule.map(s => {
            temp.push(s.name);
        })
        setModuleArray(temp),
        setSelectedModule(0),
        setSelectedModuleValue (geyserModule[0].name)
    }
   const  handleSensorChange = (index, value) => {
        const Index2 = geyserModule.findIndex(s => s.name === value);
            setSelectedModule(index)
            setSelectedModuleValue(value)
            // setSensorIndex(Index2)
            getChartData(Index2,selectedTypeValue,selectedRangeValue);
    }
    const handleTypeChange =  (index, value) => {
        setSelectedType(index);      
        setSelectedTypeValue(value);
        getChartData(selectedModule,value,selectedRangeValue);

    }
    const handleRangeChange =  (index, value) => {
        setSelectedRange(index);
        setSelectedRangeValue(value);
        getChartData(selectedModule,selectedTypeValue,value);
    }
    const  getChartData = (moduleIndex,type,range) => {
        let range2 = 'week';
        let type2 = 'Temperature';

        if (type === 'Temperature') {
            type2 = 'temperature'
        }
        else if (type === 'Burner Status') {
            type2 = 'burner_status'
        }
        else if (type === 'Geyser Status') {
            type2 = 'geyser_status'
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
        // console.log('module',geyserModule[selectedModule]._id, type2,range2)
        if (geyserModule[moduleIndex] !== undefined) {
            dispatch(getCharts(geyserModule[moduleIndex]._id,type2,range2));
        }
    };

    let width = null;
    switch (selectedRangeValue) {
        case 'Past Week':
            width = wp('140%');
            break;
        case 'Past Month':
            width = wp('570%');
            break;
        case 'Year Chart':
            width = wp('200%');
            break;
    }
    return(
        <View style={{flex:1}}>
            <View>
            <Dropdown
                    placeholder='Select Module...'
                    style={styles.Dropdown}
                    items={moduleArray}
                    selectedIndex={selectedModule}
                    onSelect={(index, value) => handleSensorChange(index, value)}
                />
             <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: hp('2%') }}>
              <Dropdown
                placeholder='Select Chart Type...'
                style={styles.Dropdown1}
                items={type}
                selectedIndex={selectedType}
                onSelect={(index, value) => handleTypeChange(index, value)}
              />
              <Dropdown
                placeholder='Select Chart Range..'
                style={styles.Dropdown2}
                items={range}
                selectedIndex={selectedRange}
                onSelect={(index, value) => handleRangeChange(index, value)}
              />
            </View>
            </View>

            {chartsLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Bubbles size={15} color={colors.primary} />
          </View>
                ) : (
                    <View style={{flex:1,backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}> 
                       {selectedTypeValue === 'Temperature' ? (
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                          <Icon name='dot-single' size={30} color='#2196f3'/>
                        <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                        <Text>Temperature</Text>
                        </View>
                      ): selectedTypeValue === 'Burner Status' ?(
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                          <Icon name='dot-single' size={30} color='#2196f3'/>
                        <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                        <Text>Burner Status</Text>
                        </View>
                      ): selectedTypeValue === 'Geyser Status' ?(
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                          <Icon name='dot-single' size={30} color='#2196f3'/>
                        <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                        <Text>Geyser Status</Text>
                        </View> 
                        ):(null)}

                        {(selectedTypeValue === 'Temperature' || selectedTypeValue === 'Burner Status' || selectedTypeValue === 'Geyser Status') 
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
                    <View style={{backgroundColor:'transparent',marginLeft:wp('2%'),flex:1,paddingTop:hp('2%')}}>
                    {selectedTypeValue === 'Temperature'  ? (
                      <View style={{flex:1}}>
                        <ScrollView horizontal style={styles.chartView}>
                        <View style={{backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginRight:-20}}>
                          <Text style={{ fontWeight:'bold',marginRight:wp('2%'),
                            transform: [{ rotate: '270deg'}]}}>Y-axis</Text>
                        </View>
                        <View>
                        <VictoryChart
                          width={width}
                          height={hp('45%')}
                          theme={VictoryTheme.material}
                          domainPadding={{ x: 0, y: 55 }}
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
                                                        stroke: 'blue',
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
                        <View style={{marginLeft: 50,marginTop:Platform.OS === 'ios' ? 0 : -25}}>
                        <Text style={{fontWeight:'bold'}}>X-axis</Text>
                        </View> 
                        </View>
                        </ScrollView>
                        </View>
                                    ) : selectedTypeValue === 'Burner Status' || selectedTypeValue === 'Geyser Status' ? (
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
                                            animate
                                            alignment="start"
                                            data={charts}
                                          />
                                        </VictoryChart>
                                        <View style={{marginLeft: 50,marginTop:Platform.OS === 'ios' ? 0 : -25}}>
                                        <Text style={{fontWeight:'bold'}}>X-axis</Text>
                                        </View> 
                                        </View>
                                      </ScrollView> 
                                      ) : (
                                      <View style={{width:wp('90%'),height:hp('60%'),alignItems:'center',justifyContent:'center'}}>
                                        <Text style={styles.Text}>Please Select Chart Type</Text>
                                      </View>
                                    )}
                    </View>              
                  </ScrollView>       
                  </View>
                )}
        </View>
       

    );

}

export default ChartsScreen;

const styles = StyleSheet.create({
    Dropdown: { width: wp('80%'), height: hp('4%'), alignSelf: 'center', marginTop: hp('5%') },
    Dropdown1: { width: wp('45%'), height: hp('4.5%'), marginTop: hp('1.5%') ,backgroundColor:'#fff'},
    Dropdown2: { width: wp('45%'), height: hp('4.5%'), marginTop: hp('1.5%') ,backgroundColor:'#fff'},
    chartView: { backgroundColor: colors.white, paddingHorizontal: wp('2%'), paddingVertical: hp('5%') },
})