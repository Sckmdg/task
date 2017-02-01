import React from 'react';
import ReactDOM from 'react-dom';
loadData: function(){
  $.ajax({
    crossDomain: true,
    type: "GET",
    data: {format: "jsonp"},
    url: "http://test1.levin.personal.kg.sibers.com/api.php/messages/list",
    jsonp: "callback",
    dataType: "jsonp",
    success: function(data) {
      this.setState({recalls: data})
    }.bind(this),
    error:function(result, status, error){
      console.log(status + "; " + error);
      console.log(result);
    }
  });
}