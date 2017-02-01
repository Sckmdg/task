'use strict';
var my_recalls = [];

/**
*Глобальная переменная из EventEmitter, нужна для onBtnClickHandler
*Создаем Article, ему в Proptypes указываем data->внутри неё форма со всей инфо объекта             
*у свойств которых указываем тип данных и что они необходимы
*/
window.ee = new EventEmitter();               
var Article = React.createClass({            
  propTypes: {                               
    data: React.PropTypes.shape({
      info: React.PropTypes.string.isRequired,
      message: React.PropTypes.string.isRequired,
      id: React.PropTypes.string.isRequired,
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
/**
*Внутри Recalls рендерится каждый Article 
*/
var Recalls = React.createClass({           
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  render: function() {
    var data = this.props.data;
    var recallsTemplate;
    /**
    *Добавляем уникальный key оборачивая каждый Article
    */
    if (data.length) {                   
      recallsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>                  
          <Article data={item} />
          </div>
          )
      })
    } else {
      recallsTemplate = <p className="text-center">Записей не имеется</p>
    }

    return (
      <div className='recalls'>
      {recallsTemplate}
      </div>
      );
  }
});
/**
*Создаем App начальные свойства которой говорят что данные для ввода пустые
*/
var Add = React.createClass({                        
  getInitialState: function() { 
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
          loadData();
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
/**
*Начальное состояние App - задаем recalls начальный массив
*/
var App = React.createClass({
  loadData: function(){
    $.ajax({
      crossDomain: true,
      type: "GET",
      data: {format: "jsonp"},
      url: "http://test1.levin.personal.kg.sibers.com/api.php/messages/list",
      jsonp: "callback",
      dataType: "jsonp",
      success: function(data) {
        this.setState({recalls: data})
      }.bind(this),
      error:function(result, status, error){
        console.log(status + "; " + error);
        console.log(result);
      }
    });
  },
  getInitialState: function(){ 
    return{
      recalls: []
    };
  },
  /**
  *Как только App смотнировался добавляем Listener
  *добавляем запись в массив
  */
  componentDidMount: function(){
    this.loadData();                                    
  },
  render: function() {
    return (
      <div className='app'>
      <Recalls data={this.state.recalls} />
      <Add />
      </div>
      );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
  );
