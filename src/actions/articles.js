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

export function articlesLoadDataSuccess(articles) {
    return {
        type: 'ARTICLES_LOAD_DATA_SUCCESS',
        articles
    };
}

export function articlesLoadData() { //Ахтунг => Тоже додумать и перепилить, не годится к черту
    return (dispatch) => {
        dispatch(articlesIsLoading(true))
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