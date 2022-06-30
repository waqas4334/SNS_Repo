const initState = {
    socket : null,
}

const socketReducer  = (state = initState , actions) => {

    switch(actions.type) {
        case 'SOCKET' :
        return {
            ...state,
            socket : actions.payload
        }
        default : 
        return {
            ...state
        } 
    }
}

export default socketReducer;