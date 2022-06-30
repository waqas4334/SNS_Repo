const initState = {
    notifications : [],
    count : 0
}

const notificationReducer  = (state = initState , actions) => {

    switch(actions.type) {
        case 'ADD_NOTIFICATION' :
            return {
                ...state,
                notifications : [actions.payload, ...state.notifications],
                count : state.count + 1
            }
        case 'CLEAR_NOTIFICATIONS' : 
            return {
                ...state,
                notifications : [],
                count : 0
            }
            default : 
            return state;    
            
    }
}

export default notificationReducer;