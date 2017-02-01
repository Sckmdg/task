/**
*Внутри Recalls рендерится каждый Article 
*/
import React from 'react';
import ReactDOM from 'react-dom';
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