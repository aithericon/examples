<script lang="ts">
	import type { PageData, ActionData } from './$types';
	import { baseUiPath } from '$lib/vars';
	export let data: PageData;
	export let form: ActionData;
	import { enhance } from '$app/forms';
	import { fly, slide } from 'svelte/transition';
	import { ProgressRadial, FileDropzone } from '@skeletonlabs/skeleton';

	const authorizedExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
	let processing = false;
</script>

<div
	in:fly={{ y: 20 }}
	class="container mx-auto px-24 py-12 space-y-4 border-b-2 pb-16 border-surface-100-800-token  pr-[360px]"
>
	<a href="/ocr"
		><button class="btn font-mono variant-filled-primary w-16"
			><i class="fas fa-arrow-left text-xl text-surface-400-500-token pr-2" /></button
		>
	</a>
	<h1 class="text-primary-600-300-token text-4xl font-bold">
		OCR Application
		<p class="text-xl">Optical Character Recognition</p>
	</h1>

	<h3 class="font-bold text-success-500-400-token bg-success-50-900-token p-4">Execution successful!</h3>
	<div>Here is your output</div>
	<pre>{data.tesseract_node.outputs.out.data}</pre>

	<p class="font-bold text-lg">Uploaded file</p>
	<ul class="list">
		{#each data.asset_node.files as file}
			<li class="flex flex-row justify-start items-start">
				<img
					src="https://sos-de-fra-1.exo.io/aithericon-trial/nodes/{data.asset_node.id}/{file.name}"
					class="w-[256px]"
				/>
				<p class="font-bold">{file.name}</p>
			</li>
		{/each}
	</ul>
</div>
