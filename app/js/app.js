import React from 'react'
import ReactDOM from 'react-dom'
import Network from './network/network'
import Article from './article/article'
import Recalls from './article/recalls'
export default class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = { recalls: [] };
  }
  componentDidMount() {
      //     $.ajax({
      //   crossDomain: true,
      //   type: "GET",
      //   data: {format: "jsonp"},
      //   url: "http://test1.levin.personal.kg.sibers.com/api.php/messages/list",
      //   jsonp: "callback",
      //   dataType: "jsonp",
      //   success: (data) => {
      //     this.setState({recalls: data});
      //   },
      //   error:(result, status, error) => {
      //     console.log(status + "; " + error);
      //     console.log(result);
      //   }
      // })
      console.log(Network);
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