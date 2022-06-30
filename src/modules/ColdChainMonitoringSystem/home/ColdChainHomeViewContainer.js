// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import ColdChainHomeView from './ColdChainHomeView';

import {getColdChainSensors, updateColdChainSensors,setColdChainThreshold, setColdChainGeofence,setColdChainGeofenceCenter} from '../../../redux/actions/coldChainActions';

mapStateToProps = (state) => ({
    user: state.auth.user,
    coldchain: state.coldchain.chain,
    loading: state.coldchain.loading
});

export default compose(
    connect(mapStateToProps, {getColdChainSensors,updateColdChainSensors,setColdChainThreshold, setColdChainGeofence,setColdChainGeofenceCenter})
    )(ColdChainHomeView);
