export default {
    methods: {
		getSession(key) {
			return sessionStorage.getItem(key)
		},
		setSession(key, val) {
			sessionStorage.setItem(key, val)
		}
    },
};