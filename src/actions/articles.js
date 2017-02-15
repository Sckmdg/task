export function articlesHasErrored(bool) {
    return {
        type: 'ARTICLES_HAS_ERRORED',
        hasErrored: bool
    };
}

export function articlesIsLoading(bool) {
    return {
        type: 'ARTICLES_IS_LOADING',
        isLoading: bool
    };
}

export function articlesLoadDataSuccess(items) {
    return {
        type: 'ARTICLES_LOAD_DATA_SUCCESS',
        items
    };
}

export function articlesLoadData(url) {
    return (dispatch) => {
        dispatch(articlesIsLoading(true));

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw Error(response.statusText);
                }

                dispatch(articlesIsLoading(false));

                return response;
            })
            .then((response) => response.json())
            .then((articles) => dispatch(articlesLoadDataSuccess(articles)))
            .catch(() => dispatch(articlesHasErrored(true)));
    };
}
