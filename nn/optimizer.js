const DlOptimizer = function(ctxRoot){
	let _root = ctxRoot?ctxRoot:{};
	if(!_root.hasOwnProperty('DlOptimizer')) _root.DlOptimizer = {};

	/* imports */
	var mat;
	if(require){
		mat = require("../math/matrix");
	} else {
		mat = _root["DlMatrix"];
	}
	if(!mat) throw "Import exception : DlMatrix module is not found. (DlOptimizer)";



	/* Export */
	return _root;
}

/* Export for node.js */
if(module) {
	let ctx = DlOptimizer();
	module.exports = ctx.DlOptimizer;
}