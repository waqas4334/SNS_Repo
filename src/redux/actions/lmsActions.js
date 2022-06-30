import axios from 'axios';
import {url, SENSOR_LOADING} from './types';
import {makeConfig} from './authActions';
export const getLmsTableData = (type, id, startDate, endDate) => async (
  dispatch,
  getState
) => {

  dispatch({
    type: 'LMS_TABLE_LOADING',
  });

  const config = await makeConfig('application/json');

  const body = {
    startDate,
    endDate
  };

  try {
    const data = await axios.post(
      `${url}/lms/log/${type}/${id}`,
      body,
      config
    );

    dispatch({
      type: 'LMS_TABLE_DATA',
      payload: data.data,
      lms_id: id
    });
  } catch (err) {
    console.log(err);
  }
};

export const getLmsSensors = (id,type) => (dispatch, getState) => new Promise(async function (resolve,reject) {

  dispatch({
    type: 'LMS_GENERAL_LOADING'
  })

  const config = await makeConfig('application/json');

  try {
    const data = await axios.get(`${url}/lms/${id}/${type}`,config);
    dispatch({
      type: 'GET_LMS',
      payload: data.data
    });
    resolve('done');
  } catch (err) {
    console.log(err);
    reject(err);
  }
});

export const updateLmsSensors = (data) => async (dispatch, getState) => {
  
  if (data.ph !== undefined) {
    dispatch({
      type: 'UPDATE_LMS_PH',
      payload: data.ph,
      id: data.lms_id
    });
  }

  if (data.tds !== undefined) {
    dispatch({
      type: 'UPDATE_LMS_TDS',
      payload: data.tds,
      id: data.lms_id
    });
  }

  if (data.waterflow !== undefined) {
    dispatch({
      type: 'UPDATE_LMS_WATERFLOW',
      payload: data.waterflow,
      id: data.lms_id
    });
  }

  if (data.dissolvedOxygen !== undefined) {
    dispatch({
      type: 'UPDATE_LMS_O2',
      payload: data.dissolvedOxygen,
      id: data.lms_id
    });
  }

  if (data.aerator !== undefined) {
    dispatch({
      type: 'UPDATE_LMS_AERATOR',
      payload: data.aerator,
      id: data.lms_id
    });
  }

  if (data.motor !== undefined) {
    dispatch({
      type: 'UPDATE_LMS_MOTOR',
      payload: data.motor,
      id: data.lms_id
    });
  }

  if (data.temperature !== undefined) {
    dispatch({
      type: 'UPDATE_LMS_TEMPERATURE',
      payload: data.temperature,
      id: data.lms_id
    });
  }

  if (data.battery !== undefined) {
    dispatch({
      type: 'UPDATE_LMS_BATTERY',
      payload: data.battery,
      id: data.lms_id
    });
  }
  if (data.ut !== undefined) {
    //console.log(data.ut);
    dispatch({
      type: 'UPDATE_LMS_UT',
      payload: data.ut,
      id: data.lms_id
    });
  }

  if (data.lt !== undefined) {
    dispatch({
      type: 'UPDATE_LMS_LT',
      payload: data.lt,
      id: data.lms_id
    });
  }
};

export const getLmsChartData = (name, range, id) => async (
  dispatch,
  getState
) => {
  dispatch({
    type: 'LMS_CHART_LOADING',
    lms_id: id
  });
  console.log(name);

  const config = await makeConfig('application/json');

  try {
    const data = await axios.get(`${url}/lms/chart/${name}/${range}/${id}`,config);

    let arr = [];
    let highest = 1;

    if(name === 'ph' || name === 'tds' || name === 'temperature' || name === 'do') {

      data.data.labels.map((d,index) => {
        if(data.data.data[index] > highest){
          highest = data.data.data[index];
        }
        let obj = {
          x: d,
          y: data.data.data[index]
        }
        arr.push(obj)
      })

    }
    else if(name === 'aerator' || name === 'motor') {
      data.data.labels.map((d,index) => {
        if(data.data.data[index] > highest){
          highest = data.data.data[index];
        }
        let obj = {
          x: d,
          y: data.data.data[index],
        }
        arr.push(obj)
      })
    }

    dispatch({
      type: 'LMS_CHART_DATA',
      payload : arr,
      highest: highest
    });
  } catch (err) {
    console.log(err);
  }
};

export const setLmsThreshold = (value, id) => async (dispatch,getState) => {

  const config = await makeConfig('application/json');

  const body = {
    threshold: value
  }
  try {
    const data = await axios.post(`${url}/lms/threshold/${id}`,body,config);
    dispatch({
      type: 'SET_LMS_THRESHOLD',
      payload: value,
      id:id
    })
  } catch (err) {
    console.log(err);
  }
};

export const setLmsUpperThreshold = (value, id) => async (
  dispatch,
  getState
) => {
  const config = await makeConfig('application/json');

  const body = {
    threshold : value
  };

  try {
    const data = await axios.post(
      `${url}/lms/upperThreshold/${id}`,
      body,
      config
    );
    
    dispatch({
      type: 'SET_LMS_UPPERTHRESHOLD',
      payload: value,
      id
    });
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      message: err.response.data,
      id: 'THRESHOLD_FAIL'
    });
  }
};

export const setLmsTank = (tank, id) => async (dispatch, getState) => {
  const config = await makeConfig('application/json');

  const body = {
    tank
  };

  try {
    const data = await axios.post(
      `${url}/lms/tank/${id}`,
      body,
      config
    );
    
    dispatch({
      type: 'SET_LMS_TANK',
      tank,
      id
    });
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      message: err.response.data,
      id: 'TANK_FAIL'
    });
  }
};


export const getLmsAlerts = (id, type) => async (dispatch, getState) => {
  dispatch({
    type: 'LMS_ALERTS_LOADING'
  });

  const config = await makeConfig('application/json');

  const body = {
    id,
    type
  };

  const data = await axios.post(
    `${url}/lms/alerts`,
    body,
    config
  );
  
  dispatch({
    type: 'GET_LMS_ALERTS',
    payload: data.data
  });
};

