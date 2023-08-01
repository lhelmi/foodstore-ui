import 'upkit/dist/style.min.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
// (1) import Provider
import { Provider } from 'react-redux';

import store from './app/store';
import Home from './pages/Home';


function App() {
  return (
  <Provider store = {store}>
    <Router>
      <Routes>
        <Route path="/" Component={ Home }/>
      </Routes>
    </Router>
  </Provider>
  );
 }

export default App;
