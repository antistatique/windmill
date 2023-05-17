/* eslint-disable import/no-extraneous-dependencies */
import { act, render, screen } from '@testing-library/react';
import moment from 'moment';

import WeekNavigation from '@/components/WeekNavigation';
import { Statuses } from '@/helpers/mapEmojiToStatus';
import Day from '@/interfaces/day';
import useStore from '@/stores/date';

import '@testing-library/jest-dom';

const { setDay } = useStore.getState();

const renderComponent = () => {
  act(() => {
    render(<WeekNavigation />);
  });
};

describe('week navigation', () => {
  it('should display the current week as default', () => {
    act(() => {
      render(<WeekNavigation />);
    });

    const date = moment();

    const exceptedDate = date.locale('fr').format('MMMM YYYY');
    const exceptedWeek = `Semaine ${date.week()}`;

    expect(screen.getByText(exceptedDate)).toBeInTheDocument();
    expect(screen.getByText(exceptedWeek)).toBeInTheDocument();
  });

  it('should decrease the week when clicking on the left arrow', () => {
    renderComponent();

    const date = moment().subtract(1, 'week');

    const exceptedWeek = `Semaine ${date.week()}`;

    const leftArrow = screen.getByLabelText('Semaine précédente');

    act(() => {
      leftArrow.click();
    });

    expect(screen.getByText(exceptedWeek)).toBeInTheDocument();
  });

  it('should increase the week when clicking on the right arrow', () => {
    renderComponent();

    const date = moment().add(1, 'week');

    const exceptedWeek = `Semaine ${date.week()}`;

    const rightArrow = screen.getByLabelText('Semaine suivante');

    act(() => {
      rightArrow.click();
    });

    expect(screen.getByText(exceptedWeek)).toBeInTheDocument();
  });

  describe('today button', () => {
    it('should not display the today button when date is current date', () => {
      renderComponent();

      const button = screen.queryByText("Aujourd'hui");

      expect(button).not.toBeInTheDocument();
    });

    it('should display the today button when date is not today', () => {
      const day: Day = {
        date: moment().subtract(1, 'week').toDate(),
        status: Statuses.WORKING,
        hours_done: 0,
        hours_todo: 8,
        total: 0,
        am_start: '',
        am_stop: '',
        pm_start: '',
        pm_stop: '',
      };

      setDay(day);

      renderComponent();

      const button = screen.getByText("Aujourd'hui");

      expect(button).toBeInTheDocument();
    });
  });
});
