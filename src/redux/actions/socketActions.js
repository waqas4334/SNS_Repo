export const socketConnect = (data) => async (dispatch, getState) => {
    dispatch({
        type: 'SOCKET',
        payload: data
    })
}