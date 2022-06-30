const initState = {
    module: [],
    moduleLoading: false,
    logs: [],
    logsLoading: false,
    charts: [],
    chartsLoading: false,
    thresholdLoading: false,
    upperThresholdLoading: false,
    humidityLowerThresholdLoading: false,
    humidityUpperThresholdLoading: false,
    alerts: [],
    alertLoading: false,
    alertColumns: [],
    alertTitle: '',
}

const humidityTemperatureReducer = (state = initState, action) => {
    switch (action.type) {
        case 'MODULE_LOADING':
            return {
                ...state,
                moduleLoading: true
            }
        case 'GET_MODULE':
            return {
                ...state,
                module: action.payload,
                moduleLoading: false
            }
        case 'UPDATE_CURRENT_HUMIDITY':
            // console.log('reducer',action.payload)
            index = state.module.findIndex(s => s._id === action.payload.humidity_id)
            console.log(index, 'index')
            return {
                ...state,
                module: [...state.module.slice(0, index),
                {
                    ...state.module[index],
                    currentHumidity: action.payload.humidity
                },
                ...state.module.slice(index + 1),
                ]
            }
        case 'UPDATE_CURRENT_TEMPERATURE':
            // console.log('reducer',action.payload)
            index = state.module.findIndex(s => s._id === action.payload.humidity_id)
            return {
                ...state,
                module: [...state.module.slice(0, index),
                {
                    ...state.module[index],
                    currentTemp: action.payload.temperature
                },
                ...state.module.slice(index + 1),
                ]
            }
        case 'TEMPERATURE_LOWER_THRESHOLD_LOADING':
            return {
                ...state,
                thresholdLoading: true
            }
        case 'UPDATE_TEMPERATURE_LOWER_THRESHOLD':
            // console.log('reducer',action.payload)
            index = state.module.findIndex(s => s._id === action.payload.humidity_id)
            return {
                ...state,
                module: [...state.module.slice(0, index),
                {
                    ...state.module[index],
                    threshold: action.payload.lt
                },
                ...state.module.slice(index + 1),
                ]
            }
        case 'TEMPERATURE_UPPER_THRESHOLD_LOADING':
            return {
                ...state,
                upperThresholdLoading: true
            }
        case 'UPDATE_TEMPERATURE_UPPER_THRESHOLD':
            // console.log('reducer',action.payload)
            index = state.module.findIndex(s => s._id === action.payload.humidity_id)
            return {
                ...state,
                module: [...state.module.slice(0, index),
                {
                    ...state.module[index],
                    upperThreshold: action.payload.ut
                },
                ...state.module.slice(index + 1),
                ]
            }

        case 'HUMIDITY_LOWER_THRESHOLD_LOADING':
            return {
                ...state,
                humidityLowerThresholdLoading: true
            }
        case 'UPDATE_HUMIDITY_LOWER_THRESHOLD':
            // console.log('reducer',action.payload)
            index = state.module.findIndex(s => s._id === action.payload.humidity_id)
            return {
                ...state,
                module: [...state.module.slice(0, index),
                {
                    ...state.module[index],
                    humidity_threshold: action.payload.hlt
                },
                ...state.module.slice(index + 1),
                ]
            }

        case 'HUMIDITY_UPPER_THRESHOLD_LOADING':
            return {
                ...state,
                humidityUpperThresholdLoading: true
            }
        case 'UPDATE_HUMIDITY_UPPER_THRESHOLD':
            // console.log('reducer',action.payload)
            index = state.module.findIndex(s => s._id === action.payload.humidity_id)
            return {
                ...state,
                module: [...state.module.slice(0, index),
                {
                    ...state.module[index],
                    humidity_upperThreshold: action.payload.hut
                },
                ...state.module.slice(index + 1),
                ]
            }
        case 'LOGS_LOADING':
            return {
                ...state,
                logsLoading: true
            }
        case 'LOGS_DATA':
            return {
                ...state,
                logs: action.payload,
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
export default humidityTemperatureReducer;