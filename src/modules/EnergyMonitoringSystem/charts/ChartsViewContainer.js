import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { getEnergyChartData,get_Em_sensor } from '../../../redux/actions/energyActions';

import ChartsScreen from './ChartsView';

mapStateToProps = (state) => ({
  user: state.auth.user,
  sensors: state.energy.sensor,
  chart1: state.energy.chart1,
  chart2: state.energy.chart2,
  chart3: state.energy.chart3,
  chart: state.energy.chart,
  chartsLoading:state.energy.chartsLoading,
  loading: state.energy.isLoading,
  highest: state.energy.highest,
});

export default compose(
  connect(mapStateToProps,{getEnergyChartData,get_Em_sensor})
)(ChartsScreen);
