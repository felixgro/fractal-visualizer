<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.step" :max="10" :min="0" />
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import Fractal from '@/mixins/Fractal'

export default {
	name: 'FractalName',
	mixins: [Fractal],
	data() {
		return {
			settings: {
				step: 2
			}
		}
	},
	methods: {
		init() {
			// Init/Update Fractal here
		}
	}
}
</script>