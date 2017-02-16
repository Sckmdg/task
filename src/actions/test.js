export function loadData(bool) {
    return {
        type: 'LOAD_DATA',
        hasErrored: bool
    };
}

export function eraseData(bool) {
    return (dispatch) => {
        dispatch({
            type: 'ERASE_DATA',
            isLoading: bool
        })
    };
}

export const initialState = {
    id: 0,
    info: 'anonymous',
    message: 'nothing to say',
    date: '0000.00.00'
}