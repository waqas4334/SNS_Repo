// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';
import {getColdChainSensors,getColdChainTableData} from '../../../redux/actions/coldChainActions';

import LogsView from './LogsView';

const coldchainData = [
  
    'status',
    'temperature',
    'location',
];

const mapStateToProps = (state) => ({
    isAuthenticated : state.auth.isAuthenticated,
    user: state.auth.user,
    coldchain: state.coldchain.chain,
    logs: state.coldchain.logs,
    loading: state.coldchain.loading
  }); 

export default compose(
    connect(mapStateToProps, {getColdChainSensors,getColdChainTableData}),
    withState('coldchainData', 'setData', coldchainData),
    )(LogsView);
