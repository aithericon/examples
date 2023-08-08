<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { baseUiPath } from '$lib/vars';
	export let data: PageData;
	export let form: ActionData;
	import { enhance } from '$app/forms';
	import { fly, slide } from 'svelte/transition';
	import { ProgressRadial } from '@skeletonlabs/skeleton';

	let processing = false;
</script>

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<h1>Explore example applications made with the Aithericon platform</h1>
</div>
