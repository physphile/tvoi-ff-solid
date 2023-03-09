interface Error {
	loc: [string, number];
	msg: string;
	type: string;
}

export interface ErrorResponse {
	detail: Error[];
}

export type ArrayResponse<I> = {
	items: I[];
	limit: number;
	offset: number;
	total: number;
};

export interface Event {
	id: number;
	name: string;
	room: Room[];
	group: Group;
	lecturer: Lecturer[];
	start_ts: string;
	end_ts: string;
}

export interface Group {
	id: number;
	name: string;
	number: string;
}

export interface Lecturer {
	id: number;
	first_name: string;
	middle_name: string;
	last_name: string;
	avatar_id: number;
	avatar_link: string;
	description: string;
}

export interface Room {
	id: number;
	name: string;
	building: string;
	direction: string;
}

export interface Category {
	id: number;
	order: number;
	type: 'grid3' | 'list';
	name: string;
}

export interface Button {
	id: number;
	order: number;
	icon: string;
	name: string;
	link: string;
	type: 'internal' | 'external';
}

export interface App {
	icon: string | { src: string };
	text: string;
	path: string;
}

export interface AppCategory {
	name: string;
	type: 'grid3' | 'list';
	items: App[];
}
