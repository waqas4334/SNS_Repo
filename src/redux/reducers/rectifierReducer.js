const initState = {
    module: [],
    moduleLoading: false,
    logs: [],
    logsLoading: false,
    charts: [],
    chartsLoading: false,
    alerts: [],
    alertLoading: false,
    alertColumns: [],
    alertTitle: '',
}

const moduleReducer = (state = initState, action) => {
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
        case 'UPDATE_INPUT_VOLTAGE_LOWER_THRESHOLD':
            // console.log('reducer',action.id)
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                if (index === -1) {
                    return state
                }
                
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                ac_lowerthreshold: action.payload.ac_lowerthreshold
                            },
                            ...state.module.slice(index + 1)

                        ]

                    };
                
            }
            
                return state
            
        case 'UPDATE_INPUT_VOLTAGE_UPPER_THRESHOLD':         
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                if (index === -1) {
                    return state
                }
                
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                ac_upperthreshold: action.payload.ac_upperthreshold
                            },
                            ...state.module.slice(index + 1)

                        ]

                    };
                
            }
            
                return state
            
        case 'UPDATE_OUTPUT_VOLTAGE_LOWER_THRESHOLD':
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                if (index === -1) {
                    return state;
                } 
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                rec_lowerthreshold: action.payload.rec_lowerthreshold
                            },
                            ...state.module.slice(index + 1)

                        ]

                    };
                
            }
            
                return state
            
        case 'UPDATE_OUTPUT_VOLTAGE_UPPER_THRESHOLD':
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                if (index === -1) {
                    return state;
                } 
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                rec_upperthreshold: action.payload.rec_upperthreshold
                            },
                            ...state.module.slice(index + 1)

                        ]

                    };
                
            }
            
                return state
            
        case 'UPDATE_BATTERY_THEFT_THRESHOLD':
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                if (index === -1) {
                    return state;
                } 
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                battery_theftThreshold: action.payload.battery_theftThreshold
                            },
                            ...state.module.slice(index + 1)

                        ]

                    };
                
            }
            
                return state
            
        case 'UPDATE_LOW_BATTERY_THRESHOLD':
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                if (index === -1) {
                    return state;
                } 
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                battery_lowBatteryAlertThreshold: action.payload.battery_lowBatteryAlertThreshold
                            },
                            ...state.module.slice(index + 1)

                        ]

                    };
                
            }
            
                return state
            
        case 'UPDATE_MAX_BATTERY_THRESHOLD':
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                if (index === -1) {
                    return state;
                } 
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                battery_maxVolageValue: action.payload.battery_maxVolageValue
                            },
                            ...state.module.slice(index + 1)

                        ]

                    };
                
            }
            
                return state
            
        case 'UPDATE_INPUT_POWER_STATUS':
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                if (index === -1) {
                    return state;
                } 
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                ac_status: action.payload.ac_status
                            },
                            ...state.module.slice(index + 1)
                        ]
                    };
                
            }
            
                return state
            
        case 'UPDATE_INPUT_VOLTAGE':
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                console.log('reducer',index)
                if (index === -1) {
                    return state;
                } 
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                ac_inputVoltage: action.payload.ac_inputVoltage
                            },
                            ...state.module.slice(index + 1)
                        ]
                    };
                
            }
            
                return state
            
        case 'UPDATE_RECTIFICATION_STATUS':
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                if (index === -1) {
                    return state;
                } 
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                rec_status: action.payload.rec_status
                            },
                            ...state.module.slice(index + 1)
                        ]
                    };
                
            }
            
                return state
            
        case 'UPDATE_OUTPUT_DC_VOLTAGE':
            // console.log('reducer', action.payload)
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                console.log('index', index)
                if (index === -1) {
                    return state;
                } 
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                rec_outputDcVoltage: action.payload
                            },
                            ...state.module.slice(index + 1)
                        ]
                    };
                
            }
            
                return state
            
        case 'UPDATE_BATTERY_BANK_CONNECTION':
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                if (index === -1) {
                    return state;
                } 
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                battery_status: action.payload.battery_status
                            },
                            ...state.module.slice(index + 1)
                        ]
                    };
                
            }
            
                return state
            
        case 'UPDATE_BANK_BATTERY_STATUS':
            if (state.module.length > 0) {
                index = state.module.findIndex((f) => f._id === action.id);
                if (index === -1) {
                    return state;
                } 
                    return {
                        ...state,
                        module: [
                            ...state.module.slice(0, index),
                            {
                                ...state.module[index],
                                battery_voltagePercentage: action.payload.battery_voltagePercentage,
                                battery_voltage: action.payload.battery_voltage
                            },
                            ...state.module.slice(index + 1)
                        ]
                    };
                
            }
            
                return state
            
        case 'LOGS_LOADING':
            return {
                ...state,
                logsLoading: true
            }
        case 'LOGS_DATA':
            // console.log('reducerrr', action.payload)
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
            // console.log('reducer', action.payload);
            return {
                ...state,
                alertColumns: action.payload.columns,
                alerts: action.payload,
                alertTitle: action.payload.title,
                alertLoading: false,
            };
        default:
            return state;
    }
}
export default moduleReducer;