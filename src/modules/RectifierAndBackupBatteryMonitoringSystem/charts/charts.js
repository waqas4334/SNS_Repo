import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet,ScrollView } from 'react-native';
import { Bubbles} from 'react-native-loader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {    
    VictoryChart,
    VictoryLine,
    VictoryTheme,
    VictoryAxis,
    VictoryScatter,
    VictoryLabel,
    VictoryVoronoiContainer
} from 'victory-native';
import { useDispatch, useSelector } from 'react-redux';
import { colors } from '../../../styles';
import { Dropdown } from '../../../components';
import {getModule, getCharts} from '../../../redux/actions/rectifierAction';
import Icon from 'react-native-vector-icons/Entypo';

const ChartScreen = () => {

    const user = useSelector(state => state.auth.user);
    const module = useSelector(state => state.rectifier.module);
    const charts = useSelector(state => state.rectifier.charts);
    const chartsLoading = useSelector(state => state.rectifier.chartsLoading);
    const highest = useSelector(state => state.rectifier.highest);
    const dispatch = useDispatch();

    const [moduleArray, setModuleArray] = useState([]);
    const [type, setType] = useState([
        'Input Power Status',
        'Rectification Status',
        'Bank Battery Connection Status',
    ]);
    const [range,setRange] = useState(['Past Week', 'Past Month', 'Year Chart']);
    const [selectedModule, setSelectedModule] = useState(-1);
    const [selectedModuleValue, setSelectedModuleValue] = useState(null);
    const [selectedType, setSelectedType] = useState(-1);
    const [selectedTypeValue, setSelectedTypeValue] = useState(null);
    const [selectedRange, setSelectedRange] = useState(0);
    const [selectedRangeValue, setSelectedRangeValue] = useState('Past Week');

    useEffect(()=>{
        handleModuleData();             
    },[]);

    const handleModuleData = async () => {
        const data = await dispatch(getModule(user.id));
        // console.log('data',data);
        if (data === 'done') {
            handleRectifierData();
            // console.log('module',module[selectedModule]._id)
            // dispatch(getCharts(selectedTypeValue,selectedRangeValue,module[selectedModule]._id))
        }
       
    }
    const handleRectifierData = () => {
        const temp = [];
        module.map(s => {
            temp.push(s.name);
        })
        setModuleArray(temp);
        setSelectedModule(0);
        setSelectedModuleValue(module[0].name);
    }

    const handleModuleChange = (index, value) => {
        setSelectedModule(index);
        setSelectedModuleValue(value);
        getChartData(selectedTypeValue,selectedRangeValue,index);
    }
    const handleTypeChange =  (index, value) => {
        setSelectedType(index);
        setSelectedTypeValue(value);
        getChartData(value,selectedRangeValue,selectedModule);

    }
    const handleRangeChange =  (index, value) => {
        setSelectedRange(index);
        setSelectedRangeValue(value);
        getChartData(selectedTypeValue,value,selectedModule);
    }

    const  getChartData = (type,range,moduleIndex) => {
        let range2 = 'week';
        let type2 = 'Input Power Status';

        if (type === 'Input Power Status') {
            type2 = 'ac_charts'
        }
        else if (type === 'Rectification Status') {
            type2 = 'rec_charts'
        }
        else if (type === 'Bank Battery Connection Status') {
            type2 = 'battery_charts'
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
        // console.log('module',segment[module]._id, type2,range2)
        if (module[moduleIndex] !== undefined) {
            dispatch(getCharts(type2,range2,module[moduleIndex]._id));
        }
    };

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
      <View style={{flex:1}}>
        <Dropdown
          placeholder="Select System"
          style={{ width: wp('95%'), height: hp('4.5%'), alignSelf: 'center', marginTop: hp('2%')}}
          items={moduleArray}
          selectedIndex={selectedModule}
          onSelect={(index, value) => handleModuleChange(index, value)}
        />
        <View style={{flexDirection:'row', justifyContent: 'space-evenly'}}>
          <Dropdown
            placeholder='Select Chart Type...'
            style={styles.Dropdown1}
            items={type}
            selectedIndex={selectedType}
            onSelect={(index, value) => handleTypeChange(index, value)}
          />
          <Dropdown
            placeholder='Select Chart Range...'
            style={styles.Dropdown}
            items={range}
            selectedIndex={selectedRange}
            onSelect={(index, value) => handleRangeChange(index, value)}
          />
        </View>

        {chartsLoading ? (
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Bubbles size={15} color={colors.primary} />
          </View>
                ) : (
                  <View style={{flex:1,backgroundColor:'#fff'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-around'}}>
                      {selectedTypeValue === 'Input Power Status' ? (
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                          <Icon name='dot-single' size={30} color='#2196f3'/>
                        <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                        <Text>AC Voltage</Text>
                        </View>
                      ): selectedTypeValue === 'Rectification Status' ?(
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                          <Icon name='dot-single' size={30} color='#2196f3'/>
                        <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                        <Text>DC Voltage</Text>
                        </View>
                      ): selectedTypeValue === 'Bank Battery Connection Status' ?(
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
                          <Icon name='dot-single' size={30} color='#2196f3'/>
                        <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
                        <Text>Battery Voltage</Text>
                        </View> 
                        ):(null)}

                        {(selectedTypeValue === 'Input Power Status' || selectedTypeValue === 'Rectification Status' || selectedTypeValue === 'Bank Battery Connection Status') 
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
                    <View style={{backgroundColor:'transparent',marginLeft:wp('2%'),flex:1}}>
                    {selectedTypeValue === 'Input Power Status'  || selectedTypeValue === 'Rectification Status' || selectedTypeValue === 'Bank Battery Connection Status' ? (
                      <View style={{flex:1}}>
                        <ScrollView horizontal style={styles.chartView}>
                        <View style={{backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginRight:-20}}>
                            {/* <VictoryScatter
                            // domainPadding={[5,5]}
                            data={[{ x: 0, y: 0 }]}
                            labels="Y-axis"
                            style={{ 
                              labels: { padding: 100 } }}
                            labelComponent={
                              <VictoryLabel
                               // lineHeight={[1]}
                                dy={5}
                                textAnchor="end"
                                verticalAnchor="end"
                                angle={90}
                                style={{fontWeight:'bold'}}
                                // backgroundStyle={{}}
                              />
                            }
                          /> */
                          <Text style={{ fontWeight:'bold',marginRight:wp('2%'),
                            transform: [{ rotate: '270deg'}]}}>Y-axis</Text>}
                    </View>
                        <View>
                        <VictoryChart
                          width={width}
                          height={hp('45%')}
                          theme={VictoryTheme.material}
                          domainPadding={{ x: 10, y: 70 }}
                          padding={50}
                          domain={{ y: [0, highest] }}
                          // containerComponent={
                          //   <VictoryVoronoiContainer
                          //     labels={({ datum }) => `${round(datum.x, 2)}, ${round(datum.y, 2)}`}
                          //   />
                          // }
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
                            // labels={'.'}
                            // labelComponent={<VictoryLabel renderInPortal dy={-20}/>}
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
                        <View style={{marginBottom:20,marginHorizontal:wp('50%')}}>
                        <Text style={{fontWeight:'bold'}}>X-axis</Text>
                        </View> 
                        </View>
                        </ScrollView>
                      
                      </View>
                                    ) : (
                                      <View style={{width:wp('90%'),height:hp('60%'),alignItems:'center',justifyContent:'center'}}>
                                        <Text style={styles.Text}>Please Select Chart Type</Text>
                                      </View>
                                      // <View style={styles.TextView}>
                                      //   <Text style={styles.Text}>Please Select Chart Type</Text>
                                      // </View>
                                    )}
                    </View>
                   
                  </ScrollView>       
                  </View>
                    )}
      </View>
    );  
}

export default ChartScreen;

const styles= StyleSheet.create({
    Dropdown: { width: wp('40%'), height: hp('4.5%'), marginTop: hp('1.5%') ,backgroundColor:'#fff'},
    Dropdown1: { width: wp('58%'), height: hp('4.5%'), marginTop: hp('1.5%') ,backgroundColor:'#fff'},
    AxisLabel: { fontSize: hp('5%'), padding: wp('10%') ,color:'red'},
    TickLabels: { fontSize: hp('1.2%'), padding: wp('3%') },
    background: { backgroundColor: '#fff',flexDirection:'row',flex:1,marginTop:hp('3%')},
    TextView: { alignItems: 'center', justifyContent: 'center',paddingVertical:hp('30%'),paddingHorizontal:wp('15%')},
    Text: { color: colors.gray, fontWeight: 'bold', fontSize: hp('2%')},
    chartView: { backgroundColor: colors.white, paddingHorizontal: wp('2%'), paddingVertical: hp('5%'),flex:1 },
})