export default {
	// Canvas Data
	data() {
		return {
			ctx: null,
			width: null,
			height: null
		}
	},
	// Watch Settings Update
	watch: {
		settings: {
			deep: true,
			handler: function() {
				// Clear & Update Fractal
				this.ctx.clearRect(0, 0, this.width, this.height);
				this.init()
			}
		}
	},
	mounted() {
		const canvas = this.$refs.canvas

		if (typeof canvas != 'object')
			return this.fractalError('Cannot find ref \'canvas\'')

		if(canvas.id != 'canvas')
			return this.fractalError('Canvas must have an id of \'canvas\'')

		if (typeof this.init != 'function')
			return this.fractalError('Cannot find init() Method')

		if (typeof this.settings != 'object')
			return this.fractalError('Cannot find settings Object in data')

		// Set Height & With
		this.setDimensions(canvas)

		// Set Context
		this.ctx = canvas.getContext('2d')

		// Call init on Component
		this.init()

		// Redraw when window resizes
		window.onresize = () => {
			this.setDimensions(canvas)
			this.init()
		}
	},
	methods: {
		fractalError(msg) {
			// eslint-disable-next-line
			console.error(`[${this.$options.name}] ${msg}`)
		},

		setDimensions(canvas) {
			this.width = window.innerWidth
			this.height = window.innerHeight

			canvas.width = this.width
			canvas.height = this.height
		}
	}
}