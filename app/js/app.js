/**
 * Importing components and export our App
 * @This - recalls with array from articles
 */
import React from 'react'
import ReactDOM from 'react-dom'
import Network from './network/network'
import Article from './article/article'
import Recalls from './article/recalls'
import LoadData from './network/loadData'
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { recalls: [] };
  }
  /**
 * Loading data from server
 * Add listener that changes our data
 */
  componentDidMount() {
    LoadData(this);
    var some = this;
    window.ee.addListener('Recalls.add', function() {
      var nextRecalls = LoadData(some);
      some.setState({recalls: nextRecalls});
    });
  }
  componentWillUnmount() {
    window.ee.removeListener('Recalls.add');
  }
  render() {
    return( 
    <div className='app'>
    <Recalls data={this.state.recalls} />
    <Network />
    </div>
    );
  }
};