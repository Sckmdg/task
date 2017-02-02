'use strict';
var my_recalls = [];
window.ee = new EventEmitter(); 
import React from 'react';
import ReactDOM from 'react-dom';
import Article from './js/article';
import Recalls from './js/recalls';
import Add from './js/add';
import LoadDate from './js/loadDate';
import App from './js/app';
ReactDOM.render(
	<App />,
	document.getElementById('root')
	); 