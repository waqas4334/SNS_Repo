import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { getLmsChartData, getLmsSensors } from '../../../redux/actions/lmsActions';

import ChartsScreen from './ChartsView';

mapStateToProps = (state) => ({
  user: state.auth.user,
  charts: state.lms.charts,
  chartLoading: state.lms.chartLoading,
  highest: state.lms.highest,
  lms: state.lms.lms
});

export default compose(
  connect(mapStateToProps,{getLmsChartData, getLmsSensors})
)(ChartsScreen);
