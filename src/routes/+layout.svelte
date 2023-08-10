<script lang="ts">
	import { flows } from '$lib/vars';
	import '../theme-aithericon.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import type { PageServerLoad } from './$types';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { page } from '$app/stores';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	storeHighlightJs.set(hljs);
	export let data: PageData;

	$: currentTile = 0;

	let icon = 'https://aithericon.com/logo.png';
	let app_names = {
		'': 'Aithericon Example Applications',
		login: 'Login',
		simple: 'Simple',
		files: 'Files',
		ocr: 'Optical character recognition',
		diffusion: 'Stable Diffusion'
	};
	let current = [];
	flows.subscribe((value) => {
		current = value;
	});
	console.log($page.url.pathname.split('/'));
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<div class="grid grid-cols-[auto_1fr] h-full hidden lg:grid w-[360px] overflow-hidden">
			<AppRail>
				<svelte:fragment slot="lead" />
				<!-- --- -->
				<AppRailAnchor href="/simple" name="tile-3" title="tile-3">
					<svelte:fragment slot="lead"><i class="fas fa-face-smile text-2xl" /></svelte:fragment>
					<span>Simple</span>
				</AppRailAnchor>
				<AppRailAnchor href="/files" name="tile-3" title="tile-3">
					<svelte:fragment slot="lead"><i class="fas fa-file text-2xl" /></svelte:fragment>
					<span>Files</span>
				</AppRailAnchor>
				<AppRailAnchor href="/ocr" name="tile-2" title="tile-2">
					<svelte:fragment slot="lead"><i class="fas fa-eye text-2xl" /></svelte:fragment>
					<span>OCR</span>
				</AppRailAnchor>
				<AppRailAnchor href="/diffusion" name="tile-2" title="tile-2">
					<svelte:fragment slot="lead"><i class="fas fa-brain text-2xl" /></svelte:fragment>
					<span>Stable Diffusion</span>
				</AppRailAnchor>
				<!-- --- -->
				<svelte:fragment slot="trail">
					<AppRailAnchor href="https://github.com/aithericon/examples" title="Account"
						><i class="fa-brands fa-github text-2xl" /></AppRailAnchor
					>
				</svelte:fragment>
			</AppRail>
			{#if $page.url.pathname.split('/')[1] == '' || $page.url.pathname.split('/')[1] == 'login'}
				<div />
			{:else}
				<section
					class="py-4 pb-20 space-y-4 overflow-y-auto border-r-2 border-surface-100-800-token"
				>
					<h3 class="font-bold pl-8 text-surface-600-300-token">Flows</h3>
					<div class="w-full border-b-2 border-surface-100-800-token" />
					<div class="flex flex-col p-4 pt-2 space-y-2">
						<!--Temporary if clause to catch undefined flows store-->
						{#if $page.url.pathname.split('/')[1] == 'ocr'}
							{#each $flows as flow}
								<a
									href="/{$page.url.pathname.split('/')[1]}/flow/{flow.id}"
									class="no-underline flex flex-row items-center space-x-2 hover:bg-surface-400/10"
								>
									<i class="p-2 fas fa-file text-lg no-underline" />
									<p
										class="no-underline font-bold text-surface-700-200-token"
										style="text-decoration: none;"
									>
										{flow.name}
									</p>
								</a>
							{/each}
						{/if}
					</div>
				</section>
			{/if}
		</div>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<svelte:fragment slot="header">
		<AppBar regionRowMain="w-full h-8 lg:h-12 mx-auto" background="bg-surface-100-800-token">
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/">
					<img src="/logo.png" alt="Logo withot name" class="pl-[2px] object-contain h-12" />
				</AppRailAnchor>
			</svelte:fragment>
			<svelte:fragment slot="default">
				<div class="text-left w-full justify-start items-center flex">
					<h3 class="font-bold text-primary-600-300-token">
						{app_names[$page.url.pathname.split('/')[1]]}
					</h3>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="w-full justify-end flex">
					<div class="flex flex-row text-gray-400 bg-surface-300-600-token p-2">
						<span class="font-medium text-xl text-gray-600 dark:text-gray-300 pr-4">
							<i class="fas fa-user" />
						</span>
						<p class="text-lg font-bold">{data.user}</p>
					</div>
				</div>
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>

	<!-- Router Slot -->

	<slot />
	<!-- ---- / ---- -->
	<!-- (pageFooter) -->
	<svelte:fragment slot="pageFooter">
		<div class="container mx-auto p-4">
			<div class="mx-6 py-10 pb-4 text-center md:text-left">
				<div class="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div class="space-y-6">
						<h6 class="flex justify-center font-semibold uppercase md:justify-start">Features</h6>
						<ul class="space-y-3">
							<li>
								<a href="/features/data-management" class="font-mono no-u">Data management</a>
							</li>
						</ul>
					</div>
					<div class="space-y-6">
						<h6 class="flex justify-center font-semibold uppercase md:justify-start">Links</h6>
						<ul class="space-y-3">
							<li>
								<a href="/how-it-works" class="font-mono no-u">How it works</a>
							</li>
							<li>
								<a href="/services" class="font-mono no-u">Services</a>
							</li>
						</ul>
					</div>
					<div class="space-y-6">
						<h6 class="flex justify-center font-semibold uppercase md:justify-start">Legal</h6>
						<ul class="space-y-3">
							<li>
								<a href="/imprint" class="font-mono no-u">Imprint</a>
							</li>
							<li>
								<a href="/privacy-policy" class="font-mono no-u">Privacy Policy</a>
							</li>
						</ul>
					</div>
					<div
						class="flex flex-col justify-center md:justify-between md:border-l-2 border-surface-100-800-token"
					>
						<div class="flex flex-row justify-end w-full">
							<img src="/logo.png" alt="Logo withot name" class="object-contain h-12" />
						</div>
					</div>
				</div>
				<div class="flex flex-row justify-end mt-4">
					<p class="text-surface-500-400-token">© 2023 Milan Ender. All Rights Reserved.</p>
					<!--<LightSwitch />-->
				</div>
			</div>
		</div>
	</svelte:fragment>
</AppShell>

<style>
	a:link {
		text-decoration: none;
	}

	a:visited {
		text-decoration: none;
	}

	a:hover {
		text-decoration: none;
	}

	a:active {
		text-decoration: none;
	}

	a:not {
		text-decoration: none;
	}
	a:not(.unstyled):not(.permalink):not(.btn):not(.btn-icon):not(.app-bar a):not(.logo-item):not(
			a.card
		):not(.list-nav a) {
		text-decoration: none;
	}
</style>
