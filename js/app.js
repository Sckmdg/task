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
console.log(my_recalls);
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
      <div className='article'>
        <div className="userNumber col-md-1">{userId+1}</div>
        <div className="userDate col-md-2">{userDate}</div>
        <div className="userInfo col-md-4">{userInfo}</div>
        <div className="userMessage col-md-5">{userMessage}</div>
      </div>
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
    var userMessageCase = ReactDOM.findDOMNode(this.refs.userMessage);
    var userInfoCase = ReactDOM.findDOMNode(this.refs.userInfo);
    var userDateCase = ReactDOM.findDOMNode(this.refs.userDate);
    var userMessage = userMessageCase.value;
    var userInfo = userInfoCase.value;
    var userDate = userDateCase.value;

    var item = [{
      userId: my_recalls.length,
      userInfo: userInfo,
      userDate: userDate,
      userMessage: userMessage
    }];
    window.ee.emit('Recalls.add', item);
    userMessageCase.value = '';
    userInfoCase.value = '';
    userDateCase.value = '';
    this.setState({userMessageIsEmpty: true});
    this.setState({userInfoIsEmpty: true});
    this.setState({userDateIsEmpty: true});
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
    var nextRecalls = self.state.recalls.concat(item);
    my_recalls = item.concat(self.state.recalls);
    self.setState({recalls: nextRecalls});
    })
  },
  componentWillUnmount: function(){
    window.ee.removeListener('Recalls.add');
  },
  render: function() {
    return (
      <div className='app'>
            <Recalls data={this.state.recalls} />
            <Add />
      </div>
    );
  }
});

ReactDOM.render(
<App />,
document.getElementById('root')
);