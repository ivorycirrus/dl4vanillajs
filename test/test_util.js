/*==============================================
	UTILITY MODULE
	- testing and logging module
================================================*/

/** Color template for printing console log */
const LOG = {
	"FAIL" : "%s\x1b[31m\[FAIL\] \x1b[0m%s",
	"PASS" : "%s\x1b[32m\[PASS\] \x1b[0m%s",
	"WARN" : "%s\x1b[35m\[WARN\] \x1b[0m%s"
};

/** 
	Test function 
	@param (string)setpName test name for logging
	@param (object:output)result object for storing test result
	@param (function)funcTest test function
*/
const TEST = function(setpName, result, funcTest){
	const INDENT = "\t\t";
	try{
		if(funcTest()) {
			result.pass++;
			console.log(LOG.PASS, INDENT, setpName);
		} else {
			throw "Unexpected test result";
		}
	} catch(e) {
		let failText = setpName+" : "+e;
		result.fail++;
		result.failures.push(result.name+failText);
		console.log(LOG.FAIL, INDENT, failText);
	}
};

/**
	Test runner
	@param (object)suite test suite including testing implementations
*/
const RUNNER = function(suite){
	let result = {
		"pass" : 0,
		"fail" : 0,
		"failures" : []
	};

	for(let test in suite) {
		console.log(`\t[Test] ${test}`);
		
		let stepResult = suite[test]();
		result.pass += stepResult.pass;
		result.fail += stepResult.fail;
		result.failures = result.failures.concat(stepResult.failures);
	}

	if(result.pass === 0 && result.fail === 0) {
		const INDENT = "\t";
		console.log(LOG.WARN, INDENT, "No test performed!!");
	}

	return result;
};

module.exports = {
	"TEST" : TEST,
	"RUNNER" : RUNNER
};