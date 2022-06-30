import axios from 'axios';
import { makeConfig } from './authActions';
import { url } from './types';

export const getModule = (id) => (dispatch, getState) => new Promise(async (resolve, reject) => {
    dispatch({
        type: 'MODULE_LOADING'
    });
    const config = await makeConfig('application/json');
    try {
        const data = await axios.get(`${url}/rectifier/${id}`, config);
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
export const updateRectifier = (data) =>  dispatch => {
        console.log('update', data)
        if (data.ac_status !== undefined) {
            dispatch({
              type: 'UPDATE_INPUT_POWER_STATUS',
              payload: data,
              id: data.rectifier_id
            });
          } 
          else if (data.ac_inputVoltage !== undefined) {
            dispatch({
              type: 'UPDATE_INPUT_VOLTAGE',
              payload: data,
              id: data.rectifier_id
            });
          }
          else if (data.rec_status !== undefined) {
            dispatch({
              type: 'UPDATE_RECTIFICATION_STATUS',
              payload: data,
              id: data.rectifier_id
            });
          }
          else if (data.rec_outputDcVoltage !== undefined) {
              console.log('output',data)
            dispatch({
              type: 'UPDATE_OUTPUT_DC_VOLTAGE',
              payload: data.rec_outputDcVoltage,
              id: data.rectifier_id
            });
          }
          else if (data.battery_status !== undefined) {
            dispatch({
              type: 'UPDATE_BATTERY_BANK_CONNECTION',
              payload: data,
              id: data.rectifier_id
            });
          }
          else if (data.battery_voltagePercentage !== undefined) {
            dispatch({
              type: 'UPDATE_BANK_BATTERY_STATUS',
              payload: data,
              id: data.rectifier_id
            });
          }
          else if (data.ac_lowerthreshold !== undefined) {
            dispatch({
              type: 'UPDATE_INPUT_VOLTAGE_LOWER_THRESHOLD',
              payload: data,
              id: data.rectifier_id
            });
          }
          else if (data.ac_upperthreshold !== undefined) {
            console.log('data',data)
            dispatch({
              type: 'UPDATE_INPUT_VOLTAGE_UPPER_THRESHOLD',
              payload: data,
              id: data.rectifier_id
            });
          }
          else if (data.rec_lowerthreshold !== undefined) {
            dispatch({
              type: 'UPDATE_OUTPUT_VOLTAGE_LOWER_THRESHOLD',
              payload: data,
              id: data.rectifier_id
            });
          }
          else if (data.rec_upperthreshold !== undefined) {
            dispatch({
              type: 'UPDATE_OUTPUT_VOLTAGE_UPPER_THRESHOLD',
              payload: data,
              id: data.rectifier_id
            });
          }
          else if (data.battery_theftThreshold !== undefined) {
            dispatch({
              type: 'UPDATE_BATTERY_THEFT_THRESHOLD',
              payload: data,
              id: data.rectifier_id
            });
          }
          else if (data.battery_lowBatteryAlertThreshold !== undefined) {
            dispatch({
              type: 'UPDATE_LOW_BATTERY_THRESHOLD',
              payload: data,
              id: data.rectifier_id
            });
          }
          else if (data.battery_maxVolageValue !== undefined) {
            dispatch({
              type: 'UPDATE_MAX_BATTERY_THRESHOLD',
              payload: data,
              id: data.rectifier_id
            });
          }
        };
export const getLogs = (id, logtype, startDate, endDate) => async (dispatch, getState) => {
    dispatch({
        type: 'LOGS_LOADING'
    })
    const config = await makeConfig('application/json');
    const body = {
        id,
        logtype,
        startDate,
        endDate
    }
    try {
        const data = await axios.post(`${url}/rectifier/logs`, body, config);
        console.log('actionnnnn', data.data.data);
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
    console.log('valuess',type,range,id)
    dispatch({
        type: 'CHARTS_LOADING'
    })
    const config = await makeConfig('application/json');
    try {
        const data = await axios.get(`${url}/rectifier/chart/${type}/${range}/${id}`, config);
        console.log('action', data.data.data);
        const arr = [];
        let highest = 1;
      
        if (type === 'ac_charts' || type === 'rec_charts'  || type === 'battery_charts') {
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
        console.log('action',arr)
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
export const InputThreshold = (type, _id, value) => async (dispatch, getState) => {
  console.log('action',type, _id, value)
    dispatch({
        type: 'UPPER_THRESHOLD_LOADING'
    })
    const config = await makeConfig('application/json');
    const body = {
        type,
        _id,
        value
    }
    try {
        const data = await axios.post(`${url}/rectifier/set`, body, config);
        console.log('upper', data.data)
    }
    catch (err) {
        console.log(err);
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

  const data = await axios.post(`${url}/rectifier/alerts`, body, config);
  console.log('action',data.data.data)
  dispatch({
    type: 'GET_ALERTS',
    payload: data.data.data, 
  });
};