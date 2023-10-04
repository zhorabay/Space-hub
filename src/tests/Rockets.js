import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import Rockets from '../components/Rockets';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../redux/rockets/rockets', () => ({
  fetchRockets: jest.fn(),
}));

describe('Rockets Component', () => {
  it('renders loading message when pending', () => {
    useSelector.mockReturnValue({ rockets: [], pending: true, error: null });
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(<Rockets />);

    expect(screen.getByText('Fetching Rockets')).toBeInTheDocument();
  });

  it('renders error message when there is an error', () => {
    useSelector.mockReturnValue({ rockets: [], pending: false, error: 'Some error message' });
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(<Rockets />);

    expect(screen.getByText('Error occurred while fetching rockets')).toBeInTheDocument();
  });

  it('renders rocket cards when data is fetched', async () => {
    const rocketsData = [
      {
        id: '1',
        img: 'rocket1.jpg',
        name: 'Rocket 1',
        description: 'Rocket Description 1',
        reserved: false,
      },
      {
        id: '2',
        img: 'rocket2.jpg',
        name: 'Rocket 2',
        description: 'Rocket Description 2',
        reserved: true,
      },
    ];
    useSelector.mockReturnValue({ rockets: rocketsData, pending: false, error: null });
    const mockDispatch = jest.fn();
    useDispatch.mockReturnValue(mockDispatch);

    render(<Rockets />);

    await screen.findByText('Rocket 1');
    await screen.findByText('Rocket 2');

    expect(screen.getByText('Rocket 1')).toBeInTheDocument();
    expect(screen.getByText('Rocket 2')).toBeInTheDocument();
  });
});
