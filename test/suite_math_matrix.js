/*==============================================
	TEST SUITE 
	- Module : math.matrix 
	- Dependency : None
================================================*/

/* include module */
const mat = require("../math/matrix");
const util = require("./test_util");
const TEST = util.TEST;

/* Define Tests */
const test_create_matrix = function(){
	let result = {
		"name" : "test_create_matrix",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("create 2*2 matrix with zeros", result, function(){
		let arr = mat.matrix([2,2], 0);
		if(!arr) throw "array is null or undefined";
		else if(arr.length !== 2 || arr[0].length !== 2 || arr[1].length !== 2) throw "array size is not match";
		else if(arr[0][0] !==0 || arr[0][1]!==0 || arr[1][0] !==0 || arr[1][1]!==0) throw "array values are wrong";
		else return true;
	});

	TEST("create 1*3 matrix with ones", result, function(){
		let arr = mat.matrix([1,3], 1);
		if(!arr) throw "array is null or undefined";
		else if(arr.length !== 1 || arr[0].length !== 3) throw "array size is not match";
		else if(arr[0][0] !== 1 || arr[0][1]!== 1 || arr[0][2] !== 1) throw "array values are wrong";
		else return true;
	});

	TEST("create 3*1 matrix with -1", result, function(){
		let arr = mat.matrix([3,1], -1);
		if(!arr) throw "array is null or undefined";
		else if(arr.length !== 3 || arr[0].length !== 1 || arr[1].length !== 1 || arr[2].length !== 1) throw "array size is not match";
		else if(arr[0][0] !== -1 || arr[1][0]!== -1 || arr[2][0] !== -1) throw "array values are wrong";
		else return true;
	});

	TEST("create 3*3 matrix with init function", result, function(){
		let counter = 0;
		let arr = mat.matrix([3,3], function(){counter += 1; return counter;});
		if(!arr) throw "array is null or undefined";
		else if(arr.length !== 3) throw "array size is not match";

		counter = 0;
		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length !== 3) throw "array size is not match";
			for(let j = 0 ; j < 3 ; j++) {
				counter += 1;
				if(arr[i][j] !== counter) throw "array values are wrong";
			}
		}

		return true;
	});

	return result;
};

const test_matrix_shape = function(){
	let result = {
		"name" : "test_matrix_shape",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("shape 1-d matrix", result, function(){
		let arr = mat.shape([1,2,3]);
		if(!arr) throw "cannot find shape";
		else if(arr.length !== 1 || arr[0] !== 3) throw "shape is wrong";
		else return true;
	});

	TEST("shape 2-d matrix", result, function(){
		let arr = mat.shape([[1,2,3],[4,5,6]]);
		if(!arr) throw "cannot find shape";
		else if(arr.length !== 2 || arr[0] !== 2 || arr[1] !== 3) throw "shape is wrong";
		else return true;
	});

	TEST("shape 3-d matrix", result, function(){
		let arr = mat.shape([[[1,2,3],[4,5,6]],[[-1,-2,-3],[-4,-5,-6]]]);
		if(!arr) throw "cannot find shape";
		else if(arr.length !== 3 || arr[0] !== 2 || arr[1] !== 2 || arr[2] !== 3) throw "shape is wrong";
		else return true;
	});

	return result;
};

const test_matrix_transpose = function(){
	let result = {
		"name" : "test_matrix_transpose",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("transpose 1-d matrix", result, function(){
		const inputs = [1,2,3];
		let arr = mat.tran(inputs);
		if(!arr) throw "cannot find transpose";
		else if(arr.length !== 3) throw "shape is wrong";

		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length !== 1) throw "shape is wrong";
			else if(arr[i][0] !== inputs[i]) throw "transpose value is wrong";
		}

		return true;
	});

	TEST("transpose 2-d matrix (1*3)", result, function(){
		const inputs = [
			[1,2,3]
		];
		const expected = [
			[1],
			[2],
			[3],
		];

		let arr = mat.tran(inputs);
		if(!arr) throw "cannot find transpose";
		else if(arr.length !== 3) throw "shape is wrong";

		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length !== 1) throw "shape is wrong";			
			if(arr[i][0] !== expected[i][0]) throw "transpose value is wrong";
		}

		return true;
	});

	TEST("transpose 2-d matrix (3*1)", result, function(){
		const inputs = [
			[1],
			[2],
			[3],
		];
		const expected = [
			[1,2,3]
		];

		let arr = mat.tran(inputs);
		if(!arr) throw "cannot find transpose";
		else if(arr.length !== 1 || arr[0].length !== 3) throw "shape is wrong";

		for(let j = 0 ; j < 3 ; j++) {
			if(arr[0][j] !== expected[0][j]) throw "transpose value is wrong";
		}

		return true;
	});

	TEST("transpose 2-d matrix (3*3)", result, function(){
		const inputs = [
			[1,2,3],
			[4,5,6],
			[7,8,9],
		];
		const expected = [
			[1,4,7],
			[2,5,8],
			[3,6,9],
		];

		let arr = mat.tran(inputs);
		if(!arr) throw "cannot find transpose";
		else if(arr.length !== 3) throw "shape is wrong";

		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length !== 3) throw "shape is wrong";
			for(let j = 0 ; j < 3 ; j++) {
				if(arr[i][j] !== expected[i][j]) throw "transpose value is wrong";
			}
		}

		return true;
	});

	return result;
};

const test_matrix_flat = function(){
	let result = {
		"name" : "test_matrix_flat",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("flat 2*2 matrix", result, function(){
		const inputs = [[1,2],[-1,-2]];
		const expected = [1,2,-1,-2];

		const arr = mat.flat(inputs);
		
		if(arr.length != 4) throw "array size is not match";
		for(let i = 0 ; i < 4 ; i++) if(arr[i] !== expected[i]) throw "flat value is wrong";

		return true;
	});

	TEST("flat matrix which has irregular shape", result, function(){
		const inputs = [[1],[2,[3,4,[5],6,[7,8,[9,10],11]]]];
		const expected = [1,2,3,4,5,6,7,8,9,10,11];

		const arr = mat.flat(inputs);
		
		if(arr.length != 11) throw "array size is not match";
		for(let i = 0 ; i < 11 ; i++) if(arr[i] !== expected[i]) throw "flat value is wrong";

		return true;
	});

	return result;
};

const test_matrix_reshape = function(){
	let result = {
		"name" : "test_matrix_reshape",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("reshape 3*4 matrix to 2*6 matrix", result, function(){
		const inputs = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];
		const expected = [[1,2,3,4,5,6],[7,8,9,10,11,12]];

		const arr = mat.reshape(inputs, [2,6]);
		
		if(arr.length != 2) throw "array size is not match";
		for(let i = 0 ; i < 2 ; i++) {
			if(arr[i].length != 6) throw "array size is not match";
			for(let j = 0 ; j < 6 ; j++) if(arr[i][j] !== expected[i][j]) throw "reshaped value is wrong";
		}

		return true;
	});

	TEST("reshape 3-d matrix to 1-d matrix", result, function(){
		const inputs = [[[1,2],[3,4]],[[5,6],[7,8]],[[9,10],[11,12]]];
		const expected = [1,2,3,4,5,6,7,8,9,10,11,12];

		const arr = mat.reshape(inputs, [12]);
		if(arr.length != 12) throw "array size is not match";
		for(let i = 0 ; i < 12 ; i++) if(arr[i] !== expected[i]) throw "reshaped value is wrong";

		return true;
	});

	TEST("reshape 3-d matrix to 2-d matrix with infer arbitary size", result, function(){
		const inputs = [[[1,2],[3,4]],[[5,6],[7,8]],[[9,10],[11,12]]];
		const expected = [[1,2,3,4],[5,6,7,8],[9,10,11,12]];

		const arr = mat.reshape(inputs, [-1,4]);
		if(arr.length != 3) throw "array size is not match";
		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length != 4) throw "array size is not match";
			for(let j = 0 ; j < 4 ; j++) if(arr[i][j] !== expected[i][j]) throw "reshaped value is wrong";
		}

		return true;
	});

	return result;
};

const test_matrix_add = function(){
	let result = {
		"name" : "test_matrix_add",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("add 3*3 matrixes", result, function(){
		const m1 = [[1,2,3],[3,4,5],[0,-9,3]];
		const m2 = [[5,0,4],[-2,6,-1],[3,7,6]];
		const expected = [[6,2,7],[1,10,4],[3,-2,9]];

		const arr = mat.add(m1,m2);
		if(!arr || arr.length != 3) throw "array size is not match";
		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length != 3)  throw "array size is not match";
			for(let j = 0 ; j < 3 ; j++) {
				if(arr[i][j] !== expected[i][j]) throw "add values are wrong";
			}
		}
		
		return true;
	});

	TEST("add 3*3 matrix and scalar value with broadcasting", result, function(){
		const m1 = [[1,2,3],[3,4,5],[0,-9,3]];
		const s = 13;
		const expected = [[14,15,16],[16,17,18],[13,4,16]];

		const arr = mat.add(m1,s);
		if(!arr || arr.length != 3) throw "array size is not match";
		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length != 3)  throw "array size is not match";
			for(let j = 0 ; j < 3 ; j++) {
				if(arr[i][j] !== expected[i][j]) throw "add values are wrong";
			}
		}
		
		return true;
	});

	TEST("add 3*3 matrix and 1*3 transposed vector with broadcasting", result, function(){
		const m1 = [[1,2,3],[3,4,5],[0,-9,3]];
		const m2 = [[1],[2],[3]];
		const expected = [[2,3,4],[5,6,7],[3,-6,6]];

		const arr = mat.add(m1,m2);
		if(!arr || arr.length != 3) throw "array size is not match";
		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length != 3)  throw "array size is not match";
			for(let j = 0 ; j < 3 ; j++) {
				if(arr[i][j] !== expected[i][j]) throw "add values are wrong";
			}
		}
		
		return true;
	});

	return result;
};

const test_matrix_subtract = function(){
	let result = {
		"name" : "test_matrix_subtract",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("subtract 3*3 matrixes", result, function(){
		const m1 = [[1,2,3],[3,4,5],[0,-9,3]];
		const m2 = [[5,0,4],[-2,6,-1],[3,7,6]];
		const expected = [[-4,2,-1],[5,-2,6],[-3,-16,-3]];

		const arr = mat.sub(m1,m2);
		if(!arr || arr.length != 3) throw "array size is not match";
		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length != 3)  throw "array size is not match";
			for(let j = 0 ; j < 3 ; j++) {
				if(arr[i][j] !== expected[i][j]) throw "subtract values are wrong";
			}
		}
		
		return true;
	});

	TEST("subtract 3*3 matrix and scalar value with broadcasting", result, function(){
		const m1 = [[1,2,3],[3,4,5],[0,-9,3]];
		const s = 5;
		const expected = [[-4,-3,-2],[-2,-1,0],[-5,-14,-2]];

		const arr = mat.sub(m1,s);
		if(!arr || arr.length != 3) throw "array size is not match";
		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length != 3)  throw "array size is not match";
			for(let j = 0 ; j < 3 ; j++) {
				if(arr[i][j] !== expected[i][j]) throw "subtract values are wrong";
			}
		}
		
		return true;
	});

	TEST("subtract 3*3 matrix and 1*3 transposed vector with broadcasting", result, function(){
		const m1 = [[1,2,3],[3,4,5],[0,-9,3]];
		const m2 = [[1],[2],[3]];
		const expected = [[0,1,2],[1,2,3],[-3,-12,0]];

		const arr = mat.sub(m1,m2);
		if(!arr || arr.length != 3) throw "array size is not match";
		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length != 3)  throw "array size is not match";
			for(let j = 0 ; j < 3 ; j++) {
				if(arr[i][j] !== expected[i][j]) throw "subtract values are wrong";
			}
		}
		
		return true;
	});

	return result;
};

const test_matrix_multiply = function(){
	let result = {
		"name" : "test_matrix_multiply",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("multiply 3*3 matrixes", result, function(){
		const m1 = [[1,2,3],[3,4,5],[0,-9,3]];
		const m2 = [[5,0,4],[-2,6,-1],[3,7,6]];
		const expected = [[10,33,20],[22,59,38],[27,-33,27]];

		const arr = mat.mul(m1,m2);
		if(!arr || arr.length != 3) throw "array size is not match";
		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length != 3)  throw "array size is not match";
			for(let j = 0 ; j < 3 ; j++) {
				if(arr[i][j] !== expected[i][j]) throw "multiply values are wrong";
			}
		}
		
		return true;
	});

	TEST("multiply 3*3 matrix and scalar value with broadcasting", result, function(){
		const m1 = [[1,2,3],[3,4,5],[0,-9,3]];
		const s = 5;
		const expected = [[5,10,15],[15,20,25],[0,-45,15]];

		const arr = mat.mul(m1,s);
		if(!arr || arr.length != 3) throw "array size is not match";
		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length != 3)  throw "array size is not match";
			for(let j = 0 ; j < 3 ; j++) {
				if(arr[i][j] !== expected[i][j]) throw "multiply values are wrong";
			}
		}
		
		return true;
	});

	return result;
};

const test_find_max_value = function(){
	let result = {
		"name" : "test_find_max_value",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("find max value in 3*3 matrix", result, function(){
		const inputs = [[1,2,3],[3,4,5],[0,-9,3]];
		const expected = 5;

		const maxVal = mat.max(inputs);
		if(maxVal !== expected) throw "max value is wrong";

		return true;
	});

	TEST("find max value in array which has irregular shape", result, function(){
		const inputs = [[1],[2,[3,4,[15],6,[7,-81,[9,10],11]]]];
		const expected = 15;
		
		const maxVal = mat.max(inputs);
		if(maxVal !== expected) throw "max value is wrong";

		return true;
	});

	return result;
};

const test_find_min_value = function(){
	let result = {
		"name" : "test_find_min_value",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("find min value in 3*3 matrix", result, function(){
		const inputs = [[1,2,3],[3,4,5],[0,-9,3]];
		const expected = -9;

		const minVal = mat.min(inputs);
		if(minVal !== expected) throw "min value is wrong";

		return true;
	});

	TEST("find min value in array which has irregular shape", result, function(){
		const inputs = [[1],[2,[3,4,[15],6,[7,-81,[9,10],11]]]];
		const expected = -81;
		
		const minVal = mat.min(inputs);
		if(minVal !== expected) throw "min value is wrong";

		return true;
	});

	return result;
};

const test_reduce_sum = function(){
	let result = {
		"name" : "test_reduce_sum",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("reduce summation in 3*3 matrix", result, function(){
		const inputs = [[1,2,3],[3,4,5],[0,-9,3]];
		const expected = 12;

		const sum = mat.reduce_sum(inputs);
		if(sum !== expected) throw "result value is wrong";

		return true;
	});

	TEST("reduce summation in array which has irregular shape", result, function(){
		const inputs = [[1],[2,[3,4,[15],6,[7,-3,[9,10],11]]]];
		const expected = 65;
		
		const sum = mat.reduce_sum(inputs);
		if(sum !== expected) throw "result value is wrong";

		return true;
	});

	return result;
};

const test_reduce_mean = function(){
	let result = {
		"name" : "test_reduce_mean",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("reduce mean in 3*3 matrix", result, function(){
		const inputs = [[1,2,3],[3,4,5],[0,-9,3]];
		const expected = 12/9;

		const mean = mat.reduce_mean(inputs);
		if(mean !== expected) throw "result value is wrong";

		return true;
	});

	TEST("reduce mean in array which has irregular shape", result, function(){
		const inputs = [[1],[2,[3,4,[15],6,[7,-3,[9,10],11]]]];
		const expected = 65/11;
		
		const mean = mat.reduce_mean(inputs);
		if(mean !== expected) throw "result value is wrong";

		return true;
	});

	return result;
};

const test_eval = function(){
	let result = {
		"name" : "test_reduce_mean",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("eval function in 3*3 matrix", result, function(){
		const f = x=>Math.sin(x);
		const m1 = [[1,2,3],[3,4,5],[0,-9,3]];
		const expected = [
			[f(1), f(2), f(3)],
			[f(3), f(4), f(5)],
			[f(0), f(-9), f(3)]
		];

		const arr = mat.eval(m1, f);
		if(!arr || arr.length != 3) throw "array size is not match";
		for(let i = 0 ; i < 3 ; i++) {
			if(arr[i].length != 3)  throw "array size is not match";
			for(let j = 0 ; j < 3 ; j++) {
				if(arr[i][j] !== expected[i][j]) throw "array values are wrong";
			}
		}
		
		return true;
	});

	TEST("eval function in array which has irregular shape", result, function(){
		const f = x=>Math.sin(x);
		const inputs = [[1],[2,[3,4,[15]]],6];
		const expected = [[f(1)],[f(2),[f(3),f(4),[f(15)]]],f(6)];
		
		const arr = mat.eval(inputs, f);
		if(!arr || arr.length != 3) throw "array size is not match";
		// 1
		if(!arr[0] || arr[0].length != 1) throw "array size is not match";
		if(arr[0][0] !== expected[0][0]) throw "result value is wrong";
		// 2
		if(!arr[1] || arr[1].length != 2) throw "array size is not match";
		if(arr[1][0] !== expected[1][0]) throw "result value is wrong";
		// 3, 4
		if(!arr[1][1] || arr[1][1].length != 3) throw "array size is not match";
		if(arr[1][1][0] !== expected[1][1][0] || arr[1][1][1] !== expected[1][1][1]) throw "result value is wrong";
		// 15
		if(!arr[1][1][2] || arr[1][1][2].length != 1) throw "array size is not match";
		if(arr[1][1][2][0] !== expected[1][1][2][0]) throw "result value is wrong";
		// 6
		if(arr[2] !== expected[2]) throw "result value is wrong";

		return true;
	});

	return result;
};

/* Suite */
const suite = {
	"create matrix" : test_create_matrix
	, "matrix shape" : test_matrix_shape
	, "transpose" : test_matrix_transpose
	, "flat" : test_matrix_flat
	, "reshape" : test_matrix_reshape
	, "add" : test_matrix_add
	, "subtract" : test_matrix_subtract
	, "multiply" : test_matrix_multiply
	, "max" : test_find_max_value
	, "min" : test_find_min_value
	, "reduce sum" : test_reduce_sum
	, "reduce mean" : test_reduce_mean
	, "eval function" : test_eval
};

/* Run test */
const runTest = () => util.RUNNER(suite);

module.exports = {
	"run" : runTest
};