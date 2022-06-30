import { connect } from 'react-redux';
import { compose, lifecycle } from 'recompose';

// import { getFuelChartData,getSensors } from '../../../redux/actions/fuelActions';

import ChartsScreen from './ChartsView';

// mapStateToProps = (state) => ({
//   user: state.auth.user,
//   sensors: state.fuel.sensors,
//   charts: state.fuel.charts,
//   loading: state.fuel.loading,
//   highest: state.fuel.highest,
// });

export default compose(connect())(ChartsScreen);
