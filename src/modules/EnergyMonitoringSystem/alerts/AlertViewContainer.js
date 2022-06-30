// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import {getEmAlerts} from '../../../redux/actions/energyActions';

import AlertView from './AlertView';

const mapStateToProps = (state) => ({
  isAuthenticated : state.auth.isAuthenticated,
  user: state.auth.user,
  energyAlertData: state.energy.alertData,
  energyAlertLoading: state.energy.alertLoading,
});  

export default compose(
    connect(mapStateToProps, {getEmAlerts}),
    )(AlertView);
