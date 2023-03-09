import { Component, For, Suspense, createResource } from 'solid-js';
import { DataRow, Toolbar } from '../../../components';
import { A, useParams } from '@solidjs/router';
import { setTimetableStore, timetableStore } from '../../../stores';
import { Icon } from '../../../components/lib';
import { formatTime } from '../../../utils';

import classes from './PageTimetableEvent.module.css';
import { timetableEventApi } from '../../../api/timetable';

const PageTimetableEvent: Component = () => {
	const { id } = useParams();

	const [event] = createResource(
		() =>
			timetableStore.events[+id] ??
			timetableEventApi.getEvent(+id).then(({ data }) => {
				setTimetableStore('events', prev => ({ ...prev, [data.id]: data }));
				return data;
			}),
	);

	return (
		<>
			<Toolbar title="Событие" backable />
			<main class="container main">
				<Suspense fallback="Загрузка...">
					<h2>{event()?.name}</h2>
					<DataRow title="Группа" info={event()?.group.number} class={classes.row}>
						<Icon name="group" class={classes.icon} />
					</DataRow>
					<DataRow
						title={
							event()
								? new Date(event()!.start_ts).toLocaleString('ru-RU', { day: 'numeric', month: 'long' })
								: ''
						}
						info={event() ? `${formatTime(event()!.start_ts)} – ${formatTime(event()!.end_ts)}` : undefined}
						class={classes.row}
					>
						<Icon name="schedule" class={classes.icon} />
					</DataRow>
					<For each={event()?.room}>
						{({ name, id }) => (
							<A href={`/timetable/room/${id}`} class={classes.row}>
								<DataRow title={name} class={classes.row} clickable>
									<Icon name="location_on" class={classes.icon} />
								</DataRow>
							</A>
						)}
					</For>
					<For each={event()?.lecturer}>
						{({ first_name, middle_name, last_name, id }) => (
							<A href={`/timetable/lecturer/${id}`} class={classes.row}>
								<DataRow title={`${first_name} ${middle_name}`} info={last_name} clickable>
									<Icon name="person" class={classes.icon} />
								</DataRow>
							</A>
						)}
					</For>
				</Suspense>
			</main>
		</>
	);
};

export default PageTimetableEvent;
