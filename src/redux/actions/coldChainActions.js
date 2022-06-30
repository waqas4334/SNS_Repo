/* eslint-disable no-console */
import axios from 'axios';
import {url} from './types';
import {makeConfig} from './authActions';

export const getColdChainSensors = (user_id,type) => (dispatch, getState) => new Promise(async function (resolve,reject) {


  dispatch({
    type : 'COLDCHAIN_LOADING'
  })

  const config = await makeConfig('application/json');

  try {
    const data = await axios.get(`${url}/coldChain/${user_id}/${type}`, config );
    dispatch({
      type : 'GET_COLDCHAIN',
      payload : data.data.sensors,
      latlang : data.data.center
    })
    resolve('done');
  }
  catch (err) {
    console.log(err);
    reject(err);
  }
});

export const updateColdChainSensors = (data) => async (dispatch, getState) => {

  if(data.status !== undefined) {
    dispatch({
      type : 'UPDATE_COLDCHAIN_STATUS',
      payload : data
    })
  }
  else if(data.temperature !== undefined) {
    dispatch({
      type : 'UPDATE_COLDCHAIN_TEMPERATURE',
      payload : data
    })
  }
  else if(data.latitude !== undefined && data.longitude !== undefined) {
    dispatch({
      type : 'UPDATE_COLDCHAIN_LATLONG',
      payload : data
    })
  }
  else if(data.battery !== undefined) {
    dispatch({
      type : 'UPDATE_COLDCHAIN_BATTERY',
      payload : data
    })
  } else if (data.ut !== undefined) {
    dispatch({
      type: 'UPDATE_COLDCHAIN_UT',
      payload: data
    });
  } else if (data.lt !== undefined) {
    dispatch({
      type: 'UPDATE_COLDCHAIN_LT',
      payload: data
    });
  } else if (data.radius !== undefined) {
    dispatch({
      type: 'UPDATE_COLDCHAIN_RADIUS',
      payload: data
    });
  } else if (data.center !== undefined) {
    dispatch({
      type: 'UPDATE_COLDCHAIN_CENTER',
      payload: data
    });
  }

}

export const getColdChainTableData = (tableName, id, startDate, endDate) => async (dispatch, getState) => {

  dispatch({
    type : 'COLDCHAIN_TABLE_LOADING',
    chain_id : id
  })

  const config = await makeConfig('application/json');

  const body = {
    startDate,
    endDate,
  }

  try {
    const data = await axios.post(`${url}/coldchain/log/${tableName}/${id}` , body , config);
    dispatch({
      type : 'COLDCHAIN_TABLE_DATA',
      payload : data.data,
      chain_id : id,
    })
  }
  catch(err) {
    console.log(err);
  }
}


export const getColdChainChartData = (chartName, chartType, id) => async (dispatch, getState) => {

  dispatch({
    type : 'COLDCHAIN_CHART_LOADING',
    chain_id : id
  })

  const config = await makeConfig('application/json');

  try {
    const data = await axios.get(`${url}/coldChain/chart/${chartName}/${chartType}/${id}` , config);
    
    let arr = [];
    let highest = 1;

    if(chartName === 'temperature') {

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
    else if(chartName === 'status') {
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
      type : 'COLDCHAIN_CHART_DATA',
      payload : arr,
      highest: highest,
      chain_id : id
    })
  }
  catch(err) {
    console.log(err);
  }
}

export const setColdChainThreshold = (lt,ut,id) => async (dispatch, getState) => {

  const config = await makeConfig('application/json');

  const body = {
    ut,
    lt,
  }

  try {
    const data = await axios.post(`${url}/coldChain/threshold/${id}`, body , config );
    
    dispatch({
      type : 'SET_COLDCHAIN_THRESHOLD',
      ut,
      lt,
      id : id,
    })
  }
  catch (err) {
    dispatch({
      type : 'GET_ERRORS',
      message : err.response.data,
      id : 'THRESHOLD_FAIL',
    })
  }
}

export const setColdChainGeofence = (radius, id) => async (
  dispatch,
  getState
) => {
  const config = await makeConfig('application/json');

  const body = {
    id,
    radius
  };

  try {
    const data = await axios.post(
      `${url}/coldChain/radius`,
      body,
      config
    );
    dispatch({
      type: 'SET_COLDCHAIN_RADIUS',
      radius: Number(radius),
      id: id
    });
  } catch (err) {
    dispatch({
      type: 'GET_ERRORS',
      message: err.response.data,
      id: 'RADIUS_FAIL'
    });
  }
};

export const getColdChainAlerts = (id, type) => async (dispatch, getState) => {
  dispatch({
    type: 'COLDCHAIN_ALERTS_LOADING'
  });

  const config = await makeConfig('application/json');

  const body = {
    id,
    type
  };

  const data = await axios.post(
    `${url}/coldChain/alerts`,
    body,
    config
  );

  dispatch({
    type: 'GET_COLDCHAIN_ALERTS',
    payload: data.data
  });
};

export const setColdChainGeofenceCenter = (id) => async (
  dispatch,
  getState
) => {
  const config = await makeConfig('application/json');

  const body = {
    id:id
  };
  //console.log(id);

  try {
    const data = await axios.post(
      `${url}/coldChain/geofenceCenter`,
      body,
      config
    );
    //console.log(data);
    dispatch({
      type: 'SET_COLDCHAIN_CENTER'
    });
  } catch (err) {
    //console.log(err);
    /*dispatch({
      type: 'GET_ERRORS',
      message: err.response.data,
      id: 'CENTER_FAIL'
    });*/
  }
};
