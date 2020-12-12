<template>
	<footer>
		<div class="wrapper">
			<a id="downloadLink" class="download-button" ref="dlfrac" href="#" @click="$emit('download')">
				<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
					<path d="M19 12v7H5v-7H3v7c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2zm-6 .67l2.59-2.58L17 11.5l-5 5-5-5 1.41-1.41L11 12.67V3h2z"/>
				</svg>
				<span>Download Fractal</span>
			</a>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'TheFooter',
}
</script>

<style lang="scss" scoped>
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: .8em;
		width: 100%;
		box-sizing: border-box;
		padding: 15px 0;
		border-top: 1px solid hsl(235, 28%, 18%);
		.wrapper {
			display: flex;
			justify-content: flex-end;
			align-items: center;
			a {
				text-decoration: none;
				color: hsl(235, 28%, 48%);
				display: flex;
				align-items: center;
				svg {
					height: 15px;
					path {
						fill:  hsl(235, 28%, 38%)
					}
				}
			}
		}
	}
</style>