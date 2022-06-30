import HomeScreen from './homeView';
import {connect} from 'react-redux';
import {getSensors} from '../../../redux/actions/gasAction';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    gasModule : state.gas.gasModule,
    gasLoading : state.gas.gasLoading,
})

export default connect(mapStateToProps,{getSensors}) (HomeScreen);