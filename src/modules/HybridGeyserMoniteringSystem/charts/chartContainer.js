import ChartsScreen from './charts';
import {connect} from 'react-redux';
import {getCharts,getSensors} from '../../../redux/actions/hybridgeyserAction';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    sensors : state.hybridgeyser.sensors,
    charts: state.hybridgeyser.charts,
    chartsLoading :state.hybridgeyser.chartsLoading,
    highest: state.hybridgeyser.highest
})
export default connect(mapStateToProps,{getCharts,getSensors})(ChartsScreen);