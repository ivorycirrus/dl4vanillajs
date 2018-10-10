/* Module Start */ (function(){

const DlOptimizer = function(ctxRoot){
	let _root = ctxRoot?ctxRoot:{};
	if(!_root.hasOwnProperty('DlOptimizer')) _root.DlOptimizer = {};

	/* imports */
	let mat, diff;
	if(typeof require === `undefined`){
		mat = _root["DlMatrix"];
		diff = _root["DlDerivative"];
	} else {
		mat = require("../math/matrix");
		diff = require("../math/derivative");
	}
	if(!mat) throw "Import exception : DlMatrix module is not found. (DlOptimizer)";
	else if(!diff) throw "Import exception : DlDerivative module is not found. (DlOptimizer)";

	/* Gradient Decent Optimizer */
	let _gradient_decent_optimizer = function(f, x, lr=0.001){		
		if(typeof f !== `function`) {
			throw "OptimizerException : first parameter is not function";
		} else if(!Array.isArray(x)) {
			throw "OptimizerException : second parameter is not array";
		}

		let grad = diff.grad(f, x);
		let trained = mat.add(x, mat.mul(grad, -1.0*lr));

		return trained;
	};

	/* Public methods */
	_root.DlOptimizer.gradient_decent_optimizer = function(f, x, learn_rate){
		return _gradient_decent_optimizer(f, x, learn_rate);
	};

	/* Export */
	return _root;
}

/* Export for node.js */
if(typeof module !== `undefined`) {
	let ctx = DlOptimizer();
	module.exports = ctx.DlOptimizer;
} else if(typeof window !== `undefined`) {
	window.DlOptimizer = DlOptimizer;	
}

/* Module End */ })();