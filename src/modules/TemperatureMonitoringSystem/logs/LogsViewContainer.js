// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import {getTemperatureTableData,getTemperatureSensors} from '../../../redux/actions/temperatureActions';

import LogsView from './LogsView';

const tempData = [

    'temperature',
];

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    user: state.auth.user,
    logs: state.temperature.logs,
    temperature: state.temperature.temperature,
    isLoading: state.temperature.isLoading
  }); 

export default compose(
    connect(mapStateToProps, {getTemperatureTableData,getTemperatureSensors}),
    withState('tempData', 'setData', tempData),
    )(LogsView);
