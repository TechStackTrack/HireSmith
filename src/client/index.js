import React from 'react';
import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import App from './App';

/**
 * createRoot is the React 18 API to render the App in the root container
 */

const root = createRoot(document.getElementById('root'));
root.render(
    <App />
);