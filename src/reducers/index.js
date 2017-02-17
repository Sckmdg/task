import { combineReducers } from 'redux'
import { article, articleHasErrored, articleIsLoading} from './article'

export default combineReducers({
	article,
	articleHasErrored,
	articleIsLoading
})