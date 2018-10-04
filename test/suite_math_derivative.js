/*==============================================
	TEST SUITE 
	- Module : math.derivative 
	- Dependency : math.matrix
================================================*/

/* include module */
const diff = require("../math/derivative");
const util = require("./test_util");
const TEST = util.TEST;

/* Define Tests */
const test_numerical_gradient = function(){
	let result = {
		"name" : "test_numerical_gradient",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("gradient in 1-d matrix with f(x)=x^3+1", result, function(){
		const f = (x) => x*x*x+1;
		const h = 0.0001;
		const inputs = [-1, 0, 1, 2];
		const expected = [ 
			3.0000000099988933,
			1.0000333894311098e-8,
			3.0000000100005586,
			12.000000010017331
		];

		const grad = diff.grad(f, inputs, h);
		if(!grad || grad.length != 4) throw "gradient array has wrong shape";

		for(let i = 0 ; i < inputs.length ; i++){
			if(Math.abs(grad[i]-expected[i])>h) throw "result value is wrong";
		}

		return true;
	});

	TEST("gradient in 2-d matrix with f(x)=2*sin(x)+0.5", result, function(){
		const f = (x) => 2.0*Math.sin(x)+0.5;
		const h = 0.0001;
		const inputs = [[-1, 0, 1, 2],[0.1, -0.1, 2.5, -3.5]];
		const expected = [ [ 
			1.0806046099354205,
			1.9999999966668902,
			1.0806046099354205,
			-0.8322936717108931 
		], [ 
			1.9900083272395008,
			1.9900083272395008,
			-1.602287228427146,
			-1.8729133714645574 
		] ];

		const grad = diff.grad(f, inputs, h);

		if(!grad || grad.length != 2) throw "gradient array has wrong shape";
		for(let i = 0 ; i < inputs.length ; i++){
			if(!grad[i] || grad[i].length != 4) throw "gradient array has wrong shape";
			for(let j = 0 ; j < inputs[i].length ; j++){
				if(Math.abs(grad[i][j]-expected[i][j])>h) throw "result value is wrong";
			}
		}

		return true;
	});

	return result;
};

/* Suite */
const suite = {
	"numerical gradient" : test_numerical_gradient
};

/* Run test */
const runTest = () => util.RUNNER(suite);

module.exports = {
	"run" : runTest
};