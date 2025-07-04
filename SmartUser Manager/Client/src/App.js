import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import Home from './Components/Home';
import Register from './Components/Register';
import Edit from './Components/Edit';

import View from './Components/View';

function App() {
  return (
    <Router>
      <Navbar /> {/* Navbar sab pages pe dikhani hai to Routes ke bahar rakhein */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/edit/:id" element={<Edit />} />
         <Route path="/view/:id" element={<View />} />
      </Routes>
    </Router>
  );
}

export default App;
