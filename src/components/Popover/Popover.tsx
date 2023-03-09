import { Component, JSX, createSignal, mergeProps, onCleanup, onMount } from 'solid-js';

import classes from './Popover.module.css';
import { cn } from '../../utils';
import { Icon } from '../lib';

interface Props {
	children: JSX.Element;
	expanderContent?: JSX.Element;
	expanderClass?: string;
}

export const Popover: Component<Props> = props => {
	const [getShow, setShow] = createSignal(false);
	const id = `popover-${Math.trunc(Math.random() * Number.MAX_SAFE_INTEGER).toString(16)}`;

	let popover: HTMLMenuElement | undefined = undefined;
	let button: HTMLButtonElement | undefined = undefined;

	const clickOutsideHandler = (event: MouseEvent) => {
		if (getShow() && event.target !== button) {
			event.preventDefault();
			setShow(false);
		}
	};

	onMount(() => {
		if (button && popover) {
			popover.style.right = `${window.innerWidth - button.offsetLeft - button.offsetWidth}px`;
			popover.style.top = `${button.offsetTop + button.offsetHeight}px`;
		}

		document.addEventListener('click', clickOutsideHandler);
	});

	onCleanup(() => {
		document.removeEventListener('click', clickOutsideHandler);
	});

	return (
		<>
			<button
				type="button"
				onClick={() => setShow(prev => !prev)}
				class={cn(classes.expander, props.expanderClass)}
				aria-expanded={getShow()}
				aria-controls={id}
				aria-label="Выпадающее меню"
				ref={button}
			>
				{props.expanderContent ?? <Icon name="more_vert" />}
			</button>
			<menu id={id} ref={popover} class={classes.popover} classList={{ [classes.hidden]: !getShow() }}>
				{props.children}
			</menu>
		</>
	);
};
