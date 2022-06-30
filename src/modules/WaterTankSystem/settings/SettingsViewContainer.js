import { compose } from 'recompose';
import { connect } from 'react-redux';
import SettingsView from './SettingsView';

import { getSensors,setLowerThreshold,setUpperThreshold } from '../../../redux/actions/tankActions';

const mapStateToProps = state => ({
  user: state.auth.user,
  sensors: state.tank.sensors,
  sensorLoading: state.tank.sensorLoading,
});

export default compose(connect(mapStateToProps, { getSensors,setLowerThreshold,setUpperThreshold }))(SettingsView);
