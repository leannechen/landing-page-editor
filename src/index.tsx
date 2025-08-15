import React from 'react';
import { createRoot } from 'react-dom/client';
import EditorApp from './components/editor/EditorApp';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);
root.render(<EditorApp />);