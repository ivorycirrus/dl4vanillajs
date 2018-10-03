/*==============================================
	TEST RUNNER
	- test main application
================================================*/

/* Input test names from shell */
const argv = process.argv.slice(2);
const targetModule = (argv && argv.length > 0)?argv[0]:'all';
console.log(`Test coverage setted by '${targetModule}'.`);

/* Supported test suits */
const testSuites = {
	"math.matrix" : "./suite_math_matrix.js"
	, "math.derivative" : "./suite_math_derivative.js"
};

/* Suit names to run test */
const tests = Object.keys(testSuites).filter(k=>(targetModule===`all`||k.startsWith(targetModule)));
if(!tests || tests.length == 0) {
	console.log(`\x1b[31m\[ERROR\]\x1b[0m '${targetModule}' is not available.`);
	process.exit(1);
} else {
	console.log(`${tests.length} of modules are prepared.`);
}

/* Result */
let result = {
	"pass" : 0
	,"fail" : 0
	,"suites" : []
	,"error" : []
};

/* Run Tests */
console.log("==[Test Start]=======================================");
tests.forEach( function(k){
	try { 
		console.log("[Module] "+k);
		
		// do test
		let suite = require(testSuites[k]);
		let suiteResult = suite.run(targetModule);

		// write result
		result.suites.push(suiteResult);
		result.fail += suiteResult.fail
		result.pass += suiteResult.pass;
	} catch(e) {
		result.fail++;
		result.suites.push({pass:0, fail:1, "failures":[`module error : ${(e&&e.code)?e.code:e}`]});
		console.log(`\t\x1b[31m\[ERROR\]\x1b[0m ${(e&&e.code)?e.code:e}`);
		return;
	}
});
console.log("==[Test Finished]=======================================");

/* Reporting */
console.log(`Total ${result.suites.length} modules are tested.`);
console.log(`Passed : \x1b[32m${result.pass}\x1b[0m / Failed : \x1b[31m${result.fail}\x1b[0m`);