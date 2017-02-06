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
  componentDidMount() {
    LoadData(this)
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