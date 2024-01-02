
import React from "react";
import App from './App'
import './index.css'
import { createRoot } from 'react-dom/client';
import TimeAgo from 'javascript-time-ago'

import en from 'javascript-time-ago/locale/en.json'
import ru from 'javascript-time-ago/locale/ru.json'

TimeAgo.addDefaultLocale(en)
TimeAgo.addLocale(ru)

const container = document.getElementById('root');
const root = createRoot(container); 
root.render(<App />);