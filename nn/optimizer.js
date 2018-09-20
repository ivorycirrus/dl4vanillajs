const DlOptimizer = function(ctxRoot){
	let _root = ctxRoot?ctxRoot:{};
	if(!_root.hasOwnProperty('DlOptimizer')) _root.DlOptimizer = {};

	/* imports */
	let mat;
	if(typeof require === `undefined`){
		mat = _root["DlMatrix"];
	} else {
		mat = require("../math/matrix");
	}
	if(!mat) throw "Import exception : DlMatrix module is not found. (DlOptimizer)";


	/* (private) Numerical Gradient */
	let _numerical_gradient = function(f, x) {
		if(typeof f !== `function`) throw "OptimizerException : first parameter is not function";

		// delta x
		const h = 1e-4;

		// foreach : grad = ( f(x+h) - f(x-h) ) / (2*h)
	}


	/* Export */
	return _root;
}

/* Export for node.js */
if(typeof module !== `undefined`) {
	let ctx = DlOptimizer();
	module.exports = ctx.DlOptimizer;
}