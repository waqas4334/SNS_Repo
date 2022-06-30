// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import EnergyHomeView from './EnergyHomeView';

import {get_Em_sensor} from '../../../redux/actions/energyActions';

mapStateToProps = (state) => ({
    user: state.auth.user,
    sensor:state.energy.sensor,
    isLoading:state.energy.isLoading,
});

export default compose(
    connect(mapStateToProps, {get_Em_sensor})
    )(EnergyHomeView);
