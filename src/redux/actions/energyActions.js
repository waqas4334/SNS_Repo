import axios from 'axios';
import {makeConfig} from './authActions';
import {url} from './types';

export const get_Em_sensor = (id) => (dispatch, getState) => new Promise(async function (resolve,reject) {

  dispatch({
    type : "SENSOR_LOADING"
  })
  const config = await makeConfig('application/json');
  try {
    const res = await axios.get(`${url}/em/${id}`,config);
    dispatch({
      type: 'GET_SENSOR',
      payload: res.data
    });
    resolve('done');
  } catch(err){
    console.log(err);
    reject(err);
  }
});

export const getEmLogs = (tableName, id, startDate, endDate) =>async (dispatch) => {
  dispatch({
    type: 'EM_TABEL_LOADING',
    em_id: id
  })
  const config = await makeConfig('application/json');
  const body = {
    startDate,
    endDate
  };
  const res = await axios.post(`${url}/em/log/${tableName}/${id}`,body ,config);
  dispatch({
  type: 'EM_TABEL_DATA',
    payload: res.data,
    em_id: id
  })
};

export const set_emUpperThreshold = (id, type, threshold) => async (dispatch) => {

  const config = await makeConfig('application/json');
  try{
    const body = {
      threshold
    };
    const res = await axios.post(`${url}/em/thresholdUpper/${type}/${id}`,body ,config);
    if(type === 'voltage_U'){
      dispatch({
        type:'V_UPPER_LIMIT',
        payload: threshold,
        id: id
      });
    } else if(type === 'current_U'){
      dispatch({
        type:'C_UPPER_LIMIT',
        payload: threshold,
        id: id
      });
    } else if(type === 'unit_U'){
      dispatch({
        type:'U_UPPER_LIMIT',
        payload: threshold,
        id: id
      });
    }
  } catch(err){
    console.log(err);
  }
};

export const set_emLowerThreshold = (id, type, threshold) => async (dispatch) => {
  const config = await makeConfig('application/json');
  try{
    const body = {
      threshold
    };
    const res = await axios.post(`${url}/em/threshold/${type}/${id}`,body ,config);
    if(type === 'voltage'){
      dispatch({
        type: 'V_LOWER_LIMIT',
        payload: threshold,
        id: id
      });
    } else if (type === 'power'){
      dispatch({
        type: 'PF_LOWER_LIMIT',
        payload: threshold,
        id: id
      });
    }
  }
  catch(err){
    console.log(err);
  }
}

export const updateEmSensors = (data) => (dispatch) => {
  if(data.Va !== undefined){
    dispatch({
      type: 'UPDATE_VA',
      payload: data
    });
  } else if(data.Vb !== undefined){
    dispatch({
      type: 'UPDATE_VB',
      payload: data
    });
    
  } else if(data.Vc !== undefined){
    dispatch({
      type: 'UPDATE_VC',
      payload: data
    });
    
  } else if(data.Ia !== undefined){
    dispatch({
      type: 'UPDATE_IA',
      payload: data
    });
    
  } else if(data.Ib !== undefined){
    dispatch({
      type: 'UPDATE_IB',
      payload: data
    });
    
  } else if(data.Ic !== undefined){
    dispatch({
      type: 'UPDATE_IC',
      payload: data
    });
    
  } else if(data.Pf !== undefined){
    dispatch({
      type: 'UPDATE_PF',
      payload: data
    });
    
  } else if(data.PA !== undefined){
    dispatch({
      type: 'UPDATE_PA',
      payload: data
    });
    
  } else if(data.PR !== undefined){
    dispatch({
      type: 'UPDATE_PR',
      payload: data
    });
    
  } else if(data.U !== undefined){
    dispatch({
      type: 'UPDATE_U',
      payload: data
    });    
  }
};


export const getEnergyChartData = (chartName, chartType, id) => async (dispatch, getState) => {

  console.log('action',chartName,chartType,id);

  dispatch({
    type : 'CHART_LOADING'
  })

  const config = await makeConfig('application/json');

  try {

    if(chartName === 'voltage'){

      const data1 = await axios.get(`${url}/em/chart/Va/${chartType}/${id}` , config);
      let arr1 = [];
      let highest1 = 1;

      data1.data.labels.map((d,index) => {
        if(data1.data.data[index] > highest1){
          highest1 = data1.data.data[index];
        }
        let obj = {
          x: d,
          y: data1.data.data[index]
        }
        arr1.push(obj)
        console.log('voltage',obj)
      })
     
      const data2 = await axios.get(`${url}/em/chart/Vb/${chartType}/${id}` , config);
      let arr2 = [];
      let highest2 = 1;

      data2.data.labels.map((d,index) => {
        if(data2.data.data[index] > highest2){
          highest2 = data2.data.data[index];
        }
        let obj = {
          x: d,
          y: data2.data.data[index]
        }
        arr2.push(obj)
      })

      const data3 = await axios.get(`${url}/em/chart/Vc/${chartType}/${id}` , config);
      let arr3 = [];
      let highest3 = 1;

      data3.data.labels.map((d,index) => {
        if(data3.data.data[index] > highest3){
          highest3 = data3.data.data[index];
        }
        let obj = {
          x: d,
          y: data3.data.data[index]
        }
        arr3.push(obj)
      })

      let highest=0;
      if(highest1 > highest ){
        highest=highest1
      }
      if(highest2 > highest){
        highest=highest2
      }
      if(highest3>highest){
        highest=highest3
      }

      console.log('highest',highest2);

      dispatch({
        type : 'GET_CHART_DATA',
        payload1 : arr1,
        payload2 : arr2,
        payload3 : arr3,
        highest: highest
      })
    } 
    
    else if(chartName === 'current'){

      const data1 = await axios.get(`${url}/em/chart/Ia/${chartType}/${id}` , config);
      let arr1 = [];
      let highest1 = 1;

      data1.data.labels.map((d,index) => {
        if(data1.data.data[index] > highest1){
          highest1 = data1.data.data[index];
        }
        let obj = {
          x: d,
          y: data1.data.data[index]
        }
        arr1.push(obj)
      })

      const data2 = await axios.get(`${url}/em/chart/Ib/${chartType}/${id}` , config);
      let arr2 = [];
      let highest2 = 1;

      data2.data.labels.map((d,index) => {
        if(data2.data.data[index] > highest2){
          highest2 = data2.data.data[index];
        }
        let obj = {
          x: d,
          y: data2.data.data[index]
        }
        arr2.push(obj)
      })

      const data3 = await axios.get(`${url}/em/chart/Ic/${chartType}/${id}` , config);
      let arr3 = [];
      let highest3 = 1;

      data3.data.labels.map((d,index) => {
        if(data3.data.data[index] > highest3){
          highest3 = data3.data.data[index];
        }
        let obj = {
          x: d,
          y: data3.data.data[index]
        }
        arr3.push(obj)
      })

      let highest=0;
      if(highest1 > highest ){
        highest=highest1
      }
      if(highest2 > highest){
        highest=highest2
      }
      if(highest3>highest){
        highest=highest3
      }

      //console.log('highest',arr3);

      dispatch({
        type : 'GET_CHART_DATA',
        payload1 : arr1,
        payload2 : arr2,
        payload3 : arr3,
        highest: highest
      })
    }
    else if(chartName === 'Pf' || chartName === 'PA' || chartName === 'PR' || chartName === 'U'){

      const data = await axios.get(`${url}/em/chart/${chartName}/${chartType}/${id}` , config);
      let arr = [];
      let highest = 1;

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

      console.log(arr);
      dispatch({
        type : 'GET_CHART_DATA1',
        payload : arr,
        highest: highest
      })
    } 

  }
  catch(err) {
    console.log(err);
  }
}

export const getEmAlerts = (id) => async (dispatch) => {
  console.log('in action', id);
  const config = await makeConfig('application/json');

  dispatch({
    type: 'EM_ALERTS_LOADING',
  });

  const body = {
    id
  };
  const res = await axios.post(`${url}/em/alerts`,body, config);
  dispatch({
    type: 'GET_EM_ALERTS',
    payload: res.data

  });

};




