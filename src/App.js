import React from 'react'; 
import 'upkit/dist/style.min.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
// (1) import Provider
import { Provider } from 'react-redux';

import { listen } from './app/listener';
import store from './app/store';
import Home from './pages/Home';
import Register from './pages/Register';



function App() {
  React.useEffect(() => {
    listen();
  },[]);

  return (
  <Provider store = {store}>
    <Router>
      <Routes>
        <Route path="/register" Component={ Register }/>
        <Route path="/" Component={ Home }/>
      </Routes>
    </Router>
  </Provider>
  );
 }

export default App;
