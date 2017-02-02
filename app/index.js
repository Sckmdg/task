'use strict';
var my_recalls = [];
window.ee = new EventEmitter(); 
import React from 'react';
import ReactDOM from 'react-dom';
import Article from './js/article';
import Recalls from './js/recalls';
import LoadData from './js/loadData';
import Add from './js/add';
import App from './js/app';
ReactDOM.render(
	<App />,
	document.getElementById('root')
	); 