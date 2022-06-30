/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';
import { url } from './types';
import { makeConfig } from './authActions';
import { Avatar } from 'react-native-ui-lib';

export const getSensors = user_id => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    // console.log('id',user_id)
    dispatch({
      type: 'SENSORS_LOADING',
    });
    const config = await makeConfig('application/json');
    try {
      const data = await axios.get(`${url}/geyser/sensors/${user_id}`, config);
      // console.log('sensors', data.data)
      dispatch({
        type: 'GET_SENSORS',
        payload: data.data,
      });
      resolve('done');
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

export const updateGeyserSensor = data => async dispatch => {
  // console.log('update', data);
  if (
    data.temp_lowerthreshold !== undefined &&
    data.temp_lowerthreshold !== undefined
  ) {
    console.log('lower');
    dispatch({
      type: 'UPDATE_LOWER_THRESHOLD',
      payload: data,
    });
  } else if (
    data.geyser_control !== undefined &&
    data.geyser_control !== undefined
  ) {
    console.log('geyser control pusher');
    dispatch({
      type: 'UPDATE_GEYSER_CONTROL',
      payload: data,
    });
  } else if (
    data.temp_upperthreshold !== undefined &&
    data.temp_upperthreshold !== undefined
  ) {
    console.log('uppper');
    dispatch({
      type: 'UPDATE_UPPER_THRESHOLD',
      payload: data,
    });
  } else if (data.temperature !== undefined && data.temperature !== undefined) {
    console.log('temperatureee pusher');
    dispatch({
      type: 'UPDATE_TEMPERATURE',
      payload: data,
    });
  } else if (
    data.valve_status !== undefined &&
    data.valve_status !== undefined
  ) {
    console.log('gas valve pusheer');
    dispatch({
      type: 'UPDATE_GAS_VAVLE',
      payload: data,
    });
  } else if (
    data.burner_status !== undefined &&
    data.burner_status !== undefined
  ) {
    console.log('gas valve pusheer');
    dispatch({
      type: 'UPDATE_BURNER_STATUS',
      payload: data,
    });
  } else if (data.routine !== undefined) {
    dispatch({
      type: 'UPDATE_INDIVUDUAL_ROUTINE',
      payload: data,
    });
  } else if (data.status !== undefined && data.status !== undefined) {
    console.log('status', data);
    dispatch({
      type: 'UPDATE_ALL_ROUTINE',
      payload: data,
    });
  } else {
    console.log('done');
  }
};

export const getLogs = (id, type, start_date, end_date) => async dispatch => {
  dispatch({
    type: 'LOGS_LOADING',
  });
  // const config = {
  //   headers: {
  //       'content-type': 'application/json'
  //   }
  // }
  const config = await makeConfig('application/json');
  const body = {
    id,
    type,
    start_date,
    end_date,
  };
  // let i = https://rtl.ngrok.io;
  //  console.log(`${url}/geyser/logs}`);
  console.log('body', body);
  try {
    const data = await axios.post(`${url}/geyser/logs`, body, config);
    // console.log('logss', data.data.data);
    dispatch({
      type: 'LOGS_DATA',
      payload: data.data.data,
    });
  } catch (err) {
    console.log('error', err);
  }
};

export const getAlerts = user_id => async (dispatch, getState) => {
  // console.log('action',user_id)
  dispatch({
    type: 'ALERTS_LOADING',
  });

  const config = await makeConfig('application/json');

  const data = await axios.get(`${url}/geyser/alerts/${user_id}`, config);

  console.log('actionnnn', data.data.data);
  dispatch({
    type: 'GET_ALERTS',
    payload: data.data.data,
  });
};

export const getThreshold = (_id, type, value) => async (
  dispatch,
  getState,
) => {
  // console.log('action', type, _id, value);
  dispatch({
    type: 'UPPER_THRESHOLD_LOADING',
  });
  // const config = {
  //   headers: {
  //       'content-type': 'application/json'
  //   }
  // }
  const config = await makeConfig('application/json');
  const body = {
    type,
    _id,
    value,
  };
  console.log('body', body);
  try {
    const data = await axios.post(`${url}/geyser/set`, body, config);
    // console.log('threshold', data.data);
  } catch (err) {
    console.log(err);
  }
};

export const getCharts = (id, type, range) => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch({
      type: 'CHARTS_LOADING',
    });
    const config = await makeConfig('application/json');
    const body = {
      id,
      type,
      range,
    };
    try {
      const data = await axios.post(`${url}/geyser/charts`, body, config);
      // console.log('dataaaaa', data.data);
      const arr = [];
      let highest = 1;

      if (
        type === 'temperature' ||
        type === 'burner_status' ||
        type === 'geyser_status'
      ) {
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
        type: 'GET_CHARTS',
        payload: arr,
        highest,
      });
      resolve('done');
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

export const GeyserStatus = (id, geyser_control) => async (
  dispatch,
  getState,
) => {
  // console.log('action', id, geyser_control);
  dispatch({
    type: 'GEYSER_STATUS_LOADING',
  });
  // const config = {
  //   headers: {
  //       'content-type': 'application/json'
  //   }
  // }
  const config = await makeConfig('application/json');
  const body = {
    id,
    geyser_control,
  };
  console.log('body', body);
  try {
    const data = await axios.post(`${url}/geyser/geyser_control`, body, config);
    // console.log('geyser Control', data.data);
  } catch (err) {
    console.log(err);
  }
};

export const getRoutine = id => async (dispatch, getState) => {
  dispatch({
    type: 'GET_ROUTINE_LOADING',
    geyser_id: id,
  });
  const config = await makeConfig('application/json');
  try {
    const data = await axios.get(`${url}/geyser/routine/${id}`, config);
    // console.log('Gettt Routines data', data.data);
    dispatch({
      type: 'GET_ROUTINES',
      geyser_id: id,
      payload: data.data,


    });
  } catch {
    console.log('error');
  }
};

//individualRoutine
export const updateIndividualRoutine = (id, from, status, to) => async (
  dispatch,
  getState,
) => {
  console.log('UPDATE Routine', id, status, from, to);
  // dispatch({
  //   type: 'UPDATE_INDIVUDUAL_ROUTINE_LOADING',
  // });
  dispatch({
    type:'ADD_LOADING',
  });

  const config = await makeConfig('application/json');

  const body = {
    id,
    from,
    status,
    to,
  };
  try {
    const data = await axios.post(`${url}/geyser/update_routine`, body, config);
    // dispatch({
    //   type: 'UPDATE_INDIVUDUAL_ROUTINE',
    //   payload: data.data,
    // });
  } catch (err) {
    console.log('errorrrr', err);
  }
};

export const routineControlling = (id, status) => async dispatch => {
  const config = await makeConfig('application/json');
  // dispatch({
  //   type: 'SET_ROUTINE_LOADING'
  // })

  const body = {
    id,
    status,
  };
  console.log('bod....', body);
  try {
    const res = await axios.post(`${url}/geyser/change_routine`, body, config);
    return 'ok';
    // console.log('res', res.data);
    // dispatch({
    //   type: 'UPDATE_ALL_ROUTINE',
    //   status,
    //   id,
    // });
  } catch (err) {
    console.log(err);
  }
};

// export const routineControlling = (id, status) => async (
//   dispatch,
//   getState,
// ) => {
//   console.log('UPDATE Routine', id, status);
//   dispatch({
//     type: 'UPDATE_All_ROUTINES_LOADING',
//   });
//   const config = await makeConfig('application/json');
//   const body = {
//     id,
//     status,
//   };
//   console.log('body', body);
//   try {
//     const data = await axios.post(`${url}/geyser/change_routine`, body, config);
//     console.log('data routine', data.data);
//     // dispatch({
//     //   type:'UPDATE_ALL_ROUTINE',
//     //   payload:data.data
//     // })
//   } catch {
//     console.log('error');
//   }
// };

export const addRoutine = id => async (dispatch, getState) => {
  // console.log('UPDATE Routine', id,status,from,to);

  dispatch({
    type:'ADD_LOADING',
  });
  const config = await makeConfig('application/json');
  const body = {
    id,
  };
  // console.log('body',body)
  try {
    const data = await axios.post(`${url}/geyser/add_routine`, body, config);
    console.log('add routine', data.data);
    dispatch({
      type: 'ADD_ROUTINE',
      payload: data.data,
    });
  } catch {
    console.log('error');
  }
};


export const deleteRoutine = (id, module_id) => async (dispatch, getState) => {
  dispatch({
    type: 'ADD_LOADING',
  });
  const config = await makeConfig('application/json');
  try {
    const data = await axios.delete(
      `${url}/geyser/remove_routine/${id}/${module_id}`,
      config,
    );
    dispatch({
      type: 'DELETE_ROUTINE',
      payload: data.data,
      geyser_id: module_id,
    });
  } catch {
    console.log('error');
  }
};

//var a = [99, 150, 299, 340, 390, 450, 590, 600];
// function sum(a) {
//   let b = 10;
//   return function (a, b) {
//       return a+b;
//   }
// }
// sum(1);
