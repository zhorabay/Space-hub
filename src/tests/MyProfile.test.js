import React from 'react';
import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import MyProfile from '../components/MyProfile';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

describe('MyProfile Component', () => {
  it('renders "No missions joined" message when no missions are reserved', () => {
    useSelector.mockReturnValue({
      missions: [], rockets: [], pending: false, error: null,
    });

    render(<MyProfile />);

    expect(screen.getByText('No missions joined')).toBeInTheDocument();
  });

  it('renders a list of reserved missions when missions are reserved', () => {
    const missionsWithReservations = [
      { id: '1', name: 'Mission 1', reserved: true },
      { id: '2', name: 'Mission 2', reserved: true },
    ];
    useSelector.mockReturnValue({
      missions: missionsWithReservations, rockets: [], pending: false, error: null,
    });

    render(<MyProfile />);

    expect(screen.getByText('Mission 1')).toBeInTheDocument();
    expect(screen.getByText('Mission 2')).toBeInTheDocument();
  });

  it('renders "No reservations made" message when no rockets are reserved', () => {
    useSelector.mockReturnValue({
      missions: [], rockets: [], pending: false, error: null,
    });

    render(<MyProfile />);

    expect(screen.getByText('No reservations made')).toBeInTheDocument();
  });

  it('renders a list of reserved rockets when rockets are reserved', () => {
    const rocketsWithReservations = [
      { id: '1', name: 'Rocket 1', reserved: true },
      { id: '2', name: 'Rocket 2', reserved: true },
    ];
    useSelector.mockReturnValue({
      missions: [], rockets: rocketsWithReservations, pending: false, error: null,
    });

    render(<MyProfile />);

    expect(screen.getByText('Rocket 1')).toBeInTheDocument();
    expect(screen.getByText('Rocket 2')).toBeInTheDocument();
  });
});
