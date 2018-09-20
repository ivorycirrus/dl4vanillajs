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

	/* Mean Square Error */

	/* Cross Entropy Error */

	/* Export */
	return _root;
}

/* Export for node.js */
if(typeof module !== `undefined`) {
	let ctx = DlLossFunction();
	module.exports = ctx.DlLossFunction;
}