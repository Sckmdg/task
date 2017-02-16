import { initialState } from '../actions/test'
// const loadData = {
// 	id: initialState.id+1,
// 	info: 'Jack',
// 	message: 'hi',
// 	date: '2017.02.16'
// }
// const eraseData = {
// 	id: initialState.id,
// 	info: initialState.info,
// 	message: initialState.message,
// 	date: initialState.date
// }

export function loadData(state = false, action) {
    switch (action.type) {
        case 'LOAD_DATA':
            return action.loadData;

        default:
            return state;
    }
}

export function eraseData(state = false, action) {
    switch (action.type) {
        case 'ERASE_DATA':
            return action.eraseData;

        default:
            return state;
    }
}

export function test(state = initialState, action) {
	switch (action.type) {
		case 'INITIAL_STATE':
		return action.initialState;
	// 	case 'LOAD_DATA':
 //      return [//state = loadData.state
 //      {
	// id: loadData.id,
	// info: loadData.info,
	// message: loadData.message,
	// date: loadData.date
 //      },
 //      ...state
 //      ]
 //      case 'ERASE_DATA':
 //      return [//state = eraseData.state
 //      {
	// id:eraseData.id,
	// info:eraseData.info,
	// message:eraseData.message,
	// date:eraseData.date
 //      },
 //      ...state
 //      ]
      default:
      return state
  }
}
