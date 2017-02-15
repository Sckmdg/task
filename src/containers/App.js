import React, { Component } from 'react'
import Form from '../components/Form'
import ArticleList from '../components/ArticleList'


export default class App extends Component {

	render() {
		return (
			<div className='app'>
			<ArticleList />
			<Form />
			</div>
			)
	}
}
