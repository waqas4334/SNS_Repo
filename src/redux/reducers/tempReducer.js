const initState = {
  tempModule: [],
  tempLoading:true,
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

const tempReducer = (state = initState, action) => {
  let index = null;
  switch (action.type) {
    case 'GET_SENSORS':
      return {
        ...state,
        
        tempModule: action.payload,
        tempLoading: false,
      };
    case 'SENSORS_LOADING':
      return {
        ...state,
        tempLoading: true,
      };
    case 'UPDATE_TEMPERATURE':
                      index = state.tempModule.findIndex(s => s._id === action.payload.id)
                      console.log('index',index)
                      return {
                          ...state,
                          tempModule: [...state.tempModule.slice(0, index),
                          {
                              ...state.tempModule[index],
                              temperature: action.payload.temperature
                          },
                          ...state.tempModule.slice(index + 1),
                          ],
                          // thresholdLoading:false
        };
    case 'UPDATE_HUMIDITY':
          index = state.tempModule.findIndex(s => s._id === action.payload.id)
          console.log('index',index)
          return {
              ...state,
              tempModule: [...state.tempModule.slice(0, index),
              {
                  ...state.tempModule[index],
                  humidity: action.payload.humidity
              },
              ...state.tempModule.slice(index + 1),
              ],
              // thresholdLoading:false
        };
    case 'UPDATE_UPPER_THRESHOLD':
          index = state.tempModule.findIndex(s => s._id === action.payload.module_id)
          console.log('index',index)
          return {
              ...state,
              tempModule: [...state.tempModule.slice(0, index),
              {
                  ...state.tempModule[index],
                  upperthreshold: action.payload.upperthreshold
              },
              ...state.tempModule.slice(index + 1),
              ],
              // thresholdLoading:false
        };
    case 'UPDATE_LOWER_THRESHOLD':
        index = state.tempModule.findIndex(s => s._id === action.payload.module_id)
        console.log('index',index)
        return {
            ...state,
            tempModule: [...state.tempModule.slice(0, index),
            {
                ...state.tempModule[index],
                lowerthreshold: action.payload.lowerthreshold
            },
            ...state.tempModule.slice(index + 1),
            ],
      };
    case 'UPDATE_FAN_MODE':
        index = state.tempModule.findIndex(s => s._id === action.payload.module_id)
        console.log('index',index)
        return {
            ...state,
            tempModule: [...state.tempModule.slice(0, index),
            {
                ...state.tempModule[index],
                fanLoading:false,
                fan_auto: action.payload.fan_auto
            },
            ...state.tempModule.slice(index + 1),
            ],
    };
    case 'UPDATE_FAN':      
        let moduleIndex = state.tempModule.findIndex(s => s._id === action.payload.module_id);
        let fanIndex = state.tempModule[moduleIndex].fans.findIndex(s => s._id === action.id);
            return {
                ...state,
                tempModule:[{
                    ...state.tempModule[moduleIndex],
                    fans: [
                        ...state.tempModule[moduleIndex].fans.slice(0,fanIndex),
                        {
                            ...state.tempModule[moduleIndex].fans[fanIndex],
                            status:action.payload.status
                        },
                        ...state.tempModule[moduleIndex].fans.slice(fanIndex + 1)
                    ]
                }],
                fanLoading: false,
            };
    case 'LOGS_LOADING':
        return {
            ...state,
            logsLoading: true,
        };
    case 'LOGS_DATA':
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
    case 'FAN_LOADING':
            return {
                ...state,
                fanLoading: true
            }
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

export default tempReducer;
