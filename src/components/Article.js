import React, { PropTypes, Component } from 'react' 
import { connect } from 'react-redux'

class Article extends Component {
	render() {
		return (
		<div className='article'>
			<div className="number col-md-1">{this.props.data.id}</div>
			<div className="date col-md-2">{this.props.data.date}</div>
			<div className="info col-md-3">{this.props.data.info}</div>
			<div className="message col-md-3">{this.props.data.message}</div>
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
	data: React.PropTypes.shape({                               
		info: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired
	})
}
function mapStateToProps (state) {
	return {
		article: state.article
	}
}
export default connect(mapStateToProps)(Article)
