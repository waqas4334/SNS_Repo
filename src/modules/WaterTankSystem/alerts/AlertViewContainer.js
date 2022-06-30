// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { getAlerts } from '../../../redux/actions/tankActions';

import AlertView from './AlertView';

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated,
  user: state.auth.user,
  alerts: state.tank.alerts,
  alertsLoading: state.tank.alertsLoading,
});  

export default compose(
    connect(mapStateToProps, {getAlerts}),  
    )(AlertView);
