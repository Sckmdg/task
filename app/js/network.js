import React from 'react';
import ReactDOM from 'react-dom';
export default class Network extends React.Component{
   LoadData() {
    $.ajax({
      crossDomain: true,
      type: "GET",
      data: {format: "jsonp"},
      url: "http://test1.levin.personal.kg.sibers.com/api.php/messages/list",
      jsonp: "callback",
      dataType: "jsonp",
      success: (data) => {
        this.setState({recalls: data});
      },
      error:(result, status, error) => {
        console.log(status + "; " + error);
        console.log(result);
      }
    });
  }
/**
*Создаем App начальные свойства которой говорят что данные для ввода пустые
*/                    
  constructor(props) {
    super(props);
    this.state = { 
      infoIsEmpty: true,
      dateIsEmpty: true,
      messageIsEmpty: true
    }
  }
/**
*Компонент примонтировался
*и здесь мы фокусим refs на info
*/
componentDidMount() {                              
  ReactDOM.findDOMNode(this.refs.info).focus();              
}
/**
*Создаем функцию используя переменную e из EventEmitter
*Case нужен для очистки формы ввода после добавления
*/
onBtnClickHandler(e) {                             
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
  succes: (data) => {
    console.log("succes");
    /*
    *Сюда подключить выполнение loadDate.js!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    */
  },
  error: (result, status, error) => {
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

}
/**
*Проверяет если поля пустые или ничего не ввели(включая пробел)
*кнопка дизейблится
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
    onClick={this.onBtnClickHandler}
    disabled={infoIsEmpty || messageIsEmpty || dateIsEmpty}>
    Добавить отзыв
    </button>
    </span>
    </form>
    );
}
}