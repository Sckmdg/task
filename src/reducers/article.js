const initialState =
[
{
	id: '1',
	info: 'Rus',
	date: '1995-05-11',
	message: 'Fuck This SHITWEQWEWQEWQE'
},
{
	id: '2',
	info: 'Rust',
	date: '1995-05-11',
	message: 'FucwEQWEWQEWQE'
}
];

export default function article(state = initialState, action) {
	// switch (action.type) {
	// 	case 'GET_DATA':
	// 	return { ...state, data: action.payload }

	// 	default:
	// 	return state;
	// }
	if (action.type === 'GET_DATA'){
		var newState = state.concat([action.data]);
		return newState;
	}
	return state;
}




// export function articlesHasErrored(state = false, action) {
//     switch (action.type) {
//         case 'ITEMS_HAS_ERRORED':
//             return action.hasErrored;

//         default:
//             return state;
//     }
// }

// export function articlesIsLoading(state = false, action) {
//     switch (action.type) {
//         case 'ITEMS_IS_LOADING':
//             return action.isLoading;

//         default:
//             return state;
//     }
// }

// export function articles(state = [], action) {
//     switch (action.type) {
//         case 'ITEMS_FETCH_DATA_SUCCESS':
//             return action.article;

//         default:
//             return state;
//     }
// }
