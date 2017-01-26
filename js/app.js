'use strict';
var my_recalls = [ //Начальный массив
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
for (var i = 0; i < my_recalls.length; i++) { //Добавил id к каждой записи
  my_recalls[i].id = i;
}
window.ee = new EventEmitter();               //Глобальная переменная из EventEmitter, нужна для onBtnClickHandler
var Article = React.createClass({             //Создаем Article, ему в Proptypes указываем data->внутри неё форма со всей инфо объекта             
  propTypes: {                                //у свойств которых указываем тип данных и что они необходимы
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
      <div className="date col-md-2">{date}</div>
      <div className="info col-md-4">{info}</div>
      <div className="message col-md-5">{message}</div>
      </div>
      )
  }
});

var Recalls = React.createClass({             //Внутри Recalls рендерится каждый Article 
  propTypes: {
    data: React.PropTypes.array.isRequired
  },
  render: function() {
    var data = this.props.data;
    var recallsTemplate;

    if (data.length) {                    //Добавляем уникальный key оборачивая каждый Article
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

var Add = React.createClass({                         //Создаем App начальные свойства которой говорят что данные для ввода пустые
  getInitialState: function() { 
    return {
      infoIsEmpty: true,
      dateIsEmpty: true,
      messageIsEmpty: true
    };
  },

  componentDidMount: function() {                              //Компонент примонтировался
    ReactDOM.findDOMNode(this.refs.info).focus();              //и здесь мы фокусим refs на info
  },

  onBtnClickHandler: function(e) {                             //Создаем функцию используя переменную e из EventEmitter
    e.preventDefault();
    var messageCase = ReactDOM.findDOMNode(this.refs.message); //Case нужен для очистки формы ввода после добавления
    var infoCase = ReactDOM.findDOMNode(this.refs.info);
    var dateCase = ReactDOM.findDOMNode(this.refs.date);
    var message = messageCase.value;                          
    var info = infoCase.value;
    var date= dateCase.value;

    var item = [{                                             //Добавлять запись будем как раз через item
      id: my_recalls.length,
      info: info,
      date: date,
      message: message
    }];
    window.ee.emit('Recalls.add', item);  //Генерирует событие Recalls.add и в качетсве свойства дает item
    messageCase.value = '';               //Опустошаем поля ввода
    infoCase.value = '';
    dateCase.value = '';
    this.setState({messageIsEmpty: true});
    this.setState({infoIsEmpty: true});
    this.setState({dateIsEmpty: true});
  },

  onFieldChange: function(fieldName, e) {   //Проверяет если поля пустые или ничего не ввели(включая пробел)
    if (e.target.value.trim().length) {     //кнопка дизейблится
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
          onChange={this.onFieldChange.bind(this, 'infoIsEmpty')}//Привязываем поле на момент изменения
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

var App = React.createClass({
  getInitialState: function(){   //Начальное состояние App - задаем recalls начальный массив
    return{
      recalls: my_recalls
    };
  },
  componentDidMount: function(){
    var self = this;                                      
    window.ee.addListener('Recalls.add', function(item){ //Как только App смотнировался добавляем Listener
      var nextRecalls = self.state.recalls.concat(item); //добавляем запись в массив
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