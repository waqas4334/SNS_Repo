import ThresholdScreen from './thresholds';
import {connect} from 'react-redux';
import {upperThresholds,getSensors,maintenanceThresholds,lowerThresholds,filterMaintenance,getRunningTime,motorMaintenance,motorMode} from '../../../redux/actions/tubewellAction';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    sensors : state.tubewell.sensors,
    upper : state.tubewell.upper,
    sensorsLoading : state.tubewell.sensorsLoading,
    upperLoading : state.tubewell.upperLoading,
    motorLoading:state.tubewell.motorLoading
})

export default connect(mapStateToProps,{getSensors,upperThresholds,lowerThresholds,maintenanceThresholds,filterMaintenance,getRunningTime,motorMaintenance,motorMode})
(ThresholdScreen);