import { combineReducers } from 'redux';
import { articles, articlesHasErrored, articlesIsLoading } from './articles';
import { test, loadData, eraseData } from './test'

export default combineReducers({
	test,
	loadData,
	eraseData,
	articles,
	articlesHasErrored,
	articlesIsLoading
});
