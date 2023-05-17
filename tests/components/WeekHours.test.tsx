/* eslint-disable import/no-extraneous-dependencies */
import { QueryClient, QueryClientProvider } from 'react-query';
import { act, render, screen } from '@testing-library/react';
import moment from 'moment';

import WeekHours from '@/components/WeekHours';
import { Statuses } from '@/helpers/mapEmojiToStatus';
import Week from '@/interfaces/week';
import useStore from '@/stores/date';

import '@testing-library/jest-dom';

const { setWeek } = useStore.getState();

const date = moment();
const start = date.startOf('week');
const week: Week = {
  week_start: start.format('YYYY-MM-DD'),
  week_number: date.week(),
  name: 'John',
  email: 'john@mail',
  days: [
    {
      date: moment(start).toDate(),
      status: Statuses.WORKING,
      hours_todo: 8.0,
      hours_done: 8.0,
      total: 8.0,
      am_start: '08:00',
      am_stop: '12:00',
      pm_start: '13:00',
      pm_stop: '17:00',
    },
  ],
  hours_done: 8.0,
  hours_todo: 42.0,
  need_justification: false,
  justification: '',
};

beforeEach(() => {
  act(() => {
    setWeek(week);
  });
});

const renderComponent = () => {
  act(() => {
    render(
      <QueryClientProvider client={new QueryClient()}>
        <WeekHours />
      </QueryClientProvider>
    );
  });
};

describe('week hours', () => {
  it('should display the hours of the week todo', () => {
    renderComponent();

    expect(screen.getByText('08:00')).toBeInTheDocument();
  });

  it('should display the hours of the week done', () => {
    renderComponent();

    expect(screen.getByText('42:00')).toBeInTheDocument();
  });

  describe('justification', () => {
    const emojiName = 'Thinking face emoji';

    it("should not display emoji if week don't need justification", () => {
      Date.now = jest.fn(() => date.weekday(5).toDate().getTime());

      renderComponent();
      const emoji = screen.queryByAltText(emojiName);

      expect(emoji).not.toBeInTheDocument();
    });

    it("should not display emoji if it's current week but this isn't last working day of the week", () => {
      act(() => {
        setWeek({ ...week, need_justification: true });
      });
      Date.now = jest.fn(() => date.weekday(1).toDate().getTime());

      renderComponent();
      const emoji = screen.queryByAltText(emojiName);

      expect(emoji).not.toBeInTheDocument();
    });

    it("should display emoji if week need justification and it's the last working day of the current week", () => {
      act(() => {
        setWeek({ ...week, need_justification: true });
      });
      Date.now = jest.fn(() => date.weekday(5).toDate().getTime());

      renderComponent();
      const emoji = screen.queryByAltText(emojiName);

      expect(emoji).toBeInTheDocument();
    });

    it("should display emoji if week need justification and it's a past week", () => {
      act(() => {
        setWeek({ ...week, week_number: 1, need_justification: true });
      });
      Date.now = jest.fn(() => date.week(2).weekday(1).toDate().getTime());

      renderComponent();
      const emoji = screen.queryByAltText(emojiName);

      expect(emoji).toBeInTheDocument();
    });
  });
});
