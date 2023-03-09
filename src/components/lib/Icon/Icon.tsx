import { Component } from 'solid-js';

import classes from './Icon.module.css';
import { cn } from '../../../utils';

interface Props {
	name: string;
	outlined?: boolean;
	class?: string;
}

export const Icon: Component<Props> = props => {
	return (
		<span
			class={cn('material-symbols-sharp', props.class)}
			classList={{ [classes.outlined]: props.outlined }}
			aria-hidden="true"
		>
			{props.name}
		</span>
	);
};
