import Article from '../article/article'
import Recalls from '../article/recalls'
export default function LoadData(self){
  $.ajax({
    crossDomain: true,
    type: "GET",
    data: {format: "jsonp"},
    url: "http://test1.levin.personal.kg.sibers.com/api.php/messages/list",
    jsonp: "callback",
    dataType: "jsonp",
    success: (data) => {
      self.setState({recalls: data});
    },
    error:(result, status, error) => {
      console.log(status + "; " + error);
      console.log(result);
    }
  })
}
