import { loader } from '@monaco-editor/react';
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import darkModern from './assets/monaco-editor-themes/dark-modern';
import './index.css';
import 'material-icons/iconfont/material-icons.css';

loader.init().then((monaco) => {
    monaco.editor.defineTheme('dark-modern', darkModern);
});

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
