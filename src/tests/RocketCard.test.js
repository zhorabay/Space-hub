import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import RocketCard from '../components/RocketCard';

jest.mock('react-redux', () => ({
  useDispatch: () => jest.fn(),
}));

describe('RocketCard Component', () => {
  it('renders the rocket card with correct content', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const rocketProps = {
      id: '1',
      img: 'rocket.jpg',
      name: 'Rocket 1',
      description: 'Rocket Description',
      reserved: false,
    };

    render(<RocketCard props={rocketProps} />);

    expect(screen.getByText('Rocket 1')).toBeInTheDocument();
    expect(screen.getByText('Rocket Description')).toBeInTheDocument();

    const reserveButton = screen.getByText('Reserve Rocket');
    expect(reserveButton).toBeInTheDocument();

    fireEvent.click(reserveButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'RESERVE_ROCKET', payload: '1' });
  });

  it('renders the "Cancel Reservation" button when rocket is reserved', () => {
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    const rocketProps = {
      id: '2',
      img: 'rocket.jpg',
      name: 'Rocket 2',
      description: 'Rocket Description',
      reserved: true,
    };

    render(<RocketCard props={rocketProps} />);

    const cancelReservationButton = screen.getByText('Cancel Reservation');
    expect(cancelReservationButton).toBeInTheDocument();

    fireEvent.click(cancelReservationButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'CANCEL_RESERVATION', payload: '2' });
  });
});
