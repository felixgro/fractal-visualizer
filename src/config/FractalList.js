import HFractal from '@/fractals/HFractal'
import PythagorasTree from '@/fractals/PythagorasTree'
import SierpinskiTriangle from '@/fractals/SierpinskiTriangle'
import KochCurve from '@/fractals/KochCurve'
import FibonacciWordFractal from '@/fractals/FibonacciWordFractal'
import VicsekFractal from '@/fractals/VicsekFractal'


// Components for global Registration
export const FractalComponents = [
	HFractal,
	PythagorasTree,
	SierpinskiTriangle,
	KochCurve,
	FibonacciWordFractal,
	VicsekFractal
]

// Component List for Dropdown
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
		title: 'Van Koch Curve',
		component: 'KochCurve'
	},
	{
		title: 'Fibonacci Word',
		component: 'FibonacciWordFractal'
	},
	{
		title: 'Vicsek Fractal',
		component: 'VicsekFractal'
	}
].sort((a, b) => a.title < b.title ? -1 : 1)