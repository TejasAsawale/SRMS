// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css'; // Ensure this file exists in your src folder
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));

// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css'; // This should contain your global styles
import App from './App';

// This links to the <div id="root"></div> in your index.html
const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);