// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import {getTempAlerts} from '../../../redux/actions/temperatureActions';

import AlertView from './AlertView';

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated,
  user: state.auth.user,
  tempAlertData: state.temperature.alertData,
  tempAlertLoading: state.temperature.alertLoading,
});  

export default compose(
    connect(mapStateToProps, {getTempAlerts}),    
    )(AlertView);
