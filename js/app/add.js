/**
*Создаем App начальные свойства которой говорят что данные для ввода пустые
*/
import React from '../react/react.js';
import ReactDOM from '../react/react-dom.js';
export default class Add extends React.Component {
var Add = React.createClass({                        
  getInitialState: function() { 
    console.log("something");
    return {
      infoIsEmpty: true,
      dateIsEmpty: true,
      messageIsEmpty: true
    };
  },
/**
*Компонент примонтировался
*и здесь мы фокусим refs на info
*/
componentDidMount: function() {                              
  ReactDOM.findDOMNode(this.refs.info).focus();              
},
/**
*Создаем функцию используя переменную e из EventEmitter
*Case нужен для очистки формы ввода после добавления
*/
onBtnClickHandler: function(e) {                             
  e.preventDefault();
  var messageCase = ReactDOM.findDOMNode(this.refs.message); 
  var infoCase = ReactDOM.findDOMNode(this.refs.info);
  var dateCase = ReactDOM.findDOMNode(this.refs.date);
  var message = messageCase.value;                          
  var info = infoCase.value;
  var date= dateCase.value;
/**
*Добавлять запись будем как раз через item
*/
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
  succes: function(data){
    console.log("succes");
    /*
    *Сюда подключить выполнение loadDate.js!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    */
  },
  error:function(result, status, error){
    console.log(status + "; " + error);
    console.log(result);
  }
});
/**
*Генерирует событие Recalls.add и в качетсве свойства дает item
*Опустошаем поля ввода
*/
window.ee.emit('Recalls.add', item);  
messageCase.value = '';            
infoCase.value = '';
dateCase.value = '';
this.setState({messageIsEmpty: true});
this.setState({infoIsEmpty: true});
},
/**
*Проверяет если поля пустые или ничего не ввели(включая пробел)
*кнопка дизейблится
*/
onFieldChange: function(fieldName, e) {   
  if (e.target.value.trim().length) {
    this.setState({['' +fieldName]: false})
  } else {
    this.setState({['' +fieldName]: true})
  }
},

render: function() {
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
    onClick={this.onBtnClickHandler}
    disabled={infoIsEmpty || messageIsEmpty || dateIsEmpty}>
    Добавить отзыв
    </button>
    </span>
    </form>
    );
}
});
}