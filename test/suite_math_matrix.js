/* TEST SUITE 
	- Module : math.matrix 
	- Dependency : None
*/
const LOG = {
	"FAIL" : "\t\t\x1b[31m\[FAIL\] \x1b[0m%s",
	"PASS" : "\t\t\x1b[32m\[PASS\] \x1b[0m%s",
	"WARN" : "\t\t\x1b[33m\[WARN\] \x1b[0m%s"
};

/* Define Tests */
const tests = {
	"test_create_matrix" : function(mat){
		const testName = "test_create_matrix";
		let failures = [];

		let step = "create 2*2 matrix with zeros";
		try{
			let arr = mat.matrix([2,2], 0);
			if(!arr) throw "array is null or undefined";
			else if(arr.length !== 2 || arr[0].length !== 2 || arr[1].length !== 2) throw "array size is not match";
			else if(arr[0][0] !==0 || arr[0][1]!==0 || arr[1][0] !==0 || arr[1][1]!==0) throw "array values are wrong";
			else console.log(LOG.PASS, step);
		} catch(e) {
			let failText = step+" : "+e;
			failures.push(testName+failText);
			console.log(LOG.FAIL, failText);
		}

		return failures;
	}
}

/* Run test */
const runTest = function(testName){
	let result = {
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	}

	let mat = require("../math/matrix");
	for(let t in tests) {
		console.log("\t[Test] "+t);
		
		let failures = tests[t](mat);
		if(failures.length > 0) {
			result.fail++;
			result.failures = result.failures.concat(failures);
		} else {
			result.success++;
		}
	}

	return result;
};

module.exports = {
	"run" : runTest
};