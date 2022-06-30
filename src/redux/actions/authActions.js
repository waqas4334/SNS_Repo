import axios from 'axios';
import { returnErrors } from './errorActions';
import AsyncStorage from '@react-native-community/async-storage';
import { 
    USER_LOADING,
    USER_LOADED,
    REGISTER_SUCCESS,
    LOGIN_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_FAIL,
    url
} from "./types";

export const makeConfig = async (type) => {

    const token = await AsyncStorage.getItem('userToken');
    // console.log(token)
    const config = {
        headers: {
            'content-type' : type,
            auth: token
        }
    }
    return config;
};
export const forget_Password = (email) =>async (dispatch)=>{
    const config =await makeConfig('application/json');
    const body ={
      email
    };
    console.log('ACTION', body)
    try{
      const res = await axios.post(`${url}/user/forgotPass`,body,config);
      console.log('Forget Password Action >>>>>>>>>>>>>>>>>>>>>>',res)
    return{
      ...res
    }
  }
  catch(err){
    console.log(err);
  }
  };
export const register = (value,name,email,password,phone_no,address,City,code,geyser_id,geyser_name,compName) => {
    const dashboards=[value]
    // console.log('_________________________',code)
    // console.log('_________________________',geyser_id)
    // console.log('_________________________compNAme',compName)
    const board_id=code.concat(geyser_id);
    // console.log('++++++++++++++++++++++++++++board',board_id)
    const city = City

    return (dispatch, getState) => {

            const config = {
            headers : {
                'Content-type' : 'Application/json'
            }
        }
        const body = JSON.stringify({
            name,
            email,
            password,
            phone_no,
            city,
            address,
            board_id,
            geyser_name,
            dashboards, 
            compName,
        })
        console.log('Action REGISTER',body) 

      axios.post(`${url}/user/register`,body,config)
        .then(res => {
            // console.log('Action Return',res.data)
            dispatch({
                type : REGISTER_SUCCESS,
                payload : res.data 
            })
        }  
        
        )
        .catch(err => {
            console.log('ACTION',err.response.data)
            dispatch(returnErrors(err.response.data, err.response.status, REGISTER_FAIL));
            dispatch({
                type : REGISTER_FAIL
            })
           
      
    });
};
}

export const login = (email, password,ip) => {
    return (dispatch, getState) => {

        dispatch({
            type : USER_LOADING,
        })

        const config = {
            headers : {
                'Content-type' : 'Application/json'
            }
        }
    
        const body = JSON.stringify({
            email,
            password,
            ip
        })

        axios.post(`${url}/user/login`, body , config)
        .then(res => 
            dispatch ({
                type : LOGIN_SUCCESS,
                payload : res.data
        })
        )
        .catch(err =>{
            dispatch(returnErrors(err.response.data,err.response.status, LOGIN_FAIL));
            dispatch({
                type: LOGIN_FAIL
            })
        });
    };
}


export const logout = () => {
    return {
        type : LOGOUT_SUCCESS
    }
}

export const loadUser = (token) => {
    return (dispatch, getState) => {
        
        dispatch({
            type: USER_LOADING,
        });
        const config = {
            headers : {
                'content-type' : 'Application/json',
                'auth' : token
            }
        }

        axios.get(`${url}/user/auth` , config)
        .then(res => {
            dispatch({
                type: USER_LOADED,
                payload : res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
                type : AUTH_ERROR
            });
        })
    }
}


//
export const tokenConfig = async (getState) => {

    const token = await AsyncStorage.getItem('userToken');

    const config = {
        headers : {
            'content-type' : 'Application/json',
        }
    }

    if(token) {
        config.headers['auth'] = token;
    }

    return config;
} 