/* Input test names from shell */
const _requested = process.argv.slice(2)[0];
const requested = (!_requested || _requested===`all`)?"all":_requested;

/* Supported test suits */
const testSuites = {
	"math.matrix" : "./suite_math_matrix.js"
	, "math.derivative" : "./suite_math_derivates.js"
};

/* Suit names to run test */
const tests = Object.keys(testSuites).filter(k=>(requested===`all`||k.startsWith(requested)));

/* Run Tests */
let result = {
	"total" : 0
	,"pass" : 0
	,"fail" : 0
	,"suites" : []
};

for(k in tests) {
	let suite = require(testSuites[k]);

	let suiteResult = suite.run(requested);
	
	result.total += suiteResult.total;
	result.pass += suiteResult.pass;
	result.fail += suiteResult.fail;
	result.suites.push(suiteResult);
}

/* Reporting */
// TODO : not implemented yet
console.log(result);