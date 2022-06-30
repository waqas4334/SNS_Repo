import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

import { loadChartsData } from './ChartsState';
import { getColdChainChartData, getColdChainSensors } from '../../../redux/actions/coldChainActions';

import ChartsScreen from './ChartsView';

mapStateToProps = (state) => ({
  user: state.auth.user,
  charts: state.coldchain.charts,
  chartLoading: state.coldchain.loading,
  highest: state.coldchain.highest,
  coldchain: state.coldchain.chain,
});

export default compose(
  connect(mapStateToProps,{getColdChainChartData, getColdChainSensors})
)(ChartsScreen);
