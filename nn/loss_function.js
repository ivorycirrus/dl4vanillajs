/* Module Start */ (function(){

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

	/* Mean Square Error = (1/2n) * sum{k}((y_k - t_k)^2) */
	let _mean_square_error = function(y, t){		
		if(!Array.isArray(y) || !Array.isArray(t)) throw "MSEException : parameters are only alows array type.";

		const flat_y = mat.flat(y);
		const flat_t = mat.flat(t);

		let batch_size = 1; 
		if(flat_t.length === 0 || flat_y.length%flat_t.length!== 0) {
			throw "MSEException : input arrays have invalid shapes.";
		} else {
			batch_size = flat_y.length/flat_t.length;
		}

		let batch_sum = 0;
		for(let b = 0 ; b < batch_size ; b++){
			let sum = 0;
			for(let i = 0 ; i < flat_t.length ; i++) {
				let err = flat_y[b*flat_t.length+i] - flat_t[i];
				sum += (err*err);
			}
			batch_sum += (0.5*sum/flat_t.length);
		}

		return batch_sum/batch_size;
	};

	/* 
	Cross Entropy Error = -1.0 * sum{k}(t_k * log(y_k))
	                    = -1.0 * sum{k}(t_k * log(y_k + h))  || h := small value to prevent -INF 
	*/
	let _cross_entropy_error = function(y, t, h){
		if(!Array.isArray(y) || !Array.isArray(t)) throw "CEEException : parameters are only alows array type.";
		else if(h<=0) throw "CEEException : safe-guard value 'h' must have positive value.";

		const flat_y = mat.flat(y);
		const flat_t = mat.flat(t);

		let batch_size = 1; 
		if(flat_t.length === 0 || flat_y.length%flat_t.length!== 0) {
			throw "CEEException : input arrays have invalid shapes.";
		} else {
			batch_size = flat_y.length/flat_t.length;
		}

		let safe_y;
		let batch_sum = 0;
		for(let b = 0 ; b < batch_size ; b++){
			let sum = 0;
			for(let i = 0 ; i < flat_t.length ; i++) {
				safe_y = Math.max(h, flat_y[b*flat_t.length+i]);
				sum += (flat_t[i] * Math.log(safe_y));
			}
			batch_sum += (-1.0*sum);
		}

		return batch_sum/batch_size;
	};
	
	/* Cross Entropy with Logits */
	let _cross_entropy_with_logits = function(y, t, h){
		if(!Array.isArray(y) || !Array.isArray(t)) throw "CEEException : parameters are only alows array type.";
		else if(h<=0) throw "CEEException : safe-guard value 'h' must have positive value.";
		
		const flat_y = mat.flat(y);
		const flat_t = mat.flat(t);

		let batch_size = 1; 
		if(flat_t.length === 0 || flat_y.length%flat_t.length!== 0) {
			throw "CEEException : input arrays have invalid shapes.";
		} else {
			batch_size = flat_y.length/flat_t.length;
		}

		let safe_y;
		let batch_sum = 0;
		for(let b = 0 ; b < batch_size ; b++){
			let sum = 0;
			for(let i = 0 ; i < flat_t.length ; i++) {
				safe_y = Math.max(h, flat_y[b*flat_t.length+i]);
				sum += (flat_t[i]*Math.log(safe_y) + (1-flat_t[i])*Math.log(1-safe_y));
			}
			batch_sum += (-1.0*sum);
		}

		return batch_sum/batch_size;
	};

	/* Public methods */
	_root.DlLossFunction.mean_square_error = function(y, t){
		return _mean_square_error(y, t);
	};
	_root.DlLossFunction.cross_entropy_error = function(y, t, h=0.0000001){
		return _cross_entropy_error(y, t, h);
	};
	_root.DlLossFunction.cross_entropy_with_logits = function(y, t, h=0.0000001){
		return _cross_entropy_with_logits(y, t, h);
	};

	/* Export */
	return _root;
}

/* Export for node.js */
if(typeof module !== `undefined`) {
	let ctx = DlLossFunction();
	module.exports = ctx.DlLossFunction;
} else if(typeof window !== `undefined`) {
	window.DlLossFunction = DlLossFunction;	
}

/* Module End */ })();