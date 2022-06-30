import axios from 'axios';
import { makeConfig } from './authActions';
import { url } from './types';

export const getModule = (id) => (dispatch, getState) => new Promise(async (resolve, reject) => {
    dispatch({
        type: 'MODULE_LOADING'
    });
    const config = await makeConfig('application/json');
    try {
        const data = await axios.get(`${url}/humidity/${id}`,config);
        dispatch({
            type: 'GET_MODULE',
            payload: data.data
        });
        resolve('done');
    }
    catch (err) {
        console.log('error');
        reject(err);
    }
});
export const updateHumidityAndTemperature = (data) => async dispatch => {
    await
    console.log('update',data)
      if  (data.lt !== undefined) {
        dispatch({
          type: 'UPDATE_TEMPERATURE_LOWER_THRESHOLD',
          payload: data,
        });
      }
      else if  (data.humidity !== undefined) {
        dispatch({
          type: 'UPDATE_CURRENT_HUMIDITY',
          payload: data,
        });
      }
      else if  (data.temperature !== undefined) {
        dispatch({
          type: 'UPDATE_CURRENT_TEMPERATURE',
          payload: data,
        });
      }
      else if  (data.ut !== undefined) {
        dispatch({
          type: 'UPDATE_TEMPERATURE_UPPER_THRESHOLD',
          payload: data,
        });
      }
     else  if  (data.hlt !== undefined) {
        dispatch({
          type: 'UPDATE_HUMIDITY_LOWER_THRESHOLD',
          payload: data,
        });
      }
      else if  (data.hut !== undefined) {
        dispatch({
          type: 'UPDATE_HUMIDITY_UPPER_THRESHOLD',
          payload: data,
        });
      }
      else {
        console.log('done')
      }
};
export const tempLowerThreshold = (id,threshold) => async(dispatch,getState) => {
    dispatch({
        type:'TEMPERATURE_LOWER_THRESHOLD_LOADING'
    });
    const config = await makeConfig('application/json');
    const body = {
        threshold
    }
    console.log('body',threshold)
    try {
        const data = await axios.post(`${url}/humidity/threshold/${id}`,body,config);
        console.log('data',data.data)
    }
    catch (err) {
        console.log('error');
    }
}
export const tempUpperThreshold = (id,upperThreshold) => async(dispatch,getState) => {
    dispatch({
        type:'TEMPERATURE_UPPER_THRESHOLD_LOADING'
    });
    const config = await makeConfig('application/json');
    const body = {
        upperThreshold
    }
    console.log('body',upperThreshold)
    try {
        const data = await axios.post(`${url}/humidity/upperThreshold/${id}`,body,config);
        console.log('data',data.data)
    }
    catch (err) {
        console.log('error');
    }
}
export const humidityLowerThreshold = (id,humidity_threshold) => async(dispatch,getState) => {
    dispatch({
        type:'HUMIDITY_LOWER_THRESHOLD_LOADING'
    });
    const config = await makeConfig('application/json');
    const body = {
        humidity_threshold
    }
    console.log('body',humidity_threshold)
    try {
        const data = await axios.post(`${url}/humidity/hl_Threshold/${id}`,body,config);
        console.log('data',data.data)
    }
    catch (err) {
        console.log('error');
    }
}
export const humidityUpperThreshold = (id,humidity_upperThreshold) => async(dispatch,getState) => {
    dispatch({
        type:'HUMIDITY_UPPER_THRESHOLD_LOADING'
    });
    const config = await makeConfig('application/json');
    const body = {
        humidity_upperThreshold
    }
    console.log('body',humidity_upperThreshold)
    try {
        const data = await axios.post(`${url}/humidity/hu_Threshold/${id}`,body,config);
        console.log('data',data.data)
    }
    catch (err) {
        console.log('error');
    }
}
export const getLogs = (type, id, startDate, endDate) => async (dispatch, getState) => {
    console.log('values',type, id, startDate, endDate)
    dispatch({
        type: 'LOGS_LOADING'
    })
    const config = await makeConfig('application/json');
    const body = {
        startDate,
        endDate
    }
    console.log('body',body)
    try {
        const data = await axios.post(`${url}/humidity/log/${type}/${id}`, body, config);
        console.log('action', data.data.data);
        dispatch({
            type: 'LOGS_DATA',
            payload: data.data.data
        })
    }
    catch {
        console.log('error');
    }
}
export const getCharts = (range,type,id) => async (dispatch, getState) => {
    dispatch({
        type: 'CHARTS_LOADING'
    })
    const config = await makeConfig('application/json');
    try {
        const data = await axios.get(`${url}/humidity/chart/${range}/${type}/${id}`, config);
        console.log('action', data.data.data);
        const arr = [];
        let highest = 1;

        if (type === 'temperature' || type === 'humidity' ) {
            data.data.labels.map((d, index) => {
                if (data.data.data[index] > highest) {
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
            type: 'CHARTS_DATA',
            payload: arr,
            highest
        })
    }
    catch {
        console.log('error');
    }
}
export const getAlerts = id => async (dispatch, getState) => {
    console.log('id',id)
    dispatch({
      type: 'ALERTS_LOADING',
    });
    const config = await makeConfig('application/json');
    const body = {
      id,
    };
  
    const data = await axios.post(`${url}/humidity/alerts`, body, config);
    console.log('action',data.data)
    dispatch({
      type: 'GET_ALERTS',
      payload: data.data, 
    });
  };