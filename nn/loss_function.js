const DlLossFunction = function(ctxRoot){
	let _root = ctxRoot?ctxRoot:{};
	if(!_root.hasOwnProperty('DlLossFunction')) _root.DlLossFunction = {};

	/* imports */
	var mat;
	if(typeof require === `undefined`){
		mat = _root["DlMatrix"];
	} else {
		mat = require("../math/matrix");
	}
	if(!mat) throw "Import exception : DlMatrix module is not found. (DlLossFunction)";

	/* Mean Square Error = 0.5 * sum{k}((y_k - t_k)^2) */
	let _mean_square_error = function(y, t){		
		if(!Array.isArray(y) || !Array.isArray(t)) throw "MSEException : parameters are only alows array type.";

		const shape_y = mat.shape(y);
		const shape_t = mat.shape(t);
		if(shape_y.reduce((p,n)=>p*n) != shape_t.reduce((p,n)=>p*n)) {
			throw "MSEException : input arrays are not same size.";
		}

		const flat_y = (shape_y.length == 1)?y:mat.flat(y);
		const flat_t = (shape_t.length == 1)?t:mat.flat(t);

		let sum = 0;
		for(let i = 0 ; i < flat_y.length ; i++) {
			let err = flat_y[i] - flat_t[i];
			sum += (err*err);
		}

		return 0.5*sum;
	};

	/* 
	Cross Entropy Error = -1.0 * sum{k}(t_k * log(y_k))
	                    = -1.0 * sum{k}(t_k * log(y_k + h))  || h := small value to prevent -INF 
	*/
	let _cross_entropy_error = function(y, t, h=0.0000000001){		
		if(!Array.isArray(y) || !Array.isArray(t)) throw "CEEException : parameters are only alows array type.";

		const shape_y = mat.shape(y);
		const shape_t = mat.shape(t);
		if(shape_y.reduce((p,n)=>p*n) != shape_t.reduce((p,n)=>p*n)) {
			throw "CEEException : input arrays are not same size.";
		}

		const flat_y = (shape_y.length == 1)?y:mat.flat(y);
		const flat_t = (shape_t.length == 1)?t:mat.flat(t);

		let sum = 0;
		for(let i = 0 ; i < flat_y.length ; i++) {
			sum += (flat_t[i] * Math.log(flat_y[i] + h));
		}

		return -1.0*sum;
	};

	/* Public methods */
	_root.DlLossFunction.mean_square_error = function(y, t){
		return _mean_square_error(y, t);
	};
	_root.DlLossFunction.cross_entropy_error = function(y, t){
		return _cross_entropy_error(y, t);
	};

	/* Export */
	return _root;
}

/* Export for node.js */
if(typeof module !== `undefined`) {
	let ctx = DlLossFunction();
	module.exports = ctx.DlLossFunction;
}