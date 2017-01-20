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

//form-hide

function isDefined(val) { return val != null; }

var ToggleDisplay = React.createClass({

  propTypes: {
    hide: React.PropTypes.bool,
    show: React.PropTypes.bool
  },

  shouldHide: function() {
    var shouldHide;
    if(isDefined(this.props.show)) { 
      shouldHide = !this.props.show;
    }
    else if(isDefined(this.props.hide)) {
      shouldHide = this.props.hide;
    }
    else {
      shouldHide = false;
    }

    return shouldHide;    
  },

  render: function() {
    var style = {};

    if(this.shouldHide()) {
      style.display = 'none';
    }

    return (
      <span style={style} {...this.props} />
    );
  }

});

var App2 = React.createClass({

  getInitialState: function() {
    return {
      show: true
    };
  },

  handleClick: function() {
    this.setState({ show: !this.state.show });
  },

  addButton: function () {
    this.setState({ show: !this.state.show });
    console.log('saySomething');
  },

  render: function() {
    return (
    <div>
      <button onClick={ this.handleClick } type="button" className="btn btn-primary">Добавить отзыв</button>
      <ToggleDisplay hide={this.state.show}>
        <form className="col-md-12 text-center myForm topDown">
          <div className="col-md-12 userInfo topDown">
            <span className="col-md-12">Ваше ФИО</span>
            <input type="text" required></input>
          </div>
          <div className="col-md-12 userMessage topDown">
            <span className="col-md-12">Ваш отзыв</span>
            <textarea className="form-control" rows="5" required></textarea>
          </div>
          <button onClick={ this.addButton } type="button" className="btn btn-primary btn-lg btn-block topDown">Оставить отзыв</button>
        </form>
      </ToggleDisplay>
    </div>
    );
  }
});

ReactDOM.render(
<App />,
document.getElementById('root')
);

ReactDOM.render(
<App2 />,
document.getElementById('container')
);