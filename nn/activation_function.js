/* Module Start */ (function(){

const DlActivationFunction = function(ctxRoot){
	let _root = ctxRoot?ctxRoot:{};
	if(!_root.hasOwnProperty('DlActivationFunction')) _root.DlActivationFunction = {};

	/* imports */
	var mat;
	if(typeof require === `undefined`){
		mat = _root["DlMatrix"];
	} else {
		mat = require("../math/matrix");
	}
	if(!mat) throw "Import exception : DlMatrix module is not found. (DlActivationFunction)";

	/* Sigmoid(x) = 1/(1+exp(-x))*/
	const _func_sigmoid = function(x){return 1.0/(1.0+Math.exp(-x));};
	let _sigmoid = function(arr){
		if(typeof arr == `number`) return _func_sigmoid(arr);
		else if(Array.isArray(arr)) return mat.eval(arr, _func_sigmoid);
		else throw "SigmoidException : parameter has not suppoeted type.";
	};

	/* 
	Softmax(y_k) = exp(a_k) / sum{1_n}(exp(a_i))
	             = exp(a_k + C) / sum{1_n}(exp(a_i + C))  when C = -max(a)
	*/
	const _func_sofrmax = function(arr){
		const C = -mat.max(arr);
		const sum = mat.reduce_sum(mat.eval(arr,function(x){return Math.exp(x+C);}));
		let mapper = function(k){
			if(Array.isArray(k)) return k.map(mapper);
			else return Math.exp(k+C)/sum;
		};
		return arr.map(mapper);
	};
	let _softmax = function(arr){		
		if(Array.isArray(arr)) {
			const shape = mat.shape(arr);
			if(shape.length === 1) {
				return _func_sofrmax(arr);
			} else if(shape.length === 2) {
				let ret = [];
				arr.forEach((x)=>{ret.push(_func_sofrmax(x));});
				return ret;
			} else {
				throw "SoftmaxException : parameter has not suppoeted shape.";
			}
		} else {
			throw "SoftmaxException : parameter has not suppoeted type.";
		}
	};

	/*
	ReLU(y) = { x  (x>0)
	          { 0  (x<=0)
	*/
	const _func_relu = (x) => x>0?x:0;
	let _relu = function(arr){
		if(typeof arr == `number`) return _func_relu(arr);
		else if(Array.isArray(arr)) return mat.eval(arr, _func_relu);
		else throw "ReLUException : parameter has not suppoeted type.";
	};

	/* Public methods */
	_root.DlActivationFunction.sigmoid = function(arr){
		return _sigmoid(arr);
	};
	_root.DlActivationFunction.softmax = function(arr){
		return _softmax(arr);
	};
	_root.DlActivationFunction.relu = function(arr){
		return _relu(arr);
	};

	/* Export */
	return _root;
};

/* Export for node.js */
if(typeof module !== `undefined`) {
	let ctx = DlActivationFunction();
	module.exports = ctx.DlActivationFunction;
} else if(typeof window !== `undefined`) {
	window.DlActivationFunction = DlActivationFunction;	
}

/* Module End */ })();