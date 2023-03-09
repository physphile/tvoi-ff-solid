import { Component, For, createEffect, createSignal } from 'solid-js';

import classes from './Navbar.module.css';
import { A, useLocation, useNavigate } from '@solidjs/router';
import { cn } from '../../utils';
import { Icon } from '../lib';

export interface NavbarItem {
	name: string;
	route: string;
	icon: string;
}

interface Props {
	items: NavbarItem[];
}

export const Navbar: Component<Props> = props => {
	const location = useLocation();
	const navigate = useNavigate();

	const [getPathname, setPathname] = createSignal('');

	createEffect(() => {
		setPathname(location.pathname);
	}, [location.pathname]);

	return (
		<nav class={classes.navbar} aria-label="Основная навигация">
			<For each={props.items}>
				{({ name, route, icon }) => (
					<A
						class={cn('noselect', classes.navbarItem)}
						classList={{ [classes.active]: getPathname().startsWith(route) }}
						href={route}
					>
						<Icon name={icon} class={classes.icon} />
						<span>{name}</span>
					</A>
				)}
			</For>
		</nav>
	);
};
