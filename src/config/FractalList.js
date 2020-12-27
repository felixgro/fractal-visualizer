import HFractal from '@/fractals/HFractal'
import PythagorasTree from '@/fractals/PythagorasTree'
import SierpinskiTriangle from '@/fractals/SierpinskiTriangle'
import KochCurve from '@/fractals/KochCurve'

// Components for global Registration
export const FractalComponents = [
	HFractal,
	PythagorasTree,
	SierpinskiTriangle,
	KochCurve
]

// Component List
export const FractalList = [
	{
		title: 'H-Fractal',
		component: 'HFractal'
	},
	{
		title: 'Pythagoras Tree',
		component: 'PythagorasTree'
	},
	{
		title: 'Sierpinski Triangle',
		component: 'SierpinskiTriangle'
	},
	{
		title: 'Koch Curve',
		component: 'KochCurve'
	}
]