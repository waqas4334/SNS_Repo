/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';
import {url} from './types';
import { makeConfig } from './authActions';

export const getSensors = () => (dispatch, getState) => new Promise(async (resolve, reject) => {
//console.log('id',user_id)
  dispatch({
    type: 'SENSORS_LOADING',
  });
  const config = await makeConfig('application/json');
  
  try {
    const data = await axios.get(`${url}/temperaturesystem/sensors`, config);
    console.log('action',data.data.data)
    dispatch({
      type: 'GET_SENSORS',
      payload: data.data.data,
    });
    resolve('done');
  }
  catch (err) {
    console.log(err);
    reject(err);
  }
});

export const updateTemperatureSensor = (data) => async dispatch => {
  
 
    if  (data.temperature !== undefined) {
      console.log('temp')
      dispatch({
        type: 'UPDATE_TEMPERATURE',
        payload: data,
      });
    }
    else if  (data.humidity !== undefined) {
      console.log('humidity')
      dispatch({
        type: 'UPDATE_HUMIDITY',
        payload: data,
      });
    }
    else if  (data.upperthreshold !== undefined ) {
      console.log('UPPER')
      dispatch({
        type: 'UPDATE_UPPER_THRESHOLD',
        payload: data,
      });
    }
    else if  (data.lowerthreshold !== undefined ) {
      console.log('LOWER')
      dispatch({
        type: 'UPDATE_LOWER_THRESHOLD',
        payload: data,
      });
    }  
    else if  (data.fan_auto !== undefined) {
      console.log('mode')
      dispatch({
        type: 'UPDATE_FAN_MODE',
        payload: data,
      });
    }
    else if  (data.status !== undefined) {
      // console.log('fan Update',data)
      dispatch({
        type: 'UPDATE_FAN',
        payload: data,
        id:data.fan_id
      });
    }
    else {
      console.log('done')
    }
};

export const fanControl = (module_id,fan_id,fan_status) => async (dispatch, getState) => {
  // dispatch({
  //     type: 'FANS_LOADING'
  // })
  // const config = {
  //     headers: {
  //         'content-type': 'application/json'
  //     }
  // }
  const config = await makeConfig('application/json');
  const body = {
    module_id,
    fan_id,
    fan_status
  }
  console.log('body',body)
  try {
      const data = await axios.post(`${url}/temperaturesystem/control`, body,config);
      console.log('actionsss', data.data.fans);
      // dispatch({
      //     type:'GET_SEGMENT',
      //     payload:data.data
      // })
  }
  catch {
      console.log('error');
  }
}

export const getLogs = (id, type, start_date, end_date ) => async dispatch => {
  // console.log('action type',id, type, start_date, end_date );
  dispatch({
    type: 'LOGS_LOADING',
  });
  const config = await makeConfig('application/json');
  // if(type === 'temperature' || type === 'fan_status'){
  //   var body = {
  //     id, type, start_date, end_date 
  //   }
  // }
  // else if (type === 'fan_interval'){
  //   var body = {
  //     id,fan_id, type, start_date, end_date
  //   }
  // }
  const body = {
       id, type, start_date, end_date
       }
  try {
    const data = await axios.post(`${url}/temperaturesystem/logs`,body,config);
    //  console.log('action',data.data);
    dispatch({
      type: 'LOGS_DATA',
      payload: data.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};


export const getLogsFan = (id, fan_id,type, start_date, end_date ) => async dispatch => {
  // console.log('action fannnnnn',id, fan_id,type, start_date, end_date );
  dispatch({
    type: 'LOGS_LOADING',
  });
  const config = await makeConfig('application/json');
    const body = {
      id,fan_id, type, start_date, end_date
    }
  // console.log('Body fan_id',body)
  try {
    const data = await axios.post(`${url}/temperaturesystem/logs`,body,config);
     console.log('Fan Action',data.data.data);
    dispatch({
      type: 'LOGS_DATA',
      payload: data.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getCharts = (id, type, range ) => (dispatch, getState) => new Promise(async (resolve, reject) => {
  console.log('action',id, type, range )
  dispatch({
    type: 'CHARTS_LOADING',
  });
  const config = await makeConfig('application/json');
  const body = {
    id, type, range 
  }
  try {
    const data = await axios.post(`${url}/temperaturesystem/graphs`, body,config);
    console.log('dataaaaa',data.data)
    const arr = [];
    let highest = 1;
    if(type === 'temperature' || type === 'humidity'){
      data.data.labels.map((d,index) => {
        if(data.data.data[index] > highest){
          highest = data.data.data[index];
        }
        const obj = {
          x: d,
          y: data.data.data[index]
        }
        arr.push(obj)
      })
    }   
    dispatch({
      type: 'GET_CHARTS',
      payload : arr,
      highest
    });
    resolve('done');
  }
  catch (err) {
    console.log(err);
    reject(err);
  }
});

export const Thresholds = (type, module_id, value) => async (dispatch, getState) => {
  // dispatch({
  //   type: 'THRESHOLD_LOADING'
  // })
  const config = await makeConfig('application/json');
  const body = {
    type, module_id, value
  }
  // console.log('body',body);
  try {
    const data = await axios.post(`${url}/temperaturesystem/set`,body,config);
    // console.log('threshold', data.data)
  }
  catch (err) {
    console.log(err);
  }
}

export const FanMode = (module_id, mode) => (dispatch, getState) => new Promise(async (resolve, reject) => {
  dispatch({
    type: 'FAN_LOADING'
  })
  const config = await makeConfig('application/json');
  const body = {
    module_id, mode
  };
  try {
    const data = await axios.post(`${url}/temperaturesystem/auto`, body, config);
    console.log('fan mode', data.data)
    // dispatch({
    //   type: 'GET_FAN'
    // })
    resolve('done');
  }

  catch (err) {
    console.log(err);
    reject(err);
  }
});

export const getAlerts = (user_id) => async (dispatch, getState) => {
  dispatch({
    type: 'ALERTS_LOADING',
  });
  const config = await makeConfig('application/json');

  const data = await axios.get(`${url}/temperaturesystem/alerts/${user_id}`, config);
  console.log('actionnnnn',data.data.data)
  dispatch({
    type: 'GET_ALERTS',
    payload: data.data.data, 
  });
};