import { Component, For, Match, Show, Switch, createResource, createSignal, onMount } from 'solid-js';
import { Toolbar } from '../../components';
import { Button, Category } from '../../api/models';
import { servicesApi } from '../../api/services';
import { navbarApi } from '../../api/navbar';

import classes from './PageApps.module.css';
import { Icon } from '../../components/lib';
import { A } from '@solidjs/router';
import { cn } from '../../utils';

const PageApps: Component = () => {
	const [categories] = createResource(() => navbarApi.getApps().then(({ data }) => data));

	return (
		<>
			<Toolbar />
			<main class={cn('main', 'container', classes.main)}>
				<For each={categories()}>
					{({ name, type, items }) => (
						<section class={classes.section}>
							<h2 class={classes.h2}>{name}</h2>
							<div classList={{ [classes.grid3]: type === 'grid3', [classes.list]: type === 'list' }}>
								<For each={items}>
									{({ icon, path, text }) => (
										<A href={path} class={classes.app}>
											<div class={classes.icon}>
												<Show
													when={typeof icon === 'object'}
													fallback={<Icon name={icon as string} />}
												>
													<img src={(icon as { src: string }).src} alt={text} />
												</Show>
											</div>
											<br />

											<span>{text}</span>
										</A>
									)}
								</For>
							</div>
						</section>
					)}
				</For>
			</main>
		</>
	);
};

export default PageApps;
