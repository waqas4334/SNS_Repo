// @flow
import { compose } from 'recompose';
import { connect } from 'react-redux';

import AuthView from './AuthView';

import {register, login,forget_Password} from '../../redux/actions/authActions';
import {clearErrors,clearReg} from '../../redux/actions/errorActions';

const mapStateToProps = (state) => (
  console.log('Container View',state.auth.registeration),
  {
    isAuthenticated : state.auth.isAuthenticated,
    isLoading : state.auth.isLoading,
    error : state.error,
    reg :(state.auth.registeration)?state.auth.registeration:{id:null}
  }
  );

export default compose(connect(mapStateToProps, {register, login, clearErrors,clearReg,forget_Password}))(AuthView);
