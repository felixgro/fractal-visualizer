export default {
    methods: {
		randomRange(min, max) {
			return min + Math.random() * (max - min)
		},
		degToRad(deg) {
			return deg * Math.PI / 180
		}
    },
};