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
	<div class="space-y-5 w-1/2">
		{#if form?.success}
			<div in:fly={{ y: 20 }} class="space-y-4 border-b-2 pb-16 border-surface-100-800-token">
				<h1 class="text-green-400">Execution successful!</h1>
				<div>Here is your output</div>
				<pre>{form?.node.outputs.out.data}</pre>

				<p class="font-bold text-lg">Files</p>
				<ul class="list">
					{#each form?.node.files as file}
						<li>
							<span>{file.name}</span>
							<a
								href="https://sos-de-fra-1.exo.io/aithericon-trial/nodes/{form.node.id}/{file.name}"
								class="flex-auto">Download</a
							>
						</li>
					{/each}
				</ul>
			
			</div>
		{/if}

		<form
			method="post"
			action="?/imagine"
			class="space-y-4"
			use:enhance={() => {
				processing = true;

				return async ({ update }) => {
					await update();
					processing = false;
				};
			}}
		>
			<div in:fly={{ y: 20 }} class="py-8 space-y-4">
				{#if !processing}
					{#if !form?.success}
						<h1>Welcome back</h1>
						<h3 class="font-bold">Imagine something</h3>
					{:else}
						<h3 class="font-bold">Imagine something else</h3>
					{/if}
					<label class="label">
						<span>Your prompt</span>
						<textarea
							id="prompt"
							name="prompt"
							required
							class="textarea"
							rows="4"
							placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit."
						/>

						<button
							formaction="?/imagine"
							class="btn font-mono variant-filled-surface w-36"
							disabled={processing}>Imagine</button
						>
					</label>
				{:else}
					<div class="flex flex-col text-center justify-center items-center w-full">
						<h3 class="font-bold animate-pulse">Processing</h3>

						<ProgressRadial
							...
							stroke={120}
							meter="stroke-primary-500"
							track="stroke-primary-500/30"
						/>
					</div>
				{/if}
			</div>
		</form>
	</div>

	<div>
		<p>
			Saving result to project <a href="{baseUiPath}/explore/project/{data.project.id}"
				>{data.project.name}</a
			>
			under flow
			<a href="{baseUiPath}/explore/serie/{data.flow.id}">{data.flow.name}</a>
		</p>
	</div>
</div>
