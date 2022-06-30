/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
import axios from 'axios';
import { url } from './types';
import { makeConfig } from './authActions';
import { Avatar } from 'react-native-ui-lib';
import { update } from 'lodash';
export const addsenser = (geyser_id,user_id,geyser_Name) =>async (dispatch)=>{
  const config =await makeConfig('application/json');
  const body ={
    geyser_id,
    geyser_Name,
  };
  console.log('ACTION', body)
  try{
    const res = await axios.post(`${url}/geyser_hybrid/add/${user_id}`,body,config);
  return{
    ...res
  }
}
catch(err){
  console.log(err);
}
};
export const getSensors = user_id => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    // console.log('id',user_id)

    dispatch({
      type: 'SENSORS_LOADING_HYBRID',
    });
    const config = await makeConfig('application/json');
    try {
      const data = await axios.get(`${url}/geyser_hybrid/sensors/${user_id}`, config);
      // console.log('sensors', data.data)
      dispatch({
        type: 'GET_SENSORS_HYBRID',
        payload: data.data,
      });
      resolve('done');
    } catch (err) {
      console.log(err);
      reject(err);
    }
  });

export const updateGeyserHybridSensor = data => async dispatch => {
  console.log('>>>>>>>>>>>>>>>>Top',data)
  if (
    data.temp_lowerthreshold !== undefined &&
    data.temp_lowerthreshold !== undefined
  ) {
    console.log('lower');
    dispatch({
      type: 'UPDATE_LOWER_THRESHOLD_HYBRID',
      payload: data,
    });
  } 
  // my action
  else if
  (data.geyser_status !== undefined){
    console.log('Geyser Status pusher',data);
    dispatch({
    type: 'UPDATE_GEYSER_STATUS_HYBRID',
    payload: data,
    id: data.geyser_id
    
  });

  dispatch({
    type: 'GEYSER_LOADING_FALSE_HYBRID',
  });
  }
  else if(data.supply_mode !== undefined){
  

    dispatch({
      type: 'UPDATE_SUPPLY_MODE_HYBRID',
      payload: data.supply_mode,
      id: data.geyser_id
    })
  }
  else if (
    data.geyser_control !== undefined &&
    data.geyser_control !== undefined
  ) {
    console.log('geyser control pusher');
    dispatch({
      type: 'UPDATE_GEYSER_CONTROL_HYBRID',
      payload: data,
    });
  } else if (
    data.temp_upperthreshold !== undefined &&
    data.temp_upperthreshold !== undefined
  ) {
    console.log('uppper');
    dispatch({
      type: 'UPDATE_UPPER_THRESHOLD_HYBRID',
      payload: data,
    });
  } else if (data.temperature !== undefined && data.temperature !== undefined) {
    console.log('temperatureee pusher');
    dispatch({
      type: 'UPDATE_TEMPERATURE_HYBRID',
      payload: data,
    });
  } else if (
    data.valve_status !== undefined &&
    data.valve_status !== undefined
  ) {
    console.log('gas valve pusheer');
    dispatch({
      type: 'UPDATE_GAS_VAVLE_HYBRID',
      payload: data,
    });
 
  } else if (
    data.burner_status !== undefined &&
    data.burner_status !== undefined
  ) {
    console.log('gas valve pusheer');
    dispatch({
      type: 'UPDATE_BURNER_STATUS_HYBRID',
      payload: data,
    });
  } else if (data.routine !== undefined) {
    dispatch({
      type: 'UPDATE_INDIVUDUAL_ROUTINE_HYBRID',
      payload: data,
    });
  } else if (data.status !== undefined && data.status !== undefined) {
    console.log('status', data);
    dispatch({
      type: 'UPDATE_ALL_ROUTINE_HYBRID',
      payload: data,
    });
  }
    else if (
      data.routineThresh !== undefined &&
      data.routineThresh !== undefined
    ) {
      console.log('Routine>>>>>>>>>Action',data);
      dispatch({
        type: 'UPDATE_ROUTINE_THRESHOLD_HYBRID',
        payload: data,
      });
      console.log('>>>>>>>>>>>>>>>Action Routine',payload)
  } else {
    console.log('done>>>>>>>>>>>>>>>>>>>>>>>>');
  }
};
export const setSupplyMode = (_id,mode_value) =>async (dispatch)=>{
  const config =await makeConfig('application/json');
  const body ={
    mode_value,
    _id
  };
  try{
    const res = await axios.post(`${url}/geyser_hybrid/set_mode/`,body,config);
  return{
    ...res
  }
}
catch(err){
  console.log(err);
}
};


export const getLogs = (id, type, start_date, end_date) => async dispatch => {
  dispatch({
    type: 'LOGS_LOADING_HYBRID',
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
    // const data = await axios.post(`${url}/geyser/logs`, body, config);
    // console.log('logss', data.data.data);
    dispatch({
      type: 'LOGS_DATA_HYBRID',
      payload: data.data.data,
    });
  } catch (err) {
    console.log('error', err);
  }
};

export const getAlerts = user_id => async (dispatch, getState) => {
  // console.log('action',user_id)
  dispatch({
    type: 'ALERTS_LOADING_HYBRID',
  });

  const config = await makeConfig('application/json');

  const data = await axios.get(`${url}/geyser_hybrid/alerts/${user_id}`, config);

  console.log('actionnnn', data.data.data);
  dispatch({
    type: 'GET_ALERTS_HYBRID',
    payload: data.data.data,
  });
};

export const getThreshold = (_id, type, value) => async (
  dispatch,
  getState,
) => {
  // console.log('action', type, _id, value);
  dispatch({
    type: 'UPPER_THRESHOLD_LOADING_HYBRID',
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
    const data = await axios.post(`${url}/geyser_hybrid/set`, body, config);
    // console.log('threshold', data.data);
  } catch (err) {
    console.log(err);
  }
};

export const getCharts = (id, type, range) => (dispatch, getState) =>
  new Promise(async (resolve, reject) => {
    dispatch({
      type: 'CHARTS_LOADING_HYBRID',
    });
    const config = await makeConfig('application/json');
    const body = {
      id,
      type,
      range,
    };
    try {
      // const data = await axios.post(`${url}/geyser/charts`, body, config);
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
        type: 'GET_CHARTS_HYBRID',
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
    type: 'GEYSER_STATUS_LOADING_HYBRID',
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
    const data = await axios.post(`${url}/geyser_hybrid/geyser_control`, body, config);
    // console.log('geyser Control', data.data);
  } catch (err) {
    console.log(err);
  }
};

export const getRoutine = id => async (dispatch, getState) => {
  dispatch({
    type: 'GET_ROUTINE_LOADING_HYBRID',
    geyser_id: id,
  });
  const config = await makeConfig('application/json');
  try {
    const data = await axios.get(`${url}/geyser_hybrid/routine/${id}`, config);
    // console.log('Gettt Routines data', data.data);
    dispatch({
      type: 'GET_ROUTINES_HYBRID',
      geyser_id: id,
      payload: data.data,


    });
  } catch {
    console.log('error');
  }
};

//individualRoutine
export const updateIndividualRoutine = (from,to,status,id,thresh) => async (
  dispatch,
  getState,
) => {
  // console.log('UPDATE Routine', id, status, from, to,thresh);
  // dispatch({
  //   type: 'UPDATE_INDIVUDUAL_ROUTINE_LOADING',
  // });
  dispatch({
    type:'ADD_LOADING_HYBRID',
  });

  const config = await makeConfig('application/json');

  const body = {
    from,
    to,
    status,
    id,
    thresh
  };
  console.log('____________________________',body)
  try {
    const data = await axios.post(`${url}/geyser_hybrid/update_routine`, body, config);
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
    const res = await axios.post(`${url}/geyser_hybrid/change_routine`, body, config);
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
    type:'ADD_LOADING_HYBRID',
  });
  const config = await makeConfig('application/json');
  const body = {
    id,
  };
  // console.log('body',body)
  try {
    const data = await axios.post(`${url}/geyser_hybrid/add_routine`, body, config);
    console.log('add routine', data.data);
    dispatch({
      type: 'ADD_ROUTINE_HYBRID',
      payload: data.data,
    });
  } catch {
    console.log('error');
  }
};


export const deleteRoutine = (id, module_id) => async (dispatch, getState) => {
  dispatch({
    type: 'ADD_LOADING_HYBRID',
  });
  const config = await makeConfig('application/json');
  try {
    const data = await axios.delete(
      `${url}/geyser_hybrid/remove_routine/${id}/${module_id}`,
      config,
    );
    dispatch({
      type: 'DELETE_ROUTINE_HYBRID',
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
