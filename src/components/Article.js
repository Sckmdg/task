import React, { PropTypes, Component } from 'react'

export default class Article extends Component {
	render() {
		const { info, message, id, date } = this.props;
		console.log(this.props);
		return (
		<div className='article'>
			<div className="number col-md-1">{id}</div>
			<div className="date col-md-2">{date}</div>
			<div className="info col-md-3">{info}</div>
			<div className="message col-md-3">{message}</div>
			<div className="remove col-md-3">
			<button type="button" className= "btn btn-danger">
			Удалить
			</button>
			</div>
		</div>
	)
	}
}

Article.propTypes = {                               
		info: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired,
}