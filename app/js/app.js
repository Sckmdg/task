import React from 'react';
import ReactDOM from 'react-dom';
export default class App extends React.Component{
  'use strict';
  var my_recalls = [];
  /**
  *Глобальная переменная из EventEmitter, нужна для onBtnClickHandler
  *Создаем Article, ему в Proptypes указываем data->внутри неё форма со всей инфо объекта             
  *у свойств которых указываем тип данных и что они необходимы
  */
  window.ee = new EventEmitter();   

  /**
  *Сюда article!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  */

  /**
  *Сюда recalls!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  */

  /**
  *Сюда подключить add!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  */


  /**
  *Начальное состояние App - задаем recalls начальный массив
  */
  var App = React.createClass({
    /**
    *Место для подгрузки loadDate.js!!!!!!!!!!!!!!!!!!!
    */
    getInitialState: function(){ 
      return{
        recalls: []
      };
    },
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

};