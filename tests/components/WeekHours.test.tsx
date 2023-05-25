import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { fireEvent, render, screen } from '@testing-library/react';
import moment from 'moment';

import WeekHours from '@/components/WeekHours';
import Day from '@/interfaces/day';
import Week from '@/interfaces/week';
import useStore from '@/stores/date';

import '@testing-library/jest-dom';

const { setWeek } = useStore.getState();

const date = moment('2023-01-01').startOf('week');

const week: Week = {
  week_start: date.startOf('week').format('YYYY-MM-DD'),
  week_number: date.week(),
  days: [] as Day[],
  hours_done: 8.0,
  hours_todo: 42.0,
  need_justification: false,
} as Week;

const renderComponent = () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <WeekHours />
    </QueryClientProvider>
  );
};

beforeEach(() => {
  setWeek(week);
});

describe('week hours', () => {
  it('should display the hours of the week todo', () => {
    renderComponent();

    expect(screen.getByText('08:00')).toBeInTheDocument();
  });

  it('should display the hours of the week done', () => {
    renderComponent();

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
    setWeek({ ...week, need_justification: true });
    Date.now = jest.fn(() => date.weekday(1).toDate().getTime());

    renderComponent();

    const emoji = screen.queryByAltText(emojiName);
    const justifyButton = screen.getByText('Justifier');

    expect(emoji).not.toBeInTheDocument();
    expect(justifyButton).not.toHaveClass('bg-pink');
  });

  it("should display emoji if week need justification and it's the last working day of the current week", () => {
    setWeek({ ...week, need_justification: true });
    Date.now = jest.fn(() => date.weekday(5).toDate().getTime());

    renderComponent();

    const emoji = screen.queryByAltText(emojiName);
    const justifyButton = screen.getByText('Justifier');

    expect(emoji).toBeInTheDocument();
    expect(justifyButton).toHaveClass('bg-pink');
  });

  it("should display emoji if week need justification and it's a past week", () => {
    setWeek({ ...week, week_number: 1, need_justification: true });
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

      setWeek({ ...week, justification });

      renderComponent();

      const justifyButton = screen.getByText('Justifier');
      fireEvent.click(justifyButton);

      expect(screen.getByText('Justifier vos heures')).toBeInTheDocument();
      expect(screen.getByRole('textbox')).toHaveValue(justification);
    });
  });
});
