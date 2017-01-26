'use strict';
/**
*Начальный массив
*/
var my_recalls = [ 
{
  info: 'Аминов Рустам Равильевич',
  message: 'Lorem ipsum',
  date: '2012-11-12'
},
{
  info: 'Какой-то Такой-то Тотович',
  message: 'Lorem ipsum be',
  date: '2015-08-17'
},
{
  info: 'Просто Рандомный бред',
  message: 'Lorem ipsum doluptate ipsam ponesciunt sequi labore  hic natus quam!',
  date: '2005-04-09'
}
];
/**
*Добавил id к каждой записи
*/
for (var i = 0; i < my_recalls.length; i++) {
  my_recalls[i].id = i;
}
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
      <div className="number col-md-1">{id+1}</div>
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
    var message = messageCase.value;                          
    var info = infoCase.value;
    var now = new Date();
    console.log(now)
    /**
    *Добавлять запись будем как раз через item
    */
    var item = [{                                          
      id: my_recalls.length,
      info: info,
      date: now.toString(),
      message: message
    }];
    /**
    *Генерирует событие Recalls.add и в качетсве свойства дает item
    *Опустошаем поля ввода
    */
    window.ee.emit('Recalls.add', item);  
    messageCase.value = '';            
    infoCase.value = '';
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
          disabled={infoIsEmpty || messageIsEmpty}>
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
  getInitialState: function(){ 
    return{
      recalls: my_recalls
    };
  },
  /**
  *Как только App смотнировался добавляем Listener
  *добавляем запись в массив
  */
  componentDidMount: function(){
    var self = this;                                      
    window.ee.addListener('Recalls.add', function(item){ 
      var nextRecalls = self.state.recalls.concat(item); 
      my_recalls = item.concat(self.state.recalls);   
      self.setState({recalls: nextRecalls});
    })
  },
  componentWillUnmount: function(){
    window.ee.removeListener('Recalls.add');
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