import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import {getTemperatureSensors,getTempChartData} from '../../../redux/actions/temperatureActions';

import ChartsScreen from './ChartsView';

mapStateToProps = (state) => ({
  user: state.auth.user,
  highest: state.temperature.highest,
  temperature: state.temperature.temperature,
  chartLoading: state.temperature.chartLoading,
  charts: state.temperature.charts
});

export default compose(
  connect(mapStateToProps,{getTemperatureSensors,getTempChartData})
)(ChartsScreen);
