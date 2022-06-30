/* eslint-disable no-console */
import axios from 'axios';
import { url } from './types';
import { makeConfig } from './authActions';

// eslint-disable-next-line import/prefer-default-export
export const getSensors = id => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch({
      type: 'ENV_SENSOR_LOADING',
    });

    const config = await makeConfig('application/json');

    try {
      const data = await axios.get(`${url}/env/${id}`, config);
      console.log('data', data.data);
      dispatch({
        type: 'ENV_GET_SENSOR',
        payload: data.data,
      });
      resolve('done');
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

export const setThreshold = (id, type, value) => async dispatch => {
  const config = await makeConfig('application/json');

  let body;
  if (type === 'pm2.5_l') {
    body = {
      threshold: value,
    };
  }
  if (type === 'pm2.5_u' || type === 'pm1_u' || type === 'pm10_u') {
    body = {
      upperThreshold: value,
    };
  }
  try {
    if (type === 'pm2.5_l') {
      // eslint-disable-next-line no-unused-vars
      const data = await axios.post(
        `${url}/env/threshold/${type}/${id}`,
        body,
        config,
      );
      dispatch({
        type: 'SET_PM2_5_L_THRESHOLD',
        payload: value,
        id,
      });
    } else {
      // eslint-disable-next-line no-unused-vars
      const data = await axios.post(
        `${url}/env/upperThreshold/${type}/${id}`,
        body,
        config,
      );
    }
    if (type === 'pm1_u') {
      dispatch({
        type: 'SET_PM1_U_THRESHOLD',
        payload: value,
        id,
      });
    }
    if (type === 'pm2.5_u') {
      dispatch({
        type: 'SET_PM2_5_U_THRESHOLD',
        payload: value,
        id,
      });
    }
    if (type === 'pm10_u') {
      dispatch({
        type: 'SET_PM10_U_THRESHOLD',
        payload: value,
        id,
      });
    }
  } catch (err) {
    console.log(err);
  }
};

export const updateEnvSensors = data => async dispatch => {
  if (data.pm1 !== undefined) {
    dispatch({
      type: 'UPDATE_PM1',
      payload: data,
    });
  } else if (data.pm2_5 !== undefined) {
    dispatch({
      type: 'UPDATE_PM2_5',
      payload: data,
    });
  } else if (data.pm10 !== undefined) {
    dispatch({
      type: 'UPDATE_PM10',
      payload: data,
    });
  } else if (data.pm2_5threshold !== undefined) {
    dispatch({
      type: 'UPDATE_PM2_5_L_THRESHOLD',
      payload: data.pm2_5threshold,
      id: data.env_id,
    });
  } else if (data.pm2_5upperThreshold !== undefined) {
    dispatch({
      type: 'UPDATE_PM2_5_U_THRESHOLD',
      payload: data.pm2_5upperThreshold,
      id: data.env_id,
    });
  } else if (data.pm1_upperThreshold !== undefined) {
    dispatch({
      type: 'UPDATE_PM1_U_THRESHOLD',
      payload: data.pm1_upperThreshold,
      id: data.env_id,
    });
  } else if (data.pm10_upperThreshold !== undefined) {
    dispatch({
      type: 'UPDATE_PM10_U_THRESHOLD',
      payload: data.pm10_upperThreshold,
      id: data.env_id,
    });
  }
};

export const getLogs = (logType, id, startDate, endDate) => async dispatch => {
  dispatch({
    type: 'LOGS_LOADING',
  });

  const config = await makeConfig('application/json');

  const body = {
    startDate,
    endDate,
  };

  try {
    const data = await axios.post(
      `${url}/env/log/${logType}/${id}`,
      body,
      config,
    );
    dispatch({
      type: 'GET_LOGS',
      payload: data.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getChartData = (chartType, chartRange, id) => async dispatch => {
  dispatch({
    type: 'CHART_LOADING',
  });

  const config = await makeConfig('application/json');

  try {
    const data = await axios.get(
      `${url}/env/chart/${chartType}/${chartRange}/${id}`,
      config,
    );

    const arr = [];
    let highest = 1;

    if (chartType === 'pm1' || chartType === 'pm2_5' || chartType === 'pm10') {
      // eslint-disable-next-line array-callback-return
      data.data.labels.map((d, index) => {
        if (data.data.data[index] > highest) {
          highest = data.data.data[index];
        }
        const obj = {
          x: d,
          y: data.data.data[index],
        };
        arr.push(obj);
      });
    }

    dispatch({
      type: 'GET_CHART',
      payload: arr,
      highest,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getAlerts = id => async dispatch => {
  dispatch({
    type: 'ALERTS_LOADING',
  });

  const config = await makeConfig('application/json');

  const body = {
    id,
  };

  const data = await axios.post(`${url}/env/alerts`, body, config);
  // console.log('in action',data.data);
  dispatch({
    type: 'GET_ALERTS',
    payload: data.data,
  });
};
