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
import {  getSensors,getCharts } from '../../../redux/actions/tempAction';

const ChartsScreen = () => {
    const user = useSelector(state => state.auth.user);
    const tempModule = useSelector(state => state.Temperature.tempModule);
    const charts = useSelector(state => state.Temperature.charts);
    const chartsLoading = useSelector(state => state.Temperature.chartsLoading);
    const highest = useSelector(state => state.Temperature.highest);
    const dispatch = useDispatch();  

    const [dialogVisible1, setDialogVisible1] = useState(false);
    const [dialogVisible2, setDialogVisible2] = useState(false);
    const [moduleArray, setModuleArray] = useState([]);

    const [selectedModule, setSelectedModule] = useState(-1);
    const [selectedModuleValue, setSelectedModuleValue] = useState(null);

    const [type, setType] = useState(['Temperature','Humidity'])
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
        if (data === 'done') {
            handleSensorData();
        }       
    }
    const handleSensorData = () => {
        const temp = [];
        tempModule.map(s => {
            temp.push(s.name);
        })
        setModuleArray(temp),
        setSelectedModule(0),
        setSelectedModuleValue (tempModule[0].name)
    }
   const  handleSensorChange = (index, value) => {
        const Index2 = tempModule.findIndex(s => s.name === value);
            setSelectedModule(index)
            setSelectedModuleValue(value)
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
        else if (type === 'Humidity') {
            type2 = 'humidity'
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
        if (tempModule[moduleIndex] !== undefined) {
            dispatch(getCharts(tempModule[moduleIndex]._id,type2,range2));
        }
    };

    let width = null;
    switch (selectedRangeValue) {
        case 'Past Week':
            width = wp('200%');
            break;
        case 'Past Month':
            width = wp('570%');
            break;
        case 'Year Chart':
            width = wp('200%');
            break;
    }

    return (
      <ScrollView style={styles.container}>
        <View style={styles.filterContainer}>
              <Dropdown
                    placeholder='Select Module...'
                    style={styles.Dropdown}
                    items={moduleArray}
                    selectedIndex={selectedModule}
                    onSelect={(index, value) => handleSensorChange(index, value)}
                />

        <View style={styles.subFilterView}>
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

        {selectedTypeValue === null ? (
          <View style={styles.noChartView}><Text style={styles.grayText}>Please Select Chart Type</Text></View>
        ) : (
          <View style={styles.chartInnerView}>
            <View style={styles.axisView}>
            <Icon name='dot-single' size={30} color='#2196f3'/>
                            <Text style={[styles.grayText,{marginTop:7}]}>X-axis:</Text>
                            <Text style={[styles.grayText,{marginTop:7,marginLeft:7}]}>
                              {selectedRangeValue === "Past Week" ? "Week": selectedRangeValue === "Past Month" ? "Month" :selectedRangeValue === "Year Chart" ? "Year" : null}</Text>
            <Icon name='dot-single' size={30} color='#2196f3'/>
                        <Text style={[styles.grayText,{marginTop:7}]}>Y-axis:</Text>
                        
                        <Text style={[styles.grayText,{marginTop:7, marginLeft: 7}]}>
                        {selectedTypeValue === "Temperature" ? " Average Temperature" : selectedTypeValue === "Humidity" ? "Average Humidity": null}
                        </Text>               
            </View>

            <View style={styles.chartContainer}>          
              <View>
              {chartsLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Bubbles size={15} color={colors.primary} />
          </View>):(
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chartScrollView}>
            <View style={{flexDirection:'row'}}>
            <Text style={[styles.grayText,{marginTop:200,height:20,transform: [{ rotate: '270deg'}]}]}>Y-axis</Text>
            {selectedTypeValue === 'Temperature' || selectedTypeValue === 'Humidity' ?
                         (
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
                         ): (null)}
                   
            </View>
            
            </ScrollView>
          )}
              
                <Text style={[styles.grayText,{marginLeft:90}]}>X-axis</Text>
                </View>
          </View>
          </View>
        )}             
      </ScrollView>
    );
}

export default ChartsScreen;

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#fff"
  },
  filterContainer:{
    flex:1,
    backgroundColor:"#EDF0F4",
    margin: 6,
    marginTop:7,
    borderRadius:6,
    padding: 13,
  },
  subFilterView:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
    Dropdown: { width: '100%', height: hp('4%'), alignSelf: 'center'},
    Dropdown1: { width: wp('45%'), height: hp('4.5%'),marginTop: 13},
    Dropdown2: { width: wp('45%'), height: hp('4.5%'),marginTop:13},
    chartInnerView:{flex:1, backgroundColor: "#EDF0F4",marginHorizontal:6,borderRadius:6},
    noChartView:{height:'400%',justifyContent:'center',alignItems:'center',backgroundColor:"#EDF0F4",marginHorizontal:6,borderRadius:6},
    grayText: {color: "#9DA4B4", fontSize: 16},
    axisView:{
      flexDirection: "row",
      padding:13,
    },
    axisText:{
    },
    chartContainer:{flex:1, padding:6,justifyContent:'center'},
    chartScrollView: {paddingBottom:20},
})