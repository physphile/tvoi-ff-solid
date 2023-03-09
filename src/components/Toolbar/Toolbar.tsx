import {
	ChildrenReturn,
	Component,
	For,
	JSX,
	Match,
	Show,
	Switch,
	createSignal,
	getListener,
	mergeProps,
} from 'solid-js';

import classes from './Toolbar.module.css';
import { Popover } from '../Popover/Popover';
import { Icon } from '../lib';
import { cn } from '../../utils';
import { A } from '@solidjs/router';

export interface MenuItem {
	name: string;
	onClick: () => void;
}

interface ActionItem {
	icon: string;
	ariaLabel: string;
}

export interface ActionButton extends ActionItem {
	onClick: (event: MouseEvent) => void;
}

export interface ActionLink extends ActionItem {
	href: string;
}

interface Props {
	children?: JSX.Element;
	menuItems?: MenuItem[];
	title?: string;
	backable?: boolean;
	actions?: Array<ActionButton | ActionLink>;
}

export const Toolbar: Component<Props> = payload => {
	const props = mergeProps({ children: '', menuItems: [], title: 'Твой ФФ!', backable: false, actions: [] }, payload);
	return (
		<header class={classes.toolbar}>
			<Show when={props.title || props.backable}>
				<div class={classes.meta}>
					<Show when={props.backable}>
						<button type="button" onClick={() => history.back()} class={classes.button}>
							<Icon name="arrow_back" />
						</button>
					</Show>
					<h1 class={cn('noselect', classes.title)}>{props.title}</h1>
				</div>
			</Show>

			<div>{props.children}</div>

			<div class={classes.actions}>
				<Show when={props.actions.length > 0}>
					<For each={props.actions}>
						{action => (
							<Switch>
								<Match when={(action as ActionLink).href}>
									<A href={(action as ActionLink).href} class={classes.button}>
										<Icon name={action.icon} />
									</A>
								</Match>
								<Match when={(action as ActionButton).onClick}>
									<button
										type="button"
										onClick={(action as ActionButton).onClick}
										aria-label={action.ariaLabel}
										class={classes.button}
									>
										<Icon name={action.icon} />
									</button>
								</Match>
							</Switch>
						)}
					</For>
				</Show>
				<Show when={props.menuItems.length > 0}>
					<Popover expanderClass={classes.button}>
						<ul>
							<For each={props.menuItems}>
								{({ name, onClick }) => (
									<li>
										<button onClick={onClick} class={classes.menuItem}>
											{name}
										</button>
									</li>
								)}
							</For>
						</ul>
					</Popover>
				</Show>
			</div>
		</header>
	);
};
