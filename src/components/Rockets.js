import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRockets } from '../redux/rockets/rockets';
import RocketCard from './RocketCard';

function Rockets() {
  const dispatch = useDispatch();
  const { rockets, pending, error } = useSelector((store) => store.rockets);
  useEffect(() => {
    dispatch(fetchRockets());
  }, [dispatch]);

  let content;

  if (!pending && !error && Array.isArray(rockets)) {
    content = (
      <div>
        {rockets.map((rocket) => (
          <div key={rocket.id}>
            <RocketCard props={rocket} />
          </div>
        ))}
      </div>
    );
  }

  if (pending) {
    content = (
      <h1>Fetching Rockets</h1>
    );
  }
  if (error) {
    content = (
      <h1>Error occured while fetching rockets</h1>
    );
  }
  return (
    <section className="rockets">
      {content}
    </section>
  );
}

export default Rockets;
