'use strict';

var my_recalls = [
{
  userInfo: 'Аминов Рустам Равильевич',
  userMessage: 'Lorem ipsum',
  userDate: '10.11.12'
},
{
  userInfo: 'Какой-то Такой-то Тотович',
  userMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat voluptate ipsam porro eius impedit! Facilis voluptatem at nesciunt sequi labore aliquam be',
  userDate: '12.08.17'
},
{
  userInfo: 'Просто Рандомный бред',
  userMessage: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat voluptate ipsam porro eius impedit! Facilis voluptatem at nesciunt sequi labore aliquam beatae exercitationem voluptatibus fugit, nulla animi incidunt hic natus quam!',
  userDate: '15.04.09'
}
];

var Recalls = React.createClass({
  render: function() {
    var data = this.props.data;
    var recallsTemplate = data.map(function(item, index) {
      return (
        <tr key={index}>
          <td className="userNumber col-md-1">{index+1}</td>
          <td className="userDate col-md-2">{item.userDate}</td>
          <td className="userInfo col-md-4">{item.userInfo}</td>
          <td className="userMessage col-md-5">{item.userMessage}</td>
        </tr>
      )
    })

    return (
      <div className="recalls">
        {recallsTemplate}
      </div>
    );
  }
});

var App = React.createClass({
  render: function() {
    return (
      <div className="app">
        <Recalls data={my_recalls} />
      </div>
    );
  }
});

ReactDOM.render(
  <App />,
  document.getElementById('root')
);