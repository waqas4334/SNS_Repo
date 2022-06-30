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
    const data = await axios.get(`${url}/gas/sensors`, config);
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

export const updateGasSensor = (data) => async dispatch => {
  await
  console.log('update',data)
    if  (data.gas !== undefined) {
      console.log('gas')
      dispatch({
        type: 'UPDATE_GAS',
        payload: data,
      });
    }
    else if  (data.alarm !== undefined) {
      console.log('alarm')
      dispatch({
        type: 'UPDATE_ALARM',
        payload: data,
      });
    }
    else {
      console.log('done')
    }
};

export const getLogs = (id, type, start_date, end_date) => async dispatch => {
  console.log('action type',id, type, start_date, end_date);
  dispatch({
    type: 'LOGS_LOADING',
  });
  const config = await makeConfig('application/json');
  const body = {
    id, type, start_date, end_date
  };
  try {
    const data = await axios.post(`${url}/gas/logs`,body,config);
     console.log('action',data.data.data);
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
    const data = await axios.post(`${url}/gas/graphs`, body,config);
    console.log('dataaaaa',data.data)
    const arr = [];
    let highest = 1;
    if(type === 'gas_status'){
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

export const getAlerts = (user_id) => async (dispatch, getState) => {
  dispatch({
    type: 'ALERTS_LOADING',
  });
  // const config = await makeConfig('application/json');
 const config = {
      headers: {
          'content-type': 'application/json'
      }
    }
  const data = await axios.get(`${url}/gas/alerts/${user_id}`, config);
  console.log('actionnnnn',data.data.data)
  dispatch({
    type: 'GET_ALERTS',
    payload: data.data.data, 
  });
};