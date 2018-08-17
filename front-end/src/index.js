import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, withRouter } from 'react-router-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import Reducer from './Reducers';

const store = createStore(Reducer, applyMiddleware(thunk)); 
const Root = withRouter(props => <App {...props}/>);

ReactDOM.render(
	<Provider store={store}>
    <Router>
    	<Root/>
    </Router>
  </Provider>,
	document.getElementById('root')
);
registerServiceWorker();