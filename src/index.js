import React from 'react';
import ReactDom from 'react-dom';

import './fonts/Malina/malina_webfont.ttf';

import 'normalize.css';

import App from "./components/app";

ReactDom.render(<App/>,
	document.getElementById('root')
);