const initState = {
  geyserModule: [],
  geyserRoutines:[],
  logs: [],
  logsLoading: false,
  routines: [],
  RoutinesLoading: false,
  geyserLoading: false,
  geyserControlLoading: false,
  charts: [],
  highest: 1,
  thresholdLoading: false,
  RoutinesIndividualLoading: false,
  AllRoutineLoading: false,
  addRoutineLoading: false,
  routineLoading: false,
  y: [],
};

const geyserReducer = (state = initState, action) => {
  let index = null;
  switch (action.type) {
    case 'GET_SENSORS':
      // console.log('reducerrr',action.payload)
      return {
        ...state,
        geyserModule: action.payload,
        geyserLoading: false,
      };
    case 'SENSORS_LOADING':
      return {
        ...state,
        geyserLoading: true,
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
    case 'UPPER_THRESHOLD_LOADING':
      return {
        ...state,
        thresholdLoading: true,
      };
    case 'UPDATE_LOWER_THRESHOLD':
      index = state.geyserModule.findIndex(
        s => s._id === action.payload.geyser_id,
      );
      console.log('index', index);
      return {
        ...state,
        geyserModule: [
          ...state.geyserModule.slice(0, index),
          {
            ...state.geyserModule[index],
            temp_lowerthreshold: action.payload.temp_lowerthreshold,
          },
          ...state.geyserModule.slice(index + 1),
        ],
        thresholdLoading: false,
      };
    case 'UPDATE_UPPER_THRESHOLD':
      index = state.geyserModule.findIndex(
        s => s._id === action.payload.geyser_id,
      );
      return {
        ...state,
        geyserModule: [
          ...state.geyserModule.slice(0, index),
          {
            ...state.geyserModule[index],
            temp_upperthreshold: action.payload.temp_upperthreshold,
          },
          ...state.geyserModule.slice(index + 1),
        ],
        thresholdLoading: false,
      };
    case 'GEYSER_STATUS_LOADING':
      return {
        ...state,
        geyserControlLoading: true,
      };
    case 'UPDATE_GEYSER_CONTROL':
      index = state.geyserModule.findIndex(
        s => s._id === action.payload.geyser_id,
      );
      console.log('index', index);
      return {
        ...state,
        geyserModule: [
          ...state.geyserModule.slice(0, index),
          {
            ...state.geyserModule[index],
            geyser_control: action.payload.geyser_control,
          },
          ...state.geyserModule.slice(index + 1),
        ],
        geyserControlLoading: false,
      };
    case 'UPDATE_TEMPERATURE':
      index = state.geyserModule.findIndex(
        s => s._id === action.payload.geyser_id,
      );
      console.log('index', index);
      return {
        ...state,
        geyserModule: [
          ...state.geyserModule.slice(0, index),
          {
            ...state.geyserModule[index],
            temperature: action.payload.temperature,
          },
          ...state.geyserModule.slice(index + 1),
        ],
        thresholdLoading: false,
      };
    case 'UPDATE_GAS_VAVLE':
      index = state.geyserModule.findIndex(
        s => s._id === action.payload.geyser_id,
      );
      console.log('index', index);
      return {
        ...state,
        geyserModule: [
          ...state.geyserModule.slice(0, index),
          {
            ...state.geyserModule[index],
            gas_valve: action.payload.valve_status,
          },
          ...state.geyserModule.slice(index + 1),
        ],
        thresholdLoading: false,
      };
    case 'UPDATE_BURNER_STATUS':
      index = state.geyserModule.findIndex(
        s => s._id === action.payload.geyser_id,
      );
      console.log('index', index);
      return {
        ...state,
        geyserModule: [
          ...state.geyserModule.slice(0, index),
          {
            ...state.geyserModule[index],
            burner_status: action.payload.burner_status,
          },
          ...state.geyserModule.slice(index + 1),
        ],
        thresholdLoading: false,
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
    case 'GET_ROUTINE_LOADING':
      return {
        ...state,
        AllRoutineLoading: true,
      };
   
    // case 'GET_ROUTINES':
    // case 'DELETE_ROUTINE':
    //   index = state.geyserModule.findIndex(f => f._id === action.geyser_id);
      
    //   return {
    //     ...state,
    //     geyserModule: [
    //       ...state.geyserModule.slice(0, index),
    //       {
    //         ...state.geyserModule[index],
    //         scheduling: {
    //           routine: action.payload,
    //           // routineLoading: false,
    //         },
    //       },
    //       ...state.geyserModule.slice(index + 1),
    //     ],
    //     AllRoutineLoading: false,
    //   };

    case 'UPDATE_INDIVUDUAL_ROUTINE_LOADING':
      //console.log('reducer',action.payload)
      return {
        ...state,
        RoutinesIndividualLoading: true,
      };

    // console.log('updateee', i);
    // return {
    //   ...state,
    //   geyserModule: [
    //     ...state.geyserModule.slice(0, index),
    //     {
    //       ...state.geyserModule[index],
    //       scheduling: {
    //         routine: [
    //           ...state.geyserModule[index].scheduling.routine.slice(0, i),
    //           {
    //             ...state.geyserModule[index].scheduling.routine[i],
    //             enable: action.payload.routine.enable,
    //           },
    //           ...state.geyserModule[index].scheduling.routine.slice(i + 1),
    //         ],
    //       },
    //     },
    //     ...state.geyserModule.slice(index + 1),
    //   ],
    //   RoutinesIndividualLoading: false,
    // };
    case 'UPDATE_All_ROUTINES_LOADING':
      //console.log('reducer',action.payload)
      return {
        ...state,
        AllRoutineLoading: true,
      };
    case 'UPDATE_ALL_ROUTINE':
      index = state.geyserModule.findIndex(
        s => s._id === action.payload.geyser_id,
      );
      return {
        ...state,
        geyserModule: [
          ...state.geyserModule.slice(0, index),
          {
            ...state.geyserModule[index],
            routine_enable: action.payload.status,
          },
          ...state.geyserModule.slice(index + 1),
        ],
        thresholdLoading: false,
        AllRoutineLoading: false,
      };

      case 'ADD_LOADING': 
      return {
        ...state,
        addRoutineLoading: true,
      }

    // case 'ADD_ROUTINE':
    //   index = state.geyserModule.findIndex(
    //     f => f._id === action.payload.geyser_id,
    //   );
    //   // index = state.geyser[geyser_index].routines.findIndex((f) => f._id === action.payload._id );
    //   return {
    //     ...state,
    //     geyserModule: [
    //       ...state.geyserModule.slice(0, index),
    //       {
    //         ...state.geyserModule[index],
    //         scheduling: {
    //           routine: [
    //             ...state.geyserModule[index].scheduling.routine,
    //             action.payload,
    //           ],
    //           // routineLoading: false,
    //         },
    //       },
    //       ...state.geyserModule.slice(index + 1),
    //     ],
    //     addRoutineLoading: false,
    //   };

    case 'GET_ROUTINES': 

    return {
      ...state,
      geyserRoutines: action.payload,
      AllRoutineLoading: false,
    };

    case 'ADD_ROUTINE':
      console.log(action.payload);
      const temp = [...state.geyserRoutines];
      temp.push(action.payload);
        return {
          ...state,
          geyserRoutines: temp,
         addRoutineLoading: false, 

        }
    case 'DELETE_ROUTINE':
       
        return{
          ...state,
          geyserRoutines: action.payload,
          addRoutineLoading:false
        }

        case 'UPDATE_INDIVUDUAL_ROUTINE':
          console.log('update.....',action.payload);

          let tempo = [...state.geyserRoutines];
          const ind =  tempo.findIndex(
            f => f._id === action?.payload?.routine?._id,
          );

          console.log('inddd.....',ind);

          if(ind <= -1){
            tempo.push(action.payload.routine);
          } else {
            tempo[ind] = action.payload.routine;

          }


          return {
            ...state,
            geyserRoutines: tempo,
            addRoutineLoading:false
          }


        // case 'UPDATE_INDIVUDUAL_ROUTINE':
        //   index = state.geyserModule.findIndex(
        //     f => f._id === action.payload.routine.geyser_id,
        //   );
        //   console.log('inddd......',index);
    
        //   let i = state.geyserModule[index].scheduling.routine.findIndex(
        //     f => f._id === action.payload.routine._id,
        //   );
    
        //   console.log('other inddd......',i);
    
        //   console.log('updateroutine Redd.........',action.payload)
    
        //   return {
        //     ...state,
        //     geyserModule: [
        //       ...state.geyserModule.slice(0, index),
        //       {
        //         ...state.geyserModule[index],
        //         scheduling: {
        //           routine: [
        //             ...state.geyserModule[index].scheduling.routine.slice(0, i),
        //             action.payload.routine,
        //             ...state.geyserModule[index].scheduling.routine.slice(i + 1),
        //           ],
        //         },
        //       },
    
        //       ...state.geyserModule.slice(index + 1),
        //     ],
        //   };


    case 'ALERTS_LOADING':
      return {
        ...state,
        alertLoading: true,
      };
    case 'GET_ALERTS':
      console.log('reducerrrr', action.payload);
      return {
        ...state,
        alerts: action.payload,
        alertLoading: false,
      };
    default:
      return state;
  }
};

export default geyserReducer;
