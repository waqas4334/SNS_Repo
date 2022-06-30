import axios from 'axios';
import { url } from './types';
import { makeConfig } from './authActions';

export const getSensors = (id) => (dispatch, getState) => new Promise(async (resolve, reject) => {
  dispatch({
    type: 'SENSORS_LOADING',
  });
  const config = await makeConfig('application/json');
  try {
    const data = await axios.get(`${url}/tubewell/${id}`, config);
    // console.log('sensors', data.data)
    dispatch({
      type: 'GET_SENSORS',
      payload: data.data,
    });
    resolve('done');
  }
  catch (err) {
    console.log(err);
    reject(err);
  }
});

export const getCharts = (type,range,id) => (dispatch, getState) => new Promise(async (resolve, reject) => {
  console.log('action',range,type,id)
  dispatch({
    type: 'CHARTS_LOADING',
  });
  const config = await makeConfig('application/json');
  try {
    const data = await axios.get(`${url}/tubewell/chart/${type}/${range}/${id}`, config);
    console.log('dataaaaa',data.data)
    const arr = [];
    let highest = 1;


    if(type === 'ph' || type === 'tds' || type === 't_lid'  || type === 'fillLevel' || type === 'maintanance'  || type === 'phase_down' 
    || type === 'door_status' || type === 'force-motor' || type === 'motor' || type === 'alarm' || type === 'Ia' || type === 'vib' || type === 'volve'){

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
      type: 'GET_CHARTS',
      payload : arr,
      highest
    });
    resolve('done');
  }
  catch (err) {
    console.log(err);
    reject(err);
  }
});

export const getLogs = (logtype, id, startDate, endDate) => async dispatch => {
  console.log('action type',logtype,id,startDate,endDate);
  dispatch({
    type: 'LOGS_LOADING',
  });
  const config = await makeConfig('application/json');
  const body = {
    startDate,
    endDate
  };
  try {
    const data = await axios.post(`${url}/tubewell/log/${logtype}/${id}`,body,config);
     console.log('action',data.data.data);
    dispatch({
      type: 'LOGS_DATA',
      payload: data.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getRoutine = (id) => async (dispatch, getState) => {
  // console.log('get Routine', id);
  dispatch({
      type: 'GET_ROUTINE_LOADING'
  })
  const config = await makeConfig('application/json');
  try {
      const data = await axios.get(`${url}/tubewell/get_routine/${id}`, config);
      console.log('Gettt Routines', data.data);
      dispatch({
        type: 'GET_ROUTINES',
        payload: data.data,
      });
  }
  catch {
      console.log('error');
  }
}

export const forceMotor = (motor, id) => (dispatch, getState) => new Promise(async (resolve, reject) => {
  dispatch({
    type: 'CONTROL_LOADING'
  })
  const config = await makeConfig('application/json');
  const body = {
    motor,
    id,
  };
  try {
    const data = await axios.post(`${url}/tubewell/forceMotor`, body, config);
    console.log('forceMotor', data.data)
    resolve('done');
  }

  catch (err) {
    console.log(err);
    reject(err);
  }
});

export const updateTubeWellSensors = (data) => async dispatch => {
await
console.log('update',data)
  if  (data.motor !== undefined && data.forceMotor !== undefined) {
    dispatch({
      type: 'UPDATE_MOTORSTATUS',
      payload: data,
    });
  }
  if (data.liters !== undefined && data.liters !== null) {
    dispatch({
      type: 'UPDATE_LITER_THRESHOLD',
      payload: data,

    });
  }
  if (data.t_capacity !== undefined && data.t_capacity !== null) {
    dispatch({
      type: 'UPDATE_CAPACITY',
      payload: data,

    });
  }
  if (data.fillLevel !== undefined && data.fillLevel !== null) {
    dispatch({
      type: 'UPDATE_FILLLEVEL',
      payload: data,

    });
  }
  if (data.waterMaintenance !== undefined && data.waterMaintenance !== null) {
    dispatch({
      type: 'UPDATE_WATER_THRESHOLD',
      payload: data,

    });             
  }
  if (data.motorMaintenance !== undefined && data.motorMaintenance !== null) {
    dispatch({
      type: 'UPDATE_MOTOR_THRESHOLD',
      payload: data,
    });
  }
  if (data.ph_upperLmt !== undefined && data.ph_upperLmt !== null) {

    dispatch({
      type: 'UPDATE_PHASE_UP_THRESHOLD',
      payload: data,
    });
  }
  if (data.ph_lwrLmt !== undefined && data.ph_lwrLmt !== null) {

    dispatch({
      type: 'UPDATE_PH_LOWER_THRESHOLD',
      payload: data,
    });
  }
  if (data.fillLevel_upperLmt !== undefined && data.fillLevel_upperLmt !== null) {

    dispatch({
      type: 'UPDATE_FILL_UP_THRESHOLD',
      payload: data,
    });
  }
  if (data.fillLevel_lwrLmt !== undefined && data.fillLevel_lwrLmt !== null) {

    dispatch({
      type: 'UPDATE_FILL_LOWER_THRESHOLD',
      payload: data,
    });
  }
  if (data.tds_upperLmt !== undefined && data.tds_upperLmt !== null) {

    dispatch({
      type: 'UPDATE_TDS_UP_THRESHOLD',
      payload: data,
    });
  }
  if (data.tds_lwrLmt !== undefined && data.tds_lwrLmt !== null) {
    dispatch({
      type: 'UPDATE_TDS_LOWER_THRESHOLD',
      payload: data,
    });
  }
  if (data.I_lwrLmt !== undefined && data.I_lwrLmt !== null) {
    dispatch({
      type: 'UPDATE_LINE_LOWER_THRESHOLD',
      payload: data,
    });
  }
  if (data.t_lid !== undefined && data.t_lid !== null) {
    dispatch({
      type: 'UPDATE_TANK_LID',
      payload: data,
    });
  }
  if (data.door_status !== undefined ) {
    dispatch({
      type: 'UPDATE_DOOR_STATUS',
      payload: data,
    });
  }
  if (data.auto !== undefined ) {
    dispatch({
      type: 'UPDATE_MOTOR_MODE',
      payload: data,
    });
  }
  if (data.ph !== undefined && data.ph !== null) {
    dispatch({
      type: 'UPDATE_PH',
      payload: data,
    });
  }
  if (data.tds !== undefined && data.tds !== null ) {

    dispatch({
      type: 'UPDATE_TDS',
      payload: data,
    });
  }
  if (data.phaseDown !== undefined && data.phaseDown !== null ) {
    dispatch({
      type: 'UPDATE_HYDRO_PUMP',
      payload: data,
    });
  }
  if (data.Ia !== undefined && data.Ia !== null ) {
    dispatch({
      type: 'UPDATE_LINE_CURRENT',
      payload: data,
    });
  }
  if (data.alarm !== undefined && data.alarm !== null ) {
    dispatch({
      type: 'UPDATE_ALARM',
      payload: data,
    });
  }
  if (data.plvl !== undefined && data.plvl !== null ) {
    dispatch({
      type: 'UPDATE_PLVL',
      payload: data,
    });
  }
  if (data.volve !== undefined && data.volve !== null ) {
    dispatch({
      type: 'UPDATE_VOLVE',
      payload: data,
    });
  }
  if (data.vib !== undefined && data.vib !== null ) {
    dispatch({
      type: 'UPDATE_VIB',
      payload: data,
    });
  }
  if (data.routines_status !== undefined && data.routines_status !== null ) {
    dispatch({
      type: 'UPDATE_ROUTINE_STATUS',
      payload: data,
    });
  }
  else {
    console.log('done')
  }
};

export const upperThresholds = (upperThreshold,id,type) => async (dispatch, getState) => {
  dispatch({
    type: 'UPPER_THRESHOLD_LOADING'
  })
  const config = await makeConfig('application/json');
  const body = {
    upperThreshold
  }
  console.log(body);
  try {
    const data = await axios.post(`${url}/tubewell/upperThreshold/${type}/${id}`, body, config);
    console.log('upper', data.data)
    // if (type === 'ph_u') {
    //   dispatch({
    //     type: 'SET_PH_UPPER_THRESHOLD',
    //     payload: upperThreshold,
    //     id
    //   });
    // } else if (type === 'ph_u') {
    //   dispatch({
    //     type: 'SET_PH_UPPER_THRESHOLD',
    //     payload: upperThreshold,
    //     id,
    //   });
    // } else if (type === 'tds_u') {
    //   dispatch({
    //     type: 'SET_TDS_UPPER_THRESHOLD',
    //     payload: upperThreshold,
    //     id,
    //   });
    // }
    // else if (type === 'Ia_u') {
    //   dispatch({
    //     type: 'SET_IA_UPPER_THRESHOLD',
    //     payload: upperThreshold,
    //     id,
    //   });
    // }
 // }
  }
  catch (err) {
    console.log(err);
  }
}

export const lowerThresholds = (threshold,id,type) => async (dispatch, getState) => {
  dispatch({
    type: 'LOWER_THRESHOLD_LOADING'
  })
  const config = await makeConfig('application/json');
  const body = {
    threshold
  }
  console.log(body);
  try {
    const data = await axios.post(`${url}/tubewell/threshold/${type}/${id}`, body, config);
    console.log('lower', data.data)
    // if (type === 'ph_u') {
    //   dispatch({
    //     type: 'SET_PH_UPPER_THRESHOLD',
    //     payload: upperThreshold,
    //     id
    //   });
    // } else if (type === 'ph_u') {
    //   dispatch({
    //     type: 'SET_PH_UPPER_THRESHOLD',
    //     payload: upperThreshold,
    //     id,
    //   });
    // } else if (type === 'tds_u') {
    //   dispatch({
    //     type: 'SET_TDS_UPPER_THRESHOLD',
    //     payload: upperThreshold,
    //     id,
    //   });
    // }
    // else if (type === 'Ia_u') {
    //   dispatch({
    //     type: 'SET_IA_UPPER_THRESHOLD',
    //     payload: upperThreshold,
    //     id,
    //   });
    // }
 // }
  }
  catch (err) {
    console.log(err);
  }
}

export const filterMaintenance = (id,runningTime) => async (dispatch, getState) => {
  console.log('in action hwerer',runningTime);
  // dispatch({
  //   type: 'FILTER_MAINTENANCE_LOADING'
  // })
  const config = await makeConfig('application/json');
  const body = {
    runningTime
  }
  try {
    const data = await axios.post(`${url}/tubewell/filterMaintanance/${id}`, body, config);
    dispatch({
      type: 'UPDATE_FILTER_RUNNING_LOG',
      id
    })
        
  }
  catch (err) {
    console.log(err);
  }
}

export const getRunningTime = (id) => async (dispatch, getState) => {

  dispatch({
    type: 'MAINTENANCE_LOADING'
  })
  const config = await makeConfig('application/json');
  try {
    const data = await axios.get(`${url}/tubewell/runningTimes/${id}`, config);
    console.log('actionsdfsddfsdfsdf',data.data);
    
      let newMotorRunningTime = null;

      const time = data.data.MotorRunningTime;
      if(time.includes(':')) {
        const duration = time.split(':');
        newMotorRunningTime = `${duration[0]} Hrs ${duration[1]} Mins`;
      } else {
        newMotorRunningTime = `0 Hrs ${time} Mins`;
      }

    dispatch({
      type:'UPDATE_RUNNING_TIMES',
      payload:data.data,
      motorRunningTime: newMotorRunningTime,
      tw_id:id
    })  
  }
  catch (err) {
    console.log(err);
  }
}

export const motorMaintenance = (id,runningTime) => async (dispatch, getState) => {
  const config = await makeConfig('application/json');
  const body = {
    runningTime
  }
  console.log(body)
  try {
    const data = await axios.post(`${url}/tubewell/maintanance/${id}`, body, config);
    console.log('motor', data.data)
    dispatch({
      type: 'UPDATE_HYDRO_PUMP_RUNNING_LOG',
      id
    });
  }
  catch (err) {
    console.log(err);
  }
}

export const motorMode = (id,mode) => (dispatch, getState) => new Promise(async (resolve, reject) => {
  dispatch({
    type: 'MOTOR_LOADING'
  })
  const config = await makeConfig('application/json');
  const body = {
    mode
  };
  try {
    const data = await axios.post(`${url}/tubewell/autoMode/${id}`, body, config);
    console.log('sensors', data.data)
    dispatch({
      type: 'GET_MOTOR'
    })
    resolve('done');
  }

  catch (err) {
    console.log(err);
    reject(err);
  }
});

export const maintenanceThresholds = (threshold, type, id) => async (dispatch, getState) => {
  dispatch({
    type: 'THRESHOLD_LOADING'
  })
  const config = await makeConfig('application/json');
  const body = {
    threshold
  }
 
  try {
    const data = await axios.post(`${url}/tubewell/maintananceThreshold/${type}/${id}`, body, config);
    console.log('threshold', data.data)
  }
  catch (err) {
    console.log(err);
  }
}

export const getTubeWellAlerts = id => async (dispatch, getState) => {
  dispatch({
    type: 'TUBEWELL_ALERTS_LOADING',
  });
  const config = await makeConfig('application/json');
  const body = {
    id,
  };

  const data = await axios.post(`${url}/tubewell/alerts`, body, config);
  // console.log('action',data.data)
  dispatch({
    type: 'GET_TUBEWELL_ALERTS',
    payload: data.data.data, 
  });
};

export const EnaDisRoutine = (id,status) => async (dispatch, getState) => {
  console.log('schedulinggg Routine', id,status);
  dispatch({
      type: 'ALL_ROUTINE_LOADING'
  })
  const config = await makeConfig('application/json');
  const body = {
      status,
  }
  console.log('body',body)
  try {
      const data = await axios.post(`${url}/tubewell/routines/${id}`, body, config);
      console.log('data scheduling', data.data);
  }
  catch {
      console.log('error');
  }
};

export const updateRoutine = (id,status,from,to) => async (dispatch, getState) => {
  // console.log('UPDATE Routine', id,status,from,to);
  dispatch({
      type: 'UPDATE_ROUTINE_LOADING'
  })
  const config = await makeConfig('application/json');
  const body = {
      status,
      from,
      to
  }
  console.log('body',body)
  try {
      const data = await axios.post(`${url}/tubewell/update_routine/${id}`, body, config);
      console.log('data routine', data.data);
      dispatch({
        type:'UPDATE_ROUTINE',
        payload:data.data
      })
  }
  catch {
      console.log('error');
  }
};

