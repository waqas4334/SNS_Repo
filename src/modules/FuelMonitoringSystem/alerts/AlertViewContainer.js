// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
// import {getFuelAlerts} from '../../../redux/actions/fuelActions';

import AlertView from './AlertView';


// const mapStateToProps = (state) => ({
//   isAuthenticated : state.auth.isAuthenticated,
//   user: state.auth.user,
//   fuelAlertData: state.fuel.alertData,
//   fuelAlertLoading: state.fuel.alertLoading,
// });  

export default compose(
    connect(),    
    )(AlertView);
