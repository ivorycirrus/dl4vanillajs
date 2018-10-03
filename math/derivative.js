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
	let _numerical_gradient = function(f, x, h=0.0001) {
		if(typeof f !== `function`) {
			throw "DerivativeException : first parameter is not function";
		} else if(Array.isArray(x)) {
			const _partial_diff = function(arr){				
				let grad = [];
				if(Array.isArray(arr[0])) {
					for(let i = 0 ; i < arr.length ; i++){
						grad.push(_partial_diff(arr[i]));
					}		
				} else {
					for(let i = 0 ; i < arr.length ; i++){
						let temp = arr[i];
						arr[i] = temp+h;
						let dhp = f(x);

						arr[i] = temp-h;
						let dhn = f(x);

						arr[i] = temp;
						grad.push((dhp-dhn)/(2.0*h));
					}
				}
				return grad;
			};
			
			return _partial_diff(x);
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