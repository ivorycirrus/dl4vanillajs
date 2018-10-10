/*==============================================
	TEST SUITE 
	- Module : nn.loss_function 
	- Dependency : math.matrix
================================================*/

/* include module */
const loss = require("../nn/loss_function");
const util = require("./test_util");
const TEST = util.TEST;

/* Define Tests */
const test_mse = function(){
	let result = {
		"name" : "test_mse",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("mean square error for single result", result, function(){
		const predict_y = [1,2,3,4,5];
		const correct_t = [1,2,2,6,3];

		// MSE = (1/(2*5)) * ( 0 + 0 + 1 + 4 + 4 ) = 0.9
		const expected_mse = 0.9;

		if(expected_mse !== loss.mean_square_error(predict_y, correct_t)) {
			throw "mean square error is wrong value";
		}

		return true;
	});

	TEST("mean square error for batch results", result, function(){
		const predict_y = [[1,2,3,4,5], [-1,0,2,5,2]];
		const correct_t = [1,2,2,6,3];

		// MSE = (1/(2*10)) * ((0+0+1+4+4)+(4+4+0+1+1)) = 0.95
		const expected_mse = 0.95;

		if(expected_mse !== loss.mean_square_error(predict_y, correct_t)) {
			throw "mean square error is wrong value";
		}

		return true;
	});

	return result;
};

const test_cee = function(){
	let result = {
		"name" : "test_cee",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("cross entropy error for single result", result, function(){
		const predict_y = [0.25, 2.1, 3.8, 0.6, 1.5];
		const correct_t = [0.1, 0.2, 0.4, 0.2, 0.1];

		// CEE = -0.1*ln(0.25) - 0.2*ln(2.1) - 0.4*ln(3.8) - 0.2*ln(0.6) - 0.1*ln(1.5) = -0.48213984558444073		
		const expected_cee = -0.48213984558444073;
		const tolerance = 0.0001;

		if(Math.abs(expected_cee - loss.cross_entropy_error(predict_y, correct_t)) > tolerance) {
			throw "cross entropy error is wrong value";
		}

		return true;
	});

	TEST("cross entropy error for batch results", result, function(){
		const predict_y = [[0.25, 2.1, 3.8, 0.6, 1.5], [1, 2, 3, 4, 5]];
		const correct_t = [0.1, 0.2, 0.4, 0.2, 0.1];

		// CEE = (1/2) * (-0.1*ln(0.25) - 0.2*ln(2.1) - 0.4*ln(3.8) - 0.2*ln(0.6) - 0.1*ln(1.5)
		//                 - 0.1*ln(1) - 0.2*ln(2) - 0.4*ln(3) - 0.2*ln(4) - 0.1*ln(5))
		//     = -0.7492084303155309
		const expected_cee = -0.7492084303155309;
		const tolerance = 0.0001;
		
		if(Math.abs(expected_cee - loss.cross_entropy_error(predict_y, correct_t)) > tolerance) {
			throw "cross entropy error is wrong value";
		}

		return true;
	});

	return result;
};

const test_cee_with_logits = function(){
	let result = {
		"name" : "test_cee_with_logits",
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	TEST("cross entropy error with logits for single result", result, function(){
		const predict_y = [0.1, 0.9, 0.8, 0.2];
		const correct_t = [1,0,1,0];

		// CEE_logits = -ln(0.1) - ln(1-0.9) - ln(0.8) - ln(1-0.2) = 5.051457288616511
		const expected_cee = 5.051457288616511;
		const tolerance = 0.0001;

		if(Math.abs(expected_cee - loss.cross_entropy_with_logits(predict_y, correct_t)) > tolerance) {
			throw "cross entropy error is wrong value";
		}

		return true;
	});

	TEST("cross entropy error with logits for batch results", result, function(){
		const predict_y = [[0.1, 0.9, 0.8, 0.2], [0.75, 0.08, 0.65, 0.34]];
		const correct_t = [1,0,1,0];

		// CEE_logits = (1/2) * ( -ln(0.1) - ln(1-0.9) - ln(0.8) - ln(1-0.2)
		//                        -ln(0.75) - ln(1-0.08) - ln(0.65) - ln(1-0.34) )
		//            = 3.1344096650307316
		const expected_cee = 3.1344096650307316;
		const tolerance = 0.0001;

		if(Math.abs(expected_cee - loss.cross_entropy_with_logits(predict_y, correct_t)) > tolerance) {
			throw "cross entropy error is wrong value";
		}

		return true;
	});

	return result;
};

/* Suite */
const suite = {
	"mean square error" : test_mse
	, "cross entropy error" : test_cee
	, "cross entropy error with logits" : test_cee_with_logits
};

/* Run test */
const runTest = () => util.RUNNER(suite);

module.exports = {
	"run" : runTest
};