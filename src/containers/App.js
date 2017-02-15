import React, { Component } from 'react'
import Form from '../components/Form'
import { connect } from 'react-redux'
import { articlesLoadData } from '../actions/articles';
import ArticleList from '../components/ArticleList'

class App extends Component {
	render() {
		return (
			<div className='app'>
			<ArticleList />
			<Form />
			</div>
			)
	}
}

function mapStateToProps (state) {
	return {
		articles: state.articles,
		hasErrored: state.articlesHasErrored,
		isLoading: state.articlesIsLoading
	}
}

const mapDispatchToProps = (dispatch) => {
    return {
        LoadData: (data) => dispatch(articlesLoadData(data))
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(App)