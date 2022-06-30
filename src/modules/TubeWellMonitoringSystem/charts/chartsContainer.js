import ChartsScreen from './charts';
import {connect} from 'react-redux';
import {getCharts,getSensors} from '../../../redux/actions/tubewellAction';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    sensors : state.tubewell.sensors,
    charts: state.tubewell.charts,
    chartsLoading :state.tubewell.chartsLoading,
    highest: state.tubewell.highest
})
export default connect(mapStateToProps,{getCharts,getSensors})(ChartsScreen);