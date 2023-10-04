import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MissionCard from '../components/MissionCard';

describe('MissionCard Component', () => {
  it('renders MissionCard correctly with active member button', () => {
    const props = {
      name: 'Mission Name',
      description: 'Mission Description',
      reserved: true,
      id: 'mission_id',
    };

    render(<MissionCard props={props} />);

    expect(screen.getByText('Mission Name')).toBeInTheDocument();
    expect(screen.getByText('Mission Description')).toBeInTheDocument();

    expect(screen.getByText('active member')).toBeInTheDocument();
  });

  it('renders MissionCard correctly with not a member button', () => {
    const props = {
      name: 'Mission Name',
      description: 'Mission Description',
      reserved: false,
      id: 'mission_id',
    };

    render(<MissionCard props={props} />);

    expect(screen.getByText('Mission Name')).toBeInTheDocument();
    expect(screen.getByText('Mission Description')).toBeInTheDocument();

    expect(screen.getByText('Not a member')).toBeInTheDocument();
  });

});
