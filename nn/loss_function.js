const DlLossFunction = function(ctxRoot){
	let _root = ctxRoot?ctxRoot:{};
	if(!_root.hasOwnProperty('DlLossFunction')) _root.DlLossFunction = {};

	/* imports */
	var mat;
	if(require){
		mat = require("../math/matrix");
	} else {
		mat = _root["DlMatrix"];
	}
	if(!mat) throw "Import exception : DlMatrix module is not found. (DlLossFunction)";

	/* Mean Square Error */

	/* Cross Entropy Error */

	/* Export */
	return _root;
}

/* Export for node.js */
if(module) {
	let ctx = DlLossFunction();
	module.exports = ctx.DlLossFunction;
}