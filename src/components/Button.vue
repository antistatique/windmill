<template>
	<button :class="variant" @click="action">{{ text }}</button>
</template>

<script>
	export default {
		props: [
			"text",
			"variant",
			"action"
		]
	}
</script>