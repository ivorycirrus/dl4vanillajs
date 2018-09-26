const dl = (function(){
	let _root = {};

	const loadModule = function(moduleRoot, moduleName, modulePath, context) {
		try {
			if(typeof require !== `undefined`) {
				moduleRoot[moduleName] = require(modulePath);
			} else if(typeof window !== `undefined`) {
				moduleRoot[moduleName] = window[modulePath](context)[modulePath];
			} else {
				throw "Cannot find Loader";
			}
		} catch(e) {
			console.log("[Error] Cannot load module '"+moduleName+"'");
		}
	};

	if(typeof require !== `undefined`) {
		/* node.js module */
		loadModule(_root, "mat", "./math/matrix");
		loadModule(_root, "diff", "./math/derivative");
		loadModule(_root, "actv", "./nn/activation_function");
		loadModule(_root, "loss", "./nn/loss_function");
		loadModule(_root, "opt", "./nn/optimizer");
	} else {
		/* web browser */
		loadModule(_root, "mat", "DlMatrix", this);
		loadModule(_root, "diff", "DlDerivative", this);
		loadModule(_root, "actv", "DlActivationFunction", this);
		loadModule(_root, "loss", "DlLossFunction", this);
		loadModule(_root, "opt", "DlOptimizer", this);
	}

	return _root;
})();

/* Export for node.js */
if(typeof module !== `undefined`) {
	module.exports = dl;
}