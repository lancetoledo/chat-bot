// server.js
require('@babel/register')({
    presets: ['@babel/preset-react']
});

const express = require('express');
const dotenv = require('dotenv');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
const App = require('./src/App'); // Your React application component
const fs = require('fs');

dotenv.config();

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => {
    const apiKey = process.env.OPENAI_API_KEY;
    const appHtml = ReactDOMServer.renderToString(React.createElement(App, { apiKey }));
    const indexHtml = fs.readFileSync('index.html', 'utf-8');
    const finalHtml = indexHtml.replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`);
    res.send(finalHtml);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
