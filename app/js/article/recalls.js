/**
*Добавляем уникальный key оборачивая каждый Article
*Wraping each article with div
*Each div have unique id 
*@this - props data array from articles 
*/
import React from 'react';
import ReactDOM from 'react-dom';
import Article from './article'
export default class Recalls extends React.Component{          
  render() {
    var data = this.props.data;
    var recallsTemplate;
    if (data.length) {                   
      recallsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>                  
          <Article data={item} />
          </div>
          )
      })
    } 
    else {
      recallsTemplate = <p className="text-center">Записей не имеется</p>
    }
    return (
    <div className='recalls'>
    {recallsTemplate}
    </div>
    );
  }
}
Recalls.propTypes = {
  data: React.PropTypes.array.isRequired
}