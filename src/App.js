import { Route, Routes } from 'react-router-dom';
import './App.css';
import Rockets from './components/Rockets';
import Missions from './components/Missions';
import MyProfile from './components/MyProfile';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className="App">
      <Navbar />
      <Routes>
        <Route element={<Rockets />} path="/" />
        <Route element={<Missions />} path="/missions" />
        <Route element={<MyProfile />} path="/myprofile" />
      </Routes>
    </main>
  );
}

export default App;
