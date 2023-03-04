import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import {App} from './App';
import {Provider} from "react-redux";
import {persistor, store} from "./store/configureStore";
import {BrowserRouter} from "react-router-dom";
import {PersistGate} from "redux-persist/integration/react";

const root = ReactDOM.createRoot(
    document.getElementById('root')
)


root.render(
    <React.StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <PersistGate loading={null} persistor={persistor}>
                    <App/>
                </PersistGate>
            </Provider>
        </BrowserRouter>
    </React.StrictMode>
);
