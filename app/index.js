'use strict';
/**
 * App composed from:
 * 	-Recalls wrapped in div Recalls that wraps our article in div with unique id
 *		-Article is our object with our data(id, date, message)
 *	-LoadData is function with AJAX cross-domen request with data from server
 *	-Network is class that renders send form(also clearing her after send data), AJAX post with data from form 
 *
 * Here we importing our app and the rendering him
 */
window.ee = new EventEmitter();
import React from 'react';
import ReactDOM from 'react-dom';
import App from './js/app';
ReactDOM.render(
	<App />,
	document.getElementById('root')
	); 