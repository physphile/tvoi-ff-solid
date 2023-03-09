import { Component } from 'solid-js';
import { Toolbar } from '../../components';

const Page404: Component = () => {
	return (
		<>
			<Toolbar backable />
			<main class="container main">
				<h1>404</h1>
			</main>
		</>
	);
};

export default Page404;
