/*==============================================
	TEST SUITE 
	- Module : nn.activation_function 
	- Dependency : math.matrix
================================================*/

/* include module */
const af = require("../nn/activation_function");
const util = require("./test_util");
const TEST = util.TEST;

/* Define Tests */
const test_sigmoid = function(){
	let result = {
		"name" : "test_sigmoid",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("sigmoid scalar values", result, function(){
		const inputs = [-1, 0, 0.5, 1];
		const expected = [ 
			0.2689414213699951,
			0.5,
			0.6224593312018546,
			0.7310585786300049
		];

		for(let i = 0 ; i < inputs.length ; i++){
			if(af.sigmoid(inputs[i]) !== expected[i]) throw "sigmoid value is wrong";
		}

		return true;
	});

	TEST("sigmoid 1-d matrix", result, function(){
		const inputs = [-1, 0, 0.5, 1];
		const expected = [ 
			0.2689414213699951,
			0.5,
			0.6224593312018546,
			0.7310585786300049
		];

		var result = af.sigmoid(inputs);
		if(!result || result.length !== inputs.length) throw "result value has wrong size";
		for(let i = 0 ; i < result.length ; i++){
			if(result[i] !== expected[i]) throw "sigmoid value is wrong";
		}

		return true;
	});

	TEST("sigmoid 2-d matrix", result, function(){
		const inputs = [[-2, -1, -0.5], [0.5, 1, 2]];
		const expected = [[
			0.11920292202211755,
			0.2689414213699951,
			0.3775406687981454
		], [
			0.6224593312018546,
			0.7310585786300049,
			0.8807970779778823
		]];

		var result = af.sigmoid(inputs);
		if(!result || result.length !== inputs.length) throw "result value has wrong size";
		for(let i = 0 ; i < result.length ; i++){
			if(!result[i] || result[i].length !== inputs[i].length) throw "result value has wrong size";
			for(let j = 0 ; j < result[i].length ; j++){
				if(result[i][j] !== expected[i][j]) throw "sigmoid value is wrong";
			}
		}

		return true;
	});

	return result;
};

const test_relu = function(){
	let result = {
		"name" : "test_relu",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("relu scalar values", result, function(){
		const inputs = [-100, -25, -7, -0.5, 0, 3, 11, 49];
		const expected = [0, 0, 0, 0, 0, 3, 11, 49];

		for(let i = 0 ; i < inputs.length ; i++){
			if(af.relu(inputs[i]) !== expected[i]) throw "relu value is wrong";
		}

		return true;
	});

	TEST("relu 1-d matrix", result, function(){
		const inputs = [-100, -25, -7, -0.5, 0, 3, 11, 49];
		const expected = [0, 0, 0, 0, 0, 3, 11, 49];

		var result = af.relu(inputs);
		if(!result || result.length !== inputs.length) throw "result value has wrong size";
		for(let i = 0 ; i < result.length ; i++){
			if(result[i] !== expected[i]) throw "relu value is wrong";
		}

		return true;
	});

	TEST("relu 2-d matrix", result, function(){
		const inputs = [[-100, -25, -7], [-0.5, 0, 3], [11, 49, 93]];
		const expected = [[0, 0, 0], [0, 0, 3], [11, 49, 93]];

		var result = af.relu(inputs);
		if(!result || result.length !== inputs.length) throw "result value has wrong size";
		for(let i = 0 ; i < result.length ; i++){
			if(!result[i] || result[i].length !== inputs[i].length) throw "result value has wrong size";
			for(let j = 0 ; j < result[i].length ; j++){
				if(result[i][j] !== expected[i][j]) throw "relu value is wrong";
			}
		}

		return true;
	});

	return result;
};

const test_softmax = function(){
	let result = {
		"name" : "test_softmax",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("find softmax three-times", result, function(){
		const inputs = [
			[0,1,0]
			,[1,2,3,4,5]
			,[0.1, 0.4, 0.9, 0.2, 0.7, 1.3, 4.8]
		];
		const expected = [ [ 
			0.21194155761708544, 
			0.5761168847658291, 
			0.21194155761708544
		], [ 
			0.011656230956039605,
			0.03168492079612427,
			0.0861285444362687,
			0.23412165725273662,
			0.6364086465588308
		], [ 
			0.008280203488423614,
			0.01117710560737017,
			0.018427931759732865,
			0.00915104009115431,
			0.015087514447315752,
			0.02749124372561744,
			0.9103849608803858
		] ];

		for(let i = 0 ; i < inputs.length ; i++){
			let result = af.softmax(inputs[i]);
			if(!result || result.length !== inputs[i].length) throw "result value has wrong size";
			for(let j = 0 ; j < result.length ; j++){
				if(result[j] !== expected[i][j]) throw "softmax value is wrong";
			}
		}

		return true;
	});

	return result;
};

/* Suite */
const suite = {
	"sigmoid" : test_sigmoid
	, "relu" : test_relu
	, "softmax" : test_softmax
};

/* Run test */
const runTest = () => util.RUNNER(suite);

module.exports = {
	"run" : runTest
};