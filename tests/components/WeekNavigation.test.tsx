/* eslint-disable import/no-extraneous-dependencies */
import { QueryClient, QueryClientProvider } from 'react-query';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import moment from 'moment';

import WeekNavigation from '@/components/WeekNavigation';
import Day from '@/interfaces/day';
import useStore from '@/stores/date';

import '@testing-library/jest-dom';

const { setDay } = useStore.getState();

const renderComponent = () => {
  act(() => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <WeekNavigation />
      </QueryClientProvider>
    );
  });
};

describe('week navigation', () => {
  it('should display the current week as default', async () => {
    renderComponent();

    const exceptedDate = moment().locale('fr').format('MMMM YYYY');
    const exceptedWeek = `Semaine ${moment().week()}`;

    expect(await screen.findByText(exceptedWeek)).toBeInTheDocument();
    expect(await screen.findByText(exceptedDate)).toBeInTheDocument();
  });

  it('should decrease the week when clicking on the left arrow', async () => {
    renderComponent();

    const date = moment().subtract(1, 'week');
    const exceptedWeek = `Semaine ${date.week()}`;

    const previousWeekBtn = await screen.findByLabelText('Semaine précédente');
    fireEvent.click(previousWeekBtn);

    expect(await screen.findByText(exceptedWeek)).toBeInTheDocument();
  });

  it('should increase the week when clicking on the right arrow', async () => {
    renderComponent();

    const date = moment().add(1, 'week');
    const exceptedWeek = `Semaine ${date.week()}`;

    const nextWeekBtn = await screen.findByLabelText('Semaine suivante');
    fireEvent.click(nextWeekBtn);

    expect(await screen.findByText(exceptedWeek)).toBeInTheDocument();
  });

  describe('today button', () => {
    it('should not display the today button when date is current date', async () => {
      renderComponent();

      await waitFor(() => {
        expect(screen.queryByText("Aujourd'hui")).not.toBeInTheDocument();
      });
    });

    it('should display the today button when date is not today', async () => {
      setDay({ date: moment().subtract(1, 'week').toDate() } as Day);

      renderComponent();

      expect(await screen.findByText("Aujourd'hui")).toBeInTheDocument();
    });
  });
});
