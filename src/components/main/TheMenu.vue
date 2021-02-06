<template>
	<card ref="card">
		<div class="top-bar noselect" @click.passive="toggleMenu" @mousedown.passive="dragStart" @touchstart.passive="dragStart">
			<span class="title">
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 15.95 25.37">
					<rect class="cls-1" width="6.53" height="6.53"/>
					<rect class="cls-1" y="9.42" width="6.53" height="6.53"/>
					<rect class="cls-1" y="18.84" width="6.53" height="6.53"/>
					<rect class="cls-1" x="9.42" width="6.53" height="6.53"/>
					<rect class="cls-1" x="9.42" y="9.42" width="6.53" height="6.53"/>
					<rect class="cls-1" x="9.42" y="18.84" width="6.53" height="6.53"/>
				</svg>
				Settings
			</span>
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
				if(!this.getSession('nav-pos-x') || !this.getSession('nav-pos-y'))
					return this.defaultPosition()

				return {
					x: this.getSession('nav-pos-x'),
					y: this.getSession('nav-pos-y')
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
		settingsCard.style.left = this.currentPos.x + "px"
		settingsCard.style.top = this.currentPos.y + "px"

		document.ondblclick = this.reset
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
		dragStart(e) {
			this.dragging = false

			// store start position
			const pos = this.getClientPosition(e)
			this.pos.clientX = pos.x
			this.pos.clientY = pos.y

			document.onmousemove = this.dragMove
			document.ontouchmove = this.dragMove
			document.onmouseup = this.dragStop
			document.ontouchend = this.dragStop
		},
		dragMove(e) {
			this.dragging = true

			// updated client position
			const pos = this.getClientPosition(e)

			// drag distance
			this.pos.movementX = this.pos.clientX - pos.x
			this.pos.movementY = this.pos.clientY - pos.y
			this.pos.clientX = pos.x
			this.pos.clientY = pos.y

			// new menu position
			const y = (this.$refs.card.$el.getBoundingClientRect().y - this.pos.movementY)
			const x = (this.$refs.card.$el.getBoundingClientRect().x - this.pos.movementX)
			this.updatePosition({x, y})
		},
		dragStop(e) {
			e.preventDefault()

			if (this.pos.movementX == 0 && this.pos.movementY == 0 && e.type == 'touchend') {
				this.toggleMenu()
			} else {
				this.pos.movementX = 0
				this.pos.movementY = 0
			}

			document.onmouseup = null
			document.onmousemove = null
			document.ontouchmove = null
			document.ontouchend = null
		},
		updatePosition(pos) {
			const rightBorder = window.innerWidth - this.$refs.card.$el.getBoundingClientRect().width
			if(pos.x < 0 || pos.x > rightBorder)
				pos.x = pos.x > 0 ? rightBorder : 0

			const bottomBorder = window.innerHeight - 96
			if(pos.y < 61 || pos.y > bottomBorder)
				pos.y = pos.y > 61 ? bottomBorder : 61

			this.$refs.card.$el.style.top = pos.y + "px"
			this.$refs.card.$el.style.left = pos.x + "px"

			// save new position
			this.currentPos = pos
		},
		getClientPosition(e) {
			let pos = {}

			if(e.type == 'touchmove' || e.type == 'touchstart') {
				// touch device
				const touch = e.touches[0] || e.changedTouches[0]
				pos.x = touch.clientX
				pos.y = touch.clientY
			} else {
				// desktop
				pos.x = e.clientX
				pos.y = e.clientY
			}

			return pos
		},
		defaultPosition() {
			const bcr = document.getElementById('appTitle').getBoundingClientRect()

			return {x: bcr.x, y: bcr.y + 50}
		},
		reset(e) {
			e.preventDefault()

			this.updatePosition(this.defaultPosition())
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
		padding: 14px 24px;
		span.title {
			display: flex;
			align-items: center;
			color: $label-color;
			font-weight: 700;
			font-size: 1em;
			svg {
				height: 15px;
				margin-right: 12px;
				rect {
					fill: $drag-icon;
				}
			}
		}
		.icon {
			position: relative;
			height: 12px;
			width: 12px;
			margin-top: 2px;
			.line {
				position: absolute;
				height: 2px;
				width: 12px;
				background: $plus-icon;
				transition: all 120ms ease-out;
				&:first-of-type {
					margin-top: 8px;
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
		&:first-of-type {
			margin-top: 16px;
		}
		&:last-of-type {
			margin-bottom: 24px;
		}
	}
	div {
		font-size: 9pt;
		font-weight: 600;
		.card {
			z-index: 50;
			position: fixed;
			top: 50px;
			left: 50px;
			padding: 0;
		}
	}
</style>