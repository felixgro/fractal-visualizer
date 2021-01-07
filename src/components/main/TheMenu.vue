<template>
	<card ref="card">
		<div class="top-bar noselect" @click="toggleMenu" @mousedown.prevent="dragMouseDown" @touchstart="dragMouseDown">
			<span>Settings</span>
			<div class="icon" ref="icon">
				<div class="line"></div>
				<div class="line"></div>
			</div>
		</div>
		<transition name="fade">
			<div v-show="open" class="noselect">
				<slot />
			</div>
		</transition>
	</card>
</template>

<script>
import Card from '@/components/Card'
import SessionStorage from '@/mixins/SessionStorage'

export default {
	name: 'TheMenu',
	components: {
		Card,
	},
	mixins: [SessionStorage],
	data() {
		return {
			open: true,
			dragging: false,
			pos: {
				clientX: undefined,
				clientY: undefined,
				movementX: 0,
				movementY: 0
			}
		}
	},
	computed: {
		currentPos: {
			get: function() {
				if(this.getSession('nav-pos-x')) {
					return {
						x: this.getSession('nav-pos-x'),
						y: this.getSession('nav-pos-y')
					}
				}

				const titleRect = document.getElementById('appTitle').getBoundingClientRect()

				return {
					x: titleRect.x,
					y: titleRect.y + 50
				}
			},
			set: function(pos) {
				this.setSession('nav-pos-x', pos.x)
				this.setSession('nav-pos-y', pos.y)
			}
		}
	},
	mounted() {
		const settingsCard = this.$refs.card.$el
		const pos = this.currentPos
		settingsCard.style.left = pos.x + "px"
		settingsCard.style.top = pos.y + "px"
	},
	methods: {
		toggleMenu() {
			if(this.dragging)
				return

			this.open = !this.open

			if(!this.open) {
				this.$refs.icon.classList.add('open')
			} else {
				this.$refs.icon.classList.remove('open')
			}
		},
		dragMouseDown(e) {
			this.dragging = false

			if (e.type == 'touchstart') {
				// touch device
				const touch = e.touches[0] || e.changedTouches[0]
				this.pos.clientX = touch.clientX
				this.pos.clientY = touch.clientY
			} else {
				// desktop
				this.pos.clientX = e.clientX
				this.pos.clientY = e.clientY
			}

			document.onmousemove = this.dragMenu
			document.ontouchmove = this.dragMenu
			document.onmouseup = this.stopDrag
			document.ontouchend = this.stopDrag
		},
		dragMenu(e) {
			this.dragging = true

			// touch/cursor position
			let clientPos = {}

			if(e.type == "touchmove") {
				// touch device
				const touch = e.touches[0] || e.changedTouches[0]
				clientPos.x = touch.clientX
				clientPos.y = touch.clientY
			} else {
				// desktop
				clientPos.x = e.clientX
				clientPos.y = e.clientY
			}

			// calculate drag distance
			this.pos.movementX = this.pos.clientX - clientPos.x
			this.pos.movementY = this.pos.clientY - clientPos.y
			this.pos.clientX = clientPos.x
			this.pos.clientY = clientPos.y

			// calculate new menu position
			const y = (this.$refs.card.$el.getBoundingClientRect().y - this.pos.movementY)
			const x = (this.$refs.card.$el.getBoundingClientRect().x - this.pos.movementX)

			this.$refs.card.$el.style.top = y + 'px'
			this.$refs.card.$el.style.left = x + 'px'

			// save new position
			this.currentPos = {x, y}
		},
		stopDrag(e) {
			e.preventDefault()

			if (this.pos.movementX == 0 && this.pos.movementY == 0) {
				this.toggleMenu()
			} else {
				this.pos.movementX = 0
				this.pos.movementY = 0
			}

			document.onmouseup = null
			document.onmousemove = null
			document.ontouchmove = null
			document.ontouchend = null
		}
	}
}
</script>

<style lang="scss" scoped>
	.top-bar {
		display: flex;
		align-items: center;
		justify-content: space-between;
		cursor: pointer;
		padding: 18px 24px;
		span {
			color: hsl(235, 18%, 58%)
		}
		.icon {
			position: relative;
			height: 12px;
			width: 12px;
			margin-top: 2px;
			opacity: .3;
			.line {
				position: absolute;
				height: 2px;
				width: 12px;
				background: #fff;
				transition: all 120ms ease-out;
				&:first-of-type {
					margin-top: 9px;
				}
				&:last-of-type {
					transform: rotate(90deg) scaleX(0);
					margin-top: 4px;
				}
			}
			&.open {
				.line {
					&:first-of-type {
						margin-top: 4px;
					}
					&:last-of-type {
						transform: rotate(90deg) scaleX(.95);
					}
				}
			}
		}

	}
	.form-field {
		margin-bottom: 12px;
		padding: 0 24px;
		&:last-of-type {
			margin-bottom: 24px;
		}
	}
	div {
		font-size: 9pt;
		font-weight: 600;
		.card {
			z-index: 10000;
			position: fixed;
			top: 50px;
			left: 50px;
			padding: 0;
		}
	}
</style>