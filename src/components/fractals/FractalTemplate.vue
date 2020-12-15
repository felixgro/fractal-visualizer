<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.step" :max="10" :min="0" />
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import FractalLayout from '@/components/layouts/FractalLayout'
import Fractal from '@/mixins/Fractal'

export default {
	name: 'FractalName',
	components: {
		FractalLayout
	},
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