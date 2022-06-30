import { USER_LOADING, GET_USERS } from '../actions/types';

const initState = {
  users: [],
  isLoading: false,
};

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        isLoading: false,
      };
    case USER_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    default:
      return state;
  }
};

export default userReducer;
