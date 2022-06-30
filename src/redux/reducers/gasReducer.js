const initState = {
  gasModule: [],
  gasLoading:true,
  logs: [],
  logsLoading:false,
  charts: [],
  highest: 1,
  thresholdLoading: false,
  fanLoading:false,
  alertLoading:false,
  alerts:[],
  y:[]
};

const gasReducer = (state = initState, action) => {
  let index = null;
  switch (action.type) {
    case 'GET_SENSORS':
      return {
        ...state,
        gasModule: action.payload,
        gasLoading: false,
      };
    case 'SENSORS_LOADING':
      return {
        ...state,
        gasLoading: true,
      };
    case 'UPDATE_GAS':
                      index = state.gasModule.findIndex(s => s._id === action.payload.gas_id)
                      console.log('index',index)
                      return {
                          ...state,
                          gasModule: [...state.gasModule.slice(0, index),
                          {
                              ...state.gasModule[index],
                              gas: action.payload.gas
                          },
                          ...state.gasModule.slice(index + 1),
                          ],
                          // thresholdLoading:false
        };
    case 'UPDATE_ALARM':
          index = state.gasModule.findIndex(s => s._id === action.payload.gas_id)
          console.log('index',index)
          return {
              ...state,
              gasModule: [...state.gasModule.slice(0, index),
              {
                  ...state.gasModule[index],
                  alarm: action.payload.alarm
              },
              ...state.gasModule.slice(index + 1),
              ],
              // thresholdLoading:false
        };
    case 'LOGS_LOADING':
        return {
            ...state,
            logsLoading: true,
        };
    case 'LOGS_DATA':
        console.log('reducer', action.payload);
        return {
            ...state,
            logs: action.payload,
            logsLoading: false,
        };
    case 'CHARTS_LOADING':
          return {
              ...state,
              chartsLoading: true,
          };
    case 'GET_CHARTS':
          return {
              ...state,
              charts: action.payload,
              chartsLoading: false,
              highest: action.highest,
          };
            case 'ALERTS_LOADING':
                return {
                    ...state,
                    alertLoading: true,
                };
            case 'GET_ALERTS':
                // console.log('reducerrrr', action.payload);
                return {
                    ...state,
                    alerts: action.payload,
                    alertLoading: false,
                };
          default:
      return state;
  }
};

export default gasReducer;
