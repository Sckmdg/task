/**
*Внутри Recalls рендерится каждый Article 
*/
import React from 'react';
import ReactDOM from 'react-dom';
export default class Recalls extends React.Component{          
  render() {
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
    } 
    else {
      recallsTemplate = <p className="text-center">Записей не имеется</p>
    }
    return 
    <div className='recalls'>
    {recallsTemplate}
    </div>
  }
}
Recalls.propTypes = {
  data: React.PropTypes.array.isRequired
}