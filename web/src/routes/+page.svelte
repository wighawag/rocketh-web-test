<script lang="ts">
	import { test } from '$lib';

	function clicked() {
		test();
	}
</script>

<button onclick={clicked}>test</button>
