import { QueryClient, QueryClientProvider } from 'react-query';
import { act, fireEvent, render, screen } from '@testing-library/react';

import WeekNavigation from '@/components/week/WeekNavigation';
import useWeek from '@/hooks/useWeek';
import Day from '@/interfaces/day';
import Week from '@/interfaces/week';
import moment from '@/libs/moment.config';
import useDateStore from '@/stores/date';

import '@testing-library/jest-dom';

const { setWeekNumber, setDay } = useDateStore.getState();

const date = moment('2023-01-02');

const week: Week = {
  weekNumber: date.week(),
  days: [
    { date: date.toDate() },
    { date: date.weekday(1).toDate() },
    { date: date.weekday(2).toDate() },
    { date: date.weekday(3).toDate() },
    { date: date.weekday(4).toDate() },
  ],
} as Week;

const mockedUseWeek = useWeek as jest.Mock;
jest.mock('../../hooks/useWeek');

const renderComponent = () => {
  render(
    <QueryClientProvider client={new QueryClient()}>
      <WeekNavigation />
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

describe('week navigation', () => {
  beforeEach(() => {
    setWeekNumber(1);
  });

  it('should display the current week as default', async () => {
    renderComponent();

    expect(screen.getByText('Semaine 1')).toBeInTheDocument();
  });

  it("should not decrease the week when clicking on previous week button if it's the first week of the year", async () => {
    renderComponent();

    const previousWeekBtn = await screen.findByLabelText('Semaine précédente');
    fireEvent.click(previousWeekBtn);

    expect(screen.getByText('Semaine 1')).toBeInTheDocument();
  });

  it('should decrease the week when clicking on previous week button', async () => {
    setWeekNumber(2);

    renderComponent();

    const previousWeekBtn = await screen.findByLabelText('Semaine précédente');
    fireEvent.click(previousWeekBtn);

    expect(screen.getByText('Semaine 1')).toBeInTheDocument();
  });

  it('should not increase the week when clicking on next week button if it is the last week of the year', async () => {
    setWeekNumber(52);

    renderComponent();

    const nextWeekBtn = await screen.findByLabelText('Semaine suivante');
    fireEvent.click(nextWeekBtn);

    expect(screen.getByText('Semaine 52')).toBeInTheDocument();
  });

  it('should increase the week when clicking on next week button', async () => {
    renderComponent();

    const nextWeekBtn = await screen.findByLabelText('Semaine suivante');
    fireEvent.click(nextWeekBtn);

    expect(screen.getByText('Semaine 2')).toBeInTheDocument();
  });

  describe('today button', () => {
    it("should not display the today button when day it's current day", () => {
      Date.now = jest.fn(() => date.toDate().getTime());

      renderComponent();

      act(() => {
        setDay({ date: date.toDate() } as Day);
      });

      expect(screen.queryByText("Aujourd'hui")).not.toBeInTheDocument();
    });

    it('should display the today button when selected day is not today and today is a working day', () => {
      Date.now = jest.fn(() => date.toDate().getTime());

      renderComponent();

      act(() => {
        setDay({ date: moment(date).weekday(1).toDate() } as Day);
      });

      expect(screen.getByText("Aujourd'hui")).toBeInTheDocument();
    });

    it('should not display the today button when selected day is not today but today is not a working day', () => {
      Date.now = jest.fn(() => moment(date).weekday(6).toDate().getTime());

      renderComponent();

      act(() => {
        setDay({ date: moment(date).weekday(1).toDate() } as Day);
      });

      expect(screen.queryByText("Aujourd'hui")).not.toBeInTheDocument();
    });
  });
});
