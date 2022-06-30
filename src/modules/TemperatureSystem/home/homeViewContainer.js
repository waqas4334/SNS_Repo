import HomeScreen from './homeView';
import {connect} from 'react-redux';
import {getSensors} from '../../../redux/actions/tempAction';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    tempModule : state.Temperature.tempModule,
    tempLoading : state.Temperature.tempLoading,
    
})

export default connect(mapStateToProps,{getSensors}) (HomeScreen);