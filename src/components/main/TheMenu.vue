<template>
	<card ref="card">
		<div class="top-bar noselect" @click="toggleMenu" @mousedown.prevent="dragMouseDown">
			<span>Settings</span>
			<div class="icon" ref="icon">
				<div class="line"></div>
				<div class="line"></div>
			</div>
		</div>
		<transition name="fade">
			<div v-if="open" class="noselect">
				<slot />
			</div>
		</transition>
	</card>
</template>

<script>
import Card from '../smart/Card'
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
			this.pos.clientX = e.clientX
			this.pos.clientY = e.clientY
			document.onmousemove = this.dragMenu
			document.onmouseup = this.stopDrag
		},
		dragMenu(e) {
			e.preventDefault()
			this.dragging = true

			this.pos.movementX = this.pos.clientX - e.clientX
			this.pos.movementY = this.pos.clientY - e.clientY
			this.pos.clientX = e.clientX
			this.pos.clientY = e.clientY

			const y = (this.$refs.card.$el.getBoundingClientRect().y - this.pos.movementY)
			const x = (this.$refs.card.$el.getBoundingClientRect().x - this.pos.movementX)

			this.$refs.card.$el.style.top = y + 'px'
			this.$refs.card.$el.style.left = x + 'px'

			this.currentPos = {x: x, y: y}


		},
		stopDrag(e) {
			e.preventDefault()

			document.onmouseup = null
			document.onmousemove = null
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
		&:first-of-type {
			margin-top: 18px;
		}
		&:last-of-type {
			margin-bottom: 0;
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
		}
	}
</style>