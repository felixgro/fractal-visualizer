<template>
	<header class="noselect">
		<div class="wrapper">
			<div id="appTitle">
				<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 155.9 155.9">
					<defs>
						<linearGradient id="main_gradient" y1="77.95" x2="155.9" y2="77.95" gradientUnits="userSpaceOnUse">
							<stop offset="0" stop-color="#ca4559" />
							<stop offset="1" stop-color="#c02e70" />
						</linearGradient>
					</defs>
					<path class="cls-1" d="M135,20.89V135H20.89V20.89H135M155.9,0H0V155.9H155.9V0Z" />
					<path class="cls-2"
						d="M57.53,42.89,113,57.53,98.37,113,42.89,98.37,57.53,42.89m-13-22.33-24,90.81,90.81,24,24-90.81-90.81-24Z" />
					<path class="cls-3"
						d="M75,67.07l13.79,8-8,13.79-13.8-8,8-13.8M69.3,45.67,45.67,86.6,86.6,110.23,110.23,69.3,69.3,45.67Z" />
				</svg>
			</div>
			<div>
				<dropdown :options="fractals" :current="currentFractal" @selected="$emit('fractalchange', $event)" />
			</div>
		</div>
	</header>
</template>

<script>
import Dropdown from '@/components/form/Dropdown'
import { FractalList } from '@/config/FractalList'

export default {
	name: 'TheHeader',
	components: {
		Dropdown
	},
	props: {
		currentFractal: String
	},
	data() {
		return {
			fractals: []
		}
	},
	created() {
		this.fractals = FractalList
	}
}
</script>

<style lang="scss" scoped>
	header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		padding: 10px 0;
		// border-bottom: 1px solid hsl(235, 28%, 18%);
		.wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			svg {
				height: 32px;
				margin-top: 5px;
				path {
					fill: url(#main_gradient);
				}
			}
		}
	}
</style>