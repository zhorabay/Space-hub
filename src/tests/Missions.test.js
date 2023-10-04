import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import Missions from '../components/Missions';

import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
const initialState = {
  missions: {
    missions: [
      {
        id: '1',
        name: 'Mission 1',
        description: 'Description 1',
        status: 'Active',
      },
      {
        id: '2',
        name: 'Mission 2',
        description: 'Description 2',
        status: 'Inactive',
      },
    ],
    pending: false,
    error: null,
  },
};

const mockDispatch = jest.fn();

jest.mock('react-redux', () => ({
  useDispatch: () => mockDispatch,
  useSelector: (selector) => selector(initialState),
}));

jest.mock('../redux/missions/missions', () => ({
  fetchMissions: jest.fn(),
}));

describe('Missions Component', () => {
  beforeEach(() => {
    mockDispatch.mockClear();
  });

  it('renders mission data when not pending and no error', () => {
    const { container } = render(
      <Provider store={mockStore(initialState)}>
        <Missions />
      </Provider>
    );

    expect(screen.getByText('Mission 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
    expect(screen.getByText('Active')).toBeInTheDocument();
    expect(screen.getByText('Mission 2')).toBeInTheDocument();
    expect(screen.getByText('Description 2')).toBeInTheDocument();
    expect(screen.getByText('Inactive')).toBeInTheDocument();
  });

  it('renders "Fetching Missions" when pending', () => {
    initialState.missions.pending = true;
    const { container } = render(
      <Provider store={mockStore(initialState)}>
        <Missions />
      </Provider>
    );

    expect(screen.getByText('Fetching Missions')).toBeInTheDocument();
  });

  it('renders error message when error occurs', () => {
    initialState.missions.error = 'An error occurred';
    const { container } = render(
      <Provider store={mockStore(initialState)}>
        <Missions />
      </Provider>
    );

    expect(screen.getByText('Error occurred while fetching missions')).toBeInTheDocument();
  });
});
