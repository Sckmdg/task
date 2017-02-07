/**
* This is single object
* @this - Article props.data(info, message, .. etc)
*/
import React from 'react';
import ReactDOM from 'react-dom';
export default class Article extends React.Component{ 
    constructor(props) {
      super(props);
this.state = {hide: true}
}

ShowHide(e) {
    e.preventDefault();
    var hide=this.state.hide;
    this.setState({hide: !hide});                       
}   

Delete(e){
    e.preventDefault();
    this.setState({hide: !hide});
var hide = this.state.hide;
var sendObject = {                                          
  id: this.props.data.id
};
$.ajax({
  url: "http://test1.levin.personal.kg.sibers.com/api.php/messages/remove",
  type: "GET",
  data: sendObject,
  dataType: "jsonp",
  crossDomain: true,
  jsonp: "callback",
  succes: (data) => {
  },
  error: (result, status, error) => {
    console.log(status + "; " + error);
    console.log(result);
}
});
window.ee.emit('Delete.add');  
}

render() {
    var info = this.props.data.info,
    message = this.props.data.message,
    id = this.props.data.id,
    date= this.props.data.date,
    hide=this.state.hide;
    return (
    <div className='article'>
    <div className="number col-md-1">{parseInt(id)}</div>
    <div className="date col-md-2">{date}</div>
    <div className="info col-md-3">{info}</div>
    <div className="message col-md-3">{message}</div>
    <div className="remove col-md-3">
    <button type="button" className= {"btn btn-danger " + ((hide == false) ? "hidden" : "show")} onClick={this.ShowHide.bind(this)}>
    Удалить
    </button>
    <span className={"choose "+ ((hide == true) ? "hidden" : "show")}>
    <p>Вы точно хотите удалить отзыв?
    <button type="submit" className="btn btn-success btn-xs col-md-offset-1" onClick={this.Delete.bind(this)}>Удалить</button>
    <button type="button" className="btn btn-danger btn-xs col-md-offset-1" onClick={this.ShowHide.bind(this)}>Отмена</button>
    </p>   
    </span>
    </div>
    </div>
    );
}
}
Article.propTypes = {                               
    data: React.PropTypes.shape({
        info: React.PropTypes.string.isRequired,
        message: React.PropTypes.string.isRequired,
        id: React.PropTypes.string.isRequired,
        date: React.PropTypes.string.isRequired,
    })
}