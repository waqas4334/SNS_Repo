import { tokenConfig } from './authActions';
import axios from 'axios';
import { returnErrors } from './errorActions';
import { 
    USER_LOADING,
    GET_USERS,
    EDIT_SUCCESS,
    EDIT_FAIL,
    url
} from "./types";
//import {REACT_APP_URL} from 'react-native-dotenv';

export const changePasswordAction = (password,newPassword,user_id) =>async (dispatch)=>{
    // const config = await makeConfig('application/json');
    const id   = user_id
    console.log( 'Change PASSWORD+++++++++++++++++++++++++',id,    
        password,
        newPassword )
    const body ={
      id,    
      password,
      newPassword 
    };
    console.log('ACTION', body)
    try{
      const res = await axios.post(`${url}/user/changePassword`,body);
      console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',res.data.message)
    return{
      ...res
    }
  }
  catch(err){
    console.log(err);
  }
  };
export const editUserDetails = ({
    username,
    name,
    email,
    address,
    password
    } , id) => {
    return (dispatch, getState) => {

            const config = {
            headers : {
                'Content-type' : 'Application/json'
            }
        }    
        const body = JSON.stringify({
            username,
            name,
            email,
            address,
            password
            
        })
        
        axios.post(`${url}/users/update/${id}`, body , config )
        .then(res => dispatch({
            type : EDIT_SUCCESS,
            payload : res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, EDIT_FAIL));
            dispatch({
                type : EDIT_FAIL
            })
    });
};
}
