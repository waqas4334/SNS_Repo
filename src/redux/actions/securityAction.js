import axios from 'axios';
import { makeConfig } from './authActions';
import { url } from './types';

export const getModule = (id) => (dispatch, getState) => new Promise(async (resolve, reject) => {
    dispatch({
        type: 'MODULE_LOADING'
    });
    const config = await makeConfig('application/json');
    try {
        const data = await axios.get(`${url}/security/${id}`,config);
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
export const updateSecuritySystem = (data) => async dispatch => {
    await
    console.log('update',data)
      if  (data.alarm !== undefined) {
        dispatch({
          type: 'UPDATE_ALARM',
          payload: data,
        });
      }
     else  if  (data.door_status !== undefined) {
        dispatch({
          type: 'UPDATE_DOOR_STATUS',
          payload: data.door_status,
          id:data.security_id
        });
      }
      else {
        console.log('done')
      }
};
export const getLogs = (logtype, id, startDate, endDate) => async (dispatch, getState) => {
    dispatch({
        type: 'LOGS_LOADING'
    })
    const config = await makeConfig('application/json');
    const body = {
        startDate,
        endDate
    }
    try {
        const data = await axios.post(`${url}/security/log/${logtype}/${id}`, body, config);
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
export const getCharts = (type,range,id) => async (dispatch, getState) => {
    dispatch({
        type: 'CHARTS_LOADING'
    })
    const config = await makeConfig('application/json');

    try {
        const data = await axios.get(`${url}/security/chart/${type}/${range}/${id}`, config);
        console.log('action', data.data.data);
        const arr = [];
        let highest = 1;

        if (type === 'door_status' || type === 'alarm' ) {
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
export const getSecurityAlerts = id => async (dispatch, getState) => {
    console.log('id',id)
    dispatch({
      type: 'ALERTS_LOADING',
    });
    const config = await makeConfig('application/json');
    const body = {
      id
    };
  
    const data = await axios.post(`${url}/security/alerts`, body, config);
    console.log('action',data.data)
    dispatch({
      type: 'GET_ALERTS',
      payload: data.data, 
    });
  };