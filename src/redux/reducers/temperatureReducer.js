const initState = {
  temperature : [],
  isLoading : false,
  logs:[],
  charts: [],
  chartLoading: false,
  alertColumns: [],
  alertData: [],
  alertTitle: '',
  alertLoading: false
}
    
const temperatureReducer = (state = initState , action) => {
  let index = null;
  switch(action.type) {
    case 'GET_TEMPERATURE' :
      return {
        ...state,
        temperature : action.payload,
        isLoading : false 
      }
    case 'TEMP_SENSORS_LOADING':
      return {
        ...state,
        isLoading: true
      }
    case 'UPDATE_TEMPERATURE' :
      index = state.temperature.findIndex(temp => temp._id === action.payload.temp_id);
      return {
        ...state,
        temperature : [ 
          ...state.temperature.slice(0,index),
          {
            ...state.temperature[index],
            currentTemp : action.payload.temperature,
          },
          ...state.temperature.slice(index+1)
        ],
        count : 0
      }
    case 'UPDATE_TEMPERATURE_UT':
      index = state.temperature.findIndex(temp => temp._id === action.payload.temp_id);
      return {
        ...state,
        temperature:[
          ...state.temperature.slice(0,index),
          {
            ...state.temperature[index],
            upperThreshold: action.payload.ut
          },
          ...state.temperature.slice(index+1)
        ]
      }
      case 'UPDATE_TEMPERATURE_LT':
        index = state.temperature.findIndex(temp => temp._id === action.payload.temp_id);
        return {
          ...state,
          temperature:[
            ...state.temperature.slice(0,index),
            {
              ...state.temperature[index],
              threshold: action.payload.lt
            },
            ...state.temperature.slice(index+1)
          ]
        }
    case 'SET_THRESHOLD' :
      index = state.temperature.findIndex(temp => temp._id === action.payload.temp_id);
      return {
        ...state,
        temperature : [
          ...state.temperature.slice(0,index),
          {
            ...state.temperature[index],
            threshold : action.payload,
          },
          ...state.temperature.slice(index+1)
        ],
        count : 0
      }
      case 'SET_UPPER_THRESHOLD':
        //console.log('here2');
        //console.log(action.payload);
      index = state.temperature.findIndex(
        (temp) => temp._id === action.payload.temp_id
      );
      return {
        ...state,
        temperature: [
          ...state.temperature.slice(0, index),
          {
            ...state.temperature[index],
            upperThreshold: action.payload
          },
          ...state.temperature.slice(index + 1)
        ],
        count: 0
      };
      case 'TEMP_TABLE_LOADING':
      return {
        ...state,
        isLoading: true
      };
      case 'TEMP_TABLE_DATA':
      return {
        ...state,
        logs: action.payload.data,
        isLoading: false
      };
      case 'GET_TEMP_ALERTS':
      return {
        ...state,
        alertColumns: action.payload.columns,
        alertData: action.payload.data,
        alertTitle: action.payload.title,
        alertLoading: false
      };
      case 'TEMP_ALERTS_LOADING':
      return {
        ...state,
        alertLoading: true
      };
      case 'TEMP_CHART_DATA' :
        return {
          ...state,
          charts: action.payload,
          chartLoading: false,
          highest: action.highest
        }
      case 'TEMP_CHART_LOADING' :
        return {
          ...state,
          chartLoading: true
        }
    default :
      return state;
  }
}
    
export default temperatureReducer