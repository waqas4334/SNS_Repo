/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';
import { url } from './types';
import { makeConfig } from './authActions';

export const getSensors = id => dispatch =>
  new Promise(async (resolve, reject) => {
    dispatch({
      type: 'SENSOR_LOADING',
    });

    const config = await makeConfig('application/json');

    try {
      const data = await axios.get(`${url}/tank/${id}`, config);
      //console.log('tank',data.data)
      dispatch({
        type: 'GET_SENSOR',
        payload: data.data,
      });
      resolve('done');
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

export const getLogs = (type, id, startDate, endDate) => async dispatch => {
  // console.log(type, id, startDate, endDate);
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
      `${url}/tank/log/${type}/${id}`,
      body,
      config,
    );
    console.log(data.data);
    dispatch({
      type: 'LOGS_DATA',
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getChartData = (chartType, chartRange, id) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: 'CHART_LOADING',
  });

  const config = await makeConfig('application/json');

  try {
    const data = await axios.get(
      `${url}/tank/chart/${chartType}/${chartRange}/${id}`,
      config,
    );
    const arr = [];
    let highest = 1;
    if (
      chartType === 'temperature' ||
      chartType === 'ph' ||
      chartType === 'tds' ||
      chartType === 'fillLevel' ||
      chartType === 'co' ||
      chartType === 'fillLevel1'
    ) {
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
    } else if (chartType === 'motor' || chartType === 'force-motor') {
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
      type: 'CHART_DATA',
      payload: arr,
      highest,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateTankSensors = data => async dispatch => {
  console.log('in action', data.maintanance);
  if (data.fillLevel !== undefined) {
    dispatch({
      type: 'UPDATE_FILLLEVEL',
      payload: data,
    });
  } else if (data.fillLevel1 !== undefined) {
    dispatch({
      type: 'UPDATE_FILLLEVEL1',
      payload: data,
    });
  } else if (data.motor !== undefined) {
    dispatch({
      type: 'UPDATE_MOTORSTATUS',
      payload: data,
    });
  } else if (data.maintenance !== undefined) {
    dispatch({
      type: 'UPDATE_MAINTENANCE',
      payload: data,
    });
  }
};

export const setLowerThreshold = (threshold, id, type) => async dispatch => {
  const config = await makeConfig('application/json');

  const body = {
    threshold,
  };
  try {
    const data = await axios.post(
      `${url}/tank/threshold/${type}/${id}`,
      body,
      config,
    );

    if (type === 'temp') {
      dispatch({
        type: 'SET_TEMP_LOWER_THRESHOLD',
        payload: threshold,
        id,
      });
    } else if (type === 'OH') {
      dispatch({
        type: 'SET_OH_LOWER_THRESHOLD',
        payload: threshold,
        id,
      });
    } else if (type === 'UG') {
      dispatch({
        type: 'SET_UG_LOWER_THRESHOLD',
        payload: threshold,
        id,
      });
    }
  } catch (err) {
    console.log(err);
    /* dispatch({
        type : 'GET_ERRORS',
        message : err.response.data,
        id : 'LOGIN_FAIL',
        status : err.response.status
      }) */
  }
};

export const setUpperThreshold = (upperThreshold, id, type) => async (
  dispatch,
  getState,
) => {
  const config = await makeConfig('application/json');

  const body = {
    upperThreshold,
  };

  try {
    const data = await axios.post(
      `${url}/tank/upperThreshold/${type}/${id}`,
      body,
      config,
    );

    if (type === 'temp_U') {
      dispatch({
        type: 'SET_TEMP_UPPER_THRESHOLD',
        payload: upperThreshold,
        id,
      });
    } else if (type === 'OH_U') {
      dispatch({
        type: 'SET_OH_UPPER_THRESHOLD',
        payload: upperThreshold,
        id,
      });
    } else if (type === 'UG_U') {
      dispatch({
        type: 'SET_UG_UPPER_THRESHOLD',
        payload: upperThreshold,
        id,
      });
    }
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

export const controlMotor = (motor, id) => async (dispatch, getState) => {
  const config = await makeConfig('application/json');
  const body = {
    motor,
    id,
  };

  try {
    const data = await axios.post(`${url}/tank/forceMotor`, body, config);
  } catch (err) {
    console.log(err);
  }
};

export const maintenanceControl = (mode, id) => async (dispatch, getState) => {
  const config = await makeConfig('application/json');
  console.log(mode, id);
  const body = {
    mode,
  };

  try {
    const data = await axios.post(
      `${url}/tank/maintenance/${id}`,
      body,
      config,
    );
  } catch (err) {
    console.log(err);
  }
};

export const getAlerts = id => async (dispatch, getState) => {
  dispatch({
    type: 'ALERTS_LOADING',
  });

  const config = await makeConfig('application/json');

  const body = {
    id,
  };

  try {
    const data = await axios.post(`${url}/tank/alerts`, body, config);
    dispatch({
      type: 'GET_ALERTS',
      payload: data.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};
