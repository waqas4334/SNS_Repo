import { compose } from 'recompose';
import { connect } from 'react-redux';

import FuelHomeView from './FuelHomeView';

import {
  getSensors,
  setThreshold,
  updateFuelSensors,
} from '../../../redux/actions/fuelActions';

const mapStateToProps = state => ({
  user: state.auth.user,
  sensors: state.fuel.sensors,
  loading: state.fuel.loading,
  sensorLoading: state.fuel.sensorLoading,
});

export default compose(
  connect(mapStateToProps, { getSensors, setThreshold, updateFuelSensors }),
)(FuelHomeView);
