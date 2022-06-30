import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import {get_Em_sensor,set_emUpperThreshold,set_emLowerThreshold} from '../../../redux/actions/energyActions';

import SettingView from './SettingsView';

mapStateToProps = (state) => ({
    user: state.auth.user,
    sensor:state.energy.sensor,
    isLoading:state.energy.isLoading,
});

export default compose(connect(mapStateToProps,{get_Em_sensor,set_emLowerThreshold,
    set_emUpperThreshold}))(SettingView);