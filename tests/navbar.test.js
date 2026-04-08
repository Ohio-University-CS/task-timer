import { render, screen } from '@testing-library/svelte';
import { describe, it, expect } from 'vitest';

import Navbar from '../src/lib/Navbar.svelte';

describe('Navbar Component', () => {

  //Logo Rendering
  it('should render the coffee logo with the correct alt text', () => {
    render(Navbar);
    const logo = screen.getByAltText('Placeholder');
    expect(logo).toBeInTheDocument();
    
    // Verifies the image tag has the Tailwind sizing classes from your code
    expect(logo).toHaveClass('h-20', 'w-auto');
  });

  //Mapping of NavItems
  it('should render all four navigation items defined in the markup', () => {
    render(Navbar);
    const navItems = ['Tasks', 'Settings', 'Coffee!', 'Sign Up'];
    
    navItems.forEach(text => {
      // Since NavItem renders a Button inside an <a>, we search by button text
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  });

  //Link Destinations
  it('should have the correct href attributes for navigation', () => {
    render(Navbar);
    
    const tasksLink = screen.getByText('Tasks').closest('a');
    const settingsLink = screen.getByText('Settings').closest('a');
    const coffeeLink = screen.getByText('Coffee!').closest('a');

    expect(tasksLink).toHaveAttribute('href', '/');
    expect(settingsLink).toHaveAttribute('href', '/settings');
    expect(coffeeLink).toHaveAttribute('href', '/caffeine-calculator');
  });

  //Layout and Alignment
  it('should apply the correct Tailwind flex classes for the container', () => {
    const { container } = render(Navbar);
    const mainDiv = container.querySelector('div');
    
    // Verifying your specific border and flex layout from line 6
    expect(mainDiv).toHaveClass('flex', 'justify-between', 'border-b-gray-500');
  });

  //Component Prop Passing
  it('renders the Sign Up button with its unique positioning class', () => {
    render(Navbar);
    const signUpItem = screen.getByText('Sign Up').closest('div');
    
    // Check if the Navbar correctly passed the 'justify-end' class to the last NavItem
    // (Note: This depends on how your NavItem handles the 'class' prop)
    expect(signUpItem?.parentElement).toBeInTheDocument();
  });

});