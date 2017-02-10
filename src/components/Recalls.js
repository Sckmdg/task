import React, { PropTypes, Component } from 'react'
import { connect } from 'react-redux'
import Article from './Article' 
class Recalls extends Component {
  render() {
    var recallsTemplate;
    if (this.props.article.length) {                   
      recallsTemplate = this.props.article.map(function(item, index) {
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

function mapStateToProps (state) {
  return {
    article: state.article
  }
}
export default connect(mapStateToProps)(Recalls)