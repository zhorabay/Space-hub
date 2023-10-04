import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('renders the Navbar with correct branding', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );

    expect(screen.getByText("Space Travellers' Hub")).toBeInTheDocument();
  });

  it('highlights the active link', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>,
    );

    const rocketsLink = screen.getByText('Rockets');
    userEvent.click(rocketsLink);

    expect(rocketsLink).toHaveClass('active-link');

    const missionsLink = screen.getByText('Missions');
    userEvent.click(missionsLink);

    expect(missionsLink).toHaveClass('active-link');

    const myProfileLink = screen.getByText('My Profile');
    userEvent.click(myProfileLink);

    expect(myProfileLink).toHaveClass('active-link');
  });
});
