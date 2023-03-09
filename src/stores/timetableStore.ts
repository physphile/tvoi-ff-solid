import { stringifyDate } from './../utils/date';
import { createStore } from 'solid-js/store';
import { Event, Lecturer, Room } from '../api/models';

interface TimetableStore {
	events: {
		[id: number]: Event;
	};
	days: {
		[date: string]: number[];
	};
	lecturers: {
		[id: number]: Lecturer;
	};
	rooms: {
		[id: number]: Room;
	};
	eventsList: (date: Date) => Event[];
}

const initialValue: TimetableStore = {
	events: {},
	days: {},
	lecturers: {},
	rooms: {},

	eventsList(date) {
		const events: Event[] = [];
		for (const id of this.days[stringifyDate(date)]) {
			events.push(this.events[id]);
		}
		return events;
	},
};

export const [timetableStore, setTimetableStore] = createStore(initialValue);
