export function getData(data) {
	return (dispatch) => {
		dispatch({
			type: 'GET_DATA',
			payload: data
		})
	}
}