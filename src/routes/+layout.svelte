<script lang="ts">
	import '../theme-aithericon.css';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '../app.postcss';
	import { AppShell, AppBar, AppRail, AppRailTile, AppRailAnchor } from '@skeletonlabs/skeleton';
	import type { PageServerLoad } from './$types';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';

	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	storeHighlightJs.set(hljs);
	export let data: PageData;

	$: currentTile = 0;
	let icon = 'https://aithericon.com/logo.png';
</script>

<AppShell>
	<svelte:fragment slot="sidebarLeft">
		<AppRail>
			<svelte:fragment slot="lead">
				<AppRailAnchor href="/">
					<img src="/logo.png" alt="Logo withot name" class="pl-[18px] object-contain h-12" />
				</AppRailAnchor>
			</svelte:fragment>
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
				<AppRailAnchor href="/" title="Account"
					><i class="fa-brands fa-github text-2xl" /></AppRailAnchor
				>
			</svelte:fragment>
		</AppRail>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<svelte:fragment slot="pageHeader">
		<AppBar regionRowMain="w-full h-8 lg:h-12 mx-auto" background="bg-surface-100-800-token">
			<svelte:fragment slot="lead" />
			<svelte:fragment slot="default">
				<div class="text-left w-full justify-start items-center flex">
					<h3>Example Applications</h3>
				</div>
			</svelte:fragment>
			<svelte:fragment slot="trail">
				<div class="w-full justify-end flex">
					<div class="flex flex-row text-gray-400 bg-slate-800 p-2 rounded-lg">
						<span class="font-medium text-3xl text-gray-600 dark:text-gray-300 pr-4">
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
	<svelte:fragment slot="pageooter">
		<div class="container mx-auto p-4">
			<div class="mx-6 py-10 pb-4 text-center md:text-left">
				<div class="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
					<div
						class="flex flex-col justify-center md:justify-between md:border-r-2 border-surface-100-800-token"
					>
						<div class="flex flex-row justify-center md:justify-between">
							<img src="/logo.png" alt="Logo withot name" class="object-contain h-12" />
						</div>
					</div>
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
				</div>
				<div class="flex flex-row justify-between mt-4">
					<p class="text-surface-500-400-token">© 2023 Milan Ender. All Rights Reserved.</p>
					<!--<LightSwitch />-->
				</div>
			</div>
		</div>
	</svelte:fragment>
</AppShell>
