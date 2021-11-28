import React from 'react';
import ReactDOM from 'react-dom'
import { ipcRenderer } from 'electron';

import './app.css';
import './fonts.css';
import WidgetsView from './widgets/widgetsView';


const render = () => {
    ReactDOM.render(<WidgetsView/>, document.body);
}

render();