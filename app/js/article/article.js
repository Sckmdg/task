/**
 * This is single object
 * @this - Article props.data(info, message, .. etc)
 */
import React from 'react';
import ReactDOM from 'react-dom';
export default class Article extends React.Component{    
  render() {
    var info = this.props.data.info,
    message = this.props.data.message,
    id = this.props.data.id,
    date= this.props.data.date;
    return (
    <div className='article'>
        <div className="number col-md-1">{parseInt(id)}</div>
        <div className="date col-md-3">{date}</div>
        <div className="info col-md-3">{info}</div>
        <div className="message col-md-5">{message}</div>
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