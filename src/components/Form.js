import React, { Component } from 'react' 

export default class Form extends Component {
	constructor(props) {
		super(props);
		this.state = { 
			infoIsEmpty: true,
			dateIsEmpty: true,
			messageIsEmpty: true
		}
	}

	// componentDidMount() {                              
	// 	ReactDOM.findDOMNode(this.refs.info).focus();          
	// }

	render() {
		return (
			<form className='add cf col-md-12 topDown'>
			<span className='col-md-12 topDown'>
			<input
			type='text'
			className='addinfo col-md-2'
			placeholder='Ваше ФИО'
			ref='info'/>
			</span>

			<span className='col-md-12 topDown'>
			<input type="text"
			type='date'
			className='adddatecol-md-2'
			placeholder='Введите дату'
			ref='date'/>
			</span>

			<span className='col-md-12 topDown'>
			<textarea
			className='addmessage col-md-2'
			rows="4"
			placeholder='Ваш отзыв'
			ref='message'>
			</textarea>
			</span>
			<span className='col-md-12 topDown'>
			<button
			type="button"
			className='addBtn btn btn-success'>
			Добавить отзыв
			</button>
			</span>

			</form>
			);
	}
}

