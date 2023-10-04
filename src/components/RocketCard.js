import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { handleRocket } from '../redux/rockets/rockets';
import '../styles/Rockets.css';

function RocketCard({ props }) {
  const {
    id, img, name, description, reserved,
  } = props;
  const dispatch = useDispatch();

  const getButton = (reserved, btn) => {
    let button;
    if (btn === 'reserve') {
      button = reserved ? (
        <button className="cancel-reservation" type="button" onClick={() => dispatch(handleRocket(id))}>Cancel Reservation</button>
      ) : (
        <button className="reserve-rocket" type="button" onClick={() => dispatch(handleRocket(id))}>Reserve Rocket</button>
      );
    }
    if (btn === 'reservation') {
      button = reserved ? (
        <button className="reserved" type="button">Reserved</button>
      ) : (
        <button className="not-reserved" type="button">Not reserved</button>
      );
    }
    return button;
  };

  return (
    <div className="rocket-card">
      <img className="rocket-img" src={img} alt="rocket" />
      <div className="rocket-body">
        <h2 className="rocket-name">{name}</h2>
        <p className="rocket-description">
          {getButton(reserved, 'reservation')}
          {description}
        </p>
        {getButton(reserved, 'reserve')}
      </div>
    </div>
  );
}

RocketCard.propTypes = {
  props: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  reserved: PropTypes.bool.isRequired,
};

export default RocketCard;
