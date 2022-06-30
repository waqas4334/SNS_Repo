// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import {getLmsAlerts} from '../../../redux/actions/lmsActions';

import AlertView from './AlertView';

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated,
  user: state.auth.user,
  waterQualityAlertData: state.lms.alertData,
  waterQualityAlertLoading: state.lms.alertLoading,
});  

export default compose(
    connect(mapStateToProps, {getLmsAlerts}),
    
    )(AlertView);
