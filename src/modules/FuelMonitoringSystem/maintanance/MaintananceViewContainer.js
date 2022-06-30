// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import MaintananceView from './MaintananceView';

// import {getSensors,setThreshold,getMaintananceData,setMaintananceThreshold,setOilThreshold} from '../../../redux/actions/fuelActions';

// mapStateToProps = (state) => ({
//     user: state.auth.user,
//     sensors: state.fuel.sensors,
//     loading: state.fuel.loading,
//     maintanance_loading:state.fuel.maintanance_loading,
// });

export default compose(
    connect()
    )(MaintananceView);
