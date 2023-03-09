import {
	Component,
	For,
	Show,
	Suspense,
	createEffect,
	createMemo,
	createResource,
	createSignal,
	onCleanup,
	onMount,
} from 'solid-js';
import { LocalStorage } from '../../models';
import { A, useNavigate, useParams } from '@solidjs/router';
import { timetableEventApi } from '../../api/timetable';
import { DataRow, DateNavigation, MenuItem, Toolbar } from '../../components';
import {
	getDateWithDayOffset,
	formatTime,
	getNameWithInitials,
	parseDate,
	stringifyDate,
	stringifyDateIso,
	cn,
} from '../../utils';

import classes from './PageTimetable.module.css';
import { Lecturer, Room } from '../../api/models';
import { setTimetableStore, timetableStore } from '../../stores';
import { produce } from 'solid-js/store';
import { ActionLink } from '../../components/Toolbar/Toolbar';
import { Calendar, Icon } from '../../components/lib';

interface FormatEventInfoArgs {
	lecturer?: Lecturer[];
	room?: Room[];
}
export const formatEventInfo = ({ lecturer, room }: FormatEventInfoArgs) => {
	const lecturers = lecturer
		?.map(({ first_name, last_name, middle_name }) =>
			getNameWithInitials({
				firstName: first_name,
				lastName: last_name,
				middleName: middle_name,
			}),
		)
		.join(', ');

	const rooms = room?.map(({ name }) => name).join(', ');

	return [lecturers, rooms].filter(e => Boolean(e)).join(' • ');
};

const fetchEvents = async (date: Date) => {
	const { data } = await timetableEventApi.getEvents({
		group_id: LocalStorage.getGroup().id,
		start: stringifyDateIso(date),
		end: stringifyDateIso(getDateWithDayOffset(date, 1)),
	});

	setTimetableStore(
		produce(prev => {
			for (const event of data.items) {
				prev.events[event.id] = event;

				for (const room of event.room) {
					prev.rooms[room.id] = room;
				}

				for (const lecturer of event.lecturer) {
					prev.lecturers[lecturer.id] = lecturer;
				}
			}
		}),
	);

	setTimetableStore('days', prev => ({ ...prev, [stringifyDate(date)]: data.items.map(i => i.id) }));

	return data.items;
};

const PageTimetable: Component = () => {
	const navigate = useNavigate();
	const params = useParams();

	let expander: HTMLButtonElement | undefined = undefined;
	let calendar: HTMLDivElement | undefined = undefined;

	const [getDate, setDate] = createSignal(parseDate(params.date));
	createEffect(() => {
		if (params.date !== stringifyDate(getDate())) {
			setDate(parseDate(params.date));
		}
	}, [params.date]);

	const clickOutsideHandler = (e: MouseEvent) => {
		if (e.target !== expander && e.target !== calendar) {
			setShowCalendar(false);
		}
	};

	onMount(async () => {
		const group = LocalStorage.getGroup();

		if (!group) {
			navigate('/timetable/init');
		} else {
			// если мы сегодня еще не загружали расписание на две недели вперед, делаем это
			if (LocalStorage.getLastTwoWeeksPreloadDate() !== stringifyDate(new Date())) {
				for (let i = 1; i < 14; ++i) {
					fetchEvents(getDateWithDayOffset(parseDate(params.date), i));
				}
				LocalStorage.setLastTwoWeeksPreloadDate(new Date());
			}
		}

		document.addEventListener('click', clickOutsideHandler);
	});

	onCleanup(() => {
		document.removeEventListener('click', clickOutsideHandler);
	});

	const [events] = createResource(
		getDate,
		date => {
			if (stringifyDate(date) in timetableStore.days) {
				return timetableStore.eventsList(date);
			} else if (LocalStorage.getGroup()) {
				return fetchEvents(date);
			} else {
				return [];
			}
		},
		{ initialValue: [] },
	);

	const changeGroup = () => {
		LocalStorage.removeGroup();
		navigate('/timetable/init');
	};

	const getMenuItems = createMemo<MenuItem[]>(() => [{ name: 'Изменить группу', onClick: changeGroup }]);
	const getActions = createMemo<ActionLink[]>(() => [
		{
			icon: 'today',
			href: `/timetable/${stringifyDate(new Date())}`,
			ariaLabel: 'Вернуться к сегодняшнему дню',
		},
	]);

	const [getShowCalendar, setShowCalendar] = createSignal(false);

	const changeHandler = (date: Date) => {
		setShowCalendar(false);
		navigate(`/timetable/${stringifyDate(date)}`);
	};

	return (
		<>
			<Toolbar menuItems={getMenuItems()} actions={getActions()} title="" ref={toolbar}>
				<button
					type="button"
					class={classes.expander}
					aria-expanded={getShowCalendar()}
					aria-controls="calendar"
					onClick={() => setShowCalendar(prev => !prev)}
					ref={expander}
				>
					<span class={classes.date}>
						{getDate().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
					</span>
					<span class={classes.group}>{`Группа ${LocalStorage.getGroup()?.number ?? ''}`}</span>
					<Icon name="expand_more" class={classes.expanderIcon} />
				</button>
				<div
					class={classes.calendar}
					classList={{ [classes.hidden]: !getShowCalendar() }}
					id="calendar"
					ref={calendar}
					onClick={e => e.stopImmediatePropagation()}
				>
					<Calendar value={getDate} onChange={changeHandler} />
				</div>
			</Toolbar>
			<main class={cn('container', 'main', classes.main)}>
				<DateNavigation date={getDate()} class={classes.dateNavigation} />
				<Suspense fallback="Загрузка...">
					<ul>
						<For each={events()}>
							{({ id, name, lecturer, room, start_ts, end_ts }) => (
								<li class={classes.row}>
									<A href={`/timetable/event/${id}`} class={classes.link}>
										<DataRow title={name} info={formatEventInfo({ lecturer, room })} clickable>
											<span class={classes.start}>{formatTime(start_ts)}</span>
											<span class={classes.end}>{formatTime(end_ts)}</span>
										</DataRow>
									</A>
								</li>
							)}
						</For>
					</ul>
				</Suspense>
				<Show when={!events.loading && events().length === 0}>
					<div class={classes.empty}>Свободный день!</div>
				</Show>
			</main>
		</>
	);
};

export default PageTimetable;
