import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Navbar from '../components/Navbar';

describe('Navbar Component', () => {
  it('renders the logo and brand name', () => {
    render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    expect(screen.getByAltText('logo')).toBeInTheDocument();
    expect(screen.getByText("Space Travellers' Hub")).toBeInTheDocument();
  });

  it('renders navigation links with active class when active', () => {
    const { container } = render(
      <BrowserRouter>
        <Navbar />
      </BrowserRouter>
    );

    const rocketsLink = screen.getByText('Rockets');
    const missionsLink = screen.getByText('Missions');
    const myProfileLink = screen.getByText('My Profile');

    expect(rocketsLink).not.toHaveClass('active-link');
    expect(missionsLink).not.toHaveClass('active-link');
    expect(myProfileLink).not.toHaveClass('active-link');

    userEvent.click(rocketsLink);
    userEvent.click(missionsLink);
    userEvent.click(myProfileLink);

    expect(rocketsLink).toHaveClass('active-link');
    expect(missionsLink).toHaveClass('active-link');
    expect(myProfileLink).toHaveClass('active-link');
  });
});
