import type { Component } from 'solid-js';

import { Navigate, Route, Routes } from '@solidjs/router';
import { lazy } from 'solid-js';
import { Navbar, NavbarItem } from './components';
import { MatchFilters } from '@solidjs/router/dist/types';
import { stringifyDate } from './utils';

const PageTimetable = lazy(() => import('./pages/timetable/PageTimetable'));
const PageTimetableInit = lazy(() => import('./pages/timetable/init/PageTimetableInit'));
const Page404 = lazy(() => import('./pages/404/Page404'));
const PageApps = lazy(() => import('./pages/apps/PageApps'));
const PageTimetableEvent = lazy(() => import('./pages/timetable/event/PageTimetableEvent'));
const PageTimetableLecturer = lazy(() => import('./pages/timetable/lecturer/PageTimetableLecturer'));
const PageTimetableRoom = lazy(() => import('./pages/timetable/room/PageTimetableRoom'));
const PageAppBrowser = lazy(() => import('./pages/apps/browser/PageAppBrowser'));

const navbarItems: NavbarItem[] = [
	{ name: 'Расписание', route: '/timetable', icon: 'calendar_month' },
	{ name: 'Сервисы', route: '/apps', icon: 'apps' },
];

const timetableMatchFilters = {
	date: { date: /^\d{2}-\d{2}-\d{4}$/ },
	id: { id: /^\d+$/ },
} satisfies Record<string, MatchFilters>;

const timetableDefaultHref = () => `/timetable/${stringifyDate(new Date())}`;

const App: Component = () => {
	return (
		<>
			<Routes>
				<Route path="/" element={<Navigate href={timetableDefaultHref} />} />
				<Route path="/timetable">
					<Route path="/" element={<Navigate href={timetableDefaultHref} />} />
					<Route path="/:date" component={PageTimetable} matchFilters={timetableMatchFilters.date} />
					<Route path="/init" component={PageTimetableInit} />
					<Route path="/event/:id" component={PageTimetableEvent} matchFilters={timetableMatchFilters.id} />
					<Route
						path="/lecturer/:id"
						component={PageTimetableLecturer}
						matchFilters={timetableMatchFilters.id}
					/>
					<Route path="/room/:id" component={PageTimetableRoom} matchFilters={timetableMatchFilters.id} />
				</Route>
				<Route path="/apps">
					<Route path="/" component={PageApps} />
					<Route path="/browser" component={PageAppBrowser} />
				</Route>
				<Route path="*" component={Page404} />
			</Routes>
			<Navbar items={navbarItems} />
		</>
	);
};

export default App;
