const initState = {
  isLoading: false,
  sensor: [],
  logs: [],
  logsLoading: false,
  chart1: [],
  chart2: [],
  chart3: [],
  chart: [],
  chartsLoading: false,
  highest: 1,
  alertColumns: [],
  alertData: [],
  alertTitle: '',
  alertLoading: false,
};

const emReducer = (state = initState, action) => {
  let index;
  switch (action.type) {
    case 'SENSOR_LOADING':
      return {
        ...state,
        isLoading: true,
      };

    case 'GET_SENSOR':
      return {
        ...state,
        sensor: action.payload,
        isLoading: false,
      };
    case 'UPDATE_VA':
      index = state.sensor.findIndex(f => f._id === action.payload.em_id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            Va: action.payload.Va,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'UPDATE_VB':
      index = state.sensor.findIndex(f => f._id === action.payload.em_id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            Vb: action.payload.Vb,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'UPDATE_VC':
      index = state.sensor.findIndex(f => f._id === action.payload.em_id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            Vc: action.payload.Vc,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'UPDATE_IA':
      index = state.sensor.findIndex(f => f._id === action.payload.em_id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            Ia: action.payload.Ia,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'UPDATE_IB':
      index = state.sensor.findIndex(f => f._id === action.payload.em_id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            Ib: action.payload.Ib,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'UPDATE_IC':
      index = state.sensor.findIndex(f => f._id === action.payload.em_id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            Ic: action.payload.Ic,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'UPDATE_PF':
      index = state.sensor.findIndex(f => f._id === action.payload.em_id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            Pf: action.payload.Pf,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'UPDATE_PA':
      index = state.sensor.findIndex(f => f._id === action.payload.em_id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            PA: action.payload.PA,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'UPDATE_PR':
      index = state.sensor.findIndex(f => f._id === action.payload.em_id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            PR: action.payload.PR,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'UPDATE_U':
      index = state.sensor.findIndex(f => f._id === action.payload.em_id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            U: action.payload.U,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'V_UPPER_LIMIT':
      index = state.sensor.findIndex(f => f._id === action.id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            vUpperLimit: action.payload,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    //   case 'C_UPPER_LIMIT':
    //   index = state.sensor.findIndex((f) => f._id === action.id);
    //   return{
    //     ...state,
    //     sensor: [
    //       ...state.sensor.slice(0, index),
    //       {
    //         ...state.sensor[index],
    //         iUpperLimit: action.payload
    //       },
    //       ...state.sensor.slice(index+1)

    //     ]

    //   };
    case 'U_UPPER_LIMIT':
      index = state.sensor.findIndex(f => f._id === action.id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            uUpperLimit: action.payload,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'V_LOWER_LIMIT':
      index = state.sensor.findIndex(f => f._id === action.id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            vLowerLimit: action.payload,
          },
          ...state.sensor.slice(index + 1),
        ],
      };
    case 'PF_LOWER_LIMIT':
      index = state.sensor.findIndex(f => f._id === action.id);
      return {
        ...state,
        sensor: [
          ...state.sensor.slice(0, index),
          {
            ...state.sensor[index],
            pfLowerLimit: action.payload,
          },
          ...state.sensor.slice(index + 1),
        ],
      };

    case 'EM_TABEL_LOADING':
      return {
        ...state,
        logsLoading: true,
      };
    case 'EM_TABEL_DATA':
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
    case 'GET_CHART_DATA':
      return {
        ...state,
        chart1: action.payload1,
        chart2: action.payload2,
        chart3: action.payload3,
        highest: action.highest,
        chartsLoading: false,
      };
    case 'GET_CHART_DATA1':
      return {
        ...state,
        chart: action.payload,
        highest: action.highest,
        chartsLoading: false,
      };
    case 'EM_ALERTS_LOADING':
      return {
        ...state,
        alertLoading: true,
      };
    case 'GET_EM_ALERTS':
      return {
        ...state,
        alertData: action.payload.data,
        alertColumns: action.payload.columns,
        alertTitle: action.payload.title,
        alertLoading: false,
      };

    default:
      return state;
  }
};

export default emReducer;
