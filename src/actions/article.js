/**
*Creating actions on different results of fetching data
*/

export function articleHasErrored(bool) {
	return {
		type: 'ARTICLE_HAS_ERRORED',
		hasErrored: bool
	};
}

export function articleIsLoading(bool) {
	return {
		type: 'ARTICLE_IS_LOADING',
		isLoading: bool
	};
}

export function articleFetchDataSuccess(article) {
	return {
		type: 'ARTICLE_FETCH_DATA_SUCCESS',
		article
	};
}

/**
*Configure fetch
*/

var myInit = { 
	method: "GET",
	headers: {
		"Content-Type": "application/json"
	}
};

export function articleFetchData(url) {
	return (dispatch) => {
		dispatch(articleIsLoading(true));

		fetch(url, myInit)
		.then((response) => {
			if (!response.ok) {
				throw Error(response.statusText);
			}

			dispatch(articleIsLoading(false));

			return response;
		})
		.then((response) => response.json())
		.then((article) => dispatch(articleFetchDataSuccess(article)))
		.catch(() => dispatch(articleHasErrored(true)));
	};
}
