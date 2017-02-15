import React, { Component } from 'react'
import Form from '../components/Form'
import { connect } from 'react-redux'
import ArticleList from '../components/ArticleList'

class App extends Component {
	render() {
		//const { article } = this.props
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
		article: state.article
	}
}

export default connect(mapStateToProps)(App)