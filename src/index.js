import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk";
import setReducer from "./store/reducers/setReducer";
import {Provider} from "react-redux";
import mainReducer from "./store/reducers/mainReducer";
import noteReducer from "./store/reducers/noteReducer";
import {BrowserRouter} from "react-router-dom";


const rootReducer = combineReducers({
    set: setReducer,
    main: mainReducer,
    note: noteReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </BrowserRouter>
    </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
