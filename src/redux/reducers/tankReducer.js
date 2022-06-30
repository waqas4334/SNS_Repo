/* eslint-disable no-console */

const initState = {
  sensors: [],
  sensorLoading: false,
  logs: [],
  logsLoading: false,
  charts: [],
  chartsLoading: false,
  highest: 1,
  alerts: [],
  alertsLoading: false
};

const tankReducer = (state = initState, action) => {
  let index = -1;

  switch (action.type) {
    case 'SENSOR_LOADING':
      return {
        ...state,
        sensorLoading: true,
      };
    case 'GET_SENSOR':
      return {
        ...state,
        sensors: action.payload,
        sensorLoading: false,
      };
    case 'LOGS_LOADING':
      return {
        ...state,
        logsLoading: true,
      };
    case 'LOGS_DATA':
      return {
        ...state,
        logs: action.payload.data,
        logsLoading: false,
      };
    case 'CHART_LOADING':
      return {
        ...state,
        chartsLoading: true,
      };
    case 'CHART_DATA':
      return {
        ...state,
        charts: action.payload,
        chartsLoading: false,
        highest: action.highest,
      };
    case 'UPDATE_FILLLEVEL':
      index = state.sensors.findIndex(s => s._id === action.payload.tank_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            fillLevel: action.payload.fillLevel,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_FILLLEVEL1':
      console.log(action.payload.fillLevel1);
      index = state.sensors.findIndex(s => s._id === action.payload.tank_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            fillLevel1: action.payload.fillLevel1,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_MOTORSTATUS':
      index = state.sensors.findIndex(s => s._id === action.payload.tank_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            motor: action.payload.motor,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_MAINTENANCE':
      console.log('reducer',action.payload.maintenance);
      index = state.sensors.findIndex(s => s._id === action.payload.tank_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            maintenance: action.payload.maintenance,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_OH_LOWER':
      // console.log(action.payload.lms_id);
      index = state.sensors.findIndex(s => s._id === action.payload.tank_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            threshold: action.payload.threshold,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_UG_LOWER':
      // console.log(action.payload.lms_id);
      index = state.sensors.findIndex(s => s._id === action.payload.tank_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            threshold_lowerTank: action.payload.threshold_lowerTank,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_OH_UPPER':
      // console.log(action.payload.lms_id);
      index = state.sensors.findIndex(s => s._id === action.payload.tank_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            upperThreshold: action.payload.upperThreshold,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_UG_UPPER':
      // console.log(action.payload.lms_id);
      index = state.sensors.findIndex(s => s._id === action.payload.tank_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            upperThreshold_lowerTank: action.payload.upperThreshold_lowerTank,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'SET_TEMP_LOWER_THRESHOLD':
      index = state.sensors.findIndex(temp => temp._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            temp_threshold: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
        count: 0,
      };
    case 'SET_TEMP_UPPER_THRESHOLD':
      index = state.sensors.findIndex(temp => temp._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            temp_upper_threshold: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
        count: 0,
      };
    case 'SET_OH_LOWER_THRESHOLD':
      index = state.sensors.findIndex(temp => temp._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            threshold: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
        count: 0,
      };
    case 'SET_OH_UPPER_THRESHOLD':
      index = state.sensors.findIndex(temp => temp._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            upperThreshold: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
        count: 0,
      };
    case 'SET_UG_LOWER_THRESHOLD':
      index = state.sensors.findIndex(temp => temp._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            threshold_lowerTank: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
        count: 0,
      };
    case 'SET_UG_UPPER_THRESHOLD':
      index = state.sensors.findIndex(temp => temp._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            upperThreshold_lowerTank: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
        count: 0,
      };
    case "ALERTS_LOADING":
      return {
        ...state,
        alertsLoading: true
      };
    case "GET_ALERTS":
      return {
        ...state,
        alerts: action.payload,
        alertsLoading: false
      }
    default:
      return state;
  }
};

export default tankReducer;
