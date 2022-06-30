const initState = {
  lms: [],
  isLoading: false,
  chartLoading: false,
  generalLoading: false,
  logs: [],
  charts: [],
  highest: 1,
  alertColumns: [],
  alertData: [],
  alertTitle: '',
  alertLoading: false
};

const lmsReducer = (state = initState, action) => {
  let index = null;
  switch (action.type) {
    case 'GET_LMS':
      return {
        ...state,
        lms: action.payload,
        generalLoading: false
      };
      case 'UPDATE_LMS_PH': 
      index = state.lms.findIndex((f) => f._id === action.id);
      if (index !== -1) {
        return {
          ...state,
          lms: [
            ...state.lms.slice(0, index),
            {
              ...state.lms[index],
              ph: action.payload
            },
            ...state.lms.slice(index + 1)
          ]
        };
      } else {
        return {
          ...state
        };
      }

    case 'UPDATE_LMS_TDS':
      index = state.lms.findIndex(f => f._id === action.id);
      if (index !== -1) {
      return {
        ...state,
        lms: [
          ...state.lms.slice(0, index),
          {
            ...state.lms[index],
            tds: action.payload
          },
          ...state.lms.slice(index + 1)
        ]
      };
    } else {
      return {
        ...state
      };
    }

    case 'UPDATE_LMS_BATTERY':
      index = state.lms.findIndex(f => f._id === action.id);
      if (index !== -1) {
      return {
        ...state,
        lms: [
          ...state.lms.slice(0, index),
          {
            ...state.lms[index],
            battery: action.payload
          },
          ...state.lms.slice(index + 1)
        ]
      };
    } else {
      return {
        ...state
      };
    }

    case 'UPDATE_LMS_WATERFLOW':
      index = state.lms.findIndex(f => f._id === action.id);
      if (index !== -1) {
      return {
        ...state,
        lms: [
          ...state.lms.slice(0, index),
          {
            ...state.lms[index],
            waterflow: action.payload
          },
          ...state.lms.slice(index + 1)
        ]
      };
    } else {
      return {
        ...state
      };
    }

    case 'UPDATE_LMS_O2':
      index = state.lms.findIndex(f => f._id === action.id);
      if (index !== -1) {
      return {
        ...state,
        lms: [
          ...state.lms.slice(0, index),
          {
            ...state.lms[index],
            dissolvedOxygen: action.payload
          },
          ...state.lms.slice(index + 1)
        ]
      };
    } else {
      return {
        ...state
      };
    }

    case 'UPDATE_LMS_AERATOR':
      index = state.lms.findIndex(f => f._id === action.id);
      if (index !== -1) {
      return {
        ...state,
        lms: [
          ...state.lms.slice(0, index),
          {
            ...state.lms[index],
            aerator: action.payload
          },
          ...state.lms.slice(index + 1)
        ]
      };
    } else {
      return {
        ...state
      };
    }

    case 'UPDATE_LMS_MOTOR':
      index = state.lms.findIndex(f => f._id === action.id);
      if (index !== -1) {
      return {
        ...state,
        lms: [
          ...state.lms.slice(0, index),
          {
            ...state.lms[index],
            motor: action.payload
          },
          ...state.lms.slice(index + 1)
        ]
      };
    } else {
      return {
        ...state
      };
    }

    case 'UPDATE_LMS_TEMPERATURE':
      index = state.lms.findIndex(f => f._id === action.id);
      if (index !== -1) {
      return {
        ...state,
        lms: [
          ...state.lms.slice(0, index),
          {
            ...state.lms[index],
            temperature: action.payload
          },
          ...state.lms.slice(index + 1)
        ]
      };
    } else {
      return {
        ...state
      };
    }

      case 'UPDATE_LMS_UT':
        index = state.lms.findIndex((f) => f._id === action.id);
        if (index !== -1) {
        return {
          ...state,
          lms: [
            ...state.lms.slice(0, index),
            {
              ...state.lms[index],
              upperThreshold: action.payload
            },
            ...state.lms.slice(index + 1)
          ]
        };
      } else {
        return {
          ...state
        };
      }

      case 'UPDATE_LMS_LT':
        index = state.lms.findIndex((f) => f._id === action.id);
        if (index !== -1) {
        return {
          ...state,
          lms: [
            ...state.lms.slice(0, index),
            {
              ...state.lms[index],
              threshold: action.payload
            },
            ...state.lms.slice(index + 1)
          ]
        };
      } else {
        return {
          ...state
        };
      }
        
    case 'SET_LMS_THRESHOLD':
      index = state.lms.findIndex(f => f._id === action.id);
      return {
        ...state,
        lms: [
          ...state.lms.slice(0, index),
          {
            ...state.lms[index],
            threshold: action.payload
          },
          ...state.lms.slice(index + 1)
        ]
      };
    case 'SET_LMS_UPPERTHRESHOLD':
      index = state.lms.findIndex(f => f._id === action.id);
      return {
        ...state,
        lms: [
          ...state.lms.slice(0, index),
          {
            ...state.lms[index],
            upperThreshold: action.payload
          },
          ...state.lms.slice(index + 1)
        ]
      };
    case 'SET_LMS_TANK':
      index = state.lms.findIndex(f => f._id === action.id);
      return {
        ...state,
        lms: [
          ...state.lms.slice(0, index),
          {
            ...state.lms[index],
            tank: action.tank
          },
          ...state.lms.slice(index + 1)
        ]
      };
    case 'LMS_TABLE_DATA':
      index = state.lms.findIndex(f => f._id === action.lms_id);
      return {
        ...state,
        logs: action.payload.data,
        isLoading: false
      };
    case 'LMS_CHART_DATA':
      return {
        ...state,
        charts : action.payload,
        loading: false,
        highest: action.highest,
        chartLoading: false
      }
    case 'LMS_TABLE_LOADING':
      return {
        ...state,
        isLoading: true
      };
    case 'LMS_CHART_LOADING':
      return {
        ...state,
        chartLoading: true
      }   
    case 'LMS_GENERAL_LOADING':
      return {
        ...state,
        generalLoading: true
      };
      case 'LMS_ALERTS_LOADING':
      return {
        ...state,
        alertLoading: true
      };
      case 'GET_LMS_ALERTS':
      return {
        ...state,
        alertColumns: action.payload.columns,
        alertData: action.payload.data,
        alertTitle: action.payload.title,
        alertLoading: false
      };
    default:
      return state;
  }
};

export default lmsReducer;
