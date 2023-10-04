import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import MyProfile from '../components/MyProfile';

import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = {
  missions: {
    missions: [
      {
        id: '1',
        name: 'Mission 1',
        reserved: true,
      },
      {
        id: '2',
        name: 'Mission 2',
        reserved: false,
      },
    ],
  },
  rockets: {
    rockets: [
      {
        id: '1',
        name: 'Rocket 1',
        reserved: true,
      },
      {
        id: '2',
        name: 'Rocket 2',
        reserved: false,
      },
    ],
  },
};

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: (selector) => selector(initialState),
}));

describe('MyProfile Component', () => {
  it('renders "No missions joined" message when no missions are reserved', () => {
    const { container } = render(
      <Provider store={mockStore(initialState)}>
        <Router>
          <MyProfile />
        </Router>
      </Provider>
    );

    expect(screen.getByText('No missions joined')).toBeInTheDocument();
  });

  it('renders a list of reserved missions when missions are reserved', () => {
    const missionsWithReservations = [...initialState.missions.missions];
    const { container } = render(
      <Provider store={mockStore({ missions: { missions: missionsWithReservations } })}>
        <Router>
          <MyProfile />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Mission 1')).toBeInTheDocument();
    expect(screen.queryByText('Mission 2')).toBeNull();
  });

  it('renders "No reservations made" message when no rockets are reserved', () => {
    const { container } = render(
      <Provider store={mockStore(initialState)}>
        <Router>
          <MyProfile />
        </Router>
      </Provider>
    );

    expect(screen.getByText('No reservations made')).toBeInTheDocument();
  });

  it('renders a list of reserved rockets when rockets are reserved', () => {
    const rocketsWithReservations = [...initialState.rockets.rockets];
    const { container } = render(
      <Provider store={mockStore({ rockets: { rockets: rocketsWithReservations } })}>
        <Router>
          <MyProfile />
        </Router>
      </Provider>
    );

    expect(screen.getByText('Rocket 1')).toBeInTheDocument();
    expect(screen.queryByText('Rocket 2')).toBeNull();
  });
});
