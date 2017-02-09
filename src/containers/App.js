import React, { Component } from 'react'
import { connect } from 'react-redux'
import Article from '../components/Article'

class App extends Component {
	render() {
		const { article } = this.props
		return (
			<Article name={article.id} />
			)
	}
}

function mapStateToProps (state) {
	return {
		article: state.article
	}
}

export default connect(mapStateToProps)(App)
