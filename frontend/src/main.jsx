import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

console.log('Rendering React application...');

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
);