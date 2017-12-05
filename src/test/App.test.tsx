import React from 'react';
import ReactDOM from 'react-dom';
import App from '../components/App';
import { createBrowserHistory } from 'history';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App history={createBrowserHistory()} />, div);
});
