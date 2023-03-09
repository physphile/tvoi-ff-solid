import { Component, Suspense, createResource } from 'solid-js';
import { Toolbar } from '../../../components';
import { useParams } from '@solidjs/router';
import { setTimetableStore, timetableStore } from '../../../stores';
import { timetableLecturerApi } from '../../../api/timetable';

import Placeholder from '../../../assets/lecturer-placeholder.webp';

import classes from './PageTimetableLecturer.module.css';

const PageTimetableLecturer: Component = () => {
	const { id } = useParams();

	const [lecturer] = createResource(
		() =>
			timetableStore.lecturers[+id] ??
			timetableLecturerApi.getLecturer(+id).then(({ data }) => {
				setTimetableStore('lecturers', prev => ({ ...prev, [data.id]: data }));
				return data;
			}),
	);

	return (
		<>
			<Toolbar backable />
			<main class="container main">
				<Suspense fallback="Загрузка...">
					<img
						src={lecturer()?.avatar_link ?? Placeholder}
						alt="Фотография преподавателя"
						width="200"
						height="200"
						class={classes.image}
					/>
					<h2 class={classes.fullName}>{`${lecturer()?.first_name ?? ''} ${lecturer()?.middle_name ?? ''} ${
						lecturer()?.last_name ?? ''
					}`}</h2>
				</Suspense>
			</main>
		</>
	);
};

export default PageTimetableLecturer;
