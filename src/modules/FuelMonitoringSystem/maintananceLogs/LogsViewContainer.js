// @flow
import { compose} from 'recompose';
import { connect } from 'react-redux';

import LogsView from './LogsView'; 

export default compose(
    connect()
    )(LogsView);
