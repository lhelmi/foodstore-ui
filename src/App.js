import logo from './logo.svg';
import 'upkit/dist/style.min.css'
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';


function App() {
  return (
  <div>
    <Router>
      <Routes>
        <Route path="/" Component={ Home }/>
      </Routes>
    </Router>
  </div>
  );
 }

export default App;
