const DlActivationFunction = function(ctxRoot){
	let _root = ctxRoot?ctxRoot:{};
	if(!_root.hasOwnProperty('DlActivationFunction')) _root.DlActivationFunction = {};

	/* imports */
	var mat;
	if(require){
		mat = require("../math/matrix");
	} else {
		mat = _root["DlMatrix"];
	}
	if(!mat) throw "Import exception : DlMatrix module is not found. (DlActivationFunction)";

	/* Sigmoid(x) = 1/(1+exp(-x))*/

	/* 
	Softmax(y_k) = exp(a_k) / sum{1_n}(exp(a_i))
	             = exp(a_k + C) / sum{1_n}(exp(a_i + C))  when C = max(a)
	*/

	/*
	ReLU(y) = { x  (x>0)
	          { 0  (x<=0)
	*/

	/* Export */
	return _root;
};

/* Export for node.js */
if(module) {
	let ctx = DlActivationFunction();
	module.exports = ctx.DlActivationFunction;
}