import axios from 'axios';
import { makeConfig } from './authActions';
import { url } from './types';

export const getSegment = (id) => (dispatch, getState) => new Promise(async (resolve, reject) => {
    dispatch({
        type: 'SEGMENT_LOADING'
    });
    const config = await makeConfig('application/json');
    try {
        const data = await axios.get(`${url}/light/${id}`, config);
        console.log('done');
        dispatch({
            type: 'GET_SEGMENT',
            payload: data.data
        });
        resolve('done');
    }
    catch (err) {
        console.log('error');
        reject(err);
    }
});

export const updateStreetLightSegment = (data) => dispatch => {
    console.log('updateeee', data);
    if (data.dimLevel !== undefined) {
        dispatch({
            type: 'UPDATE_DIMLEVEL',
            payload: data.dimLevel,
            copyDimlevel: data.dimLevelCopy,
            id: data.st_id
        });
    }
    if (data.light_time !== undefined) {
        dispatch({
            type: 'UPDATE_TIMER',
            payload: data
        })
    }
    if (data.auto !== undefined) {
        dispatch({
            type: 'UPDATE_RADAR',
            payload: data
        })
    }
    if (data.allRoutines !== undefined) {
        dispatch({
            type: 'UPDATE_SCHEDULING',
            payload: data
        })
    }
    if (data.light !== undefined) {
        // console.log('lght', data);
        dispatch({
            type: 'UPDATE_SEGMENT',
            payload: data
        })
    }
    if (data.segControl !== undefined) {
        // console.log('segmentcontrol', data)
        dispatch({
            type: 'UPDATE_SEGMENT_CONTROL',
            payload: data,
            id: data.st_id
        })
    }
    if (data.routineType !== undefined ) {
        if(data.routineType === 'segment'){
            console.log("type")
            dispatch({
                type: 'UPDATE_SEGMENT_OFF',
                startTime:data.startTime,
                endTime:data.endTime,
                status:data.status,
                id:data.st_id
            })
        }
        else if(data.routineType === 'dim_high'){
            dispatch({
                type: 'UPDATE_DIM_HIGH',
                startTime:data.startTime,
                endTime:data.endTime,
                status:data.status,
                id:data.st_id
            })
        }
        else if(data.routineType === 'dim_medium' ){
            dispatch({
                type: 'UPDATE_DIM_MEDIUM',
                startTime:data.startTime,
                endTime:data.endTime,
                status:data.status,
                id:data.st_id
            })
        }
        else if(data.routineType === 'dim_low'){
            dispatch({
                type: 'UPDATE_DIM_LOW',
                startTime:data.startTime,
                endTime:data.endTime,
                status:data.status,
                id:data.st_id
            })
        }      
    }
    else {
        console.log('done')
    }
};

export const segmentLight = (id, index, light) => async (dispatch, getState) => {
    console.log('action', id, index, light)
    dispatch({
        type: 'SEGMMENT_LIGHT_LOADING'
    })
    const config = await makeConfig('application/json');
    const body = {
        index,
        light
    }

    try {
        const data = await axios.post(`${url}/light/switch/${id}`, body, config);
        // console.log('action',data);
    }
    catch {
        console.log('error');
    }
}

export const DimLevel = (id, level) => (dispatch, getState) => {
    dispatch({
        type: 'DIM_LEVEL_LOADING'
    })
    // const config = makeConfig('application/json');
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
    let dimLevel = null;
    if (level === '50%') {
        dimLevel = 50
    } else if (level === '75%') {
        dimLevel = 75
    } else if (level === '100%') {
        dimLevel = 100
    }
    const body = {
        dimLevel
    }
    try {
        const data = axios.post(`${url}/light/dimLevel/${id}`, body, config);
        // console.log('dimlevel',data);
    }
    catch {
        console.log('error');
    }
}

export const lightTimer = (id, light_time) => async (dispatch, getState) => {

    dispatch({
        type: 'TIMER_LOADING'
    })
    const config = await makeConfig('application/json');
    // const config = {
    //     headers: {
    //         'content-type' : 'application/json'
    //     }
    // }
    const body = {
        light_time
    }
    try {
        const data = await axios.post(`${url}/light/timer/${id}`, body, config);
    }
    catch {
        console.log('error');
    }
}

export const radar = (id, mode) => async (dispatch, getState) => {
    // console.log(id,mode);
    dispatch({
        type: 'RADAR_LOADING'
    })
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
    const body = {
        mode
    }
    // console.log('body',body);/radarMode/:id
    try {
        const data = await axios.post(`${url}/light/radarMode/${id}`, body, config);
        console.log('radarmode', data.data);
    }
    catch {
        console.log('error');
    }
}

export const scheduling = (id, status) => async (dispatch, getState) => {
    console.log('scheduling', id, status);
    dispatch({
        type: 'SHEDULING_LOADING'
    })
    const config = await makeConfig('application/json');
    const body = {
        status
    }
    try {
        const data = await axios.post(`${url}/light/routines/${id}`, body, config);
        console.log('data', data.data);
    }
    catch {
        console.log('error');
    }
}

// export const individualScheduling = (id,startTime,endTime,type) => () => {
//     dispatch({
//         type:'INDIVIDUAL_SCHEDULING_LOADING'
//     })
//     const config = makeConfig('application/json');
//     const body = {
//         startTime,
//         endTime,
//         type:status
//     }
//     try{

//     }
//     catch{

//     }
// }

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
        const data = await axios.post(`${url}/light/log/${logtype}/${id}`, body, config);
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

export const getCharts = (type, range, id) => async (dispatch, getState) => {

    dispatch({
        type: 'CHARTS_LOADING'
    })
    const config = await makeConfig('application/json');

    try {
        const data = await axios.get(`${url}/light/chart/${type}/${range}/${id}`, config);
        console.log('action', data.data.data);
        const arr = [];
        let highest = 1;

        if (type === 'segControl' || type === 'radar_enable' || type === 'light_time') {
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

export const SegmentControl = (id, segControl) => async (dispatch, getState) => {
    dispatch({
        type: 'SEGMENT_LOADING'
    })
    const config = {
        headers: {
            'content-type': 'application/json'
        }
    }
    const body = {
        segControl
    }

    try {
        const data = await axios.post(`${url}/light/segmentControl/${id}`, body, config);
        // console.log('action', data.data);
        // dispatch({
        //     type:'GET_SEGMENT',
        //     payload:data.data
        // })
    }
    catch {
        console.log('error');
    }
}

export const setIndividualAllRoutines = (id,type,status,startTime,endTime) =>  async(dispatch,getState) => {
    console.log('values',id,type,status,startTime,endTime);
    dispatch({
        type:'INDIVIDUAL_ROUTINES_LOADING'
    })
    const config = await makeConfig('application/json');
    const body = {
        status,
        startTime,
        endTime
    }
    try{
        const data = await axios.post(`${url}/light/setRoutine/${type}/${id}`,body,config);
        console.log('actionnnnnn',data.data);
    }
    catch{
        console.log('error');
    }
}

export const setSegStartTime = (id,startTime) => (dispatch) =>{
    console.log(id,startTime)
    dispatch({
      type: 'SEG_START_TIME',
      startTime: startTime,
      id : id  
    });
  }
  
  export const setSegEndTime = (id,endTime) => (dispatch) =>{  
    dispatch({
      type: 'SEG_END_TIME',
      endTime: endTime,
      id   
    });
  }
  
  export const setDimHighStartTime = (id,startTime) => (dispatch) =>{
    dispatch({
      type: 'DIM_HIGH_START_TIME',
      startTime: startTime,
      id   
    });
  }
  
  export const setDimHighEndTime = (id,endTime) => (dispatch) =>{
    dispatch({
      type: 'DIM_HIGH_END_TIME',
      endTime: endTime,
      id    
    });
  }
  
  export const setDimMediumStartTime = (id,startTime) => (dispatch) =>{
    dispatch({
      type: 'DIM_MEDIUM_START_TIME',
      startTime: startTime,
      id    
    });
  }
  
  export const setDimMediumEndTime = (id,endTime) => (dispatch) =>{
    dispatch({
      type: 'DIM_MEDIUM_END_TIME',
      endTime: endTime,
      id    
    });
  }
  
  export const setDimLowStartTime = (id,startTime) => (dispatch) =>{
    dispatch({
      type: 'DIM_LOW_START_TIME',
      startTime: startTime,
      id  
    });
  }
  
  export const setDimLowEndTime = (id,endTime) => (dispatch) =>{
    dispatch({
      type: 'DIM_LOW_END_TIME',
      endTime: endTime,
      id   
    });
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
  
    const data = await axios.post(`${url}/light/alerts`, body, config);
    console.log('action',data.data)
    dispatch({
      type: 'GET_ALERTS',
      payload: data.data, 
    });
  };
  