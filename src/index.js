import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import '../src/css/DraftsEditor.css';
// import 'draft-js/dist/Draft.css'
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import { store } from "../src/store/store";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>

    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
