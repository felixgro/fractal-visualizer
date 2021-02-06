<template>
	<div class="card" :id="idd" @mouseover="$emit('mouseover')">
		<slot />
	</div>
</template>

<script>
export default {
	name: 'Card',
	props: {
		idd: {
			required: false
		}
	}
}
</script>