import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Recalls from '../components/Recalls'
import Form from '../components/Form'
import Refresh from '../components/Refresh'
import * as getData from '../actions/GetData'

class App extends Component {

	render() {
		const { article } = this.props
		const { getData } = this.props.getData
		return (
			<div className='app'>
			<Recalls name={article.id} />
			<Refresh getData={getData}/>
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

function mapDispatchToProps(dispatch) {
	return {
		getData: bindActionCreators(getData, dispatch)
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
