/* eslint-disable import/no-extraneous-dependencies */
import { act, render, screen } from '@testing-library/react';
import moment from 'moment';

import DaySelection from '@/components/DaySelection';
import { Statuses } from '@/helpers/mapEmojiToStatus';
import Day from '@/interfaces/day';
import Week from '@/interfaces/week';
import useStore from '@/stores/date';

import 'moment/locale/fr';
import '@testing-library/jest-dom';

const { setWeek, setDay } = useStore.getState();

describe('day selection', () => {
  const date = moment('2023-01-01').startOf('week');

  const days = [
    {
      date: date.toDate(),
      status: Statuses.WORKING,
      hours_done: 8.0,
      hours_todo: 8.4,
    } as Day,
    {
      date: date.weekday(1).toDate(),
      status: Statuses.FORMATION,
      hours_done: 0,
      hours_todo: 0,
    },
    {
      date: date.weekday(2).toDate(),
      status: Statuses.DAY_OFF,
      hours_done: 8.4,
      hours_todo: 8.4,
    },
    {
      date: date.weekday(3).toDate(),
      status: Statuses.SICK,
      hours_done: 0,
      hours_todo: 8.4,
    },
    {
      date: date.weekday(4).toDate(),
      status: Statuses.PUBLIC_HOLIDAY,
      hours_done: 0,
      hours_todo: 0,
    },
  ];

  beforeEach(() => {
    setWeek({ days } as Week);
    setDay(days[0] as Day);
  });

  it('should display the days of the week', () => {
    render(<DaySelection />);

    // Monday
    expect(screen.getByText('26')).toBeInTheDocument();
    expect(screen.getByText('lu')).toBeInTheDocument();

    // Tuesday
    expect(screen.getByText('27')).toBeInTheDocument();
    expect(screen.getByText('ma')).toBeInTheDocument();

    // Wednesday
    expect(screen.getByText('28')).toBeInTheDocument();
    expect(screen.getByText('me')).toBeInTheDocument();

    // Thursday
    expect(screen.getByText('29')).toBeInTheDocument();
    expect(screen.getByText('je')).toBeInTheDocument();

    // Friday
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('ve')).toBeInTheDocument();
  });

  it("should highlight the current day if it's the current week", () => {
    Date.now = jest.fn(() => date.weekday(0).toDate().getTime());

    render(<DaySelection />);

    expect(screen.getByText('27')).not.toHaveClass('text-pink');
    expect(screen.getByText('28')).not.toHaveClass('text-pink');
    expect(screen.getByText('29')).not.toHaveClass('text-pink');
    expect(screen.getByText('30')).not.toHaveClass('text-pink');

    expect(screen.getByText('26')).toHaveClass('text-pink');
  });

  it('should not highlight the any day if it is not the current week', () => {
    Date.now = jest.fn(() => date.weekday(0).add(1, 'week').toDate().getTime());

    render(<DaySelection />);

    expect(screen.getByText('26')).not.toHaveClass('text-pink');
    expect(screen.getByText('27')).not.toHaveClass('text-pink');
    expect(screen.getByText('28')).not.toHaveClass('text-pink');
    expect(screen.getByText('29')).not.toHaveClass('text-pink');
    expect(screen.getByText('30')).not.toHaveClass('text-pink');
  });

  it('should outline the selected day', () => {
    setDay(days[1] as Day);

    render(<DaySelection />);

    expect(screen.getByText('26').closest('button')).not.toHaveClass(
      'outline-pink'
    );
    expect(screen.getByText('28').closest('button')).not.toHaveClass(
      'outline-pink'
    );
    expect(screen.getByText('29').closest('button')).not.toHaveClass(
      'outline-pink'
    );
    expect(screen.getByText('30').closest('button')).not.toHaveClass(
      'outline-pink'
    );

    expect(screen.getByText('27').closest('button')).toHaveClass(
      'outline-pink'
    );
  });

  it('should store the selected day in the store on click', () => {
    const setDaySpy = jest.spyOn(useStore.getState(), 'setDay');

    render(<DaySelection />);

    act(() => {
      screen.getByText('27').closest('button')?.click();
    });

    expect(setDaySpy).toHaveBeenCalledWith(days[1] as Day);
  });
});
