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
*Сюда подключить add.js!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
*/

// var React = require('../react/react.js');
// var ReactDOM = require('../react/react-dom.js');
// var Add = require('add.js');

import React from '../react/react.js';
import ReactDOM from '../react/react-dom.js';
import Add from './add.js';

/**
*Начальное состояние App - задаем recalls начальный массив
*/
var App = React.createClass({
  /**
  *Место для подгрузки loadDate.js!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  */
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
    var self = this;                                      
    window.ee.addListener('Recalls.add', function(item){ 
      var nextRecalls = self.state.recalls.concat(item); 
      my_recalls = item.concat(self.state.recalls);   
      self.setState({recalls: nextRecalls});
    });
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