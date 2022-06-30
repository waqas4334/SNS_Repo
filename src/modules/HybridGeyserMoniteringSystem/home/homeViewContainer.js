import HybridGeyserHomeScreen from './homeView';
import { connect } from 'react-redux';
import {getSensors, GeyserStatus} from  '../../../redux/actions/hybridgeyserAction';
const mapStateToProps = state => ({
  user: state.auth.user,
  geyserModule: state.hybridgeyser.geyserModule,
  geyserLoading: state.hybridgeyser.geyserLoading,
  AllRoutineLoading: state.hybridgeyser.AllRoutineLoading,
  addRoutineLoading: state.hybridgeyser.addRoutineLoading,
});

export default connect(mapStateToProps, { getSensors, GeyserStatus })(
  HybridGeyserHomeScreen,
);
