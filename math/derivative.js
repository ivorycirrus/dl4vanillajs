const DlDerivative = function(ctxRoot){
	let _root = ctxRoot?ctxRoot:{};
	if(!_root.hasOwnProperty('DlDerivative')) _root.DlDerivative = {};

	/* imports */
	let mat;
	if(typeof require === `undefined`){
		mat = _root["DlMatrix"];
	} else {
		mat = require("../math/matrix");
	}
	if(!mat) throw "Import exception : DlMatrix module is not found. (DlDerivative)";


	/* Numerical Gradient */
	let _gradient = function(f, x, h=0.0001) {
		return (f(x+h) - f(x-h)) / (2.0*h);
	};
	let _numerical_gradient = function(f, x, h=0.0001) {
		if(typeof f !== `function`) {
			throw "DerivativeException : first parameter is not function";
		} else if(Array.isArray(x)) {
			return mat.eval(x, _x => _gradient(f, _x, h));
		} else if(!isNaN(x)) {
			return _gradient(f, x, h);
		} else {
			throw "DerivativeException : second parameter is suitable";
		}
	}

	/* Public methods */
	_root.DlDerivative.grad = function(f, x, h){
		return _numerical_gradient(f, x, h);
	};

	/* Export */
	return _root;
}

/* Export for node.js */
if(typeof module !== `undefined`) {
	let ctx = DlDerivative();
	module.exports = ctx.DlDerivative;
}