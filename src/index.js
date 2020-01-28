import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import App from './App/App';
import user from './store/reducers/user';

const rootReducer = combineReducers({
    user
});

const store = createStore(rootReducer);

ReactDOM.render(<Provider store={store}><App /></Provider >, document.getElementById('root'));
