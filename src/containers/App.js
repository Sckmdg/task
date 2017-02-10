import React, { Component } from 'react'
import { connect } from 'react-redux'
import Recalls from '../components/Recalls'

class App extends Component {
	render() {
		const { article } = this.props
		return (
			<Recalls name={article.id} />
			)
	}
}

function mapStateToProps (state) {
	return {
		article: state.article
	}
}

export default connect(mapStateToProps)(App)
