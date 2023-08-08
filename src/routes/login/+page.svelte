<script lang="ts">
	import type { PageData, ActionData } from './$types';

	export let data: PageData;
	export let form: ActionData;
</script>

<div class="h-full">

	<div class="container h-full flex flex-col mx-auto space-y-8 items-center justify-center">
		{#if form?.incorrect}<p class="error">Invalid credentials!</p>{/if}
		{#if form?.success}
			<!-- this message is ephemeral; it exists because the page was rendered in           response to a form submission. it will vanish if the user reloads -->
			<p>Successfully logged in! Welcome back, {data.user}</p>
		{/if}
		<section class="space-y-10">
			<form method="post" action="?/login" class="space-y-4">
				<div class="group">
					<label for="email">Email</label>

					<input type="email" name="email" id="email" required class="text-black" />
				</div>

				<div class="group">
					<label for="password">Password</label>

					<input type="password" name="password" id="password" required class="text-black" />
				</div>
				<button formaction="?/login" class="btn font-mono variant-filled-surface w-36">Login</button
				>
			</form>

			<!--<div class="actions">
				<a href="/signup">Sign Up</a>
			</div>
			-->
		</section>
	</div>
</div>
