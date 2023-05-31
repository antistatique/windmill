import { act, render, screen } from '@testing-library/react';

import DaySelection from '@/components/day/DayNavigation';
import useWeek from '@/hooks/week';
import Day from '@/interfaces/day';
import Week from '@/interfaces/week';
import moment from '@/libs/moment.config';
import useDateStore from '@/stores/date';

import 'moment/locale/fr';
import '@testing-library/jest-dom';

const { setDay } = useDateStore.getState();

const date = moment('2023-01-01').startOf('week');

const days = [
  { date: date.toDate() },
  { date: date.weekday(1).toDate() },
  { date: date.weekday(2).toDate() },
  { date: date.weekday(3).toDate() },
  { date: date.weekday(4).toDate() },
];

const mockedUseWeek = useWeek as jest.Mock;
jest.mock('../../hooks/week');

beforeEach(() => {
  mockedUseWeek.mockImplementation(() => ({
    status: 'success',
    data: { days } as Week,
  }));
  setDay(days[0] as Day);
});

describe('day navigation', () => {
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
    const setDaySpy = jest.spyOn(useDateStore.getState(), 'setDay');

    render(<DaySelection />);

    act(() => {
      screen.getByText('27').closest('button')?.click();
    });

    expect(setDaySpy).toHaveBeenCalledWith(days[1] as Day);
  });
});
