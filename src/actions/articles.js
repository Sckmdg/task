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