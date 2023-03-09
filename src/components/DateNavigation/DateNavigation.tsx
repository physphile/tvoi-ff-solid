import { Component } from 'solid-js';
import { cn, getDateWithDayOffset, getWeekdayName, stringifyDate } from '../../utils';

import classes from './DateNavigation.module.css';
import { Icon } from '../lib';
import { A } from '@solidjs/router';

interface Props {
	date: Date;
	class?: string;
}

export const DateNavigation: Component<Props> = props => {
	return (
		<nav class={cn(classes.nav, props.class)} aria-label="Навигация по дням">
			<A
				href={`/timetable/${stringifyDate(getDateWithDayOffset(props.date, -1))}`}
				class={cn('noselect', classes.button)}
			>
				<Icon name="arrow_back_ios" />
				<span>{getWeekdayName(getDateWithDayOffset(props.date, -1))}</span>
			</A>

			<span class={cn('noselect', classes.today)}>{getWeekdayName(props.date, 'long')}</span>

			<A
				href={`/timetable/${stringifyDate(getDateWithDayOffset(props.date, 1))}`}
				class={cn('noselect', classes.button)}
			>
				<span>{getWeekdayName(getDateWithDayOffset(props.date, 1))}</span>
				<Icon name="arrow_forward_ios" class={classes.right} />
			</A>
		</nav>
	);
};
