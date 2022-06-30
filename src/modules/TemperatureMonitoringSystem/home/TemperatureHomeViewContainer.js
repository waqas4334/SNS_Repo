// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import TemperatureHomeView from './TemperatureHomeView';

import {getTemperatureSensors,setThreshold,updateTemperature,setUpperThreshold} from '../../../redux/actions/temperatureActions';

mapStateToProps = (state) => ({
    user: state.auth.user,
    temperature: state.temperature.temperature,
    isLoading: state.temperature.isLoading
});

export default compose(
    connect(mapStateToProps, {getTemperatureSensors,updateTemperature,setThreshold,setUpperThreshold})
    )(TemperatureHomeView);

