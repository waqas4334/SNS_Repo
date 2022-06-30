import { 
    CLEAR_ERRORS,
    GET_ERRORS,
    CLEAR_REG
} from "./types";

export const returnErrors = (message, status, id = null) => {
    return {
        type : GET_ERRORS,
        payload : {
            message,
            status,
            id
        }
        
    };
};
export const clearReg = () => {
    return {
        type : CLEAR_REG
    };
};
export const clearErrors = () => {
    return {
        type : CLEAR_ERRORS
    };
};

export const clearMessage = () => {
    return (dispatch,getState) => {
        
        dispatch({
            type: 'CLEAR_MESSAGE'
        })
    };
};