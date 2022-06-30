const initState = {
    segment: [],
    segmentLoading: false,
    dimLevelLoading: false,
    TimerLoading: false,
    RadarLoading: false,
    SchedulingLoading: false,
    SegmentLightLoading: false,
    logsLoading: false,
    Logs: [],
    chartsLoading: false,
    charts: [],
    segmentControlLoading: false,
    individualRoutineLoading: false,
    alerts: [],
    alertLoading: false,
    alertColumns: [],
    alertTitle: '',
}

const streetLightReducer = (state = initState, action) => {
    switch (action.type) {
        case 'SEGMENT_LOADING':
            return {
                ...state,
                segmentLoading: true
            }
        case 'GET_SEGMENT':
            return {
                ...state,
                segment: action.payload,
                segmentLoading: false
            }
        case 'DIM_LEVEL_LOADING':
            return {
                ...state,
                dimLevelLoading: true
            }
        case 'UPDATE_DIMLEVEL':
            index = state.segment.findIndex(s => s._id === action.id)
            console.log('action', action)
            return {
                ...state,
                segment: [...state.segment.slice(0, index),
                {
                    ...state.segment[index],
                    dimLevelLoading: false,
                    dimLevel: action.payload,
                    routine_dimLevel: action.copyDimlevel

                },
                ...state.segment.slice(index + 1)
                ]
            }
        case 'TIMER_LOADING':
            return {
                ...state,
                TimerLoading: true
            }
        case 'UPDATE_TIMER':
            index = state.segment.findIndex(s => s._id === action.payload.st_id)
            console.log('reducer', index)
            return {
                ...state,
                segment: [...state.segment.slice(0, index),
                {
                    ...state.segment[index],
                    light_time: action.payload.light_time
                },
                ...state.segment.slice(index + 1)
                ]
            }
        case 'RADAR_LOADING':
            return {
                ...state,
                RadarLoading: true
            }
        case 'UPDATE_RADAR':
            console.log('reducer', action.payload);

            index = state.segment.findIndex(s => s._id === action.payload.st_id)
            console.log('index', index);
            return {
                ...state,
                segment: [...state.segment.slice(0, index),
                {
                    ...state.segment[index],
                    RadarLoading: false,
                    radar_enable: action.payload.auto
                },
                ...state.segment.slice(index + 1)
                ]
            }
        case 'SHEDULING_LOADING':
            return {
                ...state,
                SchedulingLoading: true
            }
        case 'UPDATE_SCHEDULING':
            console.log('reducer', action.payload.st_id);
            index = state.segment.findIndex(s => s._id === action.payload.st_id);
            console.log('index', index);
            return {
                ...state,
                segment: [...state.segment.slice(0, index),
                {
                    ...state.segment[index],
                    allRoutines: action.payload.allRoutines
                },
                ...state.segment.slice(index + 1)
                ]
            }
        case 'SEGMMENT_LIGHT_LOADING':
            return {
                ...state,
                SegmentLightLoading: true
            }
        case 'UPDATE_SEGMENT':
            index = state.segment.findIndex(s => s._id === action.payload.st_id);
            let newArr = [];
            for (let i = 0; i <= action.payload.light.length - 1; i++) {
                newArr[i] = action.payload.light[i]
            }
            // console.log('reducer',newArr);
            return {
                ...state,
                segment: [
                    ...state.segment.slice(0, index),
                    {
                        ...state.segment[index],
                        lights: newArr
                    },
                    ...state.segment.slice(index + 1)
                ],
                SegmentLightLoading: false,
            };
        case 'LOGS_LOADING':
            return {
                ...state,
                logsLoading: true
            }
        case 'LOGS_DATA':
            return {
                ...state,
                Logs: action.payload,
                logsLoading: false,
            }
        case 'CHARTS_LOADING':
            return {
                ...state,
                chartsLoading: true
            }
        case 'CHARTS_DATA':
            return {
                ...state,
                charts: action.payload,
                chartsLoading: false,
                highest: action.highest,
            }
        case 'SEGMENT_LOADING':
            return {
                ...state,
                segmentControlLoading: true
            }
        case 'UPDATE_SEGMENT_CONTROL':
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [...state.segment.slice(0, index),
                {
                    ...state.segment[index],

                    segControl: action.payload.segControl
                },
                ...state.segment.slice(index + 1)
                ],
                segmentLoading: false,
                segmentControlLoading: false
            }
        case 'INDIVIDUAL_ROUTINES_LOADING':
            return {
                ...state,
                individualRoutineLoading: true
            }
        case 'UPDATE_SEGMENT_OFF':
            console.log('reducerrr', action.status);
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [...state.segment.slice(0, index),
                {
                    ...state.segment[index],
                    seg_startTime: action.startTime,
                    seg_endTime: action.endTime,
                    seg_routineEnable: action.status,
                },
                ...state.segment.slice(index + 1)
                ], individualRoutineLoading: false
            }
        case 'UPDATE_DIM_HIGH':
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [...state.segment.slice(0, index),
                {
                    ...state.segment[index],
                    dim_high_strtime: action.startTime,
                    dim_high_endtime: action.endTime,
                    dim_high_routineEnable: action.status,
                },
                ...state.segment.slice(index + 1)
                ], individualRoutineLoading: false
            }
        case 'UPDATE_DIM_MEDIUM':
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [...state.segment.slice(0, index),
                {
                    ...state.segment[index],
                    dim_medium_strtime: action.startTime,
                    dim_medium_endtime: action.endTime,
                    dim_medium_routineEnable: action.status,
                },
                ...state.segment.slice(index + 1)
                ], individualRoutineLoading: false
            }
        case 'UPDATE_DIM_LOW':
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [...state.segment.slice(0, index),
                {
                    ...state.segment[index],
                    dim_low_strtime: action.startTime,
                    dim_low_endtime: action.endTime,
                    dim_low_routineEnable: action.status,
                },
                ...state.segment.slice(index + 1)
                ], individualRoutineLoading: false
            };
        case 'SEG_START_TIME':
            index = state.segment.findIndex(s => s._id === action.id);
            console.log('reduecer', action.startTime)
            return {
                ...state,
                segment: [
                    ...state.segment.slice(0, index),
                    {
                        ...state.segment[index],
                        seg_startTime: action.startTime
                    },
                    ...state.segment.slice(index + 1)
                ]
            };

        case 'SEG_END_TIME':
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [
                    ...state.segment.slice(0, index),
                    {
                        ...state.segment[index],
                        seg_endTime: action.endTime
                    },
                    ...state.segment.slice(index + 1)
                ]
            };

        case 'DIM_HIGH_START_TIME':
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [
                    ...state.segment.slice(0, index),
                    {
                        ...state.segment[index],
                        dim_high_strtime: action.startTime
                    },
                    ...state.segment.slice(index + 1)
                ]
            };
 
        case 'DIM_HIGH_END_TIME':
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [
                    ...state.segment.slice(0, index),
                    {
                        ...state.segment[index],
                        dim_high_endtime: action.endTime
                    },
                    ...state.segment.slice(index + 1)
                ]
            };

        case 'DIM_MEDIUM_START_TIME':
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [
                    ...state.segment.slice(0, index),
                    {
                        ...state.segment[index],
                        dim_medium_strtime: action.startTime
                    },
                    ...state.segment.slice(index + 1)
                ]
            };

        case 'DIM_MEDIUM_END_TIME':
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [
                    ...state.segment.slice(0, index),
                    {
                        ...state.segment[index],
                        dim_medium_endtime: action.endTime
                    },
                    ...state.segment.slice(index + 1)
                ]
            };

        case 'DIM_LOW_START_TIME':
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [
                    ...state.segment.slice(0, index),
                    {
                        ...state.segment[index],
                        dim_low_strtime: action.startTime
                    },
                    ...state.segment.slice(index + 1)
                ]
            };

        case 'DIM_LOW_END_TIME':
            index = state.segment.findIndex(s => s._id === action.id);
            return {
                ...state,
                segment: [
                    ...state.segment.slice(0, index),
                    {
                        ...state.segment[index],
                        dim_low_endtime: action.endTime
                    },
                    ...state.segment.slice(index + 1)
                ]
            };
        case 'ALERTS_LOADING':
            return {
                ...state,
                alertLoading: true,
            };
        case 'GET_ALERTS':
            console.log('reducer', action.payload);
            return {
                ...state,
                alertColumns: action.payload.columns,
                alerts: action.payload.data,
                alertTitle: action.payload.title,
                alertLoading: false,
            };
        default:
            return state;
    }
}
export default streetLightReducer;