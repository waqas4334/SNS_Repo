import { SENSOR_LOADING, GET_SENSOR } from '../actions/types';

const initState = {
  sensors: [],
  logs: [],
  maintananceLogs: [],
  sensorLoading: false,
  loading: false,
  maintanance_loading: false,
  charts: [],
  highest: 1,
  alertColumns: [],
  alertData: [],
  alertTitle: '',
  alertLoading: false,
  maintananceTableLoading: false,
  y: [],
};

const fuelReducer = (state = initState, action) => {
  let index = null;

  switch (action.type) {
    case SENSOR_LOADING:
      return {
        ...state,
        sensorLoading: true,
      };
    case GET_SENSOR:
      return {
        ...state,
        sensors: action.payload,
        sensorLoading: false,
      };

    case 'FUEL_TABLE_DATA':
      return {
        ...state,
        logs: action.payload.data,
        loading: false,
      };
    case 'FUEL_TABLE_LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'SET_FUEL_THRESHOLD':
      index = state.sensors.findIndex(f => f._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            literThreshold: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'SET_FUEL_MAINTANANCE_THRESHOLD':
      index = state.sensors.findIndex(f => f._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            maintananceThreshold: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'SET_FUEL_OIL_THRESHOLD':
      index = state.sensors.findIndex(f => f._id === action.id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            oilThreshold: action.payload,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'FUEL_CHART_DATA':
      return {
        ...state,
        charts: action.payload,
        loading: false,
        y: action.data,
        highest: action.highest,
      };
    case 'FUEL_CHART_LOADING':
      return {
        ...state,
        loading: true,
      };

    case 'UPDATE_FUEL_FILLLEVEL':
      index = state.sensors.findIndex(f => f._id === action.payload.fuel_id);
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
    case 'UPDATE_FUEL_DOORSTATUS':
      index = state.sensors.findIndex(f => f._id === action.payload.fuel_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            door_status: action.payload.door_status,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_FUEL_VOLTAGE':
      index = state.sensors.findIndex(f => f._id === action.payload.fuel_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            voltage: action.payload.voltage,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_FUEL_CURRENT':
      index = state.sensors.findIndex(f => f._id === action.payload.fuel_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            current: action.payload.current,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_FUEL_POWER':
      index = state.sensors.findIndex(f => f._id === action.payload.fuel_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            power: action.payload.power,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_FUEL_TEMPERATURE':
      index = state.sensors.findIndex(f => f._id === action.payload.fuel_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            temperature: action.payload.temperature,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_FUEL_GENSTATUS':
      index = state.sensors.findIndex(f => f._id === action.payload.fuel_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            gen_status: action.payload.gen_status,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_FUEL_LITERS':
      index = state.sensors.findIndex(f => f._id === action.payload.fuel_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            literThreshold: action.payload.liters,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_FUEL_MAINTANANCE':
      index = state.sensors.findIndex(f => f._id === action.payload.fuel_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            maintananceThreshold: action.payload.maintanance,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'UPDATE_FUEL_OIL':
      index = state.sensors.findIndex(f => f._id === action.payload.fuel_id);
      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            oilThreshold: action.payload.oil,
          },
          ...state.sensors.slice(index + 1),
        ],
      };
    case 'FUEL_MAINTANANCE_LOADING':
      return {
        ...state,
        maintanance_loading: true,
      };

    case 'GET_FUEL_MAINTANANCE_DATA':
      index = state.sensors.findIndex(f => f._id === action.fuel_id);

      return {
        ...state,
        sensors: [
          ...state.sensors.slice(0, index),
          {
            ...state.sensors[index],
            maintanance: {
              ...state.sensors[index].maintanance,
              totalRunningTime: action?.payload?.overallRunningTime,
              runningTime: action.payload.runningTime,
              oilRunningTime: action.payload.oilRunningTime,
            },
          },
          ...state.sensors.slice(index + 1),
        ],
        maintanance_loading: false,
      };

    case 'FUEL_MAINTANANCE_TABLE_LOADING':
      // index = state.fuel.findIndex((f) => f._id === action.fuel_id);
      return {
        ...state,
        maintananceTableLoading: true,
      };

    case 'FUEL_MAINTANANCE_TABLE_DATA':
      index = state.sensors.findIndex(f => f._id === action.fuel_id);
      return {
        ...state,
        maintananceLogs: action.payload.data,
        loading: false,
      };

    case 'GET_FUEL_ALERTS':
      return {
        ...state,
        alertColumns: action.payload.columns,
        alertData: action.payload.data,
        alertTitle: action.payload.title,
        alertLoading: false,
      };
    case 'FUEL_ALERTS_LOADING':
      return {
        ...state,
        alertLoading: true,
      };
    default:
      return state;
  }
};

export default fuelReducer;
