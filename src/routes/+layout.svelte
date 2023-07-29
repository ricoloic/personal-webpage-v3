<script>
	import Header from './Header.svelte';
	import './styles.css';
	import { writable } from 'svelte/store';
	import { setContext } from 'svelte';

	let view = false;
	let isEditing = false;

	const editConfig = writable();
	$: editConfig.set({ view, isEditing });

	setContext('editConfig', editConfig);
</script>

<div>
	<Header />

	<main>
		<slot />
	</main>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		height: 100%;
	}

	main {
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow-y: auto;
	}
</style>
