import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fireEvent, render, screen } from '@testing-library/react';

import WeekHours from '@/components/WeekHours';
import useWeek from '@/hooks/week';
import Week from '@/interfaces/week';
import moment from '@/libs/moment.config';

import '@testing-library/jest-dom';

const date = moment('2023-01-01').startOf('week');

const week: Week = {
  weekNumber: date.week(),
  days: [{ amStart: '08:00', amStop: '12:00' }],
  hoursTodo: 42.0,
  needJustification: false,
} as Week;

const mockedUseWeek = useWeek as jest.Mock;
jest.mock('../../hooks/week');

const renderComponent = () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <WeekHours />
    </QueryClientProvider>
  );
};

beforeEach(() => {
  mockedUseWeek.mockImplementation(() => ({
    status: 'success',
    data: week,
  }));
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('week hours', () => {
  it('should display the hours of the week todo', () => {
    renderComponent();

    expect(useWeek).toHaveBeenCalled();
    expect(screen.getByText('04:00')).toBeInTheDocument();
  });

  it('should display the hours of the week done', () => {
    renderComponent();

    expect(useWeek).toHaveBeenCalled();
    expect(screen.getByText('42:00')).toBeInTheDocument();
  });
});

describe('justification', () => {
  const emojiName = 'Thinking face emoji';

  beforeEach(() => {
    const originalDate = moment('2023-01-01').startOf('week');
    Date.now = jest.fn(() => originalDate.toDate().getTime());
  });

  it("should not display emoji if week don't need justification", () => {
    Date.now = jest.fn(() => date.weekday(5).toDate().getTime());

    renderComponent();

    const emoji = screen.queryByAltText(emojiName);
    const justifyButton = screen.getByText('Justifier');

    expect(emoji).not.toBeInTheDocument();
    expect(justifyButton).not.toHaveClass('bg-pink');
  });

  it("should not display emoji if it's current week but this isn't last working day of the week", () => {
    mockedUseWeek.mockImplementation(() => ({
      status: 'success',
      data: { ...week, needJustification: true },
    }));
    Date.now = jest.fn(() => date.weekday(1).toDate().getTime());

    renderComponent();

    const emoji = screen.queryByAltText(emojiName);
    const justifyButton = screen.getByText('Justifier');

    expect(emoji).not.toBeInTheDocument();
    expect(justifyButton).not.toHaveClass('bg-pink');
  });

  it("should display emoji if week need justification and it's the last working day of the current week", () => {
    mockedUseWeek.mockImplementation(() => ({
      status: 'success',
      data: { ...week, needJustification: true },
    }));
    Date.now = jest.fn(() => date.weekday(5).toDate().getTime());

    renderComponent();

    const emoji = screen.queryByAltText(emojiName);
    const justifyButton = screen.getByText('Justifier');

    expect(emoji).toBeInTheDocument();
    expect(justifyButton).toHaveClass('bg-pink');
  });

  it("should display emoji if week need justification and it's a past week", () => {
    mockedUseWeek.mockImplementation(() => ({
      status: 'success',
      data: { ...week, weekNumber: 1, needJustification: true },
    }));
    Date.now = jest.fn(() => date.week(2).weekday(1).toDate().getTime());

    renderComponent();

    const emoji = screen.queryByAltText(emojiName);
    const justifyButton = screen.getByText('Justifier');

    expect(emoji).toBeInTheDocument();
    expect(justifyButton).toHaveClass('bg-pink');
  });

  describe('form modal', () => {
    it('should be open when the justify button is clicked', () => {
      const handleOpenJustifyModal = jest.fn();
      const useStateSpy = jest.spyOn(React, 'useState');
      useStateSpy.mockReturnValue([false, handleOpenJustifyModal]);

      renderComponent();

      const justifyButton = screen.getByText('Justifier');
      fireEvent.click(justifyButton);

      expect(handleOpenJustifyModal).toHaveBeenCalled();

      useStateSpy.mockRestore();
    });

    it('should display the justification text', () => {
      const justification = 'justification test value';

      mockedUseWeek.mockImplementation(() => ({
        status: 'success',
        data: { ...week, justification },
      }));

      renderComponent();

      const justifyButton = screen.getByText('Justifier');
      fireEvent.click(justifyButton);

      expect(screen.getByText('Justifier vos heures')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveValue(justification);
    });
  });
});
