import React from 'react';
import ReactDOM from 'react-dom';
export default class App extends React.Component{

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

  /**
  *Место для подгрузки loadDate.js!!!!!!!!!!!!!!!!!!!
  */
  Article(data){}
  Recalls(data){}
  Add(data){}
  LoadData(data){}
  constructor(props) {
    super(props);
    this.state = { recalls: [] }
  }
  componentDidMount() {
    this.loadData()
  }
  render() {
    return 
    <div className='app'>
    <Recalls data={this.state.recalls} />
    <Add />
    </div>
  }
};