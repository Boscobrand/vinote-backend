const express = require("express");
const dotenv = require("dotenv").config()
const cors = require('cors');
const app = express();

app.use(require("./routes/index.js"));
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('assets'))
app.use(cors());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


app.set("port", process.env.PORT || 8080);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(app.get("port"), () => {
  console.log(`✅ PORT: ${app.get("port")} 🌟`);
});

// app.listen(4000, () => console.log("Running on port 4000"));







// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';
// import reportWebVitals from './reportWebVitals';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


// const express = require("express");
// const app = express();

// app.use(require("./routes/index.js"));

// app.listen(4000, () => console.log("Running on port 4000"));