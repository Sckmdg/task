import React from 'react';
import ReactDOM from 'react-dom';
var Article = React.createClass({            
  propTypes: {                               
    data: React.PropTypes.shape({
      info: React.PropTypes.string.isRequired,
      message: React.PropTypes.string.isRequired,
      id: React.PropTypes.number.isRequired,
      date: React.PropTypes.string.isRequired,
    })
  },
  render: function() {
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
      )
  }
});