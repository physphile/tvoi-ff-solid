import { Component, JSX } from 'solid-js';

import classes from './DataRow.module.css';
import { cn } from '../../utils';

interface Props {
	clickable?: boolean;
	children?: JSX.Element;
	title: string;
	info?: string;
	class?: string;
}

export const DataRow: Component<Props> = props => {
	return (
		<div class={cn(classes.row, props.class)} classList={{ [classes.clickable]: props.clickable }}>
			<div class={classes.children}>{props.children}</div>
			<div class={classes.data}>
				<span class={classes.title}>{props.title}</span>
				<span class={classes.info}>{props.info}</span>
			</div>
		</div>
	);
};
