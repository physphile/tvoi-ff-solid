import { Component, For, Show, createResource, createSignal } from 'solid-js';
import { timetableGroupApi } from '../../../api/timetable';
import { Group } from '../../../api/models';

import classes from './PageTimetableInit.module.css';
import { useNavigate } from '@solidjs/router';
import { LocalStorage } from '../../../models';
import { Toolbar } from '../../../components/Toolbar/Toolbar';

import Logo from '../../../public/icons/icon_1024x1024.webp';

const PageTimetableInit: Component = () => {
	const navigate = useNavigate();

	const [getGroups] = createResource<Group[]>(
		async () => {
			const { data } = await timetableGroupApi.getGroups({ limit: 100 });
			return data.items;
		},
		{ initialValue: [] },
	);
	const [getQuery, setQuery] = createSignal<string>('');

	const inputHandler = (event: Event) => {
		setQuery((event.target as HTMLInputElement).value);
	};

	const setGroup = (group: Group) => {
		LocalStorage.setGroup(group);
		navigate('/timetable');
	};

	return (
		<>
			<Toolbar />
			<main class="container main">
				<img src={Logo} alt="Логотип" class={classes.logo} />
				<input type="text" onInput={inputHandler} class={classes.input} placeholder="Введите номер группы" />
				<ul class={classes.groupsList}>
					<Show when={!getGroups.loading} fallback="Загрузка...">
						<For
							each={getGroups()
								.filter(({ number }) => number.includes(getQuery()))
								.sort((a, b) => parseInt(a.number) - parseInt(b.number))}
						>
							{group => (
								<li>
									<button type="button" class={classes.groupLabel} onClick={() => setGroup(group)}>
										{group.number}
									</button>
								</li>
							)}
						</For>
					</Show>
				</ul>
			</main>
		</>
	);
};

export default PageTimetableInit;
