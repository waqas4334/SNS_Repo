import { compose } from 'recompose';
import { connect } from 'react-redux';

import EnvironmentHomeView from './EnvironmentHomeView';

import { getSensors } from '../../../redux/actions/envActions';

const mapStateToProps = state => ({
  user: state.auth.user,
  envSensors: state.env.envSensors,
  envSensorLoading: state.env.envSensorLoading,
});

// export default compose(connect(mapStateToProps, { getSensors }))(
//   EnvironmentHomeView,
// );
export default connect(mapStateToProps, { getSensors })(EnvironmentHomeView);
