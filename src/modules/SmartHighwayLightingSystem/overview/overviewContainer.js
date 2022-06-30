import HomeScreen from './overview';
import{connect} from 'react-redux';
import {getSegment,SegmentControl} from '../../../redux/actions/streetLightAction';

const mapStateToProps = (state) => ({
    user : state.auth.user,
    segment : state.light.segment,
    segmentLoading: state.light.segmentLoading
})

export default connect (mapStateToProps,{getSegment,SegmentControl})(HomeScreen);