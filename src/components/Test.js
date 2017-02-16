import React, { Component } from 'react'
import { loadData, eraseData } from '../actions/test'
import { connect } from 'react-redux';
class Test extends Component {
	userList(){
		return this.props.initialState.map((user) =>{
			return (
					<li key={user.id}>{user.id}</li>
				);
		});
	}
	render() {
		console.log(this);
		return(
			<div>
			<ul>
				{this.userList()}
			</ul>
			<button onClick={loadData.bind(this)}>LoadData</button>
			<button onClick={eraseData.bind(this)}>EraseData</button>
			</div>
			);
	}
}

// Test.propTypes = {                              
// 	info: PropTypes.string.isRequired,
// 	message: PropTypes.string.isRequired,
// 	id: PropTypes.string.isRequired,
// 	date: PropTypes.string.isRequired,
// }

function mapStateToProps (state) {
	return {
		initialState: state.initialState
	}
}

export default connect(mapStateToProps)(Test);