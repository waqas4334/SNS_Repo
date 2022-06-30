/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';
import {
  SENSOR_LOADING,
  GET_SENSOR,
  url,
} from './types';
import { makeConfig } from './authActions';

export const getSensors = (id) => (dispatch) =>
  new Promise((async (resolve, reject) => {
    dispatch({
      type: SENSOR_LOADING,
    });

    const config = await makeConfig('application/json');

    try {
      const data = await axios.get(`${url}/fuel/${id}`, config);

      dispatch({
        type: GET_SENSOR,
        payload: data.data,
      });
      resolve('done');
    } catch (err) {
      console.log(err);
      reject(err);
    }
  }));

export const getFuelTableData = (type, id, startDate, endDate) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: 'FUEL_TABLE_LOADING',
  });

  const config = await makeConfig('application/json');

  const body = {
    startDate,
    endDate,
  };

  try {
    const data = await axios.post(
      `${url}/fuel/log/${type}/${id}`,
      body,
      config,
    );

    dispatch({
      type: 'FUEL_TABLE_DATA',
      payload: data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setThreshold = (value, id) => async (dispatch, getState) => {
  const config = await makeConfig('application/json');

  const body = {
    threshold: value,
  };
  try {
    const data = await axios.post(`${url}/fuel/threshold/${id}`, body, config);

    dispatch({
      type: 'SET_FUEL_THRESHOLD',
      payload: value,
      id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const setMaintananceThreshold = (value, id) => async (
  dispatch,
  getState,
) => {
  const config = await makeConfig('application/json');

  const body = {
    threshold: value,
  };

  try {
    const data = await axios.post(
      `${url}/fuel/maintananceThreshold/${id}`,
      body,
      config,
    );
    dispatch({
      type: 'SET_FUEL_MAINTANANCE_THRESHOLD',
      payload: value,
      id,
    });
  } catch (err) {
    console.log(err);
    /* dispatch({
      type : 'GET_ERRORS',
      message : err.response.data,
      id : 'THRESHOLD_FAIL',
      status : err.response.status
    }) */
  }
};

export const setOilThreshold = (value, id) => async (dispatch, getState) => {
  const config = await makeConfig('application/json');

  const body = {
    threshold: value,
  };

  try {
    const data = await axios.post(
      `${url}/fuel/oilThreshold/${id}`,
      body,
      config,
    );

    dispatch({
      type: 'SET_FUEL_OIL_THRESHOLD',
      payload: value,
      id,
    });
  } catch (err) {
    console.log(err);
    /* dispatch({
      type : 'GET_ERRORS',
      message : err.response.data,
      id : 'THRESHOLD_FAIL',
      status : err.response.status
    }) */
  }
};

export const updateFuelSensors = data => async (dispatch, getState) => {
  if (data.fillLevel !== undefined) {
    dispatch({
      type: 'UPDATE_FUEL_FILLLEVEL',
      payload: data,
    });
  } else if (data.door_status !== undefined) {
    dispatch({
      type: 'UPDATE_FUEL_DOORSTATUS',
      payload: data,
    });
  } else if (data.voltage !== undefined) {
    dispatch({
      type: 'UPDATE_FUEL_VOLTAGE',
      payload: data,
    });
  } else if (data.current !== undefined) {
    dispatch({
      type: 'UPDATE_FUEL_CURRENT',
      payload: data,
    });
  } else if (data.power !== undefined) {
    dispatch({
      type: 'UPDATE_FUEL_POWER',
      payload: data,
    });
  } else if (data.temperature !== undefined) {
    dispatch({
      type: 'UPDATE_FUEL_TEMPERATURE',
      payload: data,
    });
  } else if (data.gen_status !== undefined) {
    dispatch({
      type: 'UPDATE_FUEL_GENSTATUS',
      payload: data,
    });
  } else if (data.liters !== undefined) {
    dispatch({
      type: 'UPDATE_FUEL_LITERS',
      payload: data,
    });
  } else if (data.oil !== undefined) {
    dispatch({
      type: 'UPDATE_FUEL_OIL',
      payload: data,
    });
  } else if (data.maintanance !== undefined) {
    dispatch({
      type: 'UPDATE_FUEL_MAINTANANCE',
      payload: data,
    });
  }
};

export const getMaintananceData = id => async (dispatch, getState) => {
  dispatch({
    type: 'FUEL_MAINTANANCE_LOADING',
  });

  const config = await makeConfig('application/json');

  try {
    const data = await axios.get(`${url}/fuel/runningTimes/${id}`, config);

    dispatch({
      type: 'GET_FUEL_MAINTANANCE_DATA',
      payload: data.data,
      fuel_id: id,
    });
  } catch (err) {
    console.log(err);

    dispatch({
      type: 'GET_ERRORS',
      message: err.response.data,
      id: 'FUEL_MAINTANANCE_FAIL',
      status: err.response.status,
    });
  }
};

export const getFuelChartData = (chartName, chartType, id,startDate,endDate) => async (
  dispatch,
  getState,
) => {
  dispatch({
    type: 'FUEL_CHART_LOADING',
  });

  const config = await makeConfig('application/json');

  // const body = {
  //   startDate,
  //   endDate
  // }

  try {
    const data = await axios.get(
      `${url}/fuel/chart/${chartName}/${chartType}/${id}`,
      config,
    );
    console.log('ressss', data.data)

    const arr = [];
    let highest = 1;

    if (chartName === 'fillLevel' || chartName === 'temperature') {
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
    else if (chartName === 'genStatus' || chartName === 'doorStatus') {
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
      type: 'FUEL_CHART_DATA',
      payload: arr,
      highest,
      data:data.data.data
    });
  } catch (err) {
    console.log(err);
  }
};

export const getFuelAlerts = id => async (dispatch, getState) => {
  dispatch({
    type: 'FUEL_ALERTS_LOADING',
  });

  const config = await makeConfig('application/json');

  const body = {
    id,
  };

  const data = await axios.post(`${url}/fuel/alerts`, body, config);
  dispatch({
    type: 'GET_FUEL_ALERTS',
    payload: data.data,
  });
};

export const getFuelMaintananceTableData = (
  tableName,
  id,
  startDate,
  endDate,
) => async (dispatch, getState) => {
  dispatch({
    type: 'FUEL_TABLE_LOADING',
    fuel_id: id,
  });

  const config = await makeConfig('application/json');

  const body = {
    startDate,
    endDate,
  };

  try {
    const data = await axios.post(
      `${url}/fuel/maintananceLog/${tableName}/${id}`,
      body,
      config,
    );
    dispatch({
      type: 'FUEL_MAINTANANCE_TABLE_DATA',
      payload: data.data,
      fuel_id: id,
    });
  } catch (err) {
    console.log(err);
  }
};
