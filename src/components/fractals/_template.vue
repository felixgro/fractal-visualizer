<template>
	<fractal-layout>
		<template #settings>
			<slider label="Step" v-model:current="settings.val" :max="10" :min="0" />
		</template>

		<canvas ref="canvas" id="canvas" />
	</fractal-layout>
</template>

<script>
import FractalLayout from '@/components/layouts/FractalLayout'
import Fractal from '@/mixins/Fractal'
import Slider from '@/components/smart/Slider'

export default {
	name: 'FractalName',
	components: {
		FractalLayout,
		Slider
	},
	mixins: [Fractal],
	data() {
		return {
			settings: {
				val: 1
			}
		}
	},
	methods: {
		init() {
			console.log('init fractal')
		}
	}

}
</script>