import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavLinks from './components/NavLinks';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import MyProfile from './components/MyProfile';

function App() {
  return (
    <Router>
      <div className="app">
        <NavLinks />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Rockets />} />
            <Route path="/missions" element={<Missions />} />
            <Route exact path="/myprofile" element={<MyProfile />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
