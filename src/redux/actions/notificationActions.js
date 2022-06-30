export const addNotification = (data) => async (dispatch, getState) => {
console.log(data , 'NOTIFICATION ACTION ')
    dispatch({
        type: 'ADD_NOTIFICATION',
        payload: data
        
    })
}

export const clearNotifications = () => async (dispatch, getState) => {
    dispatch({
        type: 'CLEAR_NOTIFICATIONS'
    })
}