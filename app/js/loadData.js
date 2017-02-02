import React from 'react';
import ReactDOM from 'react-dom';
export default function LoadData (){
    $.ajax({
      crossDomain: true,
      type: "GET",
      data: {format: "jsonp"},
      url: "http://test1.levin.personal.kg.sibers.com/api.php/messages/list",
      jsonp: "callback",
      dataType: "jsonp",
      success: (data) => {
        this.setState({recalls: data});
      },
      error:(result, status, error) => {
        console.log(status + "; " + error);
        console.log(result);
      }
    });
}