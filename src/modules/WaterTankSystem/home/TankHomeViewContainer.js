// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import TankHomeView from './TankHomeView';

import { getSensors, controlMotor } from '../../../redux/actions/tankActions';

const mapStateToProps = state => ({
  user: state.auth.user,
  sensors: state.tank.sensors,
  sensorLoading: state.tank.sensorLoading,
});

export default compose(connect(mapStateToProps, { getSensors, controlMotor }))(
  TankHomeView,
);
