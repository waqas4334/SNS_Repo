

const initState = {
    sensorsLoading: false,
    sensors: [],
    controlLoading: false,
    upperLoading: false,
    upper: [],
    thresholdLoading: false,
    lowerLoading: false,
    filterLoading: false,
    filter: [],
    motorLoading: false,
    chartsLoading: false,
    charts: [],
    Logs: [],
    logsLoading: false,
    highest: 1,
    maintenanceLoading: false,
    alerts: [],
    alertLoading: false,
    SchedulingLoading:false,
    routines:[],
    RoutinesLoading:false,
    RoutinesIndividualLoading:false
}


const tubewellReducer = (state = initState, action) => {
    let index = -1;

    switch (action.type) {
        case 'SENSORS_LOADING':
            return {
                ...state,
                sensorsLoading: true
            }
        case 'GET_SENSORS':
            return {
                ...state,
                sensors: action.payload,
                sensorsLoading: false
            }
        case 'UPDATE_MOTORSTATUS':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    motor: action.payload.motor,
                    forceMotor: action.payload.forceMotor

                },
                ...state.sensors.slice(index + 1),
                ],
                controlLoading:false
            }
        case 'UPDATE_LITER_THRESHOLD':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    liters: action.payload.liters
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_FILLLEVEL':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    fillLevel: action.payload.fillLevel
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_WATER_THRESHOLD':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    waterMaintenance: action.payload.waterMaintenance
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_MOTOR_THRESHOLD':
            console.log('reducer', action.payload);
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    motorMaintenance: action.payload.motorMaintenance
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_PHASE_UP_THRESHOLD':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    ph_upperLmt: action.payload.ph_upperLmt
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_FILL_UP_THRESHOLD':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    fillLevel_upperLmt: action.payload.fillLevel_upperLmt
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_FILL_LOWER_THRESHOLD':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    fillLevel_lwrLmt: action.payload.fillLevel_lwrLmt
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_TDS_UP_THRESHOLD':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    tds_upperLmt: action.payload.tds_upperLmt
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_PH_LOWER_THRESHOLD':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    ph_lwrLmt: action.payload.ph_lwrLmt
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_TDS_LOWER_THRESHOLD':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    tds_lwrLmt: action.payload.tds_lwrLmt
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_LINE_LOWER_THRESHOLD':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    I_lwrLmt: action.payload.I_lwrLmt
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_FILTER_MAINTENANCE_LOG':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    runningTime: action.payload.runningTime
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_TANK_LID':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    t_lid: action.payload.t_lid
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_DOOR_STATUS':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    door_status: action.payload.door_status
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_HYDRO_PUMP_RUNNING_LOG':
            index = state.sensors.findIndex(s => s._id === action.id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    maintanance: {
                        ...state.sensors[index].maintanance,
                        motorRunningTime: '0'
                    }
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_FILTER_RUNNING_LOG':
            index = state.sensors.findIndex(s => s._id === action.id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {

                    ...state.sensors[index],
                    maintanance: {
                        ...state.sensors[index].maintanance,
                        runningTime: '0'
                    }
                },
                ...state.sensors.slice(index + 1),

                ]
            }
        case 'UPDATE_MOTOR_MODE':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    auto: action.payload.auto
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_CAPACITY':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            console.log('reducer',index)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    t_capacity: action.payload.t_capacity
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_PH':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    ph: action.payload.ph
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_TDS':

            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    tds: action.payload.tds
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_HYDRO_PUMP':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    phaseDown: action.payload.phaseDown
                },
                ...state.sensors.slice(index + 1),
                ],
                controlLoading:false
            }
        case 'UPDATE_LINE_CURRENT':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    Ia: action.payload.Ia
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'UPDATE_ALARM':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    alarm: action.payload.alarm
                },
                ...state.sensors.slice(index + 1),
                ]
            }
            case 'UPDATE_PLVL':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    plvl: action.payload.plvl
                },
                ...state.sensors.slice(index + 1),
                ]
            }
            case 'UPDATE_VOLVE':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    volve: action.payload.volve
                },
                ...state.sensors.slice(index + 1),
                ]
            }
            case 'UPDATE_VIB':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    vib: action.payload.vib
                },
                ...state.sensors.slice(index + 1),
                ]
            }
        case 'CONTROL_LOADING':
            console.log('reduceree')
            return {
                ...state,
                controlLoading: true
            }
        // case 'CLOSE_LOADING':
        //     return {
        //         ...state,
        //         controlLoading: false
        //     }
        case 'UPPER_THRESHOLD_LOADING':
            return {
                ...state,
                upperLoading: true
            }
        case 'LOWER_THRESHOLD_LOADING':
            return {
                ...state,
                lowerLoading: true
            }
        case 'THRESHOLD_LOADING':
            return {
                 ...state,
                thresholdLoading: true
            }
        // case 'FILTER_MAINTENANCE_LOADING':
        //     return {
        //         ...state,
        //         filterLoading: true
        //     }
        case 'MOTOR_LOADING':
            return {
                ...state,
                motorLoading: true
            }
        case 'GET_MOTOR':
            return {
                ...state,
                motorLoading: false
            }
        case 'LOGS_LOADING':
            return {
                ...state,
                logsLoading: true,
            };
        case 'LOGS_DATA':
            console.log('reducer', action.payload);
            return {
                ...state,
                Logs: action.payload,
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
        case 'MAINTENANCE_LOADING':
            return {
                ...state,
                maintenanceLoading: true,
            };
        case 'UPDATE_RUNNING_TIMES':
            console.log('reducer', action.payload);
            index = state.sensors.findIndex(s => s._id === action.tw_id)
            return {
                ...state,
                sensors: [
                    ...state.sensors.slice(0, index),
                    {
                        ...state.sensors[index],
                        maintanance: {
                            ...state.sensors[index].maintanance,
                            totalRunningTime: action?.payload?.overallRunningTime,
                            runningTime: action.payload.filterRunningTime,
                            motorRunningTime: action.motorRunningTime
                        },
                        ...state.sensors.slice(index + 1)
                    }
                ],
                maintenanceLoading: false,
            };
        case 'TUBEWELL_ALERTS_LOADING':
            return {
                ...state,
                alertLoading: true,
            };
        case 'GET_TUBEWELL_ALERTS':
            // console.log('reducer', action.payload);
            return {
                ...state,
                alerts: action.payload,
                alertLoading: false,
            };
            case 'ALL_ROUTINE_LOADING':
                return {
                    ...state,
                    RoutineLoading: true
                };
            case 'UPDATE_ROUTINE_STATUS':
            index = state.sensors.findIndex(s => s._id === action.payload.tw_id)
            return {
                ...state,
                sensors: [...state.sensors.slice(0, index),
                {
                    ...state.sensors[index],
                    routine_enable: action.payload.routines_status
                },
                ...state.sensors.slice(index + 1),
                ]
            }
            case 'GET_ROUTINE_LOADING':
                return {
                    ...state,
                    RoutinesLoading: true
                }
            case 'GET_ROUTINES':
                // console.log('reducer',action.payload)
            return {
                ...state,
                routines: action.payload,
                RoutinesLoading: false
            }
            case 'UPDATE_ROUTINE_LOADING':
                //console.log('reducer',action.payload)
            return {
                ...state,
                RoutinesIndividualLoading: true
            }
            case 'UPDATE_ROUTINE':
            index = state.routines.findIndex((f) => f._id === action.payload._id );
            // console.log("index", index)
            return {
                ...state,
                routines: [
                ...state.routines.slice(0, index),
                action.payload,
                ...state.routines.slice(index + 1)
                ]
            }
        default:
            return state;
    }

}

export default tubewellReducer;



// case 'UPDATE_SINGLE_ROUTINE':
//       index = state.routines.findIndex((f) => f._id === action.payload._id );
//       return {
//         ...state,
//         routines: [
//           ...state.routines.slice(0, index),
//           action.payload,
//           ...state.routines.slice(index + 1)
//         ]
//       }

// case 'UPDATE_ALL_ROUTINES':
//       index = state.tubewell.findIndex((f) => f._id === action.id);
//       return {
//         ...state,
//         tubewell: [
//           ...state.tubewell.slice(0, index),
//           {
//             ...state.tubewell[index],
//             routine_enable: action.status
//           },
//           ...state.tubewell.slice(index + 1)
//         ]
//       };