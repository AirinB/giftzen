import { cleanup, render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import AddGiftButton from './AddGiftButton';
import { MemoryRouter } from 'react-router-dom';
import { useAlerts } from '../contexts/AlertsContext';
import { useAuth } from '../contexts/AuthContext';

jest.mock('../contexts/AuthContext', () => ({
  useAuth: jest.fn(() => ({})),
}));

jest.mock('../contexts/AlertsContext', () => ({
  useAlerts: jest.fn(),
}));

const useAlertsReturnValue = { setMessage: jest.fn() };

describe('test button behaviour', () => {
  beforeEach(() => {
    useAlerts.mockReturnValue(useAlertsReturnValue);
  });

  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test('loads and does not display alert', async () => {
    useAuth.mockReturnValue({ currentUser: { uid: 1 } });
    render(<AddGiftButton />, { wrapper: MemoryRouter });
    const button = screen.getByText('Add Gift Idea');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(useAlerts).toHaveBeenCalledTimes(1);
    expect(useAlertsReturnValue.setMessage).toHaveBeenCalledTimes(0);
    expect(useAlertsReturnValue.setMessage).not.toHaveBeenCalled();
  });

  test('button displays alert', async () => {
    useAuth.mockReturnValue({ currentUser: null });
    render(<AddGiftButton />, { wrapper: MemoryRouter });
    const button = screen.getByText('Add Gift Idea');
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
    expect(useAlerts).toHaveBeenCalledTimes(1);
    expect(useAlertsReturnValue.setMessage).toHaveBeenCalledTimes(1);
    expect(useAlertsReturnValue.setMessage).toHaveBeenCalledWith(
      'You must be logged in to add a gift'
    );
  });
});
