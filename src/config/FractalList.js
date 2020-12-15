import FractalTree from '@/components/fractals/FractalTree'
import PythagorasTree from '@/components/fractals/PythagorasTree'
import SierpinskiTriangle from '@/components/fractals/SierpinskiTriangle'
import KochCurve from '@/components/fractals/KochCurve'

// Components for global Registration
export const FractalComponents = [
	FractalTree,
	PythagorasTree,
	SierpinskiTriangle,
	KochCurve
]

// Component List
export const FractalList = [
	{
		title: 'Fractal Tree',
		component: 'FractalTree'
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