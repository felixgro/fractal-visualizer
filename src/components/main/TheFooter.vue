<template>
	<footer>
		<div class="wrapper">
			<small>{{ ver }}</small>
			<a id="downloadLink" class="download-button" ref="dlfrac" href="#" @click="$emit('download')">
				<span>Download Fractal</span>
			</a>
		</div>
	</footer>
</template>

<script>
export default {
	name: 'TheFooter',
	data() {
		return {
			ver: 'v0.0.0'
		}
	},
	created() {
		this.getCurrentVersion()
	},
	methods: {
		getCurrentVersion() {
			const http = new XMLHttpRequest()
			http.open('GET', 'https://api.github.com/repos/felixgro/fractal-visualizer/releases')
			http.send()

			http.onreadystatechange = () => {
				if(http.readyState == 4 && http.status == 200) {
					const res = JSON.parse(http.response)[0]
					this.ver = res.tag_name
				}
			}
		}
	}
}
</script>

<style lang="scss" scoped>
	footer {
		position: fixed;
		bottom: 0;
		left: 0;
		font-size: .9em;
		width: 100%;
		box-sizing: border-box;
		padding: 15px 0;
		.wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			a {
				position: relative;
				//text-decoration: none;
				color: #b84961;
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