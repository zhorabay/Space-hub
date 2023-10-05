import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import '../styles/MyProfile.css';

function MyProfile() {
  const { rockets } = useSelector((state) => state.rockets);
  const { missions } = useSelector((state) => state.missions);
  const missionsData = missions.filter((mission) => mission.reserved);
  const rocketsData = rockets.filter((rocks) => rocks.reserved);

  return (
    <section className="myprofile">
      <div className="mymissions">
        <h2>My Missions</h2>
        {missionsData.length === 0 ? (
          <div className="nomissions">
            <p>No missions joined</p>
            <Link className="join-missions-link" to="/missions">Join Missions</Link>
          </div>
        ) : (
          <ul className="list">
            {missionsData.map((mission) => (
              <li key={mission.id} className="list-table">{mission.name}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="myrockets">
        <h2>My Rockets</h2>
        {rocketsData.length === 0 ? (
          <div className="noreservations">
            <p>No reservations made</p>
            <Link className="make-reservetions-link" to="/rockets">Make Reservations</Link>
          </div>
        ) : (
          <ul className="list">
            {rocketsData.map((rocket) => (
              <li key={rocket.id} className="list-table">{rocket.name}</li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

export default MyProfile;
