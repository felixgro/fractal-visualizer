const key = "fractal"

export default {
    methods: {
		getCurrentFractal() {
			return sessionStorage.getItem(key)
		},
		setCurrentFractal(fractal) {
			sessionStorage.setItem(key, fractal)
		}
    },
};