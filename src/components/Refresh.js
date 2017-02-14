import React, { Component } from 'react'
// import $ from 'jquery'
import getData from '../actions/GetData'
import { connect } from 'react-redux'

class Refresh extends Component {
  LoadData(data){
    // $.ajax({
    //   crossDomain: true,
    //   type: "GET",
    //   data: {format: "jsonp"},
    //   url: "http://test1.levin.personal.kg.sibers.com/api.php/messages/list",
    //   jsonp: "callback",
    //   dataType: "jsonp",
    //   success: (data) => {
    //     console.log("load data", data);
    //     console.log("this.props.article", this.props.article);
    //     console.log("this.props.getData", this.props.getData);
    //   },
    //   error:(result, status, error) => {
    //     console.log(status + "; " + error);
    //     console.log(result);
    //   }
    // })
    var a = this.props.article;
    var b = [{id: "56", info: "random", message: "randomNextLEVEL111", date: "1111-11-11"}];
    a = a.concat(b);
    console.log("a", a);
    this.props.dispatch(getData(data));
    console.log(this);
  }
  render() {
    // const { data } = this.props
    return (
      <button type="button" className= "btn btn-success " onClick={this.LoadData.bind(this)}>
      Обновить
      </button>
      );
  }
}

function mapStateToProps (state) {
  return {
    article: state.article
  }
}

export default connect(mapStateToProps)(Refresh)