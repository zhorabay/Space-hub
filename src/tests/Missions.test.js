import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Missions from '../components/Missions';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../redux/missions/missions', () => ({
  fetchMissions: jest.fn(),
}));

describe('Missions Component', () => {
  it('renders "No missions joined" message when no missions are reserved', () => {
    useSelector.mockReturnValue({ missions: [], pending: false, error: null });

    render(
      <BrowserRouter>
        <Missions />
      </BrowserRouter>,
    );

    expect(screen.getByText('No missions joined')).toBeInTheDocument();
  });

  it('renders a list of reserved missions when missions are reserved', () => {
    const missionsWithReservations = [
      { id: '1', name: 'Mission 1', reserved: true },
      { id: '2', name: 'Mission 2', reserved: true },
    ];
    useSelector.mockReturnValue({ missions: missionsWithReservations, pending: false, error: null });

    render(
      <BrowserRouter>
        <Missions />
      </BrowserRouter>,
    );

    expect(screen.getByText('Mission 1')).toBeInTheDocument();
    expect(screen.getByText('Mission 2')).toBeInTheDocument();
  });

  it('renders "No reservations made" message when no rockets are reserved', () => {
    useSelector.mockReturnValue({ rockets: [], pending: false, error: null });

    render(
      <BrowserRouter>
        <Missions />
      </BrowserRouter>,
    );

    expect(screen.getByText('No reservations made')).toBeInTheDocument();
  });

  it('renders a list of reserved rockets when rockets are reserved', () => {
    const rocketsWithReservations = [
      { id: '1', name: 'Rocket 1', reserved: true },
      { id: '2', name: 'Rocket 2', reserved: true },
    ];
    useSelector.mockReturnValue({ rockets: rocketsWithReservations, pending: false, error: null });

    render(
      <BrowserRouter>
        <Missions />
      </BrowserRouter>,
    );

    expect(screen.getByText('Rocket 1')).toBeInTheDocument();
    expect(screen.getByText('Rocket 2')).toBeInTheDocument();
  });
});
