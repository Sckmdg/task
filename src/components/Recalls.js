import React, { PropTypes, Component } from 'react'
import Article from './Article'
export default class Recalls extends Component{          
  render() {
    const { data } = this.props;
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
  data: PropTypes.array.isRequired
}