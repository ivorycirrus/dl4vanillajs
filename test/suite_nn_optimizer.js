/*==============================================
	TEST SUITE 
	- Module : nn.optimizer 
	- Dependency : math.matrix, math.derivative
================================================*/

/* include module */
const opt = require("../nn/optimizer");
const util = require("./test_util");
const TEST = util.TEST;

/* Define Tests */
const test_gd = function(){
	let result = {
		"name" : "test_gd",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("gradient decent optimizer for f(x)=x^2, 1-d array", result, function(){
		const f = (_x)=>_x*_x;
		const X = [-2.5, -1, 0, 1, 5];
		const learning_rate = 0.1;
		
		const tolerance = 0.0001;
		const expected = [-2, -0.8, 0, 0.8, 4];

		const trained = opt.gradient_decent_optimizer(f, X, learning_rate);

		if(!trained || trained.length !== expected.length) throw "trained result is wrong shape";
		
		for(let i = 0 ; i < trained.length ; i++) {
			if(Math.abs(expected[i]-trained[i]) > tolerance) throw "trained result has wrong value";
		}

		return true;
	});

	TEST("gradient decent optimizer for f(x)=x^2, 2-d array", result, function(){
		const f = (_x)=>_x*_x;
		const X = [[-2.5, -1, 0, 1, 5], [-3, -2, 0.5, 2, 4]];
		const learning_rate = 0.1;
		
		const tolerance = 0.0001;
		const expected = [[-2, -0.8, 0, 0.8, 4], [-2.4, -1.6, 0.4, 1.6, 3.2]];

		const trained = opt.gradient_decent_optimizer(f, X, learning_rate);

		if(!trained || trained.length !== expected.length) throw "trained result is wrong shape";		
		for(let i = 0 ; i < trained.length ; i++) {
			if(!trained[i] || trained[i].length !== expected[i].length) throw "trained result is wrong shape";

			for(let j = 0 ; j < trained[i].length ; j++) {
				if(Math.abs(expected[i][j]-trained[i][j]) > tolerance) throw "trained result has wrong value";
			}
		}

		return true;
	});

	return result;
};


/* Suite */
const suite = {
	"gradient decent optimizer" : test_gd
};

/* Run test */
const runTest = () => util.RUNNER(suite);

module.exports = {
	"run" : runTest
};