import { Component, onMount } from 'solid-js';
import { Toolbar } from '../../../components';
import { useLocation } from '@solidjs/router';

import classes from './PageAppBrowser.module.css';

const PageAppBrowser: Component = () => {
	const location = useLocation();

	return (
		<>
			<Toolbar backable />
			<iframe src={location.hash.slice(1)} class={classes.iframe} />
		</>
	);
};

export default PageAppBrowser;
