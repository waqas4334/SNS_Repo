// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import {getColdChainAlerts} from '../../../redux/actions/coldChainActions';

import AlertView from './AlertView';

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated,
  user: state.auth.user,
  assetTrackingAlertData: state.coldchain.alertData,
  assetTrackingAlertLoading: state.coldchain.alertLoading,
});  

export default compose(
    connect(mapStateToProps, {getColdChainAlerts}),    
    )(AlertView);
