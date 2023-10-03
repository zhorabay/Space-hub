import { NavLink } from 'react-router-dom';

const NavLinks = () => {
  return (
    <header>
      <div className="nav-logo">
        <img src="./images/planet.png" alt="logo" />
        <h1 className="page-title">Space Traveler&apos;s Hub</h1>
      </div>
      <ul className="tab-links">
        <li>
          <NavLink className="navbar-rockets" to="/">Rockets</NavLink>
        </li>
        <li>
          <NavLink className="navbar-missions" to="/missions">Missions</NavLink>
        </li>
        <li>
          <NavLink className="navbar-profile" to="/myprofile">My Profile</NavLink>
        </li>
      </ul>
    </header>
  );
};

export default NavLinks;
