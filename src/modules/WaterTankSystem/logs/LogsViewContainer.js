// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import {getSensors,getLogs} from '../../../redux/actions/tankActions';

import LogsView from './LogsView';

const fmsData = [

    'fillLevel',
    'fillLevel1',
    'motor',
    'force-motor',
];

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    user: state.auth.user,
    sensors: state.tank.sensors,
    logs: state.tank.logs,
    logsLoading: state.tank.logsLoading
  }); 

export default compose(
    connect(mapStateToProps, {getSensors,getLogs}),
    withState('fmsData', 'setData', fmsData),
    )(LogsView);
