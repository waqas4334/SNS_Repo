const initState = {
    module: [],
    moduleLoading: false,
    logs: [],
    logsLoading: false,
    charts: [],
    chartsLoading: false,
    alerts:[],
    alertLoading:false,
    alertColumns: [],
    alertTitle: '',
}

const securityReducer = (state = initState, action) => {
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
        case 'UPDATE_ALARM':
            console.log('reducer', action.payload.alarm)
            index = state.module.findIndex(s => s._id === action.payload.security_id)
            console.log(index, 'index')
            return {
                ...state,
                module: [...state.module.slice(0, index),

                {
                    ...state.module[index],
                    alarm: action.payload.alarm
                },
                // console.log('statee',module),
                ...state.module.slice(index + 1),
                ]
            }
        case 'UPDATE_DOOR_STATUS':
            index = state.module.findIndex(s => s._id === action.id)
            console.log(index, 'index')
            return {
                ...state,
                module: [...state.module.slice(0, index),
                {
                    ...state.module[index],
                    door_status: action.payload
                },
                ...state.module.slice(index + 1),
                ],
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
export default securityReducer;