import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  SafeAreaView
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
  VictoryClipContainer
} from 'victory-native';
import { colors, fonts } from '../../../styles';
import { Dropdown } from '../../../components';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';

export default class ChartsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      ChartType: ['Voltage', 'Current','PF','PA','PR','U'],
      ChartRange: ['Past Week', 'Past Month', 'Year Chart'],
      moduleArray: [],
      selectedModule: -1,
      selectedModuleValue: null,
      selectedType: -1,
      selectedTypeValue: null,
      selectedRange: 0,
      selectedRangeValue: 'Past Week'
    }
  }

  async componentDidMount () {
    const {user} = this.props;
    const done = await this.props.get_Em_sensor(user.id);

    if (done === 'done'){
      this.handleModuleData();  
    }
  }

  handleModuleData = () => {
    const {sensors} = this.props;

    const temp = [];

    sensors.map(s=> {
      temp.push(s.name);
    })
    
    this.setState({
      moduleArray : temp,
      selectedModule: 0

    })
  }

  handleModuleChange =  (index,value) => {
    const{selectedTypeValue,selectedRangeValue} = this.state;
    const{sensors}=this.props;
    const Index2 = sensors.findIndex(s=> s.name === value);

    this.setState({
      selectedModule: Index2,
      selectedModuleValue: value
    });

    this.getChartData(selectedTypeValue,selectedRangeValue,Index2);

  }

  handleTypeChange= (index,value) => {
    const {selectedModule} = this.state;
    this.setState({
      selectedType: index,
      selectedTypeValue: value
    });

    this.getChartData(value,this.state.selectedRangeValue,selectedModule);
  }
  
  handleRangeChange= (index,value) => {  
    const {selectedModule} = this.state;  
    this.setState({
      selectedRange: index,
      selectedRangeValue: value
    });

    this.getChartData(this.state.selectedTypeValue,value,selectedModule);
  }

  getChartData = (type,range,module) => {

    const { sensors } = this.props;
    const {selectedModule} = this.state;
    
    let range2 = 'week';
    let type2 = 'voltage';

    switch(type){
      case 'Voltage' :
        type2 = 'voltage';
        break;
      case 'Current':
        type2 = 'current';
        break;
      case 'PF':
        type2 = 'Pf';
        break;
      case 'PA':
        type2 = 'PA';
        break;
      case 'PR':
        type2 = 'PR';
         break;
      case 'U':
        type2 = 'U';
        break;
    }

    switch(range){
      case 'Past Week' :
        range2 = 'week';
        break;
      case 'Past Month':
        range2 = 'month';
        break;
      case 'Year Chart' :
        range2 = 'year';
        break;
    }
    this.props.getEnergyChartData(type2,range2,sensors[module]._id);
  }

render(){
  const {ChartType, ChartRange,selectedTypeValue,selectedRangeValue,moduleArray} = this.state;
  const {chart1,chart2,chart3, chart,chartsLoading,highest} = this.props;
  console.log('chartsss',chart1)
  let yaxis = null;
  switch(selectedTypeValue){
    case 'Voltage':
      yaxis = 'Volt';
      break;
    case 'Current':
      yaxis = 'Ampere';
      break;
      case 'PF':
      yaxis = 'PF Value';
      break;
      case 'PA':
      yaxis = 'PA Value';
      break;
      case 'PR':
      yaxis = 'PR Value';
      break;
      case 'U':
      yaxis = 'KWH';
      break;
    }
  let width = null;
  let xaxis = null;
  switch(selectedRangeValue){
    case 'Past Week':
      width = wp('125%');
      xaxis = 'Days';
      break;
    case 'Past Month':
      width = wp('460%');
      xaxis = 'Days';
      break;
    case 'Year Chart':
      width = wp('200%');
      xaxis = 'Months';
      break;
    }

  return (
    <View style={styles.container} bounces={false}>
      <View>
        <Dropdown
                placeholder = 'Select Module'
                style={styles.Dropdown1}         
                items={moduleArray}
                selectedIndex={this.state.selectedModule}
                onSelect={(index,value) => this.handleModuleChange(index,value)}
              />
        <View style={styles.titleView}>        
          <Dropdown
                placeholder = 'Chart Type'
                style={styles.Dropdown2}         
                items={ChartType}
                selectedIndex={this.state.selectedType}
                onSelect={(index,value) => this.handleTypeChange(index,value)}
              />
          <Dropdown
                placeholder = 'Chart Range'
                style={styles.Dropdown2}         
                items={ChartRange}
                selectedIndex={this.state.selectedRange}
                onSelect={(index,value) => this.handleRangeChange(index,value)}
              />
        </View>
        {selectedTypeValue === 'Voltage' || selectedTypeValue === 'Current' ? (
          <View>
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
              <View style={{flexDirection:'row'}}>
              <Icon name='dot-single' size={30} color='#2196f3'/>
              <Text style={{fontWeight:'bold',color:colors.darkGray,marginTop:5}}>Phase A</Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Icon name='dot-single' size={30} color='red'/>
              <Text style={{fontWeight:'bold',color:colors.darkGray,marginTop:5}}>Phase B</Text>
              </View>
              <View style={{flexDirection:'row'}}>
              <Icon name='dot-single' size={30} color='green'/>
              <Text style={{fontWeight:'bold',color:colors.darkGray,marginTop:5}}>Phase C</Text>
              </View>
            </View>
          
            <View style={{flexDirection:'row',marginLeft:wp('11.4%')}}>
            <View style={{flexDirection:'row'}}>
            <Icon name='dot-single' size={30} color='#BA68C8'/>
            <Text style={{fontWeight:'bold',color:colors.darkGray,marginTop:5}}>X-Axis: </Text>
            <Text style={{color:colors.darkGray,marginTop:5}}>{xaxis}</Text> 
            </View> 
            <View style={{flexDirection:'row',marginLeft:wp('2%')}}>
            <Icon name='dot-single' size={30} color='#1A237E'/>
            <Text style={{fontWeight:'bold',color:colors.darkGray,marginTop:5}}>Y-Axis: </Text>
            <Text style={{color:colors.darkGray,marginTop:5}}>{yaxis}</Text>
            </View>
            </View>
          </View>        
        ): selectedTypeValue === 'PF' || selectedTypeValue === 'PA' || 
        selectedTypeValue === 'PR' || selectedTypeValue === 'U' ? (
          <View>
            <View style={{flexDirection:'row',marginLeft:wp('10%')}}>
            <Icon name='dot-single' size={30} color='#BA68C8'/>
            <Text style={{fontWeight:'bold',color:colors.darkGray,marginTop:5}}>X-Axis: </Text>
            <Text style={{color:colors.darkGray,marginTop:5}}>{xaxis}</Text>  
            <Icon name='dot-single' size={30} color='#1A237E'/>
            <Text style={{fontWeight:'bold',color:colors.darkGray,marginTop:5}}>Y-Axis: </Text>
            <Text style={{color:colors.darkGray,marginTop:5}}>{yaxis}</Text>
            </View>
          </View>
        ):(null)}
           
        </View>
       {chartsLoading ? (
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
          <Bars size={15} color={colors.primary} />
        </View>
      ): (
        <ScrollView horizontal={true} persistentScrollbar={true}
        style={styles.background}>
        {selectedTypeValue === 'Voltage' || selectedTypeValue === 'Current'? (
          <ScrollView horizontal={true} persistentScrollbar={true}
          nestedScrollEnabled={true} style={styles.chartView}>
            <View style={{backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginRight:-20}}>
                <Text style={{ fontWeight:'bold', marginRight:hp('2%'),
                  transform: [{ rotate: '270deg'}]}}>Y-axis</Text>
            </View>                       
            <View>
          <VictoryChart width={width} height={hp('55%')}
          theme={VictoryTheme.material} domainPadding={{x: 10, y: 70}} padding={50} domain={{y: [0, highest]}}>
          <VictoryAxis
              dependentAxis={true}
              style={{
                  axis: {stroke: "#756f6a"},
                  axisLabel: styles.AxisLabel,
                  grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : '#e6e6e6'},
                  ticks: {stroke: "grey", size: 5},
                  tickLabels: {fontSize: hp('1.2%'), padding: wp('3%'),fill:'#1A237E'}
                }}
            />
            <VictoryAxis            
              style={{
                axis: {stroke: "#756f6a"},
                axisLabel: styles.AxisLabel,
                //grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "#9b9b9b"},
                ticks: {stroke: "grey", size: 2},
                tickLabels: {fontSize: hp('1.2%'), padding: wp('3%'),fill:'#BA68C8'}
              }}
            />
            <VictoryLine
              data={chart1}
              interpolation="natural"
              style={{ 
                data: { stroke: "#2196f3", strokeWidth: 1.5, strokeLinecap: "round" } }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1500 }
              }}
            />
            <VictoryLine
              data={chart2}
              interpolation="natural"
              style={{ data: { stroke: "red", strokeWidth: 1.5, strokeLinecap: "round" } }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1500 }
              }}
            />
            <VictoryLine
              data={chart3}
              interpolation="natural"
              style={{ data: { stroke: "green", strokeWidth: 1.5, strokeLinecap: "round" } }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1500 }
              }}
            />
          </VictoryChart>
          <View style={{marginBottom:1,marginHorizontal:wp('50%'),marginTop:hp('-1%')}}>
                        <Text style={{fontWeight:'bold'}}>X-axis</Text>
                        </View> 
                        </View>
        </ScrollView>
        ) : selectedTypeValue === 'PF' || selectedTypeValue === 'PA' || 
        selectedTypeValue === 'PR' || selectedTypeValue === 'U' ? (
          <ScrollView horizontal={true} nestedScrollEnabled={true} style={styles.chartView}>
              <View style={{backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginRight:-20}}>
                          <Text style={{ fontWeight:'bold', marginRight:hp('2%'),
                            transform: [{ rotate: '270deg'}]}}>Y-axis</Text>
                        </View>                       
                       <View>
          <VictoryChart width={width} height={hp('55%')} theme={VictoryTheme.material} domainPadding={{x: 10, y: 70}} padding={50} domain={{y: [0, highest]}}>
          <VictoryAxis
              dependentAxis={true}
              style={{
                  axis: {stroke: "#756f6a"},
                  axisLabel: styles.AxisLabel,
                  grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : '#e6e6e6'},
                  ticks: {stroke: "grey", size: 5},
                  tickLabels: {fontSize: hp('1.2%'), padding: wp('3%'),fill:'#1A237E'}
                }}
            />
            <VictoryAxis            
              style={{
                axis: {stroke: "#756f6a"},
                axisLabel: styles.AxisLabel,
                //grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "#9b9b9b"},
                ticks: {stroke: "grey", size: 2},
                tickLabels: {fontSize: hp('1.2%'), padding: wp('3%'),fill:'#BA68C8'}
              }}
            />
            <VictoryLine
              data={chart}
              interpolation="natural"
              style={{ data: { stroke: "#2196f3", strokeWidth: 1.5, strokeLinecap: "round" } }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1500 }
              }}
            />
          </VictoryChart>
          <View style={{marginBottom:1,marginHorizontal:wp('50%'),marginTop:hp('-1%')}}>
                        <Text style={{fontWeight:'bold'}}>X-axis</Text>
                        </View> 
                        </View>
        </ScrollView>
        ):(
          <View style={styles.TextView}>
            <Text style={styles.Text}>Please Select Chart Type</Text>
          </View>
        )}
      </ScrollView>
      )}    
    </View>
   );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Dropdown1:{ width: wp('80%'),height: hp('4%'), alignSelf: 'center', marginTop: hp('1.5%')},
  Dropdown2:{ width: wp('43%'), height: hp('4%'),marginTop: hp('1%'), marginLeft: wp('5%') },
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
    //paddingHorizontal: hp('0%'),
  },
  chartView: {
    //marginTop: hp('0%'),
    //borderRadius: wp('2%'),
    backgroundColor: colors.white,
    //alignItems: 'center',
    paddingHorizontal:wp('2%'),
    paddingVertical: hp('1%')
  },
  AxisLabel:{fontSize: hp('5%'), padding: wp('10%')},
  TickLabels:{fontSize: hp('1.2%'), padding: wp('3%')},

  TextView:{alignItems: 'center', justifyContent: 'center',marginLeft:wp('30%')},
  Text:{color: colors.gray, fontWeight:'bold',fontSize: hp('2%')}
});
