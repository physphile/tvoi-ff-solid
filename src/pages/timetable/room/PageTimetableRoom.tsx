import { Component, Show, Suspense, createResource } from 'solid-js';
import { DataRow, Toolbar } from '../../../components';
import { setTimetableStore, timetableStore } from '../../../stores';
import { A, useParams } from '@solidjs/router';
import { timetableRoomApi } from '../../../api/timetable';
import { Icon } from '../../../components/lib';

import classes from './PageTimetableRoom.module.css';

const PageTimetableRoom: Component = () => {
	const { id } = useParams();

	const [room] = createResource(
		() =>
			timetableStore.rooms[+id] ??
			timetableRoomApi.getRoom(+id).then(({ data }) => {
				setTimetableStore('rooms', prev => ({ ...prev, [data.id]: data }));
				return data;
			}),
	);

	return (
		<>
			<Toolbar backable />
			<main class="container main">
				<Suspense fallback="Загрузка...">
					<h2>{room()?.name}</h2>
					<Show when={room()?.direction}>
						<DataRow
							title={room()?.direction === 'North' ? 'Север (от входа налево)' : 'Юг (от входа направо)'}
						>
							<Icon name="explore" class={classes.icon} />
						</DataRow>
					</Show>
				</Suspense>

				<h3 class={classes.h3}>Карта этажа</h3>
				<A href="/apps/browser?url=https://cdn.profcomff.com/app/map/" class={classes.map}>
					<span class={classes.text}>
						Посмотреть на карте <Icon name="open_in_new" />
					</span>
				</A>
			</main>
		</>
	);
};

export default PageTimetableRoom;
