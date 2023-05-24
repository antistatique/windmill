/* eslint-disable import/no-extraneous-dependencies */
import { act, render, screen } from '@testing-library/react';

import { getItemMock } from '@/__mocks__/localstorage';
import Nudge from '@/components/parameters/Nudge';
import { DEFAULT_NUDGE_MINUTES } from '@/configs/worktime';

import '@testing-library/jest-dom';

describe('week navigation', () => {
  it('should show default nudge as selected when no local storage', () => {
    getItemMock.mockReturnValue(null);

    render(<Nudge />);

    expect(screen.getByText(`${DEFAULT_NUDGE_MINUTES}'`)).toHaveClass(
      'outline-pink'
    );
  });

  it('should show nudge from local storage as selected', () => {
    getItemMock.mockReturnValue(30);

    render(<Nudge />);

    expect(screen.getByText("30'")).toHaveClass('outline-pink');
  });

  it('should set nudge in local storage', () => {
    getItemMock.mockReturnValue(30);

    render(<Nudge />);

    expect(screen.getByText("30'")).toHaveClass('outline-pink');

    act(() => {
      screen.getByText("15'").click();
    });

    expect(localStorage.setItem).toHaveBeenCalledWith('nudge', '15');
  });
});
