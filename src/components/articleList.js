/**
*Here we are pass and rendering our data
*/
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {articleFetchData} from '../actions/article'


class ArticleList extends Component {
    constructor(props) {
      super(props);
      this.state = {hide: true}
  }

  ShowHide(e) {
      e.preventDefault();
      var hide=this.state.hide;
      this.setState({hide: !hide});                       
  }  

  /**
  *Found some open json for test is app correctly render article
  */

  componentDidMount() {
    this.props.fetchData('http://test1.levin.personal.kg.sibers.com/api.php/messages/list');
    //this.props.fetchData('http://5826ed963900d612000138bd.mockapi.io/items');
}

renderList() {
    var hide=this.state.hide;
    return this.props.article.map((article) => {
        return (
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
            );
    });
}

/**
*If errror happens
*/

render() {
    console.log(this);
    if (this.props.hasErrored) {
        return <p>Ошибка при загрузке</p>;
    }

    if (this.props.isLoading) {
        return <p>Загрузка…</p>;
    }
    return (
        <div>
        {this.renderList()}
        </div>
        );
}

}

const mapStateToProps = (state) => {
    return {
        article: state.article
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (url) => dispatch(articleFetchData(url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ArticleList);