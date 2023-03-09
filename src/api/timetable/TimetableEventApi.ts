import { ArrayResponse } from './../models';
import { TimetableBaseApi } from './TimetaleBaseApi';
import { Event } from '../models';

type ModifyEventBody = Pick<Event, 'name' | 'start_ts' | 'end_ts'> & {
	room_id: number[];
	group_id: number;
	lecturer_id: number[];
};

interface GetEventsParams {
	start?: string;
	end?: string;
	group_id?: number;
	lecturer_id?: number;
	room_id?: number;
	detail?: Array<'comment' | 'description'>;
	format?: 'json' | 'ics';
	limit?: number;
	offset?: number;
}

class TimetableEventApi extends TimetableBaseApi {
	constructor() {
		super();
		this.url += '/event';
	}

	public async getEvent(id: number) {
		return this.get<Event>(`/${id}`);
	}

	public async deleteEvent(id: number) {
		return this.delete<string>(`/${id}`);
	}

	public async patchEvent(id: number, body: ModifyEventBody) {
		return this.patch<Event, ModifyEventBody>(`/${id}`, body);
	}

	public async getEvents(params?: GetEventsParams) {
		return this.get<ArrayResponse<Event>, GetEventsParams>('/', params);
	}

	public async createEvent(event: ModifyEventBody) {
		return this.post<Event, ModifyEventBody>('/', event);
	}

	public async createEvents(events: ModifyEventBody[]) {
		return this.post<Event[], ModifyEventBody[]>('/bulk', events);
	}

	public async deleteEvents(start: string, end: string) {
		return this.delete('/bulk', { start, end });
	}
}

export const timetableEventApi = new TimetableEventApi();
