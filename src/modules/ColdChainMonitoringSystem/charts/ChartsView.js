import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
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
import { colors, fonts } from '../../../styles';
import { Dropdown } from '../../../components';
import { Bubbles, DoubleBounce, Bars, Pulse } from 'react-native-loader';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Entypo';

export default class ChartsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state= {
      ChartType: [
        'Temperature Chart',
        'Door Status Chart',         
      ],
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
    let done = null;
    done = await this.props.getColdChainSensors(user.id,'store');

    if (done === 'done'){
      this.handleModuleData();  
    }

  }

  handleModuleData = () => {
    const {coldchain} = this.props;

    const temp = [];

    coldchain.map(s=> {
      temp.push(s.name);
    })
    
    this.setState({
      moduleArray : temp,
      selectedModule: 0
    })
  }

  handleModuleChange = (index,value) => {
    const {selectedTypeValue,selectedRangeValue}= this.state;
    const {coldchain} = this.props;
    const Index2 = coldchain.findIndex(s=> s.name === value);
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

    const { coldchain } = this.props;
    const { selectedModule } = this.state;
    
    let range2 = 'week';
    let type2 = 'temperature';

    switch(type){
      case 'Temperature Chart' :
        type2 = 'temperature';
        break;
      case 'Door Status Chart' :
        type2 = 'status';
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
    this.props.getColdChainChartData(type2,range2,coldchain[module]._id);
  }

render(){
  const {ChartType, ChartRange,selectedTypeValue,selectedRangeValue,moduleArray} = this.state;
  const {charts, chartLoading,highest,coldchain} = this.props;
  let width = null;
  switch(selectedRangeValue){
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
      </View>
      {chartLoading ? (
        <View style={{flex:1, alignItems:'center',justifyContent:'center'}}>
          <Bars size={15} color={colors.primary} />
        </View>
      ): (
        <View style={{flex:1,backgroundColor:'#fff'}}>
        <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          {selectedTypeValue ===   'Temperature Chart' ? (
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
              <Icon name='dot-single' size={30} color='#2196f3'/>
            <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
            <Text>Avergae Temperature</Text>
            </View>
          ): selectedTypeValue ===   'Door Status Chart' ?(
            <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%')}}>
               <Icon name='dot-single' size={30} color='#2196f3'/>
            <Text style={{alignItems:'center',fontWeight:'bold'}}>Y-axis:</Text>
            <Text>Door Open Count</Text>
            </View>
          ):(null)}
            {(selectedTypeValue ===  'Temperature Chart'|| selectedTypeValue ===  'Door Status Chart') 
            && selectedRangeValue === 'Past Week' ? (
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',marginTop:hp('4%'),marginLeft:wp('5%')}}>
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
        <ScrollView horizontal={true} style={styles.background}>
        {selectedTypeValue === 'Temperature Chart' ? (
          <ScrollView horizontal={true} style={[styles.chartView, { marginBottom: 20 }]}>
              <View style={{backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginRight:-20}}>
                          <Text style={{ fontWeight:'bold', marginRight:hp('2%'),
                            transform: [{ rotate: '270deg'}]}}>Y-axis</Text>
                        </View>                       
                       <View>
          <VictoryChart width={width} height={hp('45%')} theme={VictoryTheme.material} domainPadding={{x: 10, y: 70}} padding={50} domain={{y: [0, highest]}}>
          <VictoryAxis
              dependentAxis={true}
              style={{
                  axis: {stroke: "#756f6a"},
                  axisLabel: styles.AxisLabel,
                  grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : '#e6e6e6'},
                  ticks: {stroke: "grey", size: 5},
                  tickLabels: styles.TickLabels
                }}
            />
            <VictoryAxis            
              style={{
                axis: {stroke: "#756f6a"},
                axisLabel: styles.AxisLabel,
                //grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "#9b9b9b"},
                ticks: {stroke: "grey", size: 2},
                tickLabels: styles.TickLabels
              }}
            />
            <VictoryLine
              data={charts}
              interpolation="natural"
              style={{ data: { stroke: "#2196f3", strokeWidth: 1.5, strokeLinecap: "round" } }}
              animate={{
                duration: 2000,
                onLoad: { duration: 1500 }
              }}
            />
          </VictoryChart>
          <View style={{marginBottom:1,marginHorizontal:wp('50%'),marginTop:hp('0%')}}>
                        <Text style={{fontWeight:'bold'}}>X-axis</Text>
                        </View> 
                        </View>
        </ScrollView>
        ) : selectedTypeValue === 'Door Status Chart' ? (
          <ScrollView horizontal={true} style={[styles.chartView, { marginBottom: 20}]}>
           <View style={{backgroundColor:'#fff',alignItems:'center',justifyContent:'center',marginRight:-20}}>
                          <Text style={{ fontWeight:'bold', marginRight:hp('2%'),
                            transform: [{ rotate: '270deg'}]}}>Y-axis</Text>
                        </View>                       
                       <View>
          <VictoryChart width={width} height={hp('45%')} theme={VictoryTheme.material} domainPadding={{x: 10, y: 55}} padding={50} domain={{y: [0, highest]}}>
            <VictoryAxis 
              dependentAxis={true}
              style={{
                  axis: {stroke: "#756f6a"},
                  axisLabel: styles.AxisLabel,
                  grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : '#e6e6e6'},
                  ticks: {stroke: "grey", size: 5},
                  tickLabels: styles.TickLabels
                }}
            />
            <VictoryAxis         
              style={{
                axis: {stroke: "#756f6a"},
                axisLabel: styles.AxisLabel,
                grid: {stroke: ({ tick }) => tick > 0.5 ? "red" : "#e6e6e6"},
                ticks: {stroke: "grey", size: 5},
                tickLabels: styles.TickLabels
              }}
            />

            <VictoryBar
              style={{ data: { fill: "#4f44b6", width:wp('3%')}}}
              //barWidth={50}
              animate
              alignment="start"
              data={charts}
            />
          </VictoryChart>
          <View style={{marginBottom:1,marginHorizontal:wp('50%'),marginTop:hp('0%')}}>
                        <Text style={{fontWeight:'bold'}}>X-axis</Text>
                        </View> 
                        </View>
        </ScrollView>

        ): (
          <View style={styles.TextView}>
            <Text style={styles.Text}>Please Select Chart Type</Text>
          </View>
        )}

      </ScrollView>
      </View>
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
    paddingHorizontal: hp('0%'),
  },
  chartView: {
    //marginTop: hp('0%'),
    //borderRadius: wp('2%'),
    backgroundColor: colors.white,
    //alignItems: 'center'
    paddingHorizontal:wp('2%'),
    paddingVertical: hp('5%')
  },
  AxisLabel:{fontSize: hp('5%'), padding: wp('10%')},
  TickLabels:{fontSize: hp('1.2%'), padding: wp('3%')},

  TextView:{alignItems: 'center', justifyContent: 'center',marginLeft:wp('30%')},
  Text:{color: colors.gray, fontWeight:'bold',fontSize: hp('2%')}
});
