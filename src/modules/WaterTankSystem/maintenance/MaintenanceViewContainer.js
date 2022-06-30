import { compose } from 'recompose';
import { connect } from 'react-redux';
import MaintenanceView from './MaintenanceView';
import {
  maintenanceControl,
  getSensors,
} from '../../../redux/actions/tankActions';

const mapStateToProps = state => ({
  user: state.auth.user,
  sensors: state.tank.sensors,
  sensorLoading: state.tank.sensorLoading,
});

export default compose(
  connect(mapStateToProps, { maintenanceControl, getSensors }),
)(MaintenanceView);
