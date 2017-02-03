import React from 'react'
import ReactDOM from 'react-dom'
import Article from './article'
import Recalls from './recalls'
import Network from './network'
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { recalls: [] }
  }
  componentDidMount() {
    Network.LoadData();
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