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

<div class="relative container mx-auto p-2 py-12 flex flex-row pr-[360px]">
	<div id="content" class="container h-full mx-auto space-y-12 px-36 pt-0">
		<div class="space-y-4">
			<h1 class="text-primary-600-300-token text-4xl font-bold">
				Aithericon Examples
				<p class="text-xl text-secondary-600-300-token">
					Explore example applications made with the Aithericon platform
				</p>
			</h1>

			<p class="text-xl">
				This site is a collection of example applications made with ♥. They illustrate the concepts
				of the Aithericon platform and how to use them. The frontend is put together with <a
					href="https://kit.svelte.dev/">SvelteKit</a
				>
				and <a href="https://axios-http.com">Axios</a>, using an auto-generated HTTP client from our
				OpenAPI specifications. However, the concepts stay the same no matter the frameworks you choose. Every example is open source and documented and can be used as a
				starting point for your own applications. If you have any questions, feel free to join our
				<a href="https://discord.gg/3Y5JGh8">Discord</a>
				server or write us directly at
				<a href="mailto:support@aithericon.com">support@aithericon.com</a>.
				<br /> We are happy to help! :)
			</p>
		</div>
		<div class="space-y-12">
			<div class="space-y-4">
				<h2 class="font-bold text-secondary-600-300-token">Start exploring</h2>
				<div class="grid grid-cols-2 gap-8 w-full">
					<a
						href="/simple"
						class="flex flex-col justify-between card variant-filled-surface overflow-hidden"
					>
						<header
							class="flex flex-row p-8 items-center justify-center bg-gradient-to-br variant-gradient-tertiary-secondary"
						>
							<i class="fas fa-face-smile text-7xl text-surface-700-200-token" />
						</header>
						<div class="p-4 space-y-4">
							<h3 class="text-secondary-600-300-token">Simple processing</h3>
							<p>
								This example illustrates basic interactions with the Aithericon platform. It shows
								how to execute a simple node, set its parameters and how to retrieve the results.
							</p>
						</div>
						<hr class="opacity-50" />
						<div class="justify-self-end place-self-center">
							<a href="/simple"
								><button class="btn font-mono variant-filled-primary my-8 w-48">Application</button>
							</a>
							<a href="/simple/description"
								><button class="btn font-mono variant-filled-secondary my-8 w-48"
									>Documentation</button
								>
							</a>
						</div>
					</a>
					<a
						href="/files"
						class="flex flex-col justify-between card variant-filled-surface overflow-hidden"
					>
						<header
							class="flex flex-row p-8 items-center justify-center bg-gradient-to-br variant-gradient-secondary-tertiary"
						>
							<i class="fas fa-file text-7xl text-surface-700-200-token" />
						</header>
						<div class="p-4 space-y-4">
							<h3 class="text-secondary-600-300-token">File interactions</h3>
							<p>
								In this example we will use a node that creates a file based on user input. It
								illustrates how to work with these <strong>generated files</strong> in our frontend.
							</p>
						</div>
						<hr class="opacity-50" />
						<div class="place-self-center">
							<a href="/files"
								><button class="btn font-mono variant-filled-primary my-8 w-48">Application</button>
							</a>
							<a href="/files/description"
								><button class="btn font-mono variant-filled-secondary my-8 w-48"
									>Documentation</button
								>
							</a>
						</div>
					</a>
					<a
						href="/ocr"
						class="flex flex-col justify-between card variant-filled-surface overflow-hidden"
					>
						<header
							class="flex flex-row p-8 items-center justify-center bg-gradient-to-br variant-gradient-tertiary-primary"
						>
							<i class="fas fa-eye text-7xl text-surface-700-200-token" />
						</header>
						<div class="p-4 space-y-4">
							<h3 class="text-secondary-600-300-token">Optical character recognition</h3>
							<p>
								This example deploys a minimal tesseract container that will transform an image to
								text. It illustrates how to work with <strong>user uploaded files</strong> and asset
								nodes that are used as inputs for processing nodes.
							</p>
						</div>
						<hr class="opacity-50" />
						<div class="justify-self-end place-self-center">
							<a href="/ocr"
								><button class="btn font-mono variant-filled-primary my-8 w-48">Application</button>
							</a>
							<a href="/ocr/description"
								><button class="btn font-mono variant-filled-secondary my-8 w-48"
									>Documentation</button
								>
							</a>
						</div>
					</a>
					<a
						href="/diffusion"
						class="flex flex-col justify-between card variant-filled-surface overflow-hidden"
					>
						<header
							class="flex flex-row p-8 items-center justify-center bg-gradient-to-br variant-gradient-primary-tertiary"
						>
							<i class="fas fa-brain text-7xl text-surface-700-200-token" />
						</header>
						<div class="p-4 space-y-4">
							<h3 class="text-secondary-600-300-token">Stable diffusion</h3>
							<p>
								This example deploys a <strong>pytorch</strong> container with a stable diffusion
								model from <strong>huggingface</strong> that will perform a diffusion process on a prompt
								provided by the user. The resulting generated images will then be displayed.
							</p>
						</div>
						<hr class="opacity-50" />
						<div class="justify-self-end place-self-center">
							<a href="/diffusion"
								><button class="btn font-mono variant-filled-primary my-8 w-48">Application</button>
							</a>
							<a href="/diffusion/description"
								><button class="btn font-mono variant-filled-secondary my-8 w-48"
									>Documentation</button
								>
							</a>
						</div>
					</a>
				</div>
			</div>
			<div class="h-12" />
		</div>
	</div>
</div>
