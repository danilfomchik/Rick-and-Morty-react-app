import {ApolloProvider} from '@apollo/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import client from './apollo/client';
import App from './components/app/App';
import './style/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
        <ApolloProvider client={client}>
            <App />
        </ApolloProvider>
    </Router>,
);
