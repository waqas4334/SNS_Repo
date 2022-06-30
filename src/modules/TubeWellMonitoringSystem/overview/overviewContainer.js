import HomeScreen from './overview';
import {connect} from 'react-redux';
import {getSensors,forceMotor,motorMode} from '../../../redux/actions/tubewellAction';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    sensors : state.tubewell.sensors,
    sensorsLoading : state.tubewell.sensorsLoading,
    controlLoading : state.tubewell.controlLoading,
    motorLoading : state.tubewell.motorLoading
})

export default connect(mapStateToProps,{getSensors,forceMotor,motorMode})(HomeScreen);