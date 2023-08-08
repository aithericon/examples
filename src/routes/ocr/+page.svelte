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

<div class="container h-full mx-auto flex flex-col justify-center items-center">
	<div class="py-12 flex flex-col justify-center items-center text-center">
		<i class="fas fa-eye text-7xl pb-12" />
		<h1>Tesseract optical character recognition</h1>
		<h3 class="font-bold text-primary-600-300-token">Upload a file to start</h3>
		<a href="/ocr/description"
			><button class="btn font-mono variant-filled-secondary w-48">See description</button>
		</a>
	</div>

	<div class="space-y-5 w-full">
		{#if form?.success}
			<div in:fly={{ y: 20 }} class="space-y-4 border-b-2 pb-16 border-surface-100-800-token">
				<h2 class="font-bold text-green-400">Execution successful!</h2>
				<div>Here is your output</div>
				<pre>{form?.node.outputs.out.data}</pre>

				<p class="font-bold text-lg">Uploaded file</p>
				<ul class="list">
					{#each form?.asset_node.files as file}
						<li class="flex flex-col justify-start content-start">
							<img
								src="https://sos-de-fra-1.exo.io/aithericon-trial/nodes/{form.asset_node
									.id}/{file.name}"
								class="w-[256px]"
							/>
							<p>{file.name}</p>
						</li>
					{/each}
				</ul>
			</div>
		{/if}

		<form
			method="post"
			action="?/ocr"
			enctype="multipart/form-data"
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
					<label class="label">
						<FileDropzone
							type="file"
							id="file"
							name="fileToUpload"
							accept={authorizedExtensions.join(',')}
							required
						>
							<svelte:fragment slot="lead"
								><i class="fa-solid fa-file-arrow-up text-4xl" /></svelte:fragment
							>
							<svelte:fragment slot="message"
								><strong>Upload a file</strong> or drag and drop</svelte:fragment
							>
							<svelte:fragment slot="meta">PNG, JPG and WEBP are allowed</svelte:fragment>
						</FileDropzone>

						<!--
						<input
							type="file"
							id="file"
							name="fileToUpload"
							accept={authorizedExtensions.join(',')}
							required
						/>
-->
						<button
							formaction="?/ocr"
							class="btn font-mono variant-filled-surface w-36"
							disabled={processing}>Recognize</button
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
		</p>
	</div>
</div>
