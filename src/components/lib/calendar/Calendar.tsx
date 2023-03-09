import { Accessor, Component, For, createEffect, createSignal, on } from 'solid-js';
import { Icon } from '../Icon/Icon';
import { cn, stringifyDate } from '../../../utils';

import classes from './Calendar.module.css';

interface Props {
	value: Accessor<Date>;
	onChange: (date: Date) => void;
}

const weekdays = ['пн', 'вт', 'ср', 'чт', 'пт', 'сб', 'вс'];

const getDays = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();

export const Calendar: Component<Props> = props => {
	const [getDate, setDate] = createSignal(props.value() ?? new Date());
	createEffect(
		on(props.value, () => {
			if (stringifyDate(props.value()) !== stringifyDate(getDate())) {
				setDate(props.value);
			}
		}),
	);

	const getItemDate = (day: number) => new Date(getDate().getFullYear(), getDate().getMonth(), day);

	const clickHandler = (offset: number) => {
		setDate(prev => {
			const date = new Date(prev);
			date.setMonth(prev.getMonth() + offset);
			return date;
		});
	};

	return (
		<div class={classes.calendar}>
			<div class={classes.controls}>
				<button type="button" class={classes.left} onClick={() => clickHandler(-1)}>
					<Icon name="arrow_back_ios" />
				</button>
				<span class="noselect">
					{getDate().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' })}
				</span>
				<button type="button" onClick={() => clickHandler(1)}>
					<Icon name="arrow_forward_ios" class={classes.right} />
				</button>
			</div>
			<div class={classes.grid}>
				<For each={weekdays}>{weekday => <span class={cn('noselect', classes.weekday)}>{weekday}</span>}</For>
				<For each={new Array(getDays(getDate()))}>
					{(_, i) => (
						<button
							type="button"
							onClick={() => props.onChange(getItemDate(i() + 1))}
							class={classes.day}
							classList={{
								[classes.current]: stringifyDate(getItemDate(i() + 1)) === stringifyDate(props.value()),
							}}
							style={{ 'grid-column': i() === 0 ? getItemDate(i() + 1).getDay() : 'unset' }}
						>
							{i() + 1}
						</button>
					)}
				</For>
			</div>
		</div>
	);
};
