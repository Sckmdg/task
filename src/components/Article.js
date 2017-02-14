import React, { PropTypes, Component } from 'react' 
import { connect } from 'react-redux'

class Article extends Component {
	constructor(props) {
		super(props);
		this.state = {hide: true}
	}

	ShowHide(e){
		e.preventDefault();
		var hide=this.state.hide;
		this.setState({hide: !hide});   
	}
	render() {
		var hide=this.state.hide;
		return (
		<div className='article'>
			<div className="number col-md-1">{this.props.data.id}</div>
			<div className="date col-md-2">{this.props.data.date}</div>
			<div className="info col-md-3">{this.props.data.info}</div>
			<div className="message col-md-3">{this.props.data.message}</div>
			<div className="remove col-md-3">
			<button type="button" className= {"btn btn-danger " + ((hide == false) ? "hidden" : "show")} onClick={this.ShowHide.bind(this)}>
			Удалить
			</button>
			<span className={"choose "+ ((hide == true) ? "hidden" : "show")}>
			<p>Вы точно хотите удалить отзыв?
			<button type="submit" className="btn btn-success btn-xs col-md-offset-1" onClick={this.ShowHide.bind(this)}>Удалить</button>
			<button type="button" className="btn btn-danger btn-xs col-md-offset-1" onClick={this.ShowHide.bind(this)}>Отмена</button>
			</p>   
			</span>
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




// import React, { PropTypes, Component } from 'react' 
// import { connect } from 'react-redux'
// import { articlesFetchData } from '../actions/Articles';

// class Article extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {hide: true}
// 	}

// 	ShowHide(e){
// 		e.preventDefault();
// 		var hide=this.state.hide;
// 		this.setState({hide: !hide});   
// 	}

// 	componentDidMount() {
// 		this.props.fetchData('http://test1.levin.personal.kg.sibers.com/api.php/messages/list');
// 	}
// 	render() {
// 		var hide=this.state.hide;

// 		if (this.props.hasErrored){
// 			return <p>Не загрузилось</p>;
// 		}
// 		if (this.props.isLoading) {
// 			return <p>Загружаем</p>;
// 		}
// 		return (
// 			<div className='article'>
// 			<div className="number col-md-1">{this.props.data.id}</div>
// 			<div className="date col-md-2">{this.props.data.date}</div>
// 			<div className="info col-md-3">{this.props.data.info}</div>
// 			<div className="message col-md-3">{this.props.data.message}</div>
// 			<div className="remove col-md-3">
// 			<button type="button" className= {"btn btn-danger " + ((hide == false) ? "hidden" : "show")} onClick={this.ShowHide.bind(this)}>
// 			Удалить
// 			</button>
// 			<span className={"choose "+ ((hide == true) ? "hidden" : "show")}>
// 			<p>Вы точно хотите удалить отзыв?
// 			<button type="submit" className="btn btn-success btn-xs col-md-offset-1" onClick={this.ShowHide.bind(this)}>Удалить</button>
// 			<button type="button" className="btn btn-danger btn-xs col-md-offset-1" onClick={this.ShowHide.bind(this)}>Отмена</button>
// 			</p>   
// 			</span>
// 			</div>
// 			</div>
// 			)
// 	}
// }

// Article.propTypes = {
// 	data: React.PropTypes.shape({                               
// 		info: PropTypes.string.isRequired,
// 		message: PropTypes.string.isRequired,
// 		id: PropTypes.string.isRequired,
// 		date: PropTypes.string.isRequired
// 	})
// }
// function mapStateToProps (state) {
// 	return {
// 		article: state.articles,
// 		hasErrored: state.articlesHasErrored,
// 		isLoading: state.articlesIsLoading
// 	}
// }
// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		fetchData: (url) => dispatch(itemsFetchData(url))
// 	};
// };
// export default connect(mapStateToProps, mapDispatchToProps)(Article)

