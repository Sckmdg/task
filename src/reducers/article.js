export function articleHasErrored(state = false, action) {
    switch (action.type) {
        case 'ARTICLE_HAS_ERRORED':
            return action.hasErrored;

        default:
            return state;
    }
}

export function articleIsLoading(state = false, action) {
    switch (action.type) {
        case 'ARTICLE_IS_LOADING':
            return action.isLoading;

        default:
            return state;
    }
}

export function article(state = [], action) {
    switch (action.type) {
        case 'ARTICLE_FETCH_DATA_SUCCESS':
            return action.article;

        default:
            return state;
    }
}


// const initialState = 
// [
// {
//     id: 1,
//     info: 'Rus',
//     date: '1995-05-11',
//     message: 'Fuck This SHITWEQWEWQEWQE'
// },
// {
//     id: 2,
//     info: 'Rust',
//     date: '1995-05-11',
//     message: 'FucwEQWEWQEWQE'
// }
// ]
// export default function article(state = initialState) {
//     return state
// }