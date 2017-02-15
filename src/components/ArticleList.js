import React, { Component, PropTypes } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import { articlesLoadData } from '../actions/articles';
class ArticleList extends Component {
	constructor(props) {
		super(props);
		this.state = 
		{
			hide: true, 
			articles: []
		};
	}

	ShowHide(e){
		e.preventDefault();
		var hide=this.state.hide;
		this.setState({hide: !hide});   
	}

	componentDidMount() {
		$.ajax({
			crossDomain: true,
			type: "GET",
			data: {format: "jsonp"},
			url: "http://test1.levin.personal.kg.sibers.com/api.php/messages/list",
			jsonp: "callback",
			dataType: "jsonp",
			success: (data) => {
				this.setState({articles: data});
			},
			error:(result, status, error) => {
				console.log(status + "; " + error);
				console.log(result);
			}
		});
	}

	render() {
		// var info = this.props.data.info,
		// message = this.props.data.message,
		// id = this.props.data.id,
		// date= this.props.data.date;	
		var hide=this.state.hide;
		
		if (this.props.hasErrored) {
			return <p>Ошибка во время загрузки</p>;
		}

		if (this.props.isLoading) {
			return <p>Загрузка…</p>;
		}
		
		return (
			<div className='Recalls'>
			{this.state.articles.map((article) => (
				<div className='article' key={article.id}>
				<div className="number col-md-1">{parseInt(article.id)}</div>
				<div className="date col-md-2">{article.date}</div>
				<div className="info col-md-3">{article.info}</div>
				<div className="message col-md-3">{article.message}</div>
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
				))}
		</div>
		);
}
}

ArticleList.propTypes = {
	hasErrored: PropTypes.bool.isRequired,
	isLoading: PropTypes.bool.isRequired,
	data: React.PropTypes.shape({                               
		info: PropTypes.string.isRequired,
		message: PropTypes.string.isRequired,
		id: PropTypes.string.isRequired,
		date: PropTypes.string.isRequired
	})
};

// const mapStateToProps = (state) => {
// 	return {
// 		articles: state.articles,
// 		hasErrored: state.articlesHasErrored,
// 		isLoading: state.articlesIsLoading
// 	};
// };

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

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);