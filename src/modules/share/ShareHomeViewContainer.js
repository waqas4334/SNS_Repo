// @flow
import { compose, withState } from 'recompose';
import { connect } from 'react-redux';

import ShareHomeView from './ShareHomeView';

export default compose(
    connect(null, null)
    )(ShareHomeView);
