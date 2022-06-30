
    // @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import LocationView from './LocationView';

import {getColdChainSensors, updateColdChainSensors,setColdChainThreshold} from '../../../redux/actions/coldChainActions';

mapStateToProps = (state) => ({
    user: state.auth.user,
    coldchain: state.coldchain.chain,
    loading: state.coldchain.loading
});

export default compose(
    connect(mapStateToProps, {getColdChainSensors,updateColdChainSensors,setColdChainThreshold})
    )(LocationView);

