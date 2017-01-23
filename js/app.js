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
for (var i = 0; i < my_recalls.length; i++) {
  my_recalls[i].userId = i;
}
window.ee = new EventEmitter();
var Article = React.createClass({
propTypes: {
  data: React.PropTypes.shape({
    userInfo: React.PropTypes.string.isRequired,
    userMessage: React.PropTypes.string.isRequired,
    userId: React.PropTypes.number.isRequired,
    userDate: React.PropTypes.string.isRequired,
  })
},
render: function() {
var userInfo = this.props.data.userInfo,
    userMessage = this.props.data.userMessage,
    userId = this.props.data.userId,
    userDate = this.props.data.userDate;

      return (
      <tr className='article'>
        <td className="userNumber col-md-1">{userId+1}</td>
        <td className="userDate col-md-2">{userDate}</td>
        <td className="userInfo col-md-4">{userInfo}</td>
        <td className="userMessage col-md-5">{userMessage}</td>
      </tr>
      )
    }
    });

    var Recalls = React.createClass({
      propTypes: {
        data: React.PropTypes.array.isRequired
      },
    render: function() {
      var data = this.props.data;
      var recallsTemplate;

    if (data.length > 0) {
      recallsTemplate = data.map(function(item, index) {
        return (
          <div key={index}>
            <Article data={item} />
          </div>
        )
      })
    } else {
      newsTemplate = <p>Записей не имеется</p>
    }

    return (
      <div className='recalls'>
        {recallsTemplate}
      </div>
    );
  }
});

var Add = React.createClass({
  getInitialState: function() { 
      return {
        userInfoIsEmpty: true,
        userDateIsEmpty: true,
        userMessageIsEmpty: true
      };
    },

  componentDidMount: function() {
    ReactDOM.findDOMNode(this.refs.userInfo).focus();
  },

  onBtnClickHandler: function(e) {
    e.preventDefault();
    var userInfo = ReactDOM.findDOMNode(this.refs.userInfo).value;
    var userDate = ReactDOM.findDOMNode(this.refs.userDate).value;
    var userMessage = ReactDOM.findDOMNode(this.refs.userMessage).value;
    var item = [{
      userInfo: userInfo,
      userDate: userDate,
      userMessage: userMessage
    }];
    window.ee.emit('Recalls.add', item);
  },

  onFieldChange: function(fieldName, e) {
      if (e.target.value.trim().length > 0) {
        this.setState({['' +fieldName]: false})
      } else {
        this.setState({['' +fieldName]: true})
      }
    },

  render: function() {
    var userInfoIsEmpty = this.state.userInfoIsEmpty,
        userDateIsEmpty = this.state.userDateIsEmpty,
        userMessageIsEmpty = this.state.userMessageIsEmpty;
    return (
      <form className='add cf col-md-12 topDown'>
        <span className='col-md-12 topDown'>
        <input
          type='text'
          className='addUserInfo col-md-2'
          onChange={this.onFieldChange.bind(this, 'userInfoIsEmpty')}
          placeholder='Ваше ФИО'
          ref='userInfo'
        />
        </span>
        <span className='col-md-12 topDown'>
        <input type="text"
          type='date'
          className='addUserDate col-md-2'
          onChange={this.onFieldChange.bind(this, 'userDateIsEmpty')}
          placeholder='Введите дату'
          ref='userDate'
          />
          </span>
        <span className='col-md-12 topDown'>
        <textarea
          className='addUserMessage col-md-2'
          rows="4"
          onChange={this.onFieldChange.bind(this, 'userMessageIsEmpty')}
          placeholder='Ваш отзыв'
          ref='userMessage'
        ></textarea>
      </span>
        <span className='col-md-12 topDown'>
        <button
          type="button"
          className='addBtn btn btn-success'
          onClick={this.onBtnClickHandler}
          ref='alert_button'
          disabled={userInfoIsEmpty || userMessageIsEmpty || userDateIsEmpty}
          >
          Добавить отзыв
        </button>
      </span>
      </form>
    );
  }
});

var App = React.createClass({
  getInitialState: function(){
    return{
      recalls: my_recalls
    };
  },
  componentDidMount: function(){
    var self = this;
    window.ee.addListener('Recalls.add', function(item){
    var nextRecalls = item.concat(self.state.recalls);
    self.setState({recalls: nextRecalls});
    })
  },
  componentWillUnmount: function(){
    window.ee.removeListener('Recalls.add');
  },
  render: function() {
    return (
      <div className='app'>
        <Add />
        <table className="table">
          <thead>
            <tr>
              <th className="col-md-1 userNumber">№</th>
              <th className="col-md-2 userDate">Дата</th>
              <th className="col-md-4 userInfo">ФИО</th>
              <th className="col-md-5 userMessage">Отзыв</th>
            </tr>
          </thead>
          <tbody>
            <Recalls data={this.state.recalls} />
          </tbody>
        </table>
      </div>
    );
  }
});

ReactDOM.render(
<App />,
document.getElementById('root')
);