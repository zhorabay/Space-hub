import { Route, Routes } from 'react-router-dom';
import './App.css';
import Missions from './components/Missions';
import Rockets from './components/Rockets';
import MyProfile from './components/MyProfile';
import Navbar from './components/Navbar';

function App() {
  return (
    <main className="App">
      <Navbar />
      <Routes>
        <Route element={<MyProfile />} path="/" />
        <Route element={<Missions />} path="/missions" />
        <Route element={<Rockets />} path="/rockets" />
      </Routes>
    </main>
  );
}

export default App;
