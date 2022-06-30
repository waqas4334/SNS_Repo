import { connect } from 'react-redux';
import { compose } from 'recompose';

import { getChartData,getSensors } from '../../../redux/actions/tankActions';

import ChartsScreen from './ChartsView';

const mapStateToProps = (state) => ({
  user: state.auth.user,
  sensors: state.tank.sensors,
  charts: state.tank.charts,
  chartsLoading: state.tank.chartsLoading,
  highest: state.tank.highest,
});

export default compose(
  connect(mapStateToProps,{getChartData,getSensors})
)(ChartsScreen);
