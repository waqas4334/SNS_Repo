const initState = {
  chain : [],
  logs: [],
  charts: [],
  loading : false,
  highest: 1,
  alertColumns: [],
  alertData: [],
  alertTitle: '',
  alertLoading: false,
}
        
const coldChainReducer = (state = initState , action) => {
  let index = null;
  switch(action.type) {
    case 'GET_COLDCHAIN' :
      return {
        ...state,
        chain : action.payload,
        loading : false,
      }
    case 'UPDATE_COLDCHAIN_STATUS' :
      index = state.chain.findIndex(temp => temp._id === action.payload.coldChain_id);
      return {
        ...state,
        chain : [
          ...state.chain.slice(0,index),
          {
            ...state.chain[index],
            status : action.payload.status,
          },
          ...state.chain.slice(index+1)
        ],
      }
    case 'UPDATE_COLDCHAIN_BATTERY' :
      index = state.chain.findIndex(temp => temp._id === action.payload.coldChain_id);
      return {
        ...state,
        chain : [
          ...state.chain.slice(0,index),
          {
            ...state.chain[index],
            battery : action.payload.battery,
          },
          ...state.chain.slice(index+1)
        ],
      }
    case 'UPDATE_COLDCHAIN_LATLONG' :
      index = state.chain.findIndex(temp => temp._id === action.payload.coldChain_id);
      return {
        ...state,
        chain : [
          ...state.chain.slice(0,index),
          {
            ...state.chain[index],
            latitude : action.payload.latitude,
            longitude : action.payload.longitude
          },
          ...state.chain.slice(index+1)
        ],
      }
    case 'UPDATE_COLDCHAIN_TEMPERATURE' :
      index = state.chain.findIndex(temp => temp._id === action.payload.coldChain_id);
            return {
        ...state,
        chain : [
          ...state.chain.slice(0,index),
          {
            ...state.chain[index],
            temperature : action.payload.temperature,
          },
          ...state.chain.slice(index+1)
        ],
      }
      case 'UPDATE_COLDCHAIN_UT':
        index = state.chain.findIndex(
          (temp) => temp._id === action.payload.coldChain_id
        );
        return {
          ...state,
          chain: [
            ...state.chain.slice(0, index),
            {
              ...state.chain[index],
              upperThreshold: action.payload.ut
            },
            ...state.chain.slice(index + 1)
          ]
        };
      case 'UPDATE_COLDCHAIN_LT':
        index = state.chain.findIndex(
          (temp) => temp._id === action.payload.coldChain_id
        );
        return {
          ...state,
          chain: [
            ...state.chain.slice(0, index),
            {
              ...state.chain[index],
              lowerThreshold: action.payload.lt
            },
            ...state.chain.slice(index + 1)
          ]
        };
      case 'UPDATE_COLDCHAIN_RADIUS':
        index = state.chain.findIndex(
          (temp) => temp._id === action.payload.coldChain_id
        );
        return {
          ...state,
          chain: [
            ...state.chain.slice(0, index),
            {
              ...state.chain[index],
              geofenceCenter: {
                ...state.chain[index].geofenceCenter,
                radius: action.payload.radius
              }
            },
            ...state.chain.slice(index + 1)
          ]
        };
      case 'UPDATE_COLDCHAIN_CENTER':
        index = state.chain.findIndex(
          (temp) => temp._id === action.payload.coldChain_id
        );
        return {
          ...state,
          chain: [
            ...state.chain.slice(0, index),
            {
              ...state.chain[index],
              geofenceCenter: {
                ...state.chain[index].geofenceCenter,
                latitude: action.payload.latitude,
                longitude: action.payload.longitude
              }
            },
            ...state.chain.slice(index + 1)
          ]
        };
    case 'SET_COLDCHAIN_THRESHOLD' :
      index = state.chain.findIndex(temp => temp._id === action.id);
      return {
        ...state,
        chain : [
          ...state.chain.slice(0,index),
          {
            ...state.chain[index],
            upperThreshold : action.ut,
            lowerThreshold : action.lt
          },
          ...state.chain.slice(index+1)
        ],
      }
      case 'SET_COLDCHAIN_RADIUS':
      index = state.chain.findIndex((temp) => temp._id === action.id);
      return {
        ...state,
        chain: [
          ...state.chain.slice(0, index),
          {
            ...state.chain[index],
            geofenceCenter: {
              ...state.chain[index].geofenceCenter,
              radius: action.radius
            }
          },
          ...state.chain.slice(index + 1)
        ]
      };

      case 'SET_COLDCHAIN_CENTER':
      index = state.chain.findIndex((temp) => temp._id === action.id);
      return {
        ...state,
        chain: [
          ...state.chain.slice(0, index),
          {
            ...state.chain[index],
            geofenceCenter: {
              ...state.chain[index].geofenceCenter,
              latitude: state.chain[index].latitude,
              longitude: state.chain[index].longitude
            }
          },
          ...state.chain.slice(index + 1)
        ]
      };

    case 'COLDCHAIN_TABLE_DATA' :
      return {
        ...state,
        logs: action.payload.data,
        loading: false
      }
    case 'COLDCHAIN_CHART_DATA' :
      return {
        ...state,
        charts : action.payload,
        highest: action.highest,
        loading: false,
      }
    case 'COLDCHAIN_TABLE_LOADING' :
      return {
        ...state,
        loading: true
      };
    case 'COLDCHAIN_CHART_LOADING' :
      return {
        ...state,
        loading: true
      } 
    case 'COLDCHAIN_LOADING' :
      return {
        ...state,
        loading : true,
      }
      case 'GET_COLDCHAIN_ALERTS':
        return {
          ...state,
          alertColumns: action.payload.columns,
          alertData: action.payload.data,
          alertTitle: action.payload.title,
          alertLoading: false
        };
      case 'COLDCHAIN_ALERTS_LOADING':
        return {
          ...state,
          alertLoading: true
        };
    default :
      return state;
  }
}
        
export default coldChainReducer;