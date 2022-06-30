import { 
    GET_ERRORS,   
    CLEAR_ERRORS,

} from "../actions/types";

const initState = {
    message : {},
    status : null,
    id : null
}

const errorReducer = (state = initState , action) => {
    switch(action.type) {
        case GET_ERRORS :
            return {
                ...state,
                message : action.payload.message,
                status : action.payload.status,
                id : action.payload.id
            }
        case CLEAR_ERRORS :
            return {
                ...state,
                message : {},
                status : null,
                id : null,
            }  
            
        default :
            return state;
    }
}

export default errorReducer