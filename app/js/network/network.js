import React from 'react';
import ReactDOM from 'react-dom';
import Article from '../article/article'
import Recalls from '../article/recalls'
import LoadData from './loadData'
export default class Network extends React.Component{   

  /**
  *Initial state of our form values - empty
  */  

  constructor(props) {
    super(props);
    this.state = { 
      infoIsEmpty: true,
      dateIsEmpty: true,
      messageIsEmpty: true
    }
  }

componentDidMount() {                              
  ReactDOM.findDOMNode(this.refs.info).focus();          
}

/**
*Item - is single article that we will send to server
*/  

onBtnClickHandler(e) {                             
  e.preventDefault();
  var messageCase = ReactDOM.findDOMNode(this.refs.message); 
  var infoCase = ReactDOM.findDOMNode(this.refs.info);
  var dateCase = ReactDOM.findDOMNode(this.refs.date);
  var message = messageCase.value;                          
  var info = infoCase.value;
  var date= dateCase.value;

var item = {                                          
  message: message,
  info: info,
  date: date
};

$.ajax({
  url: "http://test1.levin.personal.kg.sibers.com/api.php/messages",
  type: "GET",
  data: item,
  dataType: "jsonp",
  crossDomain: true,
  jsonp: "callback",
  succes: (data) => {
    console.log("succes");
  },
  error: (result, status, error) => {
    console.log(status + "; " + error);
    console.log(result);
  }
});

/**
*Creating event Recalls.add with property Item
*/    

window.ee.emit('Recalls.add', item);  
messageCase.value = '';            
infoCase.value = '';
dateCase.value = '';
this.setState({messageIsEmpty: true});
this.setState({infoIsEmpty: true});
}

/**
*Checking our field if she void or not
*/ 

onFieldChange (fieldName, e) {   
  if (e.target.value.trim().length) {
    this.setState({['' +fieldName]: false})
  } else {
    this.setState({['' +fieldName]: true})
  }
}

render() {
  var infoIsEmpty = this.state.infoIsEmpty,
  dateIsEmpty = this.state.dateIsEmpty,
  messageIsEmpty = this.state.messageIsEmpty;
  return (
    <form className='add cf col-md-12 topDown'>
      <span className='col-md-12 topDown'>
        <input
        type='text'
        className='addinfo col-md-2'
        onChange={this.onFieldChange.bind(this, 'infoIsEmpty')}
        placeholder='Ваше ФИО'
        ref='info'/>
      </span>

      <span className='col-md-12 topDown'>
        <input type="text"
        type='date'
        className='adddatecol-md-2'
        onChange={this.onFieldChange.bind(this, 'dateIsEmpty')}
        placeholder='Введите дату'
        ref='date'/>
      </span>

      <span className='col-md-12 topDown'>
        <textarea
        className='addmessage col-md-2'
        rows="4"
        onChange={this.onFieldChange.bind(this, 'messageIsEmpty')}
        placeholder='Ваш отзыв'
        ref='message'>
        </textarea>
      </span>

      <span className='col-md-12 topDown'>
        <button
        type="button"
        className='addBtn btn btn-success'
        onClick={this.onBtnClickHandler.bind(this)}
        disabled={infoIsEmpty || messageIsEmpty || dateIsEmpty}>
        Добавить отзыв
        </button>
      </span>
    </form>
    );
}
}