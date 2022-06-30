import axios from 'axios';
import {url} from './types';
import {makeConfig} from './authActions';

export const getTemperatureSensors = (user_id) => (dispatch, getState) => new Promise((async (resolve, reject) => {
  dispatch({
    type : 'TEMP_SENSORS_LOADING'
  })

  const config = await makeConfig('application/json');

  try {
    const data = await axios.get(`${url}/temp/${user_id}`, config );
    // console.log(data.data);
    dispatch({
      type : 'GET_TEMPERATURE',
      payload : data.data 
    });
    resolve('done');
  }
  catch (err) {
    dispatch({
      type : 'GET_ERRORS',
      message : err.response.data,
      id : 'LOGIN_FAIL',
      status : err.response.status
    });
    reject(err);
  }
}));

export const setThreshold = (threshold,id) => async (dispatch, getState) => {

  const config = await makeConfig('application/json');
  const body = {
    threshold,
  }

  try {
    const data = await axios.post(`${url}/temp/threshold/${id}`, body , config );
    dispatch({
      type: 'COMING_FROM_SOCKET',
    });
  }

  catch (err) {
    console.log(err)
    /* dispatch({
      type : 'GET_ERRORS',
      message : err.response.data,
      id : 'LOGIN_FAIL',
      status : err.response.status
    }) */
  }
}

export const setUpperThreshold = (threshold, id) => async (
  
  dispatch,
  getState
) => {
  // console.log(threshold);
  // console.log(id);
  const config = await makeConfig('application/json');

  const body = {
    upperThreshold: threshold
  };

  try {
    const data = await axios.post(`${url}/temp/upperThreshold/${id}`,body,
      config
    );
    // console.log('here');
    // console.log(data);
    dispatch({
      type: 'COMING_FROM_SOCKET',
    });
  } catch (err) {
    /* dispatch({
      type: 'GET_ERRORS',
      message: err.response.data,
      id: 'LOGIN_FAIL',
      status: err.response.status
    }); */
    console.log(err);
  }
};

export const updateTemperature = (data) => async (dispatch, getState) => {

  if(data.temperature !== undefined) {
    dispatch({
      type : 'UPDATE_TEMPERATURE',
      payload : data
    });
  }else if (data.ut !== undefined) {
    dispatch({
      type : 'UPDATE_TEMPERATURE_UT',
      payload : data
    });
  }
  else if (data.lt !== undefined) {
    dispatch({
      type: 'UPDATE_TEMPERATURE_LT',
      payload: data
    });
  }
  
};

export const getTempAlerts = (id) => async (dispatch, getState) => {
  dispatch({
    type: 'TEMP_ALERTS_LOADING'
  });

  const config = await makeConfig('application/json');

  const body = {
    id
  };

  const data = await axios.post(
    `${url}/temp/alerts`,
    body,
    config
  );
  dispatch({
    type: 'GET_TEMP_ALERTS',
    payload: data.data
  });
};


export const getTemperatureTableData = (id, startDate, endDate) => async (
  dispatch,
  getState
) => {
  // console.log(startDate);
  dispatch({
    type: 'TEMP_TABLE_LOADING',
    temp_id: id
  });

  const config = await makeConfig('application/json');

  const body = {
    startDate,
    endDate
  };

  try {
    const data = await axios.post(
      `${url}/temp/log/${id}`,
      body,
      config
    );
    // console.log(data.data);

    dispatch({
      type: 'TEMP_TABLE_DATA',
      payload: data.data,
      temp_id: id
    });
  } catch (err) {
    console.log(err);
  }
};

export const getTempChartData = (chartName, chartRange, id) => async (dispatch, getState) => {
  dispatch({
    type : 'TEMP_CHART_LOADING'
  })

  const config = await makeConfig('application/json');

  try {
    
    const data = await axios.get(`${url}/temp/chart/${chartRange}/${id}` , config);
    const arr = [];
    let highest = 1;

    if(chartName === 'temperature') {

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
      type : 'TEMP_CHART_DATA',
      payload : arr,
      highest
    })
  }
  catch(err) {
    console.log(err);
  }
}

