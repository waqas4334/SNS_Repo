import HomeScreen from './overview';
import{connect} from 'react-redux';
import {getModule,tempLowerThreshold,tempUpperThreshold,humidityLowerThreshold,humidityUpperThreshold} from '../../../redux/actions/humidity';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    module : state.humidity.module,
    moduleLoading: state.humidity.moduleLoading
})
export default  connect (mapStateToProps,{getModule,tempLowerThreshold,tempUpperThreshold,humidityLowerThreshold
    ,humidityUpperThreshold})(HomeScreen);